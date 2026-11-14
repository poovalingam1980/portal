/**
 * ============================================================================
 * portal.ceosvg.in - Official Progressive Web App (PWA) Service Worker (sw.js)
 * Chief Educational Office, Sivagangai District (முதன்மைக் கல்வி அலுவலகம், சிவகங்கை)
 * ============================================================================
 */
const CACHE_NAME = "ceosvg-portal-pwa-v3.2";
const CORE_ASSETS = [
  "./",
  "./index.html",
  "./manifest.json"
];

self.addEventListener("install", (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return Promise.allSettled(
        CORE_ASSETS.map((url) =>
          fetch(url, { cache: "no-cache" }).then((res) => {
            if (res && res.ok) {
              return cache.put(url, res);
            }
          }).catch(() => {})
        )
      );
    })
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME && key.startsWith("ceosvg-portal-pwa-")) {
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

function isLiveApiRequest(urlStr) {
  return (
    urlStr.includes("firebasedatabase.app") ||
    urlStr.includes("firebaseio.com") ||
    urlStr.includes("googleapis.com/identitytoolkit") ||
    urlStr.includes("script.google.com") ||
    urlStr.includes("script.googleusercontent.com") ||
    urlStr.includes("graph.facebook.com")
  );
}

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;
  const urlStr = req.url || "";
  if (!urlStr.startsWith("http")) return;

  // Always use direct network for Firebase, Google Sheets Apps Script & WhatsApp OTP APIs
  if (isLiveApiRequest(urlStr)) {
    return;
  }

  // Navigation / HTML requests: Network-First with Offline Cache Fallback
  if (req.mode === "navigate" || (req.headers.get("accept") || "").includes("text/html")) {
    event.respondWith(
      fetch(req)
        .then((networkRes) => {
          if (networkRes && networkRes.ok) {
            const copy = networkRes.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(req, copy)).catch(() => {});
          }
          return networkRes;
        })
        .catch(() => {
          return caches.match(req).then((cachedRes) => {
            return cachedRes || caches.match("./index.html") || caches.match("./");
          });
        })
    );
    return;
  }

  // Static assets (Fonts, Icons, Manifest, JS libraries): Stale-While-Revalidate
  event.respondWith(
    caches.match(req).then((cachedRes) => {
      const networkFetch = fetch(req)
        .then((networkRes) => {
          if (networkRes && networkRes.ok) {
            const copy = networkRes.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(req, copy)).catch(() => {});
          }
          return networkRes;
        })
        .catch(() => cachedRes);
      return cachedRes || networkFetch;
    })
  );
});

self.addEventListener("message", (event) => {
  if (!event.data) return;
  if (event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  } else if (event.data.type === "CLEAR_PWA_CACHE") {
    caches.keys().then((keys) => Promise.all(keys.map((k) => caches.delete(k))));
  }
});