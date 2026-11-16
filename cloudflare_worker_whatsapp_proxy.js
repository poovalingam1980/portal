/**
 * ============================================================================
 * 🛡️ CEO SIVAGANGAI PORTAL (portal.ceosvg.in) - CLOUDFLARE WORKER PROXY
 * ----------------------------------------------------------------------------
 * 1. Zero Client-Side Token Exposure:
 *    Meta WhatsApp Access Token is stored ONLY in Cloudflare Worker Secrets:
 *      - env.WA_ACCESS_TOKEN (Required Secret)
 *      - env.WA_PHONE_NUMBER_ID (Optional, default: 1307132059159317)
 *      - env.PROXY_HMAC_SECRET (Optional HMAC-SHA256 request signature secret)
 *      - env.ALLOWED_ORIGINS (Optional comma-separated list, default: portal.ceosvg.in)
 * 2. Deployment Steps:
 *    - Cloudflare Dashboard -> Workers & Pages -> Create Worker -> Paste & Deploy
 *    - Settings -> Variables and Secrets -> Add Secret: WA_ACCESS_TOKEN
 *    - Paste the Worker URL (*.workers.dev) in Admin Portal -> Cloud Settings
 * ============================================================================
 */

const DEFAULT_ALLOWED_ORIGINS = [
  "https://portal.ceosvg.in",
  "https://www.ceosvg.in",
  "http://localhost",
  "http://127.0.0.1"
];

function getCorsHeaders(request, env) {
  const origin = request.headers.get("Origin") || "";
  const customOrigins = String(env.ALLOWED_ORIGINS || "")
    .split(",")
    .map(s => s.trim())
    .filter(Boolean);
  const allowList = customOrigins.length > 0 ? customOrigins : DEFAULT_ALLOWED_ORIGINS;
  const isAllowed = !origin || allowList.some(a => origin === a || origin.startsWith(a + ":"));
  return {
    "Access-Control-Allow-Origin": isAllowed ? (origin || "https://portal.ceosvg.in") : "https://portal.ceosvg.in",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, X-Portal-Timestamp, X-Portal-Signature",
    "Vary": "Origin"
  };
}

function jsonResp(obj, status, corsHeaders) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" }
  });
}

async function verifyHmacSignature(secret, message, providedHex) {
  if (!secret) return true; // Optional unless PROXY_HMAC_SECRET is set
  if (!providedHex || typeof providedHex !== "string") return false;
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const sigBuf = await crypto.subtle.sign("HMAC", key, enc.encode(message));
  const expectedHex = Array.from(new Uint8Array(sigBuf))
    .map(b => b.toString(16).padStart(2, "0"))
    .join("");
  return expectedHex.toLowerCase() === providedHex.trim().toLowerCase();
}

export default {
  async fetch(request, env) {
    const corsHeaders = getCorsHeaders(request, env);

    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: corsHeaders });
    }
    if (request.method !== "POST") {
      return jsonResp({ ok: false, detail: "POST_REQUIRED" }, 405, corsHeaders);
    }

    try {
      const body = await request.json();
      const action = String(body.action || "send_whatsapp_otp").trim();

      if (action === "health" || action === "verify_proxy") {
        return jsonResp({
          ok: true,
          proxyActive: true,
          tokenConfigured: Boolean(env.WA_ACCESS_TOKEN && String(env.WA_ACCESS_TOKEN).trim().length > 20),
          hmacEnforced: Boolean(env.PROXY_HMAC_SECRET),
          service: "ceosvg-whatsapp-proxy"
        }, 200, corsHeaders);
      }

      const token = String(env.WA_ACCESS_TOKEN || "").trim();
      if (!token) {
        return jsonResp({ ok: false, whatsappSent: false, detail: "MISSING_ENV_WA_ACCESS_TOKEN" }, 500, corsHeaders);
      }

      // Replay-window & optional HMAC verification
      const tsStr = String(body.timestamp || request.headers.get("X-Portal-Timestamp") || "").trim();
      if (env.PROXY_HMAC_SECRET) {
        if (!tsStr) {
          return jsonResp({ ok: false, detail: "MISSING_TIMESTAMP" }, 401, corsHeaders);
        }
        const ageMs = Math.abs(Date.now() - Date.parse(tsStr));
        if (isNaN(ageMs) || ageMs > 5 * 60 * 1000) {
          return jsonResp({ ok: false, detail: "EXPIRED_TIMESTAMP" }, 401, corsHeaders);
        }
        const sig = String(body.clientSignature || request.headers.get("X-Portal-Signature") || "");
        const baseStr = `${body.toPhone || body.phone || ""}|${body.otp || ""}|${tsStr}`;
        const sigOk = await verifyHmacSignature(env.PROXY_HMAC_SECRET, baseStr, sig);
        if (!sigOk) {
          return jsonResp({ ok: false, detail: "INVALID_SIGNATURE" }, 403, corsHeaders);
        }
      }

      const rawPhone = String(body.toPhone || body.phone || "").replace(/\D/g, "");
      if (rawPhone.length < 10) {
        return jsonResp({ ok: false, whatsappSent: false, detail: "INVALID_PHONE" }, 400, corsHeaders);
      }
      const normalizedTo = rawPhone.length === 10 ? ("91" + rawPhone) : rawPhone;
      const pid = String(body.phoneNumberId || env.WA_PHONE_NUMBER_ID || "1307132059159317").trim();
      const endpoint = `https://graph.facebook.com/v22.0/${encodeURIComponent(pid)}/messages`;

      let payload;
      if (action === "send_whatsapp_text" && body.message) {
        payload = {
          messaging_product: "whatsapp",
          recipient_type: "individual",
          to: normalizedTo,
          type: "text",
          text: { body: String(body.message).slice(0, 1024) }
        };
      } else {
        const otp = String(body.otp || "").trim();
        if (!otp) {
          return jsonResp({ ok: false, whatsappSent: false, detail: "MISSING_OTP" }, 400, corsHeaders);
        }
        const tplName = String(body.templateName || "ceosivagangai").trim();
        const tplLang = String(body.templateLang || "en_US").trim();
        const supContact = String(body.supportContact || "04575-240408").trim();
        payload = {
          messaging_product: "whatsapp",
          recipient_type: "individual",
          to: normalizedTo,
          type: "template",
          template: {
            name: tplName,
            language: { code: tplLang },
            components: [
              {
                type: "body",
                parameters: [
                  { type: "text", text: otp },
                  { type: "text", text: supContact }
                ]
              },
              {
                type: "button",
                sub_type: "url",
                index: "0",
                parameters: [{ type: "text", text: otp }]
              }
            ]
          }
        };
      }

      const metaRes = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      const metaJson = await metaRes.json();
      const ok = Boolean(metaRes.ok && Array.isArray(metaJson.messages) && metaJson.messages.length > 0);
      return jsonResp({
        ok,
        whatsappSent: ok,
        messageId: (metaJson.messages && metaJson.messages[0] && metaJson.messages[0].id) || "",
        error: metaJson.error || null
      }, metaRes.ok ? 200 : metaRes.status, corsHeaders);
    } catch (err) {
      return jsonResp({ ok: false, whatsappSent: false, detail: err.message || "WORKER_ERROR" }, 500, corsHeaders);
    }
  }
};