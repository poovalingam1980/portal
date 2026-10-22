/**
 * ============================================================================
 * EBS_2026_27 STANDALONE MODULE (ebs-module.js) — v2.0 Modular Edition
 * ----------------------------------------------------------------------------
 * Separated from index.html to eliminate editor lag and modularize the
 * Sivagangai District CEO Portal (EBS Form-I, Form-II, Form-III, Form-IV,
 * Staff Delete Requests Approval, A4 Print Generator & District Admin Monitor).
 * ============================================================================
 */
const EBS_SCH_PANE_TEMPLATE = "\n  <!-- School Locked / Admin Inspection Notification Banner -->\n  <div id=\"ebsSchoolLockedNotice\" style=\"display:none; background:#fef2f2; border:2px solid #ef4444; border-left:8px solid #dc2626; border-radius:10px; padding:16px 20px; margin-bottom:16px; color:#991b1b;\">\n    <div style=\"display:flex; align-items:center; gap:14px;\">\n      <span style=\"font-size:2.2rem;\">🔒</span>\n      <div>\n        <div class=\"ebs-lock-title\" style=\"font-weight:900; font-size:1.06rem;\">முதன்மைக் கல்வி அலுவலக அறிவிப்பு: EBS_2026_27 படிவப் பதிவு தற்காலிகமாக முடக்கப்பட்டுள்ளது!</div>\n        <div class=\"ebs-lock-desc\" style=\"font-size:0.86rem; margin-top:4px; line-height:1.55; color:#7f1d1d;\">மாவட்ட முதன்மைக் கல்வி அலுவலரின் உத்தரவுப்படி பள்ளிகள் EBS விவரங்களை <strong>பார்வையிட மற்றும் A4 வடிவில் அச்சிட/பதிவிறக்கம் செய்ய மட்டுமே (View &amp; Print Only)</strong> அனுமதிக்கப்பட்டுள்ளன. நிர்வாகியால் அனுமதி அளிக்கப்படும் வரை புதிய சேர்க்கை மற்றும் தரவுத் திருத்தங்கள் செய்ய இயலாது.</div>\n      </div>\n    </div>\n  </div>\n  <div id=\"ebsAdminInspectionNotice\" style=\"display:none; background:#f0fdf4; border:2px solid #22c55e; border-left:8px solid #16a34a; border-radius:10px; padding:12px 16px; margin-bottom:16px; color:#14532d;\">\n    <div style=\"display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:8px;\">\n      <div style=\"font-weight:900; font-size:0.92rem;\">🛡️ மாவட்ட நிர்வாகி முகப்பு (Admin Inspection &amp; Data Correction Mode): நீங்கள் எந்த நேரத்திலும் பள்ளி EBS படிவத் தரவுகளைத் திருத்திச் சேமிக்கலாம்.</div>\n      <button type=\"button\" class=\"btn btn-outline btn-sm\" onclick=\"switchMainView('viewAdmin'); switchAdminTab('ebs');\">← நிர்வாகி முகப்பிற்குத் திரும்பு</button>\n    </div>\n  </div>\n  <div id=\"ebsSchoolDeadlineAlertBar\" style=\"display:none; background:#eff6ff; border:2px solid #3b82f6; border-left:8px solid #1d4ed8; border-radius:10px; padding:12px 18px; margin-bottom:16px; color:#1e40af; font-size:0.92rem; font-weight:800;\"></div>\n  <div class=\"ebs-module-banner\">\n        <div>\n          <div style=\"font-size:0.78rem; font-weight:800; color:#fde047; letter-spacing:1px;\">SIVAGANGAI DISTRICT – DEPARTMENT OF GOVERNMENT EXAMINATIONS (DGE)</div>\n          <h3 style=\"font-size:1.25rem; font-weight:900; margin:2px 0;\">📋 EBS_2026_27 – பள்ளி, மாணவர், ஆசிரியர் மற்றும் பணியாளர் விவரப் படிவங்கள் (FORM I to IV)</h3>\n          <div style=\"font-size:0.83rem; color:#e2e8f0;\">✨ <strong>EMIS தரவுகள் முன்கூட்டியே இணைக்கப்பட்டுள்ளன (6104 ஆசிரியர்கள் &amp; 956 பணியாளர்கள்):</strong> உங்கள் பள்ளியின் FORM-III மற்றும் FORM-IV பட்டியலில் EMIS விவரங்கள் தானாக நிரப்பப்பட்டுள்ளன. பள்ளிகள் <strong>'✏️ திருத்து / பூர்த்தி செய்'</strong> பொத்தானை அழுத்தி விடுபட்ட விவரங்களை மட்டும் பூர்த்தி செய்தால் போதுமானது. பணியாளரை நீக்க வேண்டுமெனில் <strong>'🗑️ நீக்கக் கோரிக்கை (Delete Request)'</strong> அனுப்பவும்.</div>\n        </div>\n        <div style=\"display:flex; gap:8px; flex-wrap:wrap;\">\n          <button type=\"button\" class=\"btn btn-outline btn-sm\" style=\"background:rgba(255,255,255,0.15); color:#fef08a; border-color:#fbbf24;\" onclick=\"resyncSchoolEmisStaff()\">🔄 EMIS பணியாளர் பட்டியலை ஒத்திசை (Re-Sync Staff)</button>\n          <button type=\"button\" class=\"btn btn-secondary btn-sm\" onclick=\"printEbsForms('ALL')\">🖨️ அனைத்து EBS படிவங்களையும் அச்சிடுக (Print All 4 Forms)</button>\n          <button type=\"button\" class=\"btn btn-success btn-sm\" onclick=\"saveAllEbsDataToCloud()\">💾 EBS_2026_27 விவரங்களைச் சேமி (Save All)</button>\n        </div>\n      </div>\n\n      <!-- EBS v2.0 Modular Enhancement: Real-Time 4-Form Completion Progress & Validator -->\n      <div id=\"ebsReadinessSummaryBar\" class=\"ebs-readiness-bar\">\n        <div class=\"ebs-readiness-item\" id=\"ebsReadyCardF1\">\n          <div class=\"ebs-readiness-head\"><span>📋 FORM – I (பள்ளி விவரம்)</span><span id=\"ebsReadyStatusF1\">சரிபார்க்கப்படுகிறது...</span></div>\n          <div class=\"ebs-readiness-meta\" id=\"ebsReadyMetaF1\">HM கைபேசி, Gmail &amp; அறைகள்</div>\n          <div class=\"ebs-progress-track\"><div class=\"ebs-progress-fill\" id=\"ebsReadyBarF1\" style=\"width:0%;\"></div></div>\n        </div>\n        <div class=\"ebs-readiness-item\" id=\"ebsReadyCardF2\">\n          <div class=\"ebs-readiness-head\"><span>📊 FORM – II (+2 பாடவாரி)</span><span id=\"ebsReadyStatusF2\">சரிபார்க்கப்படுகிறது...</span></div>\n          <div class=\"ebs-readiness-meta\" id=\"ebsReadyMetaF2\">+2 மாணவர் எண்ணிக்கை ஒப்பீடு</div>\n          <div class=\"ebs-progress-track\"><div class=\"ebs-progress-fill\" id=\"ebsReadyBarF2\" style=\"width:0%;\"></div></div>\n        </div>\n        <div class=\"ebs-readiness-item\" id=\"ebsReadyCardF3\">\n          <div class=\"ebs-readiness-head\"><span>👨‍🏫 FORM – III (ஆசிரியர்கள்)</span><span id=\"ebsReadyStatusF3\">0 / 0</span></div>\n          <div class=\"ebs-readiness-meta\" id=\"ebsReadyMetaF3\">தமிழ் பெயர், கைபேசி &amp; IFHRMS</div>\n          <div class=\"ebs-progress-track\"><div class=\"ebs-progress-fill\" id=\"ebsReadyBarF3\" style=\"width:0%;\"></div></div>\n        </div>\n        <div class=\"ebs-readiness-item\" id=\"ebsReadyCardF4\">\n          <div class=\"ebs-readiness-head\"><span>🧑‍💼 FORM – IV (பணியாளர்கள்)</span><span id=\"ebsReadyStatusF4\">0 / 0</span></div>\n          <div class=\"ebs-readiness-meta\" id=\"ebsReadyMetaF4\">தமிழ் பெயர், கைபேசி &amp; GPF/CPS</div>\n          <div class=\"ebs-progress-track\"><div class=\"ebs-progress-fill\" id=\"ebsReadyBarF4\" style=\"width:0%;\"></div></div>\n        </div>\n      </div>\n\n      <!-- 4 Form Sub-Tab Selector Cards -->\n      <div class=\"ebs-form-tabs\">\n        <button type=\"button\" class=\"ebs-form-tab-card active\" id=\"ebsSubBtnF1\" onclick=\"switchEbsSubForm('F1')\">\n          <span class=\"ebs-tab-badge\">FORM – I (<span id=\"ebsF1StaffBadge\">Auto-Filled</span>)</span>\n          <div class=\"ebs-tab-title\">SCHOOL PROFILE FOR EBS</div>\n          <div class=\"ebs-tab-sub\">பள்ளி விவரம், அறைகள், பணியாளர் & SSLC/+2 மாணவர் சுருக்கம்</div>\n        </button>\n        <button type=\"button\" class=\"ebs-form-tab-card\" id=\"ebsSubBtnF2\" onclick=\"switchEbsSubForm('F2')\">\n          <span class=\"ebs-tab-badge\">FORM – II (Hr.Sec Only)</span>\n          <div class=\"ebs-tab-title\">HSE (+2) SUBJECT STRENGTH</div>\n          <div class=\"ebs-tab-sub\">+2 பாடவாரியான மாணவர் எண்ணிக்கை (27 பாடங்கள் - TM / EM)</div>\n        </button>\n        <button type=\"button\" class=\"ebs-form-tab-card\" id=\"ebsSubBtnF3\" onclick=\"switchEbsSubForm('F3')\">\n          <span class=\"ebs-tab-badge\">FORM – III (<span id=\"ebsF3CountBadge\">0</span>)</span>\n          <div class=\"ebs-tab-title\">HM / PRINCIPAL & TEACHERS</div>\n          <div class=\"ebs-tab-sub\">தலைமையாசிரியர் & ஆசிரியர்கள் தனிநபர் சுயவிவரப் படிவம்</div>\n        </button>\n        <button type=\"button\" class=\"ebs-form-tab-card\" id=\"ebsSubBtnF4\" onclick=\"switchEbsSubForm('F4')\">\n          <span class=\"ebs-tab-badge\">FORM – IV (<span id=\"ebsF4CountBadge\">0</span>)</span>\n          <div class=\"ebs-tab-title\">NON-TEACHING STAFF PROFILE</div>\n          <div class=\"ebs-tab-sub\">ஆசிரியரல்லாத பணியாளர்கள் தனிநபர் சுயவிவரப் படிவம்</div>\n        </button>\n      </div>\n\n      <!-- =============================================================== -->\n      <!-- EBS SUB-PANE 1: FORM - I (SCHOOL PROFILE FOR EBS 2026-2027)     -->\n      <!-- =============================================================== -->\n      <div id=\"ebsSubPaneF1\" class=\"ebs-sheet-box\">\n        <div class=\"ebs-official-header\">\n          <div class=\"ebs-pill-title\">FORM – I</div>\n          <div style=\"text-align:center; flex:1;\">\n            <div style=\"font-weight:900; font-size:1.05rem; color:#0f294a; text-decoration:underline;\">SIVAGANGAI DISTRICT --- 2026 - 2027 – SCHOOL PROFILE FOR EBS</div>\n            <div style=\"font-size:0.8rem; color:#475569;\">பள்ளியின் அடிப்படை விவரம், தேர்வு அறைகள், பணியாளர்கள் மற்றும் SSLC / +2 மாணவர் எண்ணிக்கை</div>\n          </div>\n          <div class=\"ebs-uno-box-wrap\">\n            <span class=\"ebs-uno-label\">School Unique Number</span>\n            <span class=\"ebs-uno-digit\" id=\"ebsF1UNoD1\">1</span>\n            <span class=\"ebs-uno-digit\" id=\"ebsF1UNoD2\">0</span>\n            <span class=\"ebs-uno-digit\" id=\"ebsF1UNoD3\">1</span>\n          </div>\n        </div>\n\n        <form onsubmit=\"saveEbsForm1Submit(event)\">\n          <!-- Basic School Info Table -->\n          <table class=\"ebs-grid-table ebs-mobile-basic-table\" style=\"text-align:left;\">\n            <tbody>\n              <tr>\n                <td style=\"width:32%; font-weight:800; text-align:left; background:#f8fafc;\">Name of the School with Pincode</td>\n                <td colspan=\"2\" style=\"text-align:left;\">\n                  <div class=\"grid-2\">\n                    <input type=\"text\" id=\"ebsF1SchoolName\" class=\"form-control\" placeholder=\"School Name\" required>\n                    <input type=\"text\" id=\"ebsF1Pincode\" class=\"form-control\" placeholder=\"Pincode (e.g. 630561)\" maxlength=\"6\" required>\n                  </div>\n                </td>\n              </tr>\n              <tr>\n                <td style=\"font-weight:800; text-align:left; background:#f8fafc;\">Headmaster/ Principal Name &amp; Mobile Number</td>\n                <td style=\"width:40%;\"><input type=\"text\" id=\"ebsF1HmName\" class=\"form-control\" placeholder=\"HM / Principal Name\" required></td>\n                <td style=\"width:28%;\"><input type=\"tel\" id=\"ebsF1HmMobile\" class=\"form-control\" placeholder=\"10-Digit Mobile No.\" maxlength=\"10\" required></td>\n              </tr>\n              <tr>\n                <td style=\"font-weight:800; text-align:left; background:#f8fafc;\">AHM or Senior Tr. / Vice Principal Name &amp; Mobile No.</td>\n                <td><input type=\"text\" id=\"ebsF1AhmName\" class=\"form-control\" placeholder=\"AHM / Vice Principal / Senior Teacher Name\"></td>\n                <td><input type=\"tel\" id=\"ebsF1AhmMobile\" class=\"form-control\" placeholder=\"10-Digit Mobile No.\" maxlength=\"10\"></td>\n              </tr>\n              <tr>\n                <td style=\"font-weight:800; text-align:left; background:#f8fafc;\">School Gmail Address</td>\n                <td colspan=\"2\"><input type=\"email\" id=\"ebsF1Gmail\" class=\"form-control\" placeholder=\"schoolname@gmail.com\" required></td>\n              </tr>\n              <tr>\n                <td style=\"font-weight:800; text-align:left; background:#f8fafc;\">School Landline Number with STD Code</td>\n                <td colspan=\"2\"><input type=\"text\" id=\"ebsF1Landline\" class=\"form-control\" placeholder=\"e.g. 04575 - 240408 (இல்லையெனில் NIL எனக் குறிப்பிடுக)\"></td>\n              </tr>\n            </tbody>\n          </table>\n\n          <!-- Classrooms & Bench Desk Table -->\n          <table class=\"ebs-grid-table ebs-mobile-rooms-table\">\n            <thead>\n              <tr>\n                <th>Total No. of Classrooms<br><span style=\"font-size:0.75rem; font-weight:600;\">(மொத்த வகுப்பறைகள்)</span></th>\n                <th>No. of Eligible rooms for Exam Purpose<br><span style=\"font-size:0.75rem; font-weight:600;\">(தேர்வுக்குத் தகுதியான அறைகள்)</span></th>\n                <th>No.of Bench Desk Available (Pair)<br><span style=\"font-size:0.75rem; font-weight:600;\">(இருக்கை - மேசை இணைகள்)</span></th>\n              </tr>\n            </thead>\n            <tbody>\n              <tr>\n                <td data-label=\"Total No. of Classrooms (மொத்த வகுப்பறைகள்)\"><input type=\"number\" id=\"ebsF1TotalRooms\" class=\"form-control\" min=\"0\" value=\"0\" style=\"text-align:center; font-weight:800;\"></td>\n                <td data-label=\"No. of Eligible rooms for Exam Purpose (தேர்வுக்குத் தகுதியான அறைகள்)\"><input type=\"number\" id=\"ebsF1ExamRooms\" class=\"form-control\" min=\"0\" value=\"0\" style=\"text-align:center; font-weight:800;\"></td>\n                <td data-label=\"No.of Bench Desk Available - Pair (இருக்கை - மேசை இணைகள்)\"><input type=\"number\" id=\"ebsF1BenchPairs\" class=\"form-control\" min=\"0\" value=\"0\" style=\"text-align:center; font-weight:800;\"></td>\n              </tr>\n            </tbody>\n          </table>\n\n          <!-- No. of Teaching Staff Working Table -->\n          <div id=\"ebsF1AutoFillSummary\" style=\"background:#f0fdf4; border:1.5px solid #22c55e; border-left:5px solid #15803d; padding:10px 14px; border-radius:8px; margin:12px 0 8px; font-size:0.85rem; color:#14532d; font-weight:700;\">\n            ✅ Teacher Master (EMIS) பகுதியிலிருந்து பதவி வாரியாக ஆசிரியர்கள் மற்றும் அலுவலகப் பணியாளர்கள் எண்ணிக்கை தானாகப் பூர்த்தி செய்யப்பட்டுள்ளது!\n          </div>\n          <div style=\"display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px; margin:8px 0 6px;\">\n            <span style=\"font-weight:800; font-size:0.9rem; color:#0f294a;\">No. of Teaching Staff Working ( Include Self Finance Staff ) — <span style=\"color:#15803d;\">(Auto-Filled from Teacher Master)</span></span>\n            <button type=\"button\" class=\"btn btn-outline btn-sm\" onclick=\"syncForm1CountsFromForm3And4(true)\">🔄 Teacher Master / FORM-III &amp; IV-லிருந்து மீண்டும் கணக்கிடு (Auto-Count)</button>\n          </div>\n          <div style=\"overflow-x:auto;\">\n            <table class=\"ebs-grid-table\" id=\"ebsF1TeachTable\">\n              <thead>\n                <tr>\n                  <th style=\"min-width:190px;\">Nature of Post</th>\n                  <th>HM</th>\n                  <th>PG</th>\n                  <th>Comp.<br>Instru.</th>\n                  <th>Ph.D<br>Gr-I</th>\n                  <th>Voc Ins.<br>(HSS)</th>\n                  <th>BT<br>Asst.</th>\n                  <th>Ph.D<br>G-II</th>\n                  <th>SGT</th>\n                  <th>PET</th>\n                  <th>Other<br>Spl.Tr.</th>\n                  <th>Voc<br>(HS)</th>\n                  <th>TOTAL</th>\n                </tr>\n              </thead>\n              <tbody id=\"ebsF1TeachTbody\"></tbody>\n            </table>\n          </div>\n\n          <!-- No. of Non-Teaching Staff Working Table -->\n          <div style=\"font-weight:800; font-size:0.9rem; color:#0f294a; margin:12px 0 6px;\">No. of Non-Teaching Staff Working ( All Type Schools – Include Matric &amp; Self Finance Schools )</div>\n          <div style=\"overflow-x:auto;\">\n            <table class=\"ebs-grid-table\" id=\"ebsF1NonTeachTable\">\n              <thead>\n                <tr>\n                  <th style=\"min-width:190px;\">Nature of Post</th>\n                  <th>Asst.</th>\n                  <th>Jr. Asst</th>\n                  <th>Lab Asst</th>\n                  <th>RC / R. Asst.</th>\n                  <th>Watchman</th>\n                  <th>Others</th>\n                  <th>TOTAL</th>\n                </tr>\n              </thead>\n              <tbody id=\"ebsF1NonTeachTbody\"></tbody>\n            </table>\n          </div>\n\n          <!-- SSLC - Total No. of Students -->\n          <div style=\"font-weight:800; font-size:0.9rem; color:#0f294a; margin:12px 0 6px;\">SSLC - Total No. of Students (10-ம் வகுப்பு மாணவர் எண்ணிக்கை)</div>\n          <div style=\"overflow-x:auto;\">\n            <table class=\"ebs-grid-table\">\n              <thead>\n                <tr>\n                  <th colspan=\"3\">TAMIL MEDIUM</th>\n                  <th colspan=\"3\">ENGLISH MEDIUM</th>\n                  <th colspan=\"3\">TOTAL</th>\n                  <th colspan=\"3\">Part-IV Optional Language</th>\n                </tr>\n                <tr>\n                  <th>Boys</th><th>Girls</th><th>Total</th>\n                  <th>Boys</th><th>Girls</th><th>Total</th>\n                  <th>Boys</th><th>Girls</th><th>Total</th>\n                  <th>Boys</th><th>Girls</th><th>Total</th>\n                </tr>\n              </thead>\n              <tbody>\n                <tr>\n                  <td><input type=\"number\" id=\"ebsF1SslcTmB\" class=\"ebs-num-inp\" min=\"0\" value=\"0\" oninput=\"recalcEbsForm1Totals()\"></td>\n                  <td><input type=\"number\" id=\"ebsF1SslcTmG\" class=\"ebs-num-inp\" min=\"0\" value=\"0\" oninput=\"recalcEbsForm1Totals()\"></td>\n                  <td style=\"font-weight:900; background:#f1f5f9;\" id=\"ebsF1SslcTmT\">0</td>\n                  <td><input type=\"number\" id=\"ebsF1SslcEmB\" class=\"ebs-num-inp\" min=\"0\" value=\"0\" oninput=\"recalcEbsForm1Totals()\"></td>\n                  <td><input type=\"number\" id=\"ebsF1SslcEmG\" class=\"ebs-num-inp\" min=\"0\" value=\"0\" oninput=\"recalcEbsForm1Totals()\"></td>\n                  <td style=\"font-weight:900; background:#f1f5f9;\" id=\"ebsF1SslcEmT\">0</td>\n                  <td style=\"font-weight:900; background:#e2e8f0;\" id=\"ebsF1SslcTotB\">0</td>\n                  <td style=\"font-weight:900; background:#e2e8f0;\" id=\"ebsF1SslcTotG\">0</td>\n                  <td style=\"font-weight:900; background:#dcfce7; color:#166534;\" id=\"ebsF1SslcTotT\">0</td>\n                  <td><input type=\"number\" id=\"ebsF1SslcOptB\" class=\"ebs-num-inp\" min=\"0\" value=\"0\" oninput=\"recalcEbsForm1Totals()\"></td>\n                  <td><input type=\"number\" id=\"ebsF1SslcOptG\" class=\"ebs-num-inp\" min=\"0\" value=\"0\" oninput=\"recalcEbsForm1Totals()\"></td>\n                  <td style=\"font-weight:900; background:#f1f5f9;\" id=\"ebsF1SslcOptT\">0</td>\n                </tr>\n              </tbody>\n            </table>\n          </div>\n\n          <!-- HSC SECOND YEAR (+2) - Total No. of Students -->\n          <div style=\"font-weight:800; font-size:0.9rem; color:#0f294a; margin:12px 0 6px;\">HSC SECOND YEAR (+2) - Total No. of Students (+2 இரண்டாம் ஆண்டு மாணவர் எண்ணிக்கை)</div>\n          <div style=\"overflow-x:auto;\">\n            <table class=\"ebs-grid-table\">\n              <thead>\n                <tr>\n                  <th colspan=\"3\" rowspan=\"2\">Tamil Medium</th>\n                  <th colspan=\"3\" rowspan=\"2\">English Medium</th>\n                  <th colspan=\"3\" rowspan=\"2\">TOTAL</th>\n                  <th colspan=\"9\">Part-1 - Other Language</th>\n                </tr>\n                <tr>\n                  <th colspan=\"3\">HINDI</th>\n                  <th colspan=\"3\">FRENCH</th>\n                  <th colspan=\"3\">SANSKRIT</th>\n                </tr>\n                <tr>\n                  <th>Boys</th><th>Girls</th><th>Total</th>\n                  <th>Boys</th><th>Girls</th><th>Total</th>\n                  <th>Boys</th><th>Girls</th><th>Total</th>\n                  <th>Boys</th><th>Girls</th><th>Total</th>\n                  <th>Boys</th><th>Girls</th><th>Total</th>\n                  <th>Boys</th><th>Girls</th><th>Total</th>\n                </tr>\n              </thead>\n              <tbody>\n                <tr>\n                  <td><input type=\"number\" id=\"ebsF1HscTmB\" class=\"ebs-num-inp\" min=\"0\" value=\"0\" oninput=\"recalcEbsForm1Totals()\"></td>\n                  <td><input type=\"number\" id=\"ebsF1HscTmG\" class=\"ebs-num-inp\" min=\"0\" value=\"0\" oninput=\"recalcEbsForm1Totals()\"></td>\n                  <td style=\"font-weight:900; background:#f1f5f9;\" id=\"ebsF1HscTmT\">0</td>\n                  <td><input type=\"number\" id=\"ebsF1HscEmB\" class=\"ebs-num-inp\" min=\"0\" value=\"0\" oninput=\"recalcEbsForm1Totals()\"></td>\n                  <td><input type=\"number\" id=\"ebsF1HscEmG\" class=\"ebs-num-inp\" min=\"0\" value=\"0\" oninput=\"recalcEbsForm1Totals()\"></td>\n                  <td style=\"font-weight:900; background:#f1f5f9;\" id=\"ebsF1HscEmT\">0</td>\n                  <td style=\"font-weight:900; background:#e2e8f0;\" id=\"ebsF1HscTotB\">0</td>\n                  <td style=\"font-weight:900; background:#e2e8f0;\" id=\"ebsF1HscTotG\">0</td>\n                  <td style=\"font-weight:900; background:#dcfce7; color:#166534;\" id=\"ebsF1HscTotT\">0</td>\n                  <td><input type=\"number\" id=\"ebsF1HscHinB\" class=\"ebs-num-inp\" min=\"0\" value=\"0\" oninput=\"recalcEbsForm1Totals()\"></td>\n                  <td><input type=\"number\" id=\"ebsF1HscHinG\" class=\"ebs-num-inp\" min=\"0\" value=\"0\" oninput=\"recalcEbsForm1Totals()\"></td>\n                  <td style=\"font-weight:900; background:#f1f5f9;\" id=\"ebsF1HscHinT\">0</td>\n                  <td><input type=\"number\" id=\"ebsF1HscFreB\" class=\"ebs-num-inp\" min=\"0\" value=\"0\" oninput=\"recalcEbsForm1Totals()\"></td>\n                  <td><input type=\"number\" id=\"ebsF1HscFreG\" class=\"ebs-num-inp\" min=\"0\" value=\"0\" oninput=\"recalcEbsForm1Totals()\"></td>\n                  <td style=\"font-weight:900; background:#f1f5f9;\" id=\"ebsF1HscFreT\">0</td>\n                  <td><input type=\"number\" id=\"ebsF1HscSanB\" class=\"ebs-num-inp\" min=\"0\" value=\"0\" oninput=\"recalcEbsForm1Totals()\"></td>\n                  <td><input type=\"number\" id=\"ebsF1HscSanG\" class=\"ebs-num-inp\" min=\"0\" value=\"0\" oninput=\"recalcEbsForm1Totals()\"></td>\n                  <td style=\"font-weight:900; background:#f1f5f9;\" id=\"ebsF1HscSanT\">0</td>\n                </tr>\n              </tbody>\n            </table>\n          </div>\n\n          <div style=\"display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px; margin-top:14px;\">\n            <button type=\"button\" class=\"btn btn-outline\" onclick=\"printEbsForms('F1')\">🖨️ FORM – I மட்டும் A4 வடிவில் அச்சிடுக (Print Form-I)</button>\n            <div style=\"display:flex; gap:8px;\">\n              <button type=\"submit\" class=\"btn btn-success\">💾 FORM – I விவரங்களைச் சேமி (Save Form-I)</button>\n              <button type=\"button\" class=\"btn btn-primary\" onclick=\"switchEbsSubForm('F2')\">அடுத்த படிவம் (FORM – II) ❯</button>\n            </div>\n          </div>\n        </form>\n      </div>\n\n      <!-- =============================================================== -->\n      <!-- EBS SUB-PANE 2: FORM - II (HSE +2 SUBJECT WISE STRENGTH)        -->\n      <!-- =============================================================== -->\n      <div id=\"ebsSubPaneF2\" class=\"ebs-sheet-box\" style=\"display:none;\">\n        <div class=\"ebs-official-header\">\n          <div class=\"ebs-pill-title\">FORM – II <span style=\"font-size:0.75rem; font-weight:700;\">(Hr.Sec.Schools only)</span></div>\n          <div style=\"text-align:center; flex:1;\">\n            <div style=\"font-weight:900; font-size:1.02rem; color:#0f294a; text-decoration:underline;\">SIVAGANGAI DISTRICT - 2026 - 2027 – HSE (+2) - SUBJECT WISE STUDENT STRENGTH FOR EBS</div>\n            <div style=\"font-size:0.82rem; font-weight:700; color:#1e293b; margin-top:2px;\">Name of the School : <span id=\"ebsF2SchoolNameLabel\" style=\"color:#1d4ed8;\">-</span></div>\n          </div>\n          <div class=\"ebs-uno-box-wrap\">\n            <span class=\"ebs-uno-label\">School Unique Number</span>\n            <span class=\"ebs-uno-digit\" id=\"ebsF2UNoD1\">1</span>\n            <span class=\"ebs-uno-digit\" id=\"ebsF2UNoD2\">0</span>\n            <span class=\"ebs-uno-digit\" id=\"ebsF2UNoD3\">1</span>\n          </div>\n        </div>\n\n        <div id=\"ebsF2CrossCheckBanner\" style=\"display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px; background:#eff6ff; border:1.5px solid #93c5fd; border-left:5px solid #1d4ed8; padding:10px 14px; border-radius:8px; margin-bottom:12px; font-size:0.86rem;\">\n          <div id=\"ebsF2CrossCheckText\" style=\"font-weight:700; color:#1e3a8a;\">ℹ️ FORM-I (+2 மாணவர் எண்ணிக்கை) மற்றும் FORM-II (Part-II English / மொழிப் பாடங்கள்) ஒப்பீட்டு நிலை இங்கே தோன்றும்.</div>\n          <button type=\"button\" class=\"btn btn-outline btn-sm\" onclick=\"syncForm2FromForm1Hsc()\">🔄 Form-I (+2) எண்ணிக்கையுடன் ஒப்பிட்டு நிரப்புக</button>\n        </div>\n        <form onsubmit=\"saveEbsForm2Submit(event)\">\n          <div class=\"table-wrap\" style=\"max-height:620px;\">\n            <table class=\"ebs-grid-table\">\n              <thead>\n                <tr>\n                  <th rowspan=\"2\" style=\"width:60px;\">S. No</th>\n                  <th rowspan=\"2\" colspan=\"2\" style=\"text-align:left; padding-left:12px;\">SUBJECT</th>\n                  <th colspan=\"3\">TOTAL NO. OF STUDENTS – SUBJECT WISE – MEDIUM WISE</th>\n                </tr>\n                <tr>\n                  <th style=\"width:150px;\">TAMIL MEDIUM</th>\n                  <th style=\"width:150px;\">ENGLISH MEDIUM</th>\n                  <th style=\"width:150px;\">TOTAL</th>\n                </tr>\n              </thead>\n              <tbody id=\"ebsF2SubjectsTbody\"></tbody>\n            </table>\n          </div>\n\n          <div style=\"display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px; margin-top:14px;\">\n            <button type=\"button\" class=\"btn btn-outline\" onclick=\"printEbsForms('F2')\">🖨️ FORM – II மட்டும் A4 வடிவில் அச்சிடுக (Print Form-II)</button>\n            <div style=\"display:flex; gap:8px;\">\n              <button type=\"submit\" class=\"btn btn-success\">💾 FORM – II விவரங்களைச் சேமி (Save Form-II)</button>\n              <button type=\"button\" class=\"btn btn-primary\" onclick=\"switchEbsSubForm('F3')\">அடுத்த படிவம் (FORM – III) ❯</button>\n            </div>\n          </div>\n        </form>\n      </div>\n\n      <!-- =============================================================== -->\n      <!-- EBS SUB-PANE 3: FORM - III (HM / PRINCIPAL & TEACHERS PROFILE)  -->\n      <!-- =============================================================== -->\n      <div id=\"ebsSubPaneF3\" class=\"ebs-sheet-box\" style=\"display:none;\">\n        <div class=\"ebs-official-header\">\n          <div class=\"ebs-pill-title\">FORM – III</div>\n          <div style=\"text-align:center; flex:1;\">\n            <div style=\"font-weight:900; font-size:1.02rem; color:#0f294a; text-decoration:underline;\">SIVAGANGAI DISTRICT 2026 - 2027 HEADMASTER/ PRINCIPAL &amp; TEACHERS PROFILE</div>\n            <div style=\"font-size:0.82rem; font-weight:700; color:#1e293b; margin-top:2px;\">Name of the School: <span id=\"ebsF3SchoolNameLabel\" style=\"color:#1d4ed8;\">-</span></div>\n          </div>\n          <div class=\"ebs-uno-box-wrap\">\n            <span class=\"ebs-uno-label\">School Unique Number</span>\n            <span class=\"ebs-uno-digit\" id=\"ebsF3UNoD1\">1</span>\n            <span class=\"ebs-uno-digit\" id=\"ebsF3UNoD2\">0</span>\n            <span class=\"ebs-uno-digit\" id=\"ebsF3UNoD3\">1</span>\n          </div>\n        </div>\n\n                <div style=\"background:#ecfdf5; border:1.5px solid #10b981; border-radius:10px; padding:12px 16px; margin-bottom:14px; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px;\">\n          <div>\n            <div style=\"font-weight:900; color:#065f46; font-size:0.92rem;\">✅ Teacher Master (EMIS) பதிவேட்டிலிருந்து உங்கள் பள்ளியின் ஆசிரியர்கள் விவரம் கீழே இணைக்கப்பட்டுள்ளது!</div>\n            <div style=\"font-size:0.8rem; color:#047857;\">பட்டியலில் உள்ள <strong>\"✏️ திருத்து / பூர்த்தி செய்\"</strong> பொத்தானை அழுத்தியோ அல்லது வலதுபுறம் உள்ள பட்டியலில் ஆசிரியரைத் தேர்ந்தெடுத்தோ விடுபட்ட விவரங்களைப் பூர்த்தி செய்யலாம்.</div>\n          </div>\n          <div style=\"display:flex; align-items:center; gap:8px; flex-wrap:wrap;\">\n            <label style=\"font-weight:800; font-size:0.82rem; color:#065f46;\">👤 ஆசிரியரைத் தேர்ந்தெடுக்க:</label>\n            <select id=\"ebsF3QuickSelect\" class=\"form-control\" style=\"width:auto; min-width:240px; padding:6px 10px; font-weight:800; border-color:#10b981;\" onchange=\"if(this.value) editEbsForm3Teacher(this.value)\"></select>\n          </div>\n        </div>\n<!-- Saved Teachers List for Form-III -->\n        <div style=\"background:#eff6ff; border-left:5px solid #1d4ed8; padding:10px 14px; border-radius:8px; margin-bottom:12px; font-size:0.84rem; color:#1e3a8a;\">\n          💡 <strong>வழிமுறை:</strong> கீழே உள்ள பட்டியலில் உங்கள் பள்ளியின் ஆசிரியர்கள் விவரம் EMIS பதிவேட்டிலிருந்து முன்கூட்டியே நிரப்பப்பட்டுள்ளது. ஒவ்வொரு ஆசிரியருக்கும் நேராக உள்ள <strong>\"✏️ திருத்து / பூர்த்தி செய்\"</strong> பொத்தானை அழுத்தி <strong>தமிழ் பெயர், கைபேசி எண், IFHRMS எண், தேர்வுப் பணி மற்றும் முகாம் விருப்பம்</strong> ஆகிய விடுபட்ட விவரங்களை மட்டும் பூர்த்தி செய்து சேமிக்கவும். மாறுதல் / ஓய்வு காரணமாக ஆசிரியரைப் பட்டியலிலிருந்து நீக்க வேண்டுமெனில் <strong>\"🗑️ நீக்கக் கோரிக்கை (Delete Request)\"</strong> பொத்தானை அழுத்தவும் (மாவட்ட நிர்வாகி ஒப்புதல் அளித்தவுடன் நீக்கப்படும்).\n        </div>\n        <div class=\"panel-title\">\n          <span>📋 பள்ளியின் தலைமையாசிரியர் &amp; ஆசிரியர்கள் பட்டியல் (FORM – III Pre-filled Teachers List)</span>\n          <div style=\"display:flex; gap:8px;\">\n            <button type=\"button\" class=\"btn btn-outline btn-sm\" onclick=\"printEbsForms('F3')\">🖨️ அனைத்து ஆசிரியர்களின் FORM – III படிவங்களை அச்சிடுக (A4 Print)</button>\n            <button type=\"button\" class=\"btn btn-primary btn-sm\" onclick=\"switchEbsSubForm('F4')\">அடுத்த படிவம் (FORM – IV) ❯</button>\n          </div>\n        </div>\n        <!-- EBS v2.0 Form-III Instant Search, Completion Filter & Card Toggle -->\n        <div class=\"ebs-filter-toolbar\">\n          <div style=\"display:flex; gap:8px; flex-wrap:wrap; flex:1; align-items:center;\">\n            <input type=\"text\" id=\"ebsF3SearchInput\" class=\"form-control\" style=\"max-width:280px; min-height:38px !important; padding:6px 12px !important; font-size:0.9rem !important;\" placeholder=\"🔍 ஆசிரியர் பெயர் / EMIS / பதவி / பாடம் தேடுக...\" oninput=\"filterEbsForm3Table()\">\n            <select id=\"ebsF3FilterStatus\" class=\"form-control\" style=\"width:auto; min-height:38px !important; padding:6px 10px !important; font-size:0.88rem !important;\" onchange=\"filterEbsForm3Table()\">\n              <option value=\"ALL\">அனைத்து ஆசிரியர்கள் (All Teachers)</option>\n              <option value=\"INCOMPLETE\">⚠️ விடுபட்ட விவரம் உள்ளவர்கள் (Incomplete Only)</option>\n              <option value=\"COMPLETE\">✅ முழுமையான பதிவுகள் (Completed Only)</option>\n            </select>\n            <span id=\"ebsF3FilterStatsBadge\" style=\"font-size:0.82rem; font-weight:800; color:#1e40af;\"></span>\n          </div>\n          <button type=\"button\" class=\"btn btn-outline btn-sm\" id=\"ebsF3ToggleCardsBtn\" onclick=\"toggleEbsCardsPreview('F3')\">🃏 அனைத்து சுயவிவர அட்டைகள் காட்டு / மறை</button>\n        </div>\n        <div class=\"table-wrap\">\n          <table class=\"data-table\">\n            <thead>\n              <tr>\n                <th>வ.எண்</th>\n                <th>ஆசிரியர் பெயர் (English &amp; தமிழ்)</th>\n                <th>பதவி &amp; முதன்மைப் பாடம்</th>\n                <th>EMIS ID &amp; IFHRMS</th>\n                <th>நியமனம் &amp; தன்மை</th>\n                <th>கைபேசி &amp; முகாம் விருப்பம்</th>\n                <th>செயல்கள் (Print / Edit / Delete)</th>\n              </tr>\n            </thead>\n            <tbody id=\"ebsF3TeachersListTbody\"></tbody>\n          </table>\n        </div>\n        <div id=\"ebsF3AllCardsPreview\" style=\"margin-top:14px;\"></div>\n        <div style=\"margin-top:18px;\"></div>\n        <form onsubmit=\"saveEbsForm3TeacherSubmit(event)\" style=\"background:#f8fafc; border:1.5px solid #94a3b8; border-radius:10px; padding:16px; margin-bottom:18px;\">\n          <div style=\"display:flex; justify-content:space-between; align-items:center; margin-bottom:12px; border-bottom:1.5px solid #cbd5e1; padding-bottom:8px;\">\n            <span style=\"font-weight:900; color:#0f294a; font-size:0.96rem;\" id=\"ebsF3FormTitle\">➕ தலைமையாசிரியர் / முதல்வர் / ஆசிரியர் சுயவிவரம் சேர்க்க (Add Teacher for FORM-III)</span>\n            <button type=\"button\" class=\"btn btn-outline btn-sm\" onclick=\"resetEbsForm3Inputs()\">🧹 புதிய பதிவு (Clear Form)</button>\n          </div>\n          <input type=\"hidden\" id=\"ebsF3EditId\" value=\"\">\n\n          <div class=\"grid-4\">\n            <div class=\"form-group\">\n              <label class=\"form-label\">Name of the Teacher (In English) <span class=\"required\">*</span></label>\n              <input type=\"text\" id=\"ebsF3NameEn\" class=\"form-control\" placeholder=\"e.g. KANNAPPAN A\" required>\n            </div>\n            <div class=\"form-group\">\n              <label class=\"form-label\">Name of the Teacher (தமிழில்) <span class=\"required\">*</span></label>\n              <input type=\"text\" id=\"ebsF3NameTa\" class=\"form-control\" placeholder=\"எ.கா: திரு.அ.கண்ணப்பன்\" required>\n            </div>\n            <div class=\"form-group\">\n              <label class=\"form-label\">Designation (பதவி) <span class=\"required\">*</span></label>\n              <select id=\"ebsF3Desig\" class=\"form-control\" required></select>\n            </div>\n            <div class=\"form-group\">\n              <label class=\"form-label\">Gender (பாலினம்)</label>\n              <select id=\"ebsF3Gender\" class=\"form-control\">\n                <option value=\"Male\">Male (ஆண்)</option>\n                <option value=\"Female\">Female (பெண்)</option>\n              </select>\n            </div>\n          </div>\n\n          <div class=\"grid-3\">\n            <div class=\"form-group\">\n              <label class=\"form-label\">EMIS – EMPLOYEE - ID (10 இலக்க எண்) <span class=\"required\">*</span></label>\n              <input type=\"text\" id=\"ebsF3EmisId\" class=\"form-control\" maxlength=\"12\" placeholder=\"10-Digit EMIS ID\" required>\n            </div>\n            <div class=\"form-group\">\n              <label class=\"form-label\">Educational Qualification (கல்வித் தகுதி) <span class=\"required\">*</span></label>\n              <input type=\"text\" id=\"ebsF3Qual\" class=\"form-control\" placeholder=\"e.g. M.Sc., B.Ed., M.Phil.\" required>\n            </div>\n            <div class=\"form-group\">\n              <label class=\"form-label\">Main Subject (முதன்மைப் பாடம்) <span class=\"required\">*</span></label>\n              <select id=\"ebsF3MainSub\" class=\"form-control\" required></select>\n            </div>\n          </div>\n\n          <!-- Handling Classes Table -->\n          <table class=\"ebs-grid-table ebs-mobile-handling-table\" style=\"margin-bottom:12px;\">\n            <thead>\n              <tr>\n                <th style=\"width:22%;\">Handling Classes</th>\n                <th style=\"width:16%;\">Teaching</th>\n                <th>10th STD</th>\n                <th>XIth STD</th>\n                <th>XIIth STD</th>\n              </tr>\n            </thead>\n            <tbody>\n              <tr>\n                <td rowspan=\"2\" class=\"ebs-handling-chk-cell\" style=\"text-align:left; padding-left:10px;\">\n                  <div class=\"ebs-mobile-section-head\">Handling Classes (கையாளும் வகுப்புகள்):</div>\n                  <div class=\"ebs-handling-chk-wrap\">\n                    <label style=\"display:block; font-weight:700; margin-bottom:4px;\"><input type=\"checkbox\" id=\"ebsF3Chk10\" checked> 10th STD</label>\n                    <label style=\"display:block; font-weight:700;\"><input type=\"checkbox\" id=\"ebsF3Chk11_12\"> 11th &amp; 12th STD</label>\n                  </div>\n                </td>\n                <td class=\"ebs-handling-type-cell\" style=\"font-weight:800; background:#f1f5f9;\">Subject (பாடம்)</td>\n                <td data-label=\"10th STD - Subject (10-ம் வகுப்பு பாடம்)\"><input type=\"text\" id=\"ebsF3Sub10\" class=\"form-control\" style=\"padding:9px 12px; font-size:1.08rem;\" placeholder=\"10th Subject\"></td>\n                <td data-label=\"XIth STD - Subject (+1 பாடம்)\"><input type=\"text\" id=\"ebsF3Sub11\" class=\"form-control\" style=\"padding:9px 12px; font-size:1.08rem;\" placeholder=\"XIth Subject\"></td>\n                <td data-label=\"XIIth STD - Subject (+2 பாடம்)\"><input type=\"text\" id=\"ebsF3Sub12\" class=\"form-control\" style=\"padding:9px 12px; font-size:1.08rem;\" placeholder=\"XIIth Subject\"></td>\n              </tr>\n              <tr>\n                <td class=\"ebs-handling-type-cell\" style=\"font-weight:800; background:#f1f5f9;\">Medium (வழி)</td>\n                <td data-label=\"10th STD - Medium (10-ம் வகுப்பு பயிற்று மொழி)\">\n                  <select id=\"ebsF3Med10\" class=\"form-control\" style=\"padding:9px 12px; font-size:1.08rem;\">\n                    <option value=\"\">- Select -</option>\n                    <option value=\"TM\">Tamil Medium (TM)</option>\n                    <option value=\"EM\">English Medium (EM)</option>\n                    <option value=\"TM & EM\">Both (TM &amp; EM)</option>\n                  </select>\n                </td>\n                <td data-label=\"XIth STD - Medium (+1 பயிற்று மொழி)\">\n                  <select id=\"ebsF3Med11\" class=\"form-control\" style=\"padding:9px 12px; font-size:1.08rem;\">\n                    <option value=\"\">- Select -</option>\n                    <option value=\"TM\">Tamil Medium (TM)</option>\n                    <option value=\"EM\">English Medium (EM)</option>\n                    <option value=\"TM & EM\">Both (TM &amp; EM)</option>\n                  </select>\n                </td>\n                <td data-label=\"XIIth STD - Medium (+2 பயிற்று மொழி)\">\n                  <select id=\"ebsF3Med12\" class=\"form-control\" style=\"padding:9px 12px; font-size:1.08rem;\">\n                    <option value=\"\">- Select -</option>\n                    <option value=\"TM\">Tamil Medium (TM)</option>\n                    <option value=\"EM\">English Medium (EM)</option>\n                    <option value=\"TM & EM\">Both (TM &amp; EM)</option>\n                  </select>\n                </td>\n              </tr>\n            </tbody>\n          </table>\n\n          <div class=\"grid-3\">\n            <div class=\"form-group\">\n              <label class=\"form-label\">Mode of First Appointment</label>\n              <select id=\"ebsF3FirstAppMode\" class=\"form-control\">\n                <option value=\"TRB\">TRB</option>\n                <option value=\"Emp. Seniority\">Emp. Seniority</option>\n                <option value=\"Management\">Management</option>\n                <option value=\"Compassionate Ground\">Compassionate Ground</option>\n                <option value=\"Others\">Others</option>\n              </select>\n            </div>\n            <div class=\"form-group\">\n              <label class=\"form-label\">D.O.J in First Appointment</label>\n              <input type=\"date\" id=\"ebsF3DojFirst\" class=\"form-control\">\n            </div>\n            <div class=\"form-group\">\n              <label class=\"form-label\">Name of the Post (First Join)</label>\n              <input type=\"text\" id=\"ebsF3FirstPostName\" class=\"form-control\" placeholder=\"e.g. BT Assistant / PG Assistant\">\n            </div>\n          </div>\n\n          <div class=\"grid-3\">\n            <div class=\"form-group\">\n              <label class=\"form-label\">Date of Birth (பிறந்த தேதி) <span class=\"required\">*</span></label>\n              <input type=\"date\" id=\"ebsF3Dob\" class=\"form-control\" required>\n            </div>\n            <div class=\"form-group\">\n              <label class=\"form-label\">Mode of Appointment in Present Post</label>\n              <select id=\"ebsF3PresAppMode\" class=\"form-control\">\n                <option value=\"New Appointment\">New Appointment (புதிய நியமனம்)</option>\n                <option value=\"Promotion\">Promotion (பதவி உயர்வு)</option>\n              </select>\n            </div>\n            <div class=\"form-group\">\n              <label class=\"form-label\">Nature of Present Post</label>\n              <select id=\"ebsF3PresNature\" class=\"form-control\">\n                <option value=\"Regular\">Regular (Govt. Salaried)</option>\n                <option value=\"Contract\">Contract (Self Fin. / Management)</option>\n              </select>\n            </div>\n          </div>\n\n          <div class=\"grid-3\">\n            <div class=\"form-group\">\n              <label class=\"form-label\">Date of Join in Present Post</label>\n              <input type=\"date\" id=\"ebsF3DojPresPost\" class=\"form-control\">\n            </div>\n            <div class=\"form-group\">\n              <label class=\"form-label\">Unit Transfer Date (துறை மாறுதல் எனில் மட்டும்)</label>\n              <input type=\"date\" id=\"ebsF3UnitTransDate\" class=\"form-control\">\n            </div>\n            <div class=\"form-group\">\n              <label class=\"form-label\">Date of Join in Present School</label>\n              <input type=\"date\" id=\"ebsF3DojPresSchool\" class=\"form-control\">\n            </div>\n          </div>\n\n          <div class=\"grid-3\">\n            <div class=\"form-group\">\n              <label class=\"form-label\">Mobile Number (WhatsApp) <span class=\"required\">*</span></label>\n              <input type=\"tel\" id=\"ebsF3Mobile\" class=\"form-control\" maxlength=\"10\" placeholder=\"10-Digit Mobile\" required>\n            </div>\n            <div class=\"form-group\">\n              <label class=\"form-label\">Alternate Mobile No.</label>\n              <input type=\"tel\" id=\"ebsF3AltMobile\" class=\"form-control\" maxlength=\"10\" placeholder=\"Alternate Mobile\">\n            </div>\n            <div class=\"form-group\">\n              <label class=\"form-label\">Personal E-mail ID</label>\n              <input type=\"email\" id=\"ebsF3Email\" class=\"form-control\" placeholder=\"teacher@gmail.com\">\n            </div>\n          </div>\n\n          <div class=\"grid-3\">\n            <div class=\"form-group\">\n              <label class=\"form-label\">Present Residential Place (இருப்பிட ஊர்)</label>\n              <input type=\"text\" id=\"ebsF3ResPlace\" class=\"form-control\" placeholder=\"e.g. Karaikudi / Sivagangai\">\n            </div>\n            <div class=\"form-group\">\n              <label class=\"form-label\">Present Residential District (மாவட்டம்)</label>\n              <input type=\"text\" id=\"ebsF3ResDist\" class=\"form-control\" value=\"Sivagangai\">\n            </div>\n            <div class=\"form-group\">\n              <label class=\"form-label\">IFHRMS ID (11 Digits)</label>\n              <input type=\"text\" id=\"ebsF3Ifhrms\" class=\"form-control\" maxlength=\"12\" placeholder=\"IFHRMS Number\">\n            </div>\n          </div>\n\n          <!-- Feb 2025 Practical External Examiner Centres -->\n          <div style=\"font-weight:800; font-size:0.84rem; color:#0f294a; margin:8px 0 6px;\">Name of the Exam Centre in which acted as External Examiner in Feb'2025 Practical Exam:</div>\n          <div class=\"grid-3\">\n            <div class=\"form-group\">\n              <label class=\"form-label\">SSLC Practical Centre 1)</label>\n              <input type=\"text\" id=\"ebsF3PracSslc1\" class=\"form-control\" placeholder=\"SSLC Practical Exam Centre\">\n            </div>\n            <div class=\"form-group\">\n              <label class=\"form-label\">HSC Practical Centre 1)</label>\n              <input type=\"text\" id=\"ebsF3PracHsc1\" class=\"form-control\" placeholder=\"HSC Practical Centre 1\">\n            </div>\n            <div class=\"form-group\">\n              <label class=\"form-label\">HSC Practical Centre 2)</label>\n              <input type=\"text\" id=\"ebsF3PracHsc2\" class=\"form-control\" placeholder=\"HSC Practical Centre 2\">\n            </div>\n          </div>\n\n          <!-- 2025-26 Exam Duty Table -->\n          <div style=\"font-weight:800; font-size:0.84rem; color:#0f294a; margin:8px 0 6px;\">2025-26 Exam Duty Details (கடந்த ஆண்டில் ஆற்றிய தேர்வுப் பணி விவரம்):</div>\n          <table class=\"ebs-grid-table ebs-mobile-duty-table\" style=\"margin-bottom:12px;\">\n            <thead>\n              <tr>\n                <th style=\"width:20%;\">2025-26 Exam Duty</th>\n                <th style=\"width:32%;\">Nature of Work</th>\n                <th>Name of the Exam Centre / Valuation Camp</th>\n              </tr>\n            </thead>\n            <tbody>\n              <tr>\n                <td class=\"ebs-duty-title-cell\" style=\"font-weight:900;\">📋 SSLC (10-ம் வகுப்பு பொதுத்தேர்வுப் பணி)</td>\n                <td data-label=\"Nature of Work (பணியின் தன்மை)\"><select id=\"ebsF3DutySslcWork\" class=\"form-control\" style=\"padding:9px 12px; font-size:1.08rem;\"></select></td>\n                <td data-label=\"Name of the Exam Centre / Valuation Camp (தேர்வு மையம் / முகாம் பெயர்)\"><input type=\"text\" id=\"ebsF3DutySslcCentre\" class=\"form-control\" style=\"padding:9px 12px; font-size:1.08rem;\" placeholder=\"SSLC Exam Centre Name &amp; Code\"></td>\n              </tr>\n              <tr>\n                <td class=\"ebs-duty-title-cell\" style=\"font-weight:900;\">📋 HSC (+1 / +2 பொதுத்தேர்வுப் பணி)</td>\n                <td data-label=\"Nature of Work (பணியின் தன்மை)\"><select id=\"ebsF3DutyHscWork\" class=\"form-control\" style=\"padding:9px 12px; font-size:1.08rem;\"></select></td>\n                <td data-label=\"Name of the Exam Centre / Valuation Camp (தேர்வு மையம் / முகாம் பெயர்)\"><input type=\"text\" id=\"ebsF3DutyHscCentre\" class=\"form-control\" style=\"padding:9px 12px; font-size:1.08rem;\" placeholder=\"HSC Exam Centre Name &amp; Code\"></td>\n              </tr>\n              <tr>\n                <td class=\"ebs-duty-title-cell\" style=\"font-weight:900;\">📋 Valuation Camp (விடைத்தாள் திருத்தும் முகாம் பணி)</td>\n                <td data-label=\"Nature of Work (பணியின் தன்மை)\"><select id=\"ebsF3DutyCampWork\" class=\"form-control\" style=\"padding:9px 12px; font-size:1.08rem;\"></select></td>\n                <td data-label=\"Name of the Exam Centre / Valuation Camp (முகாம் பெயர்)\"><input type=\"text\" id=\"ebsF3DutyCampCentre\" class=\"form-control\" style=\"padding:9px 12px; font-size:1.08rem;\" placeholder=\"Valuation Camp Name\"></td>\n              </tr>\n            </tbody>\n          </table>\n\n          <div class=\"grid-2\">\n            <div class=\"form-group\">\n              <label class=\"form-label\">Centre in which son/daughter appearing for SSLC/+1/+2 in Mar/Apr-2027 (1)</label>\n              <input type=\"text\" id=\"ebsF3ChildCentre1\" class=\"form-control\" placeholder=\"இல்லையெனில் NIL\">\n            </div>\n            <div class=\"form-group\">\n              <label class=\"form-label\">Centre in which son/daughter appearing for SSLC/+1/+2 in Mar/Apr-2027 (2)</label>\n              <input type=\"text\" id=\"ebsF3ChildCentre2\" class=\"form-control\" placeholder=\"இல்லையெனில் NIL\">\n            </div>\n          </div>\n\n          <div class=\"grid-2\">\n            <div class=\"form-group\">\n              <label class=\"form-label\">If Differently abled Specify – Details (Enclose Certificate Copy)</label>\n              <input type=\"text\" id=\"ebsF3DiffAbled\" class=\"form-control\" placeholder=\"No / Specify Percentage &amp; Type\">\n            </div>\n            <div class=\"form-group\">\n              <label class=\"form-label\">If any Long Leave (Maternity / ML / Others with Date)</label>\n              <input type=\"text\" id=\"ebsF3LongLeave\" class=\"form-control\" placeholder=\"No / Mention Leave Type &amp; Dates\">\n            </div>\n          </div>\n\n          <div class=\"grid-2\">\n            <div class=\"form-group\">\n              <label class=\"form-label\">Remarks (குறிப்புரை)</label>\n              <input type=\"text\" id=\"ebsF3Remarks\" class=\"form-control\" placeholder=\"Any other remarks\">\n            </div>\n            <div class=\"form-group\">\n              <label class=\"form-label\">Preferred Valuation Camp 2026-27 <span class=\"required\">*</span></label>\n              <select id=\"ebsF3PrefCamp\" class=\"form-control\" required>\n                <option value=\"Sivagangai\">☑️ Sivagangai (சிவகங்கை)</option>\n                <option value=\"Karaikudi / Devakottai\">☑️ Karaikudi / Devakottai (காரைக்குடி / தேவகோட்டை)</option>\n              </select>\n            </div>\n          </div>\n\n          <div style=\"display:flex; justify-content:flex-end; gap:10px;\">\n            <button type=\"submit\" class=\"btn btn-primary\" id=\"ebsF3SubmitBtn\">💾 ஆசிரியர் சுயவிவரத்தை FORM – III பட்டியலில் சேமி (Save Teacher Profile)</button>\n            <button type=\"button\" class=\"btn btn-outline\" id=\"ebsF3CancelEditBtn\" onclick=\"cancelEbsF3Edit()\" style=\"display:none; margin-left:8px; font-weight:800;\">❌ திருத்தத்தை ரத்து செய் (Cancel)</button>\n          </div>\n        </form>\n\n              </div>\n\n      <!-- =============================================================== -->\n      <!-- EBS SUB-PANE 4: FORM - IV (NON-TEACHING STAFF PROFILE)          -->\n      <!-- =============================================================== -->\n      <div id=\"ebsSubPaneF4\" class=\"ebs-sheet-box\" style=\"display:none;\">\n        <div class=\"ebs-official-header\">\n          <div class=\"ebs-pill-title\">FORM – IV</div>\n          <div style=\"text-align:center; flex:1;\">\n            <div style=\"font-weight:900; font-size:1.02rem; color:#0f294a; text-decoration:underline;\">SIVAGANGAI DISTRICT 2026 - 2027 --- NON-TEACHING STAFF PROFILE</div>\n            <div style=\"font-size:0.78rem; font-weight:700; color:#475569;\">(All Type Schools – Include Matric &amp; Self Finance Schools) | School: <span id=\"ebsF4SchoolNameLabel\" style=\"color:#1d4ed8;\">-</span></div>\n          </div>\n          <div class=\"ebs-uno-box-wrap\">\n            <span class=\"ebs-uno-label\">School Unique Number</span>\n            <span class=\"ebs-uno-digit\" id=\"ebsF4UNoD1\">1</span>\n            <span class=\"ebs-uno-digit\" id=\"ebsF4UNoD2\">0</span>\n            <span class=\"ebs-uno-digit\" id=\"ebsF4UNoD3\">1</span>\n          </div>\n        </div>\n\n                <div style=\"background:#ecfdf5; border:1.5px solid #10b981; border-radius:10px; padding:12px 16px; margin-bottom:14px; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px;\">\n          <div>\n            <div style=\"font-weight:900; color:#065f46; font-size:0.92rem;\">✅ Teacher Master (EMIS) பதிவேட்டிலிருந்து உங்கள் பள்ளியின் அலுவலகப் பணியாளர்கள் விவரம் கீழே இணைக்கப்பட்டுள்ளது!</div>\n            <div style=\"font-size:0.8rem; color:#047857;\">பட்டியலில் உள்ள <strong>\"✏️ திருத்து / பூர்த்தி செய்\"</strong> பொத்தானை அழுத்தியோ அல்லது வலதுபுறம் உள்ள பட்டியலில் பணியாளரைத் தேர்ந்தெடுத்தோ விடுபட்ட விவரங்களைப் பூர்த்தி செய்யலாம்.</div>\n          </div>\n          <div style=\"display:flex; align-items:center; gap:8px; flex-wrap:wrap;\">\n            <label style=\"font-weight:800; font-size:0.82rem; color:#065f46;\">👤 பணியாளரைத் தேர்ந்தெடுக்க:</label>\n            <select id=\"ebsF4QuickSelect\" class=\"form-control\" style=\"width:auto; min-width:240px; padding:6px 10px; font-weight:800; border-color:#10b981;\" onchange=\"if(this.value) editEbsForm4NonTeach(this.value)\"></select>\n          </div>\n        </div>\n<div style=\"background:#f0fdf4; border-left:5px solid #15803d; padding:10px 14px; border-radius:8px; margin-bottom:12px; font-size:0.84rem; color:#14532d;\">\n          💡 <strong>வழிமுறை:</strong> கீழே உள்ள பட்டியலில் உங்கள் பள்ளியின் அலுவலகம் மற்றும் ஆசிரியரல்லாத பணியாளர்கள் விவரம் EMIS பதிவேட்டிலிருந்து முன்கூட்டியே நிரப்பப்பட்டுள்ளது. <strong>\"✏️ திருத்து / பூர்த்தி செய்\"</strong> பொத்தானை அழுத்தி விடுபட்ட விவரங்களை (தமிழ் பெயர், கைபேசி, GPF/CPS, IFHRMS, தேர்வுப் பணி) மட்டும் பூர்த்தி செய்யவும். பணியாளரை நீக்க வேண்டுமெனில் <strong>\"🗑️ நீக்கக் கோரிக்கை (Delete Request)\"</strong> பொத்தானைப் பயன்படுத்தவும்.\n        </div>\n        <div class=\"panel-title\">\n          <span>📋 பள்ளியின் ஆசிரியரல்லாத பணியாளர்கள் பட்டியல் (FORM – IV Pre-filled Non-Teaching List)</span>\n          <button type=\"button\" class=\"btn btn-outline btn-sm\" onclick=\"printEbsForms('F4')\">🖨️ அனைத்து பணியாளர்களின் FORM – IV படிவங்களை அச்சிடுக (A4 Print)</button>\n        </div>\n        <!-- EBS v2.0 Form-IV Instant Search, Completion Filter & Card Toggle -->\n        <div class=\"ebs-filter-toolbar\">\n          <div style=\"display:flex; gap:8px; flex-wrap:wrap; flex:1; align-items:center;\">\n            <input type=\"text\" id=\"ebsF4SearchInput\" class=\"form-control\" style=\"max-width:280px; min-height:38px !important; padding:6px 12px !important; font-size:0.9rem !important;\" placeholder=\"🔍 பணியாளர் பெயர் / EMIS / பதவி தேடுக...\" oninput=\"filterEbsForm4Table()\">\n            <select id=\"ebsF4FilterStatus\" class=\"form-control\" style=\"width:auto; min-height:38px !important; padding:6px 10px !important; font-size:0.88rem !important;\" onchange=\"filterEbsForm4Table()\">\n              <option value=\"ALL\">அனைத்துப் பணியாளர்கள் (All Staff)</option>\n              <option value=\"INCOMPLETE\">⚠️ விடுபட்ட விவரம் உள்ளவர்கள் (Incomplete Only)</option>\n              <option value=\"COMPLETE\">✅ முழுமையான பதிவுகள் (Completed Only)</option>\n            </select>\n            <span id=\"ebsF4FilterStatsBadge\" style=\"font-size:0.82rem; font-weight:800; color:#0f766e;\"></span>\n          </div>\n          <button type=\"button\" class=\"btn btn-outline btn-sm\" id=\"ebsF4ToggleCardsBtn\" onclick=\"toggleEbsCardsPreview('F4')\">🃏 அனைத்து சுயவிவர அட்டைகள் காட்டு / மறை</button>\n        </div>\n        <div class=\"table-wrap\">\n          <table class=\"data-table\">\n            <thead>\n              <tr>\n                <th>வ.எண்</th>\n                <th>பணியாளர் பெயர் (English &amp; தமிழ்)</th>\n                <th>பதவி (Designation)</th>\n                <th>EMIS ID &amp; GPF/CPS</th>\n                <th>நியமனத் தன்மை &amp; பணியில் சேர்ந்த நாள்</th>\n                <th>கைபேசி</th>\n                <th>செயல்கள் (Print / Edit / Delete)</th>\n              </tr>\n            </thead>\n            <tbody id=\"ebsF4NonTeachListTbody\"></tbody>\n          </table>\n        </div>\n        <div id=\"ebsF4AllCardsPreview\" style=\"margin-top:14px;\"></div>\n        <div style=\"margin-top:18px;\"></div>\n        <form onsubmit=\"saveEbsForm4NonTeachSubmit(event)\" style=\"background:#f8fafc; border:1.5px solid #94a3b8; border-radius:10px; padding:16px; margin-bottom:18px;\">\n          <div style=\"display:flex; justify-content:space-between; align-items:center; margin-bottom:12px; border-bottom:1.5px solid #cbd5e1; padding-bottom:8px;\">\n            <span style=\"font-weight:900; color:#0f294a; font-size:0.96rem;\" id=\"ebsF4FormTitle\">➕ ஆசிரியரல்லாத பணியாளர் சுயவிவரம் சேர்க்க (Add Non-Teaching Staff for FORM-IV)</span>\n            <button type=\"button\" class=\"btn btn-outline btn-sm\" onclick=\"resetEbsForm4Inputs()\">🧹 புதிய பதிவு (Clear Form)</button>\n          </div>\n          <input type=\"hidden\" id=\"ebsF4EditId\" value=\"\">\n\n          <div class=\"grid-4\">\n            <div class=\"form-group\">\n              <label class=\"form-label\">Name of the Employee (In English) <span class=\"required\">*</span></label>\n              <input type=\"text\" id=\"ebsF4NameEn\" class=\"form-control\" placeholder=\"Name in English\" required>\n            </div>\n            <div class=\"form-group\">\n              <label class=\"form-label\">Name of the Employee (தமிழில்) <span class=\"required\">*</span></label>\n              <input type=\"text\" id=\"ebsF4NameTa\" class=\"form-control\" placeholder=\"பெயர் தமிழில்\" required>\n            </div>\n            <div class=\"form-group\">\n              <label class=\"form-label\">Designation (பதவி) <span class=\"required\">*</span></label>\n              <select id=\"ebsF4Desig\" class=\"form-control\" required></select>\n            </div>\n            <div class=\"form-group\">\n              <label class=\"form-label\">Gender (பாலினம்)</label>\n              <select id=\"ebsF4Gender\" class=\"form-control\">\n                <option value=\"Male\">Male (ஆண்)</option>\n                <option value=\"Female\">Female (பெண்)</option>\n              </select>\n            </div>\n          </div>\n\n          <div class=\"grid-4\">\n            <div class=\"form-group\">\n              <label class=\"form-label\">EMIS ID</label>\n              <input type=\"text\" id=\"ebsF4EmisId\" class=\"form-control\" maxlength=\"12\" placeholder=\"EMIS ID\">\n            </div>\n            <div class=\"form-group\">\n              <label class=\"form-label\">GPF / CPS Number</label>\n              <input type=\"text\" id=\"ebsF4GpfCps\" class=\"form-control\" placeholder=\"GPF / CPS No.\">\n            </div>\n            <div class=\"form-group\">\n              <label class=\"form-label\">Date of Birth <span class=\"required\">*</span></label>\n              <input type=\"date\" id=\"ebsF4Dob\" class=\"form-control\" required>\n            </div>\n            <div class=\"form-group\">\n              <label class=\"form-label\">Date of Join in Govt. Service</label>\n              <input type=\"date\" id=\"ebsF4DojService\" class=\"form-control\">\n            </div>\n          </div>\n\n          <div class=\"grid-3\">\n            <div class=\"form-group\">\n              <label class=\"form-label\">Nature of Present Post</label>\n              <select id=\"ebsF4Nature\" class=\"form-control\">\n                <option value=\"Regular\">Regular (Govt. Salaried)</option>\n                <option value=\"Contract\">Contract (Self Finance / Management Staff)</option>\n              </select>\n            </div>\n            <div class=\"form-group\">\n              <label class=\"form-label\">Date of Join In Present Post</label>\n              <input type=\"date\" id=\"ebsF4DojPresPost\" class=\"form-control\">\n            </div>\n            <div class=\"form-group\">\n              <label class=\"form-label\">Date of Join in Present School</label>\n              <input type=\"date\" id=\"ebsF4DojPresSchool\" class=\"form-control\">\n            </div>\n          </div>\n\n          <div class=\"grid-4\">\n            <div class=\"form-group\">\n              <label class=\"form-label\">Mobile Number (WhatsApp) <span class=\"required\">*</span></label>\n              <input type=\"tel\" id=\"ebsF4Mobile\" class=\"form-control\" maxlength=\"10\" required>\n            </div>\n            <div class=\"form-group\">\n              <label class=\"form-label\">Alternate Mobile No.</label>\n              <input type=\"tel\" id=\"ebsF4AltMobile\" class=\"form-control\" maxlength=\"10\">\n            </div>\n            <div class=\"form-group\">\n              <label class=\"form-label\">Present Residential Place</label>\n              <input type=\"text\" id=\"ebsF4ResPlace\" class=\"form-control\" placeholder=\"Place\">\n            </div>\n            <div class=\"form-group\">\n              <label class=\"form-label\">District &amp; IFHRMS ID</label>\n              <div style=\"display:flex; gap:4px;\">\n                <input type=\"text\" id=\"ebsF4ResDist\" class=\"form-control\" value=\"Sivagangai\" style=\"width:48%;\">\n                <input type=\"text\" id=\"ebsF4Ifhrms\" class=\"form-control\" placeholder=\"IFHRMS ID\" style=\"width:52%;\">\n              </div>\n            </div>\n          </div>\n\n          <!-- 2026-27 Exam Duty Table -->\n          <div style=\"font-weight:800; font-size:0.84rem; color:#0f294a; margin:8px 0 6px;\">2026-27 Exam Duty Details (தேர்வுப் பணி விவரம்):</div>\n          <table class=\"ebs-grid-table ebs-mobile-duty-table\" style=\"margin-bottom:12px;\">\n            <thead>\n              <tr>\n                <th style=\"width:20%;\">2026-27 Exam Duty</th>\n                <th style=\"width:32%;\">Nature of Work</th>\n                <th>Name of the Exam Centre / Valuation Camp</th>\n              </tr>\n            </thead>\n            <tbody>\n              <tr>\n                <td class=\"ebs-duty-title-cell\" style=\"font-weight:900;\">📋 SSLC (10-ம் வகுப்பு பொதுத்தேர்வுப் பணி)</td>\n                <td data-label=\"Nature of Work (பணியின் தன்மை)\"><select id=\"ebsF4DutySslcWork\" class=\"form-control\" style=\"padding:9px 12px; font-size:1.08rem;\"></select></td>\n                <td data-label=\"Name of the Exam Centre / Valuation Camp (தேர்வு மையம் / முகாம் பெயர்)\"><input type=\"text\" id=\"ebsF4DutySslcCentre\" class=\"form-control\" style=\"padding:9px 12px; font-size:1.08rem;\" placeholder=\"SSLC Exam Centre Name\"></td>\n              </tr>\n              <tr>\n                <td class=\"ebs-duty-title-cell\" style=\"font-weight:900;\">📋 HSC (+1 / +2 பொதுத்தேர்வுப் பணி)</td>\n                <td data-label=\"Nature of Work (பணியின் தன்மை)\"><select id=\"ebsF4DutyHscWork\" class=\"form-control\" style=\"padding:9px 12px; font-size:1.08rem;\"></select></td>\n                <td data-label=\"Name of the Exam Centre / Valuation Camp (தேர்வு மையம் / முகாம் பெயர்)\"><input type=\"text\" id=\"ebsF4DutyHscCentre\" class=\"form-control\" style=\"padding:9px 12px; font-size:1.08rem;\" placeholder=\"HSC Exam Centre Name\"></td>\n              </tr>\n              <tr>\n                <td class=\"ebs-duty-title-cell\" style=\"font-weight:900;\">📋 Valuation Camp (விடைத்தாள் திருத்தும் முகாம் பணி)</td>\n                <td data-label=\"Nature of Work (பணியின் தன்மை)\"><select id=\"ebsF4DutyCampWork\" class=\"form-control\" style=\"padding:9px 12px; font-size:1.08rem;\"></select></td>\n                <td data-label=\"Name of the Exam Centre / Valuation Camp (முகாம் பெயர்)\"><input type=\"text\" id=\"ebsF4DutyCampCentre\" class=\"form-control\" style=\"padding:9px 12px; font-size:1.08rem;\" placeholder=\"Valuation Camp Name\"></td>\n              </tr>\n            </tbody>\n          </table>\n\n          <div class=\"grid-2\">\n            <div class=\"form-group\">\n              <label class=\"form-label\">Centre in which son/daughter appearing for SSLC/+2 in Mar/Apr-2027 (1)</label>\n              <input type=\"text\" id=\"ebsF4ChildCentre1\" class=\"form-control\" placeholder=\"இல்லையெனில் NIL\">\n            </div>\n            <div class=\"form-group\">\n              <label class=\"form-label\">Centre in which son/daughter appearing for SSLC/+2 in Mar/Apr-2027 (2)</label>\n              <input type=\"text\" id=\"ebsF4ChildCentre2\" class=\"form-control\" placeholder=\"இல்லையெனில் NIL\">\n            </div>\n          </div>\n\n          <div class=\"grid-3\">\n            <div class=\"form-group\">\n              <label class=\"form-label\">If Differently abled Specify - Details</label>\n              <input type=\"text\" id=\"ebsF4DiffAbled\" class=\"form-control\" placeholder=\"No / Specify\">\n            </div>\n            <div class=\"form-group\">\n              <label class=\"form-label\">If any Long Leave (Maternity/ ML / Others with Date)</label>\n              <input type=\"text\" id=\"ebsF4LongLeave\" class=\"form-control\" placeholder=\"No / Specify\">\n            </div>\n            <div class=\"form-group\">\n              <label class=\"form-label\">Any other remarks</label>\n              <input type=\"text\" id=\"ebsF4Remarks\" class=\"form-control\" placeholder=\"Remarks\">\n            </div>\n          </div>\n\n          <div style=\"display:flex; justify-content:flex-end;\">\n            <button type=\"submit\" class=\"btn btn-primary\" id=\"ebsF4SubmitBtn\">💾 பணியாளர் சுயவிவரத்தை FORM – IV பட்டியலில் சேமி (Save Non-Teaching Profile)</button>\n            <button type=\"button\" class=\"btn btn-outline\" id=\"ebsF4CancelEditBtn\" onclick=\"cancelEbsF4Edit()\" style=\"display:none; margin-left:8px; font-weight:800;\">❌ திருத்தத்தை ரத்து செய் (Cancel)</button>\n          </div>\n        </form>\n\n              </div>\n\n    ";
const EBS_ADM_DEL_TEMPLATE = "\n      <div class=\"panel-title\">\n        <span>🗑️ பள்ளிகளிலிருந்து பெறப்பட்ட ஆசிரியர் &amp; பணியாளர் நீக்கக் கோரிக்கைகள் ஒப்புதல் மேலாண்மை (Staff Delete Requests Approval)</span>\n        <div style=\"display:flex; gap:8px; flex-wrap:wrap;\">\n          <select id=\"admDelReqStatusFilter\" class=\"form-control\" style=\"width:auto; padding:5px 10px; font-size:0.82rem; font-weight:800;\" onchange=\"renderAdminDeleteRequestsTable()\">\n            <option value=\"PENDING\">⏳ ஒப்புதல் நிலுவையில் உள்ளவை (Pending Approval)</option>\n            <option value=\"ALL\">அனைத்துக் கோரிக்கைகள் (All Requests)</option>\n            <option value=\"APPROVED\">✅ ஒப்புதல் அளிக்கப்பட்டு நீக்கப்பட்டவை (Approved &amp; Deleted)</option>\n            <option value=\"REJECTED\">❌ நிராகரிக்கப்பட்டவை (Rejected)</option>\n          </select>\n          <input type=\"text\" id=\"admDelReqSearchInput\" class=\"form-control\" style=\"width:240px; padding:5px 10px; font-size:0.82rem;\" placeholder=\"பள்ளி U.No, பெயர், EMIS தேடுக...\" oninput=\"renderAdminDeleteRequestsTable()\">\n          <button type=\"button\" class=\"btn btn-outline btn-sm\" onclick=\"exportDeleteRequestsCsv()\">📥 நீக்கக் கோரிக்கைகள் CSV</button>\n        </div>\n      </div>\n\n      <div style=\"background:#fffbeb; border-left:5px solid #f59e0b; padding:10px 14px; border-radius:8px; margin-bottom:14px; font-size:0.84rem; color:#78350f;\">\n        🛡️ <strong>மாவட்ட நிர்வாகி ஒப்புதல் விதிமுறை:</strong> பள்ளிகள் தங்களின் FORM-III (ஆசிரியர்கள்) மற்றும் FORM-IV (அலுவலகப் பணியாளர்கள்) பட்டியலிலிருந்து ஒருவரை நீக்க வேண்டுமெனில் காரணத்துடன் இங்கு கோரிக்கை அனுப்புவார்கள். மாவட்ட நிர்வாகி <strong>\"✅ ஒப்புதல் அளித்து நீக்கு (Approve &amp; Delete)\"</strong> பொத்தானை அழுத்தினால் மட்டுமே சம்பந்தப்பட்ட பள்ளியின் பட்டியலிலிருந்து அப்பணியாளர் விவரம் நீக்கப்படும். <strong>\"❌ நிராகரி (Reject)\"</strong> செய்தால் அப்பணியாளர் பள்ளியின் பட்டியலிலேயே தொடர்வார்.\n      </div>\n\n      <div class=\"table-wrap\">\n        <table class=\"data-table\">\n          <thead>\n            <tr>\n              <th>கோரிக்கை எண் &amp; நாள்</th>\n              <th>பள்ளி விவரம் (U.NO / UDISE)</th>\n              <th>படிவம் &amp; வகை</th>\n              <th>ஆசிரியர் / பணியாளர் பெயர் &amp; பதவி</th>\n              <th>EMIS ID</th>\n              <th>பள்ளி பதிவு செய்த நீக்கக் காரணம் (Reason)</th>\n              <th>நிலை (Status)</th>\n              <th>மாவட்ட நிர்வாகி நடவடிக்கை (Approve / Reject)</th>\n            </tr>\n          </thead>\n          <tbody id=\"admDeleteRequestsTbody\"></tbody>\n        </table>\n      </div>\n    ";
const EBS_ADM_MONITOR_TEMPLATE = "\n      <div class=\"panel-title\">\n        <span>📋 EBS_2026_27 மாவட்ட அளவிலான படிவங்கள் (FORM I - IV) பதிவு நிலை &amp; தொகுப்பு அறிக்கை</span>\n        <div style=\"display:flex; gap:8px; flex-wrap:wrap;\">\n          <button type=\"button\" class=\"btn btn-success btn-sm\" onclick=\"exportAdminEbsCsv('F1')\">📥 Form-I &amp; II CSV பதிவிறக்கம்</button>\n          <button type=\"button\" class=\"btn btn-primary btn-sm\" onclick=\"exportAdminEbsCsv('F3')\">📥 Form-III (Teachers) CSV</button>\n          <button type=\"button\" class=\"btn btn-secondary btn-sm\" onclick=\"exportAdminEbsCsv('F4')\">📥 Form-IV (Non-Teaching) CSV</button>\n        </div>\n      </div>\n      <!-- EBS 2026-27 Master On/Off Switch & Live Status Banner -->\n      <div class=\"ebs-admin-control-box\" style=\"background:#f8fafc; border:2px solid #cbd5e1; border-radius:10px; padding:14px 18px; margin-bottom:14px; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:14px; box-shadow:0 4px 12px rgba(15,23,42,0.06);\">\n        <div style=\"display:flex; align-items:center; gap:12px;\">\n          <span style=\"font-size:2rem;\" id=\"admEbsControlEmoji\">🔒</span>\n          <div>\n            <div style=\"font-size:1.02rem; font-weight:900; color:#0f294a;\" id=\"admEbsStatusTitle\">EBS_2026_27 பள்ளிப் பதிவு நிலை: <span style=\"color:#dc2626;\">🔒 OFF (முடக்கப்பட்டுள்ளது / View &amp; Download Only)</span></div>\n            <div style=\"font-size:0.84rem; color:#475569; margin-top:2px;\" id=\"admEbsStatusDesc\">பள்ளிகள் EBS விவரங்களைப் பார்வையிட மற்றும் பதிவிறக்க/அச்சிட மட்டுமே அனுமதிக்கப்பட்டுள்ளன. சேர்க்கை மற்றும் திருத்தங்கள் செய்ய அனுமதி இல்லை.</div>\n          </div>\n        </div>\n        <div style=\"display:flex; align-items:center; gap:10px; flex-wrap:wrap;\">\n          <button type=\"button\" id=\"admEbsToggleMainBtn\" class=\"btn btn-success btn-sm\" onclick=\"toggleEbsModuleStatus()\" style=\"font-weight:900; padding:9px 18px;\">\n            🟢 பள்ளி சேர்க்கை &amp; திருத்தங்களை இயக்கு (Turn ON)\n          </button>\n        </div>\n      </div>\n\n      <!-- EBS 2026-27 Deadline Configuration Box (கடைசி நாள் நிர்ணயம்) -->\n      <div style=\"background:#ffffff; border:2px solid #cbd5e1; border-radius:10px; padding:14px 18px; margin-bottom:14px; box-shadow:0 4px 12px rgba(15,23,42,0.04);\">\n        <div style=\"display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px; margin-bottom:10px;\">\n          <div>\n            <div style=\"font-size:0.96rem; font-weight:900; color:#0f294a; display:flex; align-items:center; gap:8px;\">\n              <span style=\"font-size:1.2rem;\">⏰</span> பள்ளிகள் EBS விவரங்களை பதிவு &amp; திருத்தம் செய்வதற்கான கடைசி நாள் (Deadline Setting)\n            </div>\n            <div style=\"font-size:0.82rem; color:#64748b; margin-top:2px;\">\n              நிர்வாகியால் நிர்ணயிக்கப்படும் இந்த தேதிக்குப் பிறகு, பள்ளிகளுக்கான சேர்க்கை மற்றும் திருத்தங்கள் தானாக முடக்கப்படும் (பார்வை மற்றும் அச்சு மட்டுமே இயங்கும்).\n            </div>\n          </div>\n        </div>\n        <div style=\"display:flex; gap:10px; align-items:center; flex-wrap:wrap; background:#f8fafc; border:1px solid #e2e8f0; border-radius:8px; padding:10px 14px;\">\n          <label style=\"font-size:0.84rem; font-weight:800; color:#334155;\">கடைசி நாள் (Date):</label>\n          <input type=\"date\" id=\"admEbsLastDateInput\" class=\"form-control\" style=\"width:auto; min-width:160px; padding:6px 10px; font-size:0.86rem; font-weight:700;\">\n          <label style=\"font-size:0.84rem; font-weight:800; color:#334155;\">நேரம் (Time):</label>\n          <input type=\"time\" id=\"admEbsLastTimeInput\" class=\"form-control\" style=\"width:auto; min-width:110px; padding:6px 10px; font-size:0.86rem; font-weight:700;\" value=\"17:00\">\n          <button type=\"button\" class=\"btn btn-primary btn-sm\" onclick=\"saveEbsDeadlineSubmit()\" style=\"font-weight:800; padding:7px 16px;\">\n            💾 கடைசி தேதியைச் சேமி (Set Deadline)\n          </button>\n          <button type=\"button\" class=\"btn btn-outline btn-sm\" onclick=\"clearEbsDeadlineSubmit()\" style=\"font-weight:700; color:#dc2626; border-color:#fca5a5; background:#fff;\">\n            ❌ காலக்கெடுவை நீக்கு (Clear)\n          </button>\n        </div>\n        <div id=\"admEbsDeadlineStatusText\" style=\"margin-top:8px; font-size:0.85rem; font-weight:700;\"></div>\n      </div>\n      <div class=\"ebs-filter-toolbar\" style=\"margin-bottom:12px;\">\n        <div style=\"display:flex; gap:8px; flex-wrap:wrap; flex:1; align-items:center;\">\n          <input type=\"text\" id=\"admEbsSearchInput\" class=\"form-control\" style=\"width:220px; padding:6px 10px; font-size:0.84rem;\" placeholder=\"🔍 U.NO / UDISE / பள்ளி தேடுக...\" oninput=\"renderAdminEbsMonitorTable()\">\n          <select id=\"admEbsBlockFilter\" class=\"form-control\" style=\"width:auto; padding:6px 10px; font-size:0.84rem;\" onchange=\"renderAdminEbsMonitorTable()\">\n            <option value=\"\">அனைத்து ஒன்றியங்கள் (All Blocks)</option>\n          </select>\n          <select id=\"admEbsMgmtFilter\" class=\"form-control\" style=\"width:auto; padding:6px 10px; font-size:0.84rem;\" onchange=\"renderAdminEbsMonitorTable()\">\n            <option value=\"\">அனைத்து நிர்வாகம் (1G/2A/3P)</option>\n            <option value=\"1G\">1G - அரசுப் பள்ளிகள்</option>\n            <option value=\"2A\">2A - அரசு உதவிபெறும் பள்ளிகள்</option>\n            <option value=\"3P\">3P - தனியார் பள்ளிகள்</option>\n          </select>\n          <select id=\"admEbsLevelFilter\" class=\"form-control\" style=\"width:auto; padding:6px 10px; font-size:0.84rem;\" onchange=\"renderAdminEbsMonitorTable()\">\n            <option value=\"\">அனைத்து வகை (HSS / HS)</option>\n            <option value=\"HSS\">HSS (மேல்நிலை)</option>\n            <option value=\"HS\">HS (உயர்நிலை)</option>\n          </select>\n        </div>\n        <div id=\"admEbsSummaryBar\" style=\"font-size:0.82rem; font-weight:800; color:#0f294a;\"></div>\n      </div>\n      <div class=\"table-wrap\">\n        <table class=\"data-table\">\n          <thead>\n            <tr>\n              <th>U.NO</th>\n              <th>UDISE</th>\n              <th>பள்ளியின் பெயர் &amp; ஒன்றியம்</th>\n              <th>பிரிவு</th>\n              <th>FORM-I (Profile)</th>\n              <th>FORM-II (+2 Sub)</th>\n              <th>FORM-III (Teachers)</th>\n              <th>FORM-IV (Non-Teaching)</th>\n              <th>செயல்கள் (Inspect / Print)</th>\n            </tr>\n          </thead>\n          <tbody id=\"admEbsMonitorTbody\"></tbody>\n        </table>\n      </div>\n    ";
const EBS_DEL_MODAL_TEMPLATE = "\n  <div class=\"modal-card\" style=\"max-width:580px; border-top:6px solid #dc2626;\">\n    <div class=\"modal-header\">\n      <div class=\"modal-title\" style=\"color:#991b1b;\">🗑️ ஆசிரியர் / பணியாளர் விவரம் நீக்கக் கோரிக்கை (Delete Request to District Admin)</div>\n      <button type=\"button\" class=\"btn btn-outline btn-sm\" onclick=\"closeDeleteRequestModal()\">✕ மூடுக</button>\n    </div>\n    <div style=\"background:#fef2f2; border:1px solid #fecaca; border-radius:8px; padding:10px 12px; margin-bottom:14px; font-size:0.84rem; color:#7f1d1d;\">\n      ⚠️ <strong>முக்கியக் குறிப்பு:</strong> பள்ளிகள் நேரடியாக ஆசிரியர் அல்லது அலுவலகப் பணியாளர் விவரங்களை நீக்க இயலாது. கீழே நீக்குவதற்கான காரணத்தைப் பதிவு செய்து அனுப்பினால், அது <strong>மாவட்ட நிர்வாகி முகப்பிற்கு (CEO Admin Portal)</strong> அனுப்பப்படும். மாவட்ட நிர்வாகம் ஒப்புதல் அளித்தவுடன் மட்டுமே இப்பதிவு நீக்கப்படும்.\n    </div>\n    <form onsubmit=\"submitStaffDeleteRequest(event)\">\n      <input type=\"hidden\" id=\"delReqFormType\" value=\"\">\n      <input type=\"hidden\" id=\"delReqStaffId\" value=\"\">\n      <div style=\"background:#f8fafc; border:1px solid #cbd5e1; border-radius:8px; padding:10px 12px; margin-bottom:14px; font-size:0.85rem;\" id=\"delReqStaffSummaryBox\"></div>\n\n      <div class=\"form-group\">\n        <label class=\"form-label\">நீக்குவதற்கான முதன்மைக் காரணம் (Reason Category) <span class=\"required\">*</span></label>\n        <select id=\"delReqReasonCategory\" class=\"form-control\" required>\n          <option value=\"\">-- காரணத்தைத் தேர்ந்தெடுக்கவும் --</option>\n          <option value=\"மாறுதல் (Transfer to another School)\">1. மாறுதல் (Transfer to another School / District)</option>\n          <option value=\"பணி ஓய்வு / விருப்ப ஓய்வு (Retirement / VRS)\">2. பணி ஓய்வு / விருப்ப ஓய்வு (Retirement / VRS)</option>\n          <option value=\"பதவி உயர்வு மாறுதல் (Promotion Transfer)\">3. பதவி உயர்வு மாறுதல் (Promotion to another School)</option>\n          <option value=\"மாற்றுப் பணி / அயற்பணி (Deputation)\">4. மாற்றுப் பணி / அயற்பணி (Deputation)</option>\n          <option value=\"பணி விலகல் / பணியிலிருந்து விடுவிப்பு (Resignation / Relieved)\">5. பணி விலகல் / பணியிலிருந்து விடுவிப்பு (Resignation / Relieved)</option>\n          <option value=\"மறைவு (Demise / Death)\">6. மறைவு (Demise)</option>\n          <option value=\"இரட்டைப் பதிவு / தவறான பள்ளிப் பதிவு (Duplicate / Wrong School Entry)\">7. இரட்டைப் பதிவு / வேறு பள்ளிப் பணியாளர் (Duplicate / Wrong School Entry)</option>\n          <option value=\"பிற காரணங்கள் (Other Reasons)\">8. பிற காரணங்கள் (Other Reasons)</option>\n        </select>\n      </div>\n\n      <div class=\"form-group\">\n        <label class=\"form-label\">விரிவான காரணம் / ஆணை எண் &amp; நாள் / மாறுதல் சென்ற பள்ளி விவரம் <span class=\"required\">*</span></label>\n        <textarea id=\"delReqReasonDetail\" class=\"form-control\" rows=\"3\" placeholder=\"எ.கா: முதன்மைக் கல்வி அலுவலர் செயல்முறைகள் ந.க.எண்... நாள்...ன்படி அரசு மேல்நிலைப்பள்ளி ...க்கு மாறுதல் / 31.05.2026 அன்று பணி ஓய்வு...\" required></textarea>\n      </div>\n\n      <div style=\"display:flex; justify-content:flex-end; gap:10px; margin-top:14px;\">\n        <button type=\"button\" class=\"btn btn-outline\" onclick=\"closeDeleteRequestModal()\">ரத்து செய்</button>\n        <button type=\"submit\" class=\"btn btn-danger\">📤 நீக்கக் கோரிக்கையை மாவட்ட நிர்வாகிக்கு அனுப்புக (Submit Delete Request)</button>\n      </div>\n    </form>\n  </div>\n";

function mountEbsModuleDOM() {
  const schPane = document.getElementById("schPaneEbs");
  if (schPane && !schPane.querySelector("#ebsSubPaneF1")) {
    schPane.innerHTML = EBS_SCH_PANE_TEMPLATE;
  }
  const admDel = document.getElementById("admPaneDeleteReqs");
  if (admDel && !admDel.querySelector("#admDeleteRequestsTbody")) {
    admDel.innerHTML = EBS_ADM_DEL_TEMPLATE;
  }
  const admEbs = document.getElementById("admPaneEbs");
  if (admEbs && !admEbs.querySelector("#admEbsMonitorTbody")) {
    admEbs.innerHTML = EBS_ADM_MONITOR_TEMPLATE;
  }
  const delMod = document.getElementById("deleteRequestModal");
  if (delMod && !delMod.querySelector("#delReqFormType")) {
    delMod.innerHTML = EBS_DEL_MODAL_TEMPLATE;
  }
  updateAllEbsControlUI();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", mountEbsModuleDOM);
} else {
  mountEbsModuleDOM();
}

  // =========================================================================
  // 8. EBS_2026_27 MODULE ENGINE (FORM-I, FORM-II, FORM-III, FORM-IV)
  // =========================================================================
  const EBS_F1_TEACH_COLS = [
    { key: "hm", label: "HM" },
    { key: "pg", label: "PG" },
    { key: "comp", label: "Comp. Instru." },
    { key: "phd1", label: "Ph.D Gr-I" },
    { key: "vocHss", label: "Voc Ins. (HSS)" },
    { key: "bt", label: "BT Asst." },
    { key: "phd2", label: "Ph.D G-II" },
    { key: "sgt", label: "SGT" },
    { key: "pet", label: "PET" },
    { key: "spl", label: "Other Spl.Tr." },
    { key: "vocHs", label: "Voc (HS)" }
  ];

  const EBS_F1_NONTEACH_COLS = [
    { key: "asst", label: "Asst." },
    { key: "jrAsst", label: "Jr. Asst" },
    { key: "labAsst", label: "Lab Asst" },
    { key: "rc", label: "RC / R. Asst." },
    { key: "watchman", label: "Watchman" },
    { key: "others", label: "Others" }
  ];

  const EBS_F2_SUBJECTS = [
    { sno: "01", group: "Language", sub: "Tamil", key: "01_Tamil", shadedMedium: true },
    { sno: "", group: "Language", sub: "Hindi", key: "01_Hindi", shadedMedium: true },
    { sno: "", group: "Language", sub: "French", key: "01_French", shadedMedium: true },
    { sno: "", group: "Language", sub: "Sanskrit", key: "01_Sanskrit", shadedMedium: true },
    { sno: "02", group: "", sub: "English", key: "02_English", shadedMedium: true },
    { sno: "03", group: "", sub: "Mathematics", key: "03_Mathematics", shadedMedium: false },
    { sno: "04", group: "", sub: "Physics", key: "04_Physics", shadedMedium: false },
    { sno: "05", group: "", sub: "Chemistry", key: "05_Chemistry", shadedMedium: false },
    { sno: "06", group: "", sub: "Biology", key: "06_Biology", shadedMedium: false },
    { sno: "07", group: "", sub: "Botany", key: "07_Botany", shadedMedium: false },
    { sno: "08", group: "", sub: "Zoology", key: "08_Zoology", shadedMedium: false },
    { sno: "09", group: "", sub: "Computer Science", key: "09_ComputerScience", shadedMedium: false },
    { sno: "10", group: "", sub: "History", key: "10_History", shadedMedium: false },
    { sno: "11", group: "", sub: "Economics", key: "11_Economics", shadedMedium: false },
    { sno: "12", group: "", sub: "Commerce", key: "12_Commerce", shadedMedium: false },
    { sno: "13", group: "", sub: "Accountancy", key: "13_Accountancy", shadedMedium: false },
    { sno: "14", group: "", sub: "Advance Tamil", key: "14_AdvanceTamil", shadedMedium: false },
    { sno: "15", group: "", sub: "Business Maths & Statistics", key: "15_BusinessMaths", shadedMedium: false },
    { sno: "16", group: "", sub: "Microbiology", key: "16_Microbiology", shadedMedium: false },
    { sno: "17", group: "", sub: "Nursing Vocational", key: "17_NursingVocational", shadedMedium: false },
    { sno: "18", group: "", sub: "Computer Applications", key: "18_ComputerApplications", shadedMedium: false },
    { sno: "19", group: "", sub: "Agricultural Science", key: "19_AgriculturalScience", shadedMedium: false },
    { sno: "20", group: "", sub: "Employability Skills", key: "20_EmployabilitySkills", shadedMedium: false },
    { sno: "21", group: "", sub: "Type Writing", key: "21_TypeWriting", shadedMedium: false },
    { sno: "22", group: "", sub: "Accountancy & Audit", key: "22_AccountancyAudit", shadedMedium: false },
    { sno: "23", group: "", sub: "Office Management", key: "23_OfficeManagement", shadedMedium: false },
    { sno: "24", group: "", sub: "BME", key: "24_BME", shadedMedium: false },
    { sno: "25", group: "", sub: "BEE-Electrical", key: "25_BEE_Electrical", shadedMedium: false },
    { sno: "26", group: "", sub: "BEE-Electronics", key: "26_BEE_Electronics", shadedMedium: false },
    { sno: "27", group: "", sub: "Others (Mention Subject)", key: "27_Others", shadedMedium: false, hasOtherName: true }
  ];

  // Map raw EMIS designation & subject to official EBS Form-I / Form-III / Form-IV values
  function mapEmisDesigToEbs(rawDesig, isTeaching, schoolLevel) {
    const d = String(rawDesig || "").toUpperCase().trim();
    if (isTeaching) {
      if (d.includes("PRINCIPAL") && !d.includes("VICE")) return { desig: "PRINCIPAL", f1Col: "hm" };
      if (d.includes("VICE PRINCIPAL")) return { desig: "VICE PRINCIPAL", f1Col: "pg" };
      if (d.includes("HEADTEACHER (HSS)") || d.includes("HEADMASTER (HSS)")) return { desig: "HEADMASTER (HSS)", f1Col: "hm" };
      if (d.includes("HEADTEACHER") || d.includes("HEADMISTRESS") || d.includes("HEADMASTER")) {
        return { desig: schoolLevel === "HSS" ? "HEADMASTER (HSS)" : "HEADMASTER (HS)", f1Col: "hm" };
      }
      if (d.includes("P.G.") || d.includes("PG ") || d.includes("PG CADRE") || d.includes("ACADEMIC COORDINATOR")) {
        return { desig: "PG ASSISTANT", f1Col: "pg" };
      }
      if (d.includes("COMPUTER INSTRUCTOR GRADE I") || d.includes("COMPUTER INSTRCTOR G-I")) {
        return { desig: "COMPUTER INSTRCTOR G-I", f1Col: "comp" };
      }
      if (d.includes("COMPUTER") && (d.includes("GRADE II") || d.includes("G-II"))) {
        return { desig: "COMPUTER INSTRCTOR G-II", f1Col: "comp" };
      }
      if (d.includes("COMPUTER")) {
        return { desig: "Computer Instructor", f1Col: "comp" };
      }
      if ((d.includes("PHYSICAL DIRECTOR") || d.includes("PHY.DIR")) && (d.includes("GRADE-1") || d.includes("GR I") || d.includes("GR-I") || d.includes("GRADE I")) && !d.includes("GR-II") && !d.includes("GRADE-2")) {
        return { desig: "PHY.DIR-GR I", f1Col: "phd1" };
      }
      if (d.includes("PHYSICAL DIRECTOR") || d.includes("PHY.DIR")) {
        return { desig: "PHY.DIR-GR-II", f1Col: "phd2" };
      }
      if (d.includes("VOCATIONAL") || d.includes("NURSING") || d.includes("ELECTRICAL")) {
        if (schoolLevel === "HSS" || d.includes("HSS")) return { desig: "VOCATIONAL INSTRUCTOR (HSS)", f1Col: "vocHss" };
        return { desig: "VOCATIONAL INSTRUCTOR (HS)", f1Col: "vocHs" };
      }
      if (d.includes("BT ") || d.includes("B.T.") || d.includes("GRADUATE TEACHER") || d.includes("TGT")) {
        return { desig: "BT ASSISTANT", f1Col: "bt" };
      }
      if (d.includes("SG ASST") || d.includes("SECONDARY GRADE") || d.includes("PRT") || d.includes("PRIMARY TEACHER") || d.includes("KG ") || d.includes("SGT") || d.includes("KALLAR")) {
        return { desig: "SG ASST", f1Col: "sgt" };
      }
      if (d.includes("PHYSICAL EDUCATION") || d === "PET") {
        return { desig: "PET", f1Col: "pet" };
      }
      if (d.includes("DRAWING")) return { desig: "DRAWING TR", f1Col: "spl" };
      if (d.includes("SEWING")) return { desig: "SEWING TR", f1Col: "spl" };
      if (d.includes("MUSIC")) return { desig: "MUSIC TR", f1Col: "spl" };
      if (d.includes("CRAFT") || d.includes("BOOK BINDING")) return { desig: "CRAFT INSRUCTOR", f1Col: "spl" };
      if (d.includes("WEAVING")) return { desig: "WEAVING INSTRUCTOR", f1Col: "spl" };
      return { desig: rawDesig || "BT ASSISTANT", f1Col: "bt" };
    } else {
      if (d.includes("JUNIOR ASSISTANT") || d.includes("DATA ENTRY") || d.includes("COMPUTER PROGRAMMER") || d.includes("STORE KEEPER")) {
        return { desig: "JUNIOR ASSISTANT", f1Col: "jrAsst" };
      }
      if (d.includes("LAB ASSISTANT") || d.includes("LAB ATTENDER")) {
        return { desig: "LAB ASSISTANT", f1Col: "labAsst" };
      }
      if (d.includes("RECORD ASSISTANT")) {
        return { desig: "RECORD ASSISTANT", f1Col: "rc" };
      }
      if (d.includes("RECORD CLERK")) {
        return { desig: "RECORD CLERK", f1Col: "rc" };
      }
      if (d.includes("WATCHMAN") || d.includes("SECURITY")) {
        return { desig: "WATCHMAN", f1Col: "watchman" };
      }
      if (d === "ASSISTANT" || d.includes("SUPERINTENDENT") || d.includes("ADMINISTRATIVE") || d.includes("ACCOUNT")) {
        return { desig: "ASSISTANT", f1Col: "asst" };
      }
      if (d.includes("OFFICE ASSISTANT")) return { desig: "OFFICE ASSISTANT", f1Col: "others" };
      if (d.includes("LIBRARIAN")) return { desig: "LIBRARIAN", f1Col: "others" };
      if (d.includes("LIBRARY ATTENDER") || d.includes("LIBRARY ASSISTANT")) return { desig: "LIBRARY ATTENDER", f1Col: "others" };
      if (d.includes("TYPIST")) return { desig: "TYPIST", f1Col: "others" };
      if (d.includes("SWEEPER") || d.includes("CLEANER") || d.includes("SANITARY") || d.includes("HOUSE KEEPING")) return { desig: "SWEEPER", f1Col: "others" };
      if (d.includes("SCAVENGER")) return { desig: "SCAVENGER", f1Col: "others" };
      if (d.includes("GARDENER")) return { desig: "GARDENER", f1Col: "others" };
      if (d.includes("WATERMAN")) return { desig: "WATERMAN", f1Col: "others" };
      if (d.includes("COOK")) return { desig: "COOK", f1Col: "others" };
      return { desig: rawDesig || "OFFICE ASSISTANT", f1Col: "others" };
    }
  }

  const VALASAIPATTI_101_TA_MAP = {
    "10214692": { nameTa: "திரு.அ.கண்ணப்பன்", mobile: "9786507092", ifhrms: "93010214692" },
    "10075657": { nameTa: "திரு.ஞான.சுரேஷ்", mobile: "9486507091", ifhrms: "93010075657" },
    "20083601": { nameTa: "திரு.கி.வீரையா", mobile: "9486507093", ifhrms: "93020083601" },
    "10186388": { nameTa: "திருமதி.இர.தங்கசூர்யா", mobile: "9486507094", ifhrms: "93010186388" },
    "10214755": { nameTa: "திருமதி.ரா.பூங்கொடி", mobile: "9486507095", ifhrms: "93010214755" },
    "10214760": { nameTa: "திரு.சு.நாகராஜ்", mobile: "9486507096", ifhrms: "93010214760" },
    "10447376": { nameTa: "திரு.ப.ராமு", mobile: "9486507097", ifhrms: "93010447376", gpfCps: "CPS-10447376" }
  };

  function getRawEmisRowsForSchool(s) {
    if (!s || !EMIS_STAFF_DATA || !EMIS_STAFF_DATA.byUNo) return [];
    const uKey = String(s.uNo || "").replace(/\.0$/, "").trim();
    const uKeyNum = String(Number(uKey));
    if (EMIS_STAFF_DATA.byUNo[uKey] && EMIS_STAFF_DATA.byUNo[uKey].length > 0) return EMIS_STAFF_DATA.byUNo[uKey];
    if (EMIS_STAFF_DATA.byUNo[uKeyNum] && EMIS_STAFF_DATA.byUNo[uKeyNum].length > 0) return EMIS_STAFF_DATA.byUNo[uKeyNum];
    // Fallback by UDISE match across INITIAL_MASTER_SCHOOLS
    const ud = String(s.udiseNo || "").replace(/\.0$/, "").trim();
    if (ud === "33231106101" && EMIS_STAFF_DATA.byUNo["101"]) return EMIS_STAFF_DATA.byUNo["101"];
    const matchSch = INITIAL_MASTER_SCHOOLS.find(item => String(item.udiseNo) === ud);
    if (matchSch && EMIS_STAFF_DATA.byUNo[String(matchSch.uNo)]) return EMIS_STAFF_DATA.byUNo[String(matchSch.uNo)];
    return [];
  }

  function buildEmisSeededStaffForSchool(s) {
    const auth = schoolAuthStore[s.uNo] || {};
    const pool = (EMIS_STAFF_DATA && EMIS_STAFF_DATA.pool) ? EMIS_STAFF_DATA.pool : [];
    const rawRows = getRawEmisRowsForSchool(s);

    const teachReg = {}, teachCon = {};
    EBS_F1_TEACH_COLS.forEach(c => { teachReg[c.key] = 0; teachCon[c.key] = 0; });
    const nonTeachReg = {}, nonTeachCon = {};
    EBS_F1_NONTEACH_COLS.forEach(c => { nonTeachReg[c.key] = 0; nonTeachCon[c.key] = 0; });

    const form3Teachers = [];
    const form4NonTeaching = [];

    rawRows.forEach((row, idx) => {
      // row: [t_type, emis, name_en, desig_idx, gender, dob, nature, sub_idx, cls_idx, qual_idx, doj_first, doj_post, doj_sch]
      const isTeach = row[0] === 1;
      const emis = String(row[1] || "");
      const nameEn = String(row[2] || "");
      const rawDesig = pool[row[3]] || "";
      const gender = row[4] === "F" ? "Female" : "Male";
      const dob = row[5] || "";
      const isReg = row[6] === "R" && s.mgmt1 !== "3P";
      const natureStr = isReg ? "Regular" : "Contract";
      const rawSub = pool[row[7]] || "All Subjects";
      const rawCls = pool[row[8]] || "";
      const rawQual = pool[row[9]] || "";
      const dojFirst = row[10] || "";
      const dojPost = row[11] || "";
      const dojSch = row[12] || "";

      const mapped = mapEmisDesigToEbs(rawDesig, isTeach, s.level);
      const isHm = mapped.f1Col === "hm" || (s.hmName && nameEn.toUpperCase().includes(s.hmName.toUpperCase().slice(0, 6)));

      if (isTeach) {
        if (isReg) teachReg[mapped.f1Col] = (teachReg[mapped.f1Col] || 0) + 1;
        else teachCon[mapped.f1Col] = (teachCon[mapped.f1Col] || 0) + 1;

        const chk11_12 = rawCls.toLowerCase().includes("higher secondary") || mapped.f1Col === "pg" || mapped.f1Col === "phd1" || mapped.f1Col === "vocHss" || mapped.f1Col === "comp";
        const chk10 = !chk11_12 || rawCls.toLowerCase().includes("secondary");
        const staffId = "EBS-T-" + (emis || (idx + 1));
        const pendingReq = (staffDeleteRequests || []).find(r => r.uNo === s.uNo && r.staffId === staffId && r.status === "PENDING");

        const v101 = VALASAIPATTI_101_TA_MAP[emis] || {};
        const autoPrefix = gender === "Female" ? "திருமதி. " : "திரு. ";
        form3Teachers.push({
          id: staffId,
          nameEn: nameEn,
          nameTa: v101.nameTa || (isHm && s.hmTa ? s.hmTa : (autoPrefix + nameEn)),
          desig: mapped.desig,
          rawEmisDesig: rawDesig,
          gender: gender,
          emisId: emis,
          qual: rawQual,
          mainSub: rawSub || "All Subjects",
          chk10: chk10,
          chk11_12: chk11_12,
          sub10: chk10 ? (rawSub || "") : "",
          sub11: chk11_12 ? (rawSub || "") : "",
          sub12: chk11_12 ? (rawSub || "") : "",
          med10: chk10 ? "TM" : "",
          med11: chk11_12 ? "TM" : "",
          med12: chk11_12 ? "TM" : "",
          firstAppMode: s.mgmt1 === "1G" ? "TRB" : "Management",
          dojFirst: dojFirst,
          firstPostName: mapped.desig,
          dob: dob,
          presAppMode: (dojFirst && dojPost && dojPost > dojFirst) ? "Promotion" : "New Appointment",
          presNature: natureStr,
          dojPresPost: dojPost,
          unitTransDate: "",
          dojPresSchool: dojSch,
          mobile: v101.mobile || (isHm ? (s.mobile || auth.phone || "") : ""),
          altMobile: "",
          email: isHm ? (auth.email || "") : "",
          resPlace: s.block ? s.block.replace(/^[0-9]+\s*/, "") : "Sivagangai",
          resDist: "Sivagangai",
          ifhrms: v101.ifhrms || (emis ? ("93" + emis) : ""),
          pracSslc1: "",
          pracHsc1: "",
          pracHsc2: "",
          dutySslcWork: isHm ? "Chief Superintendent" : "Invigilator",
          dutySslcCentre: "",
          dutyHscWork: isHm && s.level === "HSS" ? "Chief Superintendent" : "Invigilator",
          dutyHscCentre: "",
          dutyCampWork: isHm ? "CE" : "AE",
          dutyCampCentre: "",
          childCentre1: "NIL",
          childCentre2: "NIL",
          diffAbled: "No",
          longLeave: "No",
          remarks: "",
          prefCamp: "Sivagangai",
          deleteReqStatus: pendingReq ? "PENDING" : "",
          deleteReqReason: pendingReq ? (pendingReq.reasonCategory + " - " + pendingReq.reasonDetail) : ""
        });
      } else {
        if (isReg) nonTeachReg[mapped.f1Col] = (nonTeachReg[mapped.f1Col] || 0) + 1;
        else nonTeachCon[mapped.f1Col] = (nonTeachCon[mapped.f1Col] || 0) + 1;

        const staffId = "EBS-NT-" + (emis || (idx + 1));
        const pendingReq = (staffDeleteRequests || []).find(r => r.uNo === s.uNo && r.staffId === staffId && r.status === "PENDING");

        const v101nt = VALASAIPATTI_101_TA_MAP[emis] || {};
        const autoNtPrefix = gender === "Female" ? "திருமதி. " : "திரு. ";
        form4NonTeaching.push({
          id: staffId,
          nameEn: nameEn,
          nameTa: v101nt.nameTa || (autoNtPrefix + nameEn),
          desig: mapped.desig,
          rawEmisDesig: rawDesig,
          gender: gender,
          emisId: emis,
          gpfCps: v101nt.gpfCps || (emis ? ("CPS-" + emis) : ""),
          dob: dob,
          dojService: dojFirst,
          nature: natureStr,
          dojPresPost: dojPost,
          dojPresSchool: dojSch,
          mobile: v101nt.mobile || (s.mobile || ""),
          altMobile: "",
          resPlace: s.block ? s.block.replace(/^[0-9]+\s*/, "") : "Sivagangai",
          resDist: "Sivagangai",
          ifhrms: v101nt.ifhrms || (emis ? ("93" + emis) : ""),
          dutySslcWork: "Others",
          dutySslcCentre: "",
          dutyHscWork: "Others",
          dutyHscCentre: "",
          dutyCampWork: "Not Allotted",
          dutyCampCentre: "",
          childCentre1: "NIL",
          childCentre2: "NIL",
          diffAbled: "No",
          longLeave: "No",
          remarks: rawQual ? ("Qual: " + rawQual) : "",
          deleteReqStatus: pendingReq ? "PENDING" : "",
          deleteReqReason: pendingReq ? (pendingReq.reasonCategory + " - " + pendingReq.reasonDetail) : ""
        });
      }
    });

    // Sort form3Teachers so Headmaster/Principal comes #1
    form3Teachers.sort((a, b) => {
      const aHm = (a.desig || "").includes("HEADMASTER") || (a.desig || "").includes("PRINCIPAL") ? 0 : 1;
      const bHm = (b.desig || "").includes("HEADMASTER") || (b.desig || "").includes("PRINCIPAL") ? 0 : 1;
      return aHm - bHm;
    });
    return { teachReg, teachCon, nonTeachReg, nonTeachCon, form3Teachers, form4NonTeaching };
  }

  function getSchoolEbsData(s, extra) {
    const rawEmis = getRawEmisRowsForSchool(s);
    const hasEmisTeach = rawEmis.some(r => r[0] === 1);
    const hasEmisNonTeach = rawEmis.some(r => r[0] === 0);
    const missingTeach = hasEmisTeach && (!extra.ebs2026 || !Array.isArray(extra.ebs2026.form3Teachers) || extra.ebs2026.form3Teachers.length === 0);
    const missingNonTeach = hasEmisNonTeach && (!extra.ebs2026 || !Array.isArray(extra.ebs2026.form4NonTeaching) || extra.ebs2026.form4NonTeaching.length === 0);
    if (!extra.ebs2026 || extra.ebs2026.emisSeededVersion !== 6 || missingTeach || missingNonTeach) {
      const auth = schoolAuthStore[s.uNo] || {};
      const seeded = buildEmisSeededStaffForSchool(s);

      const f2Map = {};
      EBS_F2_SUBJECTS.forEach(sub => {
        f2Map[sub.key] = { tm: 0, em: 0, total: 0, otherName: "" };
      });

      const prevF1 = (extra.ebs2026 && extra.ebs2026.form1) ? extra.ebs2026.form1 : {};
      const prevF2 = (extra.ebs2026 && extra.ebs2026.form2) ? extra.ebs2026.form2 : f2Map;

      extra.ebs2026 = {
        emisSeededVersion: 6,
        form1: {
          schoolName: prevF1.schoolName || (s.nameEn + " (" + s.nameTa + ")"),
          pincode: prevF1.pincode || extra.pincode || "630561",
          hmName: prevF1.hmName || s.hmName || s.hmTa || "",
          hmMobile: prevF1.hmMobile || s.mobile || auth.phone || "",
          ahmName: prevF1.ahmName || "",
          ahmMobile: prevF1.ahmMobile || "",
          gmail: prevF1.gmail || auth.email || "",
          landline: prevF1.landline || "NIL",
          totalRooms: prevF1.totalRooms || 12,
          examRooms: prevF1.examRooms || 8,
          benchPairs: prevF1.benchPairs || 160,
          teachReg: seeded.teachReg,
          teachCon: seeded.teachCon,
          nonTeachReg: seeded.nonTeachReg,
          nonTeachCon: seeded.nonTeachCon,
          sslc: prevF1.sslc || { tmB: 22, tmG: 25, emB: 8, emG: 10, optB: 0, optG: 0 },
          hsc: prevF1.hsc || { tmB: s.level === "HSS" ? 30 : 0, tmG: s.level === "HSS" ? 35 : 0, emB: s.level === "HSS" ? 15 : 0, emG: s.level === "HSS" ? 18 : 0, hinB: 0, hinG: 0, freB: 0, freG: 0, sanB: 0, sanG: 0 }
        },
        form2: prevF2,
        form3Teachers: seeded.form3Teachers,
        form4NonTeaching: seeded.form4NonTeaching
      };

      // Always sync Tab 3 Teacher Master list from EMIS if fewer than seeded staff
      if (!Array.isArray(extra.staff) || extra.staff.length < (seeded.form3Teachers.length + seeded.form4NonTeaching.length)) {
        extra.staff = [
          ...seeded.form3Teachers.map(t => ({
            id: t.id,
            prefix: "",
            name: t.nameTa || t.nameEn,
            gender: t.gender,
            desig: t.desig,
            subject: t.mainSub,
            firstApp: t.firstAppMode,
            nature: t.presNature,
            examDuty: t.dutySslcWork || "Invigilator",
            campDuty: t.dutyCampWork || "AE",
            campOption: "01-Sivagangai",
            mobile: t.mobile || "-",
            deleteReqStatus: t.deleteReqStatus || ""
          })),
          ...seeded.form4NonTeaching.map(emp => ({
            id: emp.id,
            prefix: "",
            name: emp.nameTa || emp.nameEn,
            gender: emp.gender,
            desig: emp.desig,
            subject: "Non-Teaching",
            firstApp: "TNPSC / Management",
            nature: emp.nature,
            examDuty: emp.dutySslcWork || "Others",
            campDuty: "Not Allotted",
            campOption: "01-Sivagangai",
            mobile: emp.mobile || "-",
            deleteReqStatus: emp.deleteReqStatus || ""
          }))
        ];
      }
      safeSetStorage("CEOSVG_SCHOOL_EXTRA_V6", schoolExtraDataStore);
    }
    return extra.ebs2026;
  }

  function resyncSchoolEmisStaff() {
    if (isEbsLockedForSchool(activeSchoolSession)) { showToast('🔒 முதன்மைக் கல்வி அலுவலகத்தால் பணியாளர் ஒத்திசைவு தற்போது முடக்கப்பட்டுள்ளது!', '#ef4444'); return; }
    if (!activeSchoolSession) return;
    const s = activeSchoolSession;
    const extra = getSchoolExtra(s.uNo);
    const seeded = buildEmisSeededStaffForSchool(s);
    const ebs = getSchoolEbsData(s, extra);

    // Merge existing school-entered missing details (nameTa, mobile, ifhrms, gpfCps, etc.) by emisId
    const oldTMap = {};
    (ebs.form3Teachers || []).forEach(t => { if (t.emisId) oldTMap[t.emisId] = t; });
    ebs.form3Teachers = seeded.form3Teachers.map(t => {
      const prev = oldTMap[t.emisId];
      if (!prev) return t;
      return Object.assign({}, t, {
        nameTa: prev.nameTa || t.nameTa,
        mobile: prev.mobile || t.mobile,
        altMobile: prev.altMobile || t.altMobile,
        email: prev.email || t.email,
        ifhrms: prev.ifhrms || t.ifhrms,
        prefCamp: prev.prefCamp || t.prefCamp,
        deleteReqStatus: prev.deleteReqStatus || t.deleteReqStatus,
        deleteReqReason: prev.deleteReqReason || t.deleteReqReason
      });
    });

    const oldNTMap = {};
    (ebs.form4NonTeaching || []).forEach(emp => { if (emp.emisId) oldNTMap[emp.emisId] = emp; });
    ebs.form4NonTeaching = seeded.form4NonTeaching.map(emp => {
      const prev = oldNTMap[emp.emisId];
      if (!prev) return emp;
      return Object.assign({}, emp, {
        nameTa: prev.nameTa || emp.nameTa,
        mobile: prev.mobile || emp.mobile,
        gpfCps: prev.gpfCps || emp.gpfCps,
        ifhrms: prev.ifhrms || emp.ifhrms,
        deleteReqStatus: prev.deleteReqStatus || emp.deleteReqStatus,
        deleteReqReason: prev.deleteReqReason || emp.deleteReqReason
      });
    });

    syncForm1CountsFromForm3And4(false);
    safeSetStorage("CEOSVG_SCHOOL_EXTRA_V6", schoolExtraDataStore);
    initEbsModuleForSchool(s, extra);
    showToast(`✅ EMIS பட்டியலிலிருந்து ${ebs.form3Teachers.length} ஆசிரியர்கள் மற்றும் ${ebs.form4NonTeaching.length} பணியாளர்கள் ஒத்திசைக்கப்பட்டனர்!`, "#22c55e");
  }

  function syncForm1CountsFromForm3And4(notifyUser) {
    if (!activeSchoolSession) return;
    const s = activeSchoolSession;
    const extra = getSchoolExtra(s.uNo);
    const ebs = getSchoolEbsData(s, extra);
    const f1 = ebs.form1;

    EBS_F1_TEACH_COLS.forEach(c => { f1.teachReg[c.key] = 0; f1.teachCon[c.key] = 0; });
    EBS_F1_NONTEACH_COLS.forEach(c => { f1.nonTeachReg[c.key] = 0; f1.nonTeachCon[c.key] = 0; });

    (ebs.form3Teachers || []).forEach(t => {
      const mapped = mapEmisDesigToEbs(t.desig || t.rawEmisDesig, true, s.level);
      const isReg = String(t.presNature || "Regular").toLowerCase().includes("reg");
      if (isReg) f1.teachReg[mapped.f1Col] = (f1.teachReg[mapped.f1Col] || 0) + 1;
      else f1.teachCon[mapped.f1Col] = (f1.teachCon[mapped.f1Col] || 0) + 1;
    });

    (ebs.form4NonTeaching || []).forEach(emp => {
      const mapped = mapEmisDesigToEbs(emp.desig || emp.rawEmisDesig, false, s.level);
      const isReg = String(emp.nature || "Regular").toLowerCase().includes("reg");
      if (isReg) f1.nonTeachReg[mapped.f1Col] = (f1.nonTeachReg[mapped.f1Col] || 0) + 1;
      else f1.nonTeachCon[mapped.f1Col] = (f1.nonTeachCon[mapped.f1Col] || 0) + 1;
    });

    renderEbsForm1UI(s, f1);
    safeSetStorage("CEOSVG_SCHOOL_EXTRA_V6", schoolExtraDataStore);
    if (notifyUser) {
      showToast("✅ FORM-III மற்றும் FORM-IV பட்டியலின் அடிப்படையில் FORM-I பணியாளர் எண்ணிக்கை தானாகக் கணக்கிடப்பட்டது!", "#22c55e");
    }
  }

  function switchEbsSubForm(formKey) {
    const map = {
      F1: ["ebsSubBtnF1", "ebsSubPaneF1"],
      F2: ["ebsSubBtnF2", "ebsSubPaneF2"],
      F3: ["ebsSubBtnF3", "ebsSubPaneF3"],
      F4: ["ebsSubBtnF4", "ebsSubPaneF4"]
    };
    Object.keys(map).forEach(k => {
      const [btnId, paneId] = map[k];
      const btn = document.getElementById(btnId);
      const pane = document.getElementById(paneId);
      if (btn) btn.classList.toggle("active", k === formKey);
      if (pane) pane.style.display = k === formKey ? "block" : "none";
    });
  }

  
  // =========================================================================
  // EBS 2026-27 MODULE GLOBAL ON/OFF CONTROLS & PERMISSIONS
  // =========================================================================
  function isEbsModuleEnabled() {
    const v = safeGetStorage("CEOSVG_EBS_MODULE_ENABLED", false); // DEFAULT IS FALSE (OFF)
    return v === true || v === "true" || v === "ENABLED";
  }

  function setEbsModuleStatus(enabled) {
    safeSetStorage("CEOSVG_EBS_MODULE_ENABLED", Boolean(enabled));
    updateAllEbsControlUI();
    if (typeof sendToAppsScript === "function") {
      sendToAppsScript({ action: "admin_set_ebs_status", enabled: Boolean(enabled) });
    }
  }

  function toggleEbsModuleStatus() {
    const curr = isEbsModuleEnabled();
    const next = !curr;
    setEbsModuleStatus(next);
    if (next) {
      showToast("🟢 EBS_2026_27 படிவப் பதிவு அனைத்துப் பள்ளிகளுக்கும் இயக்கப்பட்டது (EBS Module is ON)!", "#22c55e");
    } else {
      showToast("🔒 EBS_2026_27 படிவப் பதிவு அனைத்துப் பள்ளிகளுக்கும் முடக்கப்பட்டது (EBS Module is OFF)!", "#ef4444");
    }
  }

  // EBS Deadline Management (கடைசி நாள் விவரம்)
  function getEbsDeadline() {
    const v = safeGetStorage("CEOSVG_EBS_DEADLINE", null);
    if (!v) return null;
    if (typeof v === "object") return v;
    try {
      return JSON.parse(v);
    } catch(e) {
      return { date: String(v), time: "17:00" };
    }
  }

  function setEbsDeadline(dateStr, timeStr) {
    if (!dateStr) {
      safeSetStorage("CEOSVG_EBS_DEADLINE", null);
    } else {
      safeSetStorage("CEOSVG_EBS_DEADLINE", { date: dateStr, time: timeStr || "17:00" });
    }
    updateAllEbsControlUI();
    if (typeof sendToAppsScript === "function") {
      sendToAppsScript({ action: "admin_set_ebs_deadline", deadline: dateStr ? { date: dateStr, time: timeStr || "17:00" } : null });
    }
  }

  function clearEbsDeadline() {
    safeSetStorage("CEOSVG_EBS_DEADLINE", null);
    const dInp = document.getElementById("admEbsLastDateInput");
    if (dInp) dInp.value = "";
    updateAllEbsControlUI();
    if (typeof sendToAppsScript === "function") {
      sendToAppsScript({ action: "admin_set_ebs_deadline", deadline: null });
    }
    showToast("🗑️ EBS கடைசி நாள் விவரம் நீக்கப்பட்டது.", "#38bdf8");
  }

  function saveEbsDeadlineSubmit() {
    const dInp = document.getElementById("admEbsLastDateInput");
    const tInp = document.getElementById("admEbsLastTimeInput");
    const dVal = dInp ? dInp.value : "";
    const tVal = tInp ? tInp.value : "17:00";
    if (!dVal) {
      showToast("⚠️ தயவுசெய்து கடைசி நாளைத் (Date) தேர்ந்தெடுக்கவும்!", "#f59e0b");
      return;
    }
    setEbsDeadline(dVal, tVal);
    showToast("✅ EBS கடைசி நாள் வெற்றிகரமாகச் சேமிக்கப்பட்டது!", "#22c55e");
  }

  function clearEbsDeadlineSubmit() {
    clearEbsDeadline();
  }

  function isEbsDeadlinePassed() {
    const dl = getEbsDeadline();
    if (!dl || !dl.date) return false;
    try {
      const time = dl.time || "17:00";
      const [hh, mm] = time.split(":").map(Number);
      const [y, m, d] = dl.date.split("-").map(Number);
      const deadlineDate = new Date(y, m - 1, d, hh || 17, mm || 0, 0);
      return new Date() > deadlineDate;
    } catch (e) {
      return false;
    }
  }

  function getEbsDeadlineInfo() {
    const dl = getEbsDeadline();
    if (!dl || !dl.date) {
      return { hasDeadline: false, isPassed: false, text: "கடைசி நாள் நிர்ணயிக்கப்படவில்லை", badge: "நிர்ணயிக்கப்படவில்லை", date: "", time: "17:00" };
    }
    try {
      const time = dl.time || "17:00";
      const [hh, mm] = time.split(":").map(Number);
      const [y, m, d] = dl.date.split("-").map(Number);
      const deadlineDate = new Date(y, m - 1, d, hh || 17, mm || 0, 0);
      const now = new Date();
      const isPassed = now > deadlineDate;

      const formattedDate = `${String(d).padStart(2, '0')}-${String(m).padStart(2, '0')}-${y}`;
      const ampm = (hh >= 12) ? "மாலை" : "காலை";
      const formattedTime = `${String(hh % 12 || 12).padStart(2, '0')}:${String(mm).padStart(2, '0')} ${ampm}`;

      if (isPassed) {
        return {
          hasDeadline: true,
          isPassed: true,
          date: dl.date,
          time: dl.time,
          formattedDate,
          formattedTime,
          text: `கடைசி நாள்: ${formattedDate} (${formattedTime}) – காலக்கெடு முடிவடைந்தது!`,
          badge: `⚠️ முடிவடைந்தது (${formattedDate})`
        };
      } else {
        const diffMs = deadlineDate - now;
        const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
        const diffHours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const remainText = diffDays > 0 ? `${diffDays} நாட்கள், ${diffHours} மணி நேரம்` : `${diffHours} மணி நேரம்`;
        return {
          hasDeadline: true,
          isPassed: false,
          date: dl.date,
          time: dl.time,
          formattedDate,
          formattedTime,
          remainingText: remainText,
          text: `கடைசி நாள்: ${formattedDate} (${formattedTime}) | எஞ்சியுள்ள காலம்: ${remainText}`,
          badge: `⏰ ${formattedDate} வரை`
        };
      }
    } catch(e) {
      return { hasDeadline: false, isPassed: false, text: "கடைசி நாள் நிர்ணயிக்கப்படவில்லை", badge: "நிர்ணயிக்கப்படவில்லை", date: "", time: "17:00" };
    }
  }

  function isEbsLockedForSchool(s) {
    if (s && s.isAdminInspection) return false; // Admin can always edit/correct
    if (!isEbsModuleEnabled()) return true; // Disabled by Admin
    if (isEbsDeadlinePassed()) return true; // Deadline expired
    return false;
  }

  function updateAllEbsControlUI() {
    const enabled = isEbsModuleEnabled();
    const dlInfo = getEbsDeadlineInfo();
    const isDeadlinePassed = isEbsDeadlinePassed();

    // 1. Admin Module Chooser Badges (Box 2)
    const chooserStatusBadge = document.getElementById("admChooserEbsStatusBadge");
    if (chooserStatusBadge) {
      chooserStatusBadge.textContent = enabled ? "🟢 இயக்கப்பட்டுள்ளது (Active)" : "🔒 முடக்கப்பட்டுள்ளது (View & Download Only)";
      chooserStatusBadge.style.background = enabled ? "#dcfce7" : "#fee2e2";
      chooserStatusBadge.style.color = enabled ? "#15803d" : "#b91c1c";
    }
    const chooserDeadlineBadge = document.getElementById("admChooserEbsDeadlineBadge");
    if (chooserDeadlineBadge) {
      chooserDeadlineBadge.textContent = dlInfo.badge;
      chooserDeadlineBadge.style.color = dlInfo.isPassed ? "#dc2626" : (dlInfo.hasDeadline ? "#16a34a" : "#92400e");
    }

    // 2. Admin Header Buttons
    const hdrBtns = [document.getElementById("admEbsToggleHeaderBtn"), document.getElementById("admEbsToggleHeaderBtn2")];
    hdrBtns.forEach(hdrBtn => {
      if (!hdrBtn) return;
      hdrBtn.innerHTML = enabled
        ? `🟢 EBS பதிவு: ON (இயங்குகிறது)`
        : `🔒 EBS பதிவு: OFF (முடக்கப்பட்டுள்ளது)`;
      hdrBtn.className = enabled ? "btn btn-success btn-sm" : "btn btn-danger btn-sm";
      hdrBtn.style.background = enabled ? "#15803d" : "#dc2626";
      hdrBtn.style.borderColor = enabled ? "#22c55e" : "#ef4444";
      hdrBtn.style.color = "#ffffff";
    });

    // 3. Admin EBS Monitor Control Box
    const emojiEl = document.getElementById("admEbsControlEmoji");
    const titleEl = document.getElementById("admEbsStatusTitle");
    const descEl = document.getElementById("admEbsStatusDesc");
    const toggleBtn = document.getElementById("admEbsToggleMainBtn");
    if (emojiEl) emojiEl.textContent = enabled ? "🟢" : "🔒";
    if (titleEl) {
      titleEl.innerHTML = enabled
        ? `EBS_2026_27 பள்ளிப் பதிவு நிலை: <span style="color:#15803d;">🟢 ON (இயக்கத்தில் உள்ளது)</span>`
        : `EBS_2026_27 பள்ளிப் பதிவு நிலை: <span style="color:#dc2626;">🔒 OFF (முடக்கப்பட்டுள்ளது / View &amp; Download Only)</span>`;
    }
    if (descEl) {
      descEl.textContent = enabled
        ? "அனைத்துப் பள்ளிகளும் படிவங்களை நிரப்பவும், சேர்க்கை மற்றும் தரவுத் திருத்தங்களைச் (Add & Edit) செய்யவும் அனுமதிக்கப்பட்டுள்ளன."
        : "பள்ளிகள் EBS விவரங்களைப் பார்வையிட மற்றும் பதிவிறக்க/அச்சிட மட்டுமே அனுமதிக்கப்பட்டுள்ளன. சேர்க்கை மற்றும் திருத்தங்கள் செய்ய அனுமதி இல்லை.";
    }
    if (toggleBtn) {
      toggleBtn.textContent = enabled ? "🔒 பள்ளி சேர்க்கை & திருத்தங்களை முடக்கு (Turn OFF)" : "🟢 பள்ளி சேர்க்கை & திருத்தங்களை இயக்கு (Turn ON)";
      toggleBtn.className = enabled ? "btn btn-danger btn-sm" : "btn btn-success btn-sm";
      toggleBtn.style.background = enabled ? "#dc2626" : "#15803d";
    }

    // 4. Admin Deadline Inputs & Status
    const dInp = document.getElementById("admEbsLastDateInput");
    if (dInp && dlInfo.date) dInp.value = dlInfo.date;
    const tInp = document.getElementById("admEbsLastTimeInput");
    if (tInp && dlInfo.time) tInp.value = dlInfo.time;

    const deadlineStatusText = document.getElementById("admEbsDeadlineStatusText");
    if (deadlineStatusText) {
      if (dlInfo.hasDeadline) {
        if (dlInfo.isPassed) {
          deadlineStatusText.innerHTML = `<span style="color:#dc2626;">⚠️ காலக்கெடு முடிவடைந்தது: ${dlInfo.formattedDate} (${dlInfo.formattedTime}) – பள்ளிகள் பார்வையிட &amp; அச்சிட மட்டுமே அனுமதிக்கப்பட்டுள்ளன.</span>`;
        } else {
          deadlineStatusText.innerHTML = `<span style="color:#15803d;">⏰ நிர்ணயிக்கப்பட்ட கடைசி நாள்: <strong>${dlInfo.formattedDate} (${dlInfo.formattedTime})</strong> | எஞ்சியுள்ள காலம்: <strong>${dlInfo.remainingText}</strong></span>`;
        }
      } else {
        deadlineStatusText.innerHTML = `<span style="color:#64748b;">ℹ️ பள்ளிகளுக்குக் கடைசி நாள் இன்னும் நிர்ணயிக்கப்படவில்லை (தேவைப்பட்டால் தேதியைத் தேர்வு செய்து 'சேமி' பொத்தானை அழுத்தவும்).</span>`;
      }
    }

    // 5. School Tab Pill Badge
    const schTabBtn = document.getElementById("schTabBtnEbs");
    if (schTabBtn) {
      const isLocked = (!enabled || isDeadlinePassed);
      if (!isLocked) {
        schTabBtn.style.borderColor = "#d97706";
        schTabBtn.style.background = "#fffbeb";
        schTabBtn.style.color = "#9a3412";
        schTabBtn.innerHTML = `📋 EBS_2026_27 (படிவங்கள் I - IV பதிவு) <span style="background:#22c55e; color:#fff; font-size:0.72rem; padding:1px 6px; border-radius:999px; margin-left:4px; font-weight:900;">🟢 OPEN</span>`;
      } else {
        schTabBtn.style.borderColor = "#dc2626";
        schTabBtn.style.background = "#fef2f2";
        schTabBtn.style.color = "#991b1b";
        schTabBtn.innerHTML = `📋 EBS_2026_27 (படிவங்கள் I - IV) <span style="background:#dc2626; color:#fff; font-size:0.72rem; padding:1px 6px; border-radius:999px; margin-left:4px; font-weight:900;">🔒 CLOSED</span>`;
      }
    }

    // 6. Apply to active school session if open
    if (activeSchoolSession) {
      applyEbsLockStatusToUI(activeSchoolSession);
    }
  }

  function applyEbsLockStatusToUI(school) {
    const enabled = isEbsModuleEnabled();
    const isAdmin = Boolean(school && school.isAdminInspection);
    const dlInfo = getEbsDeadlineInfo();
    const isDeadlinePassed = isEbsDeadlinePassed();
    const isLocked = (!isAdmin && (!enabled || isDeadlinePassed));

    const lockedNotice = document.getElementById("ebsSchoolLockedNotice");
    const adminNotice = document.getElementById("ebsAdminInspectionNotice");
    const deadlineAlert = document.getElementById("ebsSchoolDeadlineAlertBar");

    if (adminNotice) adminNotice.style.display = isAdmin ? "block" : "none";

    if (lockedNotice) {
      if (isLocked) {
        lockedNotice.style.display = "block";
        const lockTitle = lockedNotice.querySelector(".ebs-lock-title");
        const lockDesc = lockedNotice.querySelector(".ebs-lock-desc");
        if (isDeadlinePassed) {
          if (lockTitle) lockTitle.innerHTML = `⚠️ EBS_2026_27 பதிவு மற்றும் திருத்தங்களுக்கான கடைசி நாள் முடிவடைந்துவிட்டது!`;
          if (lockDesc) lockDesc.innerHTML = `முதன்மைக் கல்வி அலுவலரால் நிர்ணயிக்கப்பட்ட கடைசி நாள் (<strong>${dlInfo.formattedDate} ${dlInfo.formattedTime}</strong>) முடிவடைந்ததால், பள்ளிகள் புதிய விவரங்களைச் சேர்க்கவோ அல்லது திருத்தவோ இயலாது. உங்கள் பள்ளியின் பதிவு செய்யப்பட்ட படிவங்களை <strong>பார்வையிடவும் மற்றும் A4 வடிவில் அச்சிடவும்/பதிவிறக்கவும் (View &amp; Print Only)</strong> மட்டுமே அனுமதிக்கப்படுகிறது.`;
        } else {
          if (lockTitle) lockTitle.innerHTML = `🔒 முதன்மைக் கல்வி அலுவலக அறிவிப்பு: EBS_2026_27 படிவப் பதிவு தற்காலிகமாக முடக்கப்பட்டுள்ளது!`;
          if (lockDesc) lockDesc.innerHTML = `மாவட்ட முதன்மைக் கல்வி அலுவலரின் உத்தரவுப்படி பள்ளிகள் EBS விவரங்களை <strong>பார்வையிட மற்றும் A4 வடிவில் பதிவிறக்க/அச்சிட மட்டுமே</strong> அனுமதிக்கப்பட்டுள்ளன. நிர்வாகியால் அனுமதி அளிக்கப்படும் வரை புதிய சேர்க்கை மற்றும் தரவுத் திருத்தங்கள் செய்ய இயலாது.`;
        }
      } else {
        lockedNotice.style.display = "none";
      }
    }

    if (deadlineAlert) {
      if (!isLocked && dlInfo.hasDeadline) {
        deadlineAlert.style.display = "block";
        deadlineAlert.innerHTML = `⏰ EBS_2026_27 விவரங்கள் பதிவு மற்றும் திருத்தம் செய்ய கடைசி நாள்: <strong>${dlInfo.formattedDate} (${dlInfo.formattedTime})</strong> | எஞ்சியுள்ள காலம்: <strong style="color:#b45309;">${dlInfo.remainingText}</strong>`;
      } else {
        deadlineAlert.style.display = "none";
      }
    }

    // Disable or enable save buttons in EBS forms
    const saveButtons = [
      document.querySelector("button[onclick*='saveAllEbsDataToCloud']"),
      document.querySelector("button[onclick*='resyncSchoolEmisStaff']"),
      document.querySelector("form[onsubmit*='saveEbsForm1Submit'] button[type='submit']"),
      document.querySelector("form[onsubmit*='saveEbsForm2Submit'] button[type='submit']"),
      document.getElementById("ebsF3SubmitBtn"),
      document.getElementById("ebsF4SubmitBtn")
    ];

    saveButtons.forEach(btn => {
      if (!btn) return;
      btn.disabled = isLocked;
      btn.style.opacity = isLocked ? "0.55" : "1";
      btn.style.cursor = isLocked ? "not-allowed" : "pointer";
      btn.title = isLocked ? "🔒 மாவட்ட முதன்மைக் கல்வி அலுவலகத்தால் EBS படிவப் பதிவு தற்காலிகமாக முடக்கப்பட்டுள்ளது (பார்வை & அச்சு மட்டுமே)." : "";
    });

    // Also toggle disabled on form inputs inside Form-1, 2, 3, 4
    const formPanes = ["ebsSubPaneF1", "ebsSubPaneF2", "ebsSubPaneF3", "ebsSubPaneF4"];
    formPanes.forEach(paneId => {
      const pane = document.getElementById(paneId);
      if (!pane) return;
      pane.querySelectorAll("input, select").forEach(inp => {
        if (inp.id === "ebsF3SearchInput" || inp.id === "ebsF3FilterStatus" || inp.id === "ebsF4SearchInput" || inp.id === "ebsF4FilterStatus") return;
        inp.disabled = isLocked;
      });
    });

    // Also re-render teachers list and staff list to lock edit/delete buttons
    if (activeSchoolSession && typeof schoolExtraDataStore !== "undefined") {
      const extra = getSchoolExtra(activeSchoolSession);
      const ebs = getSchoolEbsData(activeSchoolSession, extra);
      const tb3 = document.getElementById("ebsF3TeachersListTbody");
      if (tb3 && ebs && ebs.form3Teachers) {
        renderEbsForm3ListUI(activeSchoolSession, ebs.form3Teachers);
      }
      const tb4 = document.getElementById("ebsF4StaffListTbody");
      if (tb4 && ebs && ebs.form4NonTeaching) {
        renderEbsForm4ListUI(activeSchoolSession, ebs.form4NonTeaching);
      }
    }
  }

  function cancelEbsF3Edit() {
    resetEbsForm3Inputs();
    showToast("ℹ️ ஆசிரியர் விவரத் திருத்தம் ரத்து செய்யப்பட்டது.", "#38bdf8");
  }

  function cancelEbsF4Edit() {
    resetEbsForm4Inputs();
    showToast("ℹ️ பணியாளர் விவரத் திருத்தம் ரத்து செய்யப்பட்டது.", "#38bdf8");
  }

  function initEbsModuleForSchool(s, extra) {
    const ebs = getSchoolEbsData(s, extra);
    const digits = String(s.uNo || "000").padStart(3, "0").slice(-3).split("");
    ["F1", "F2", "F3", "F4"].forEach(fk => {
      const d1 = document.getElementById(`ebs${fk}UNoD1`);
      const d2 = document.getElementById(`ebs${fk}UNoD2`);
      const d3 = document.getElementById(`ebs${fk}UNoD3`);
      if (d1) d1.textContent = digits[0];
      if (d2) d2.textContent = digits[1];
      if (d3) d3.textContent = digits[2];
      const lbl = document.getElementById(`ebs${fk}SchoolNameLabel`);
      if (lbl) lbl.textContent = `${s.nameEn} (${s.nameTa}) [U.NO: ${s.uNo}]`;
    });

    populateEbsDropdownOptions();
    syncForm1CountsFromForm3And4(false);
    renderEbsForm1UI(s, ebs.form1);
    renderEbsForm2UI(s, ebs.form2);
    renderEbsForm3ListUI(s, ebs.form3Teachers);
    renderEbsForm4ListUI(s, ebs.form4NonTeaching);
    applyEbsLockStatusToUI(s);
    if (ebs.form3Teachers && ebs.form3Teachers.length > 0) {
      editEbsForm3Teacher(ebs.form3Teachers[0].id, true);
    } else {
      resetEbsForm3Inputs();
    }
    if (ebs.form4NonTeaching && ebs.form4NonTeaching.length > 0) {
      editEbsForm4NonTeach(ebs.form4NonTeaching[0].id, true);
    } else {
      resetEbsForm4Inputs();
    }
  }

  function populateEbsDropdownOptions() {
    const dd = INITIAL_DROPDOWNS;
    const teachDesigs = (dd.designations || []).filter(d => Number(d.code) <= 25);
    const nonTeachDesigs = [
      ...(dd.designations || []).filter(d => Number(d.code) > 25),
      { name: "DRIVER", code: "47" },
      { name: "CLEANER", code: "48" },
      { name: "ACCOUNTANT", code: "49" },
      { name: "ADMINISTRATIVE STAFF (ADMIN)", code: "50" },
      { name: "CONDUCTRESS", code: "51" },
      { name: "OTHERS", code: "52" }
    ];

    const f3DesigEl = document.getElementById("ebsF3Desig");
    if (f3DesigEl && f3DesigEl.options.length === 0) {
      f3DesigEl.innerHTML = teachDesigs.map(d => `<option value="${d.name}">${d.code} - ${d.name}</option>`).join("");
    }
    const f3SubEl = document.getElementById("ebsF3MainSub");
    if (f3SubEl && f3SubEl.options.length === 0) {
      const allSubs = [];
      const seenSub = new Set();
      [...(dd.teachingSubjects || []), ...(dd.subjects || [])].forEach(sub => {
        if (!seenSub.has(sub.name)) {
          seenSub.add(sub.name);
          allSubs.push(sub);
        }
      });
      f3SubEl.innerHTML = allSubs.map(sub => `<option value="${sub.name}">${sub.name}</option>`).join("");
    }
    const f4DesigEl = document.getElementById("ebsF4Desig");
    if (f4DesigEl && f4DesigEl.options.length === 0) {
      f4DesigEl.innerHTML = nonTeachDesigs.map(d => `<option value="${d.name}">${d.code} - ${d.name}</option>`).join("");
    }

    const examOpts = (dd.examDuties || ["Invigilator", "Chief Superintendent", "Department Officer", "Not allotted"]).map(v => `<option value="${v}">${v}</option>`).join("");
    const campOpts = (dd.campDuties || ["AE", "SO", "CE", "Tabulator", "Not Allotted"]).map(v => `<option value="${v}">${v}</option>`).join("");

    ["ebsF3DutySslcWork", "ebsF3DutyHscWork", "ebsF4DutySslcWork", "ebsF4DutyHscWork"].forEach(id => {
      const el = document.getElementById(id);
      if (el && el.options.length === 0) el.innerHTML = examOpts;
    });
    ["ebsF3DutyCampWork", "ebsF4DutyCampWork"].forEach(id => {
      const el = document.getElementById(id);
      if (el && el.options.length === 0) el.innerHTML = campOpts;
    });
  }

  function renderEbsForm1UI(s, f1) {
    document.getElementById("ebsF1SchoolName").value = f1.schoolName || `${s.nameEn} (${s.nameTa})`;
    document.getElementById("ebsF1Pincode").value = f1.pincode || "630561";
    document.getElementById("ebsF1HmName").value = f1.hmName || s.hmName || "";
    document.getElementById("ebsF1HmMobile").value = f1.hmMobile || s.mobile || "";
    document.getElementById("ebsF1AhmName").value = f1.ahmName || "";
    document.getElementById("ebsF1AhmMobile").value = f1.ahmMobile || "";
    document.getElementById("ebsF1Gmail").value = f1.gmail || "";
    document.getElementById("ebsF1Landline").value = f1.landline || "NIL";
    document.getElementById("ebsF1TotalRooms").value = f1.totalRooms || 0;
    document.getElementById("ebsF1ExamRooms").value = f1.examRooms || 0;
    document.getElementById("ebsF1BenchPairs").value = f1.benchPairs || 0;

    // Render Teaching Staff Table Rows
    const teachTbody = document.getElementById("ebsF1TeachTbody");
    if (teachTbody) {
      teachTbody.innerHTML = `
        <tr>
          <td style="text-align:left; font-weight:800; background:#f8fafc;">Regular (Govt. Salaried)<br><span style="font-size:0.72rem; color:#475569;">(Govt. &amp; Aided Schools only)</span></td>
          ${EBS_F1_TEACH_COLS.map(c => `<td><input type="number" class="ebs-num-inp" id="ebsF1Tr_${c.key}" min="0" value="${f1.teachReg[c.key] || 0}" oninput="recalcEbsForm1Totals()"></td>`).join("")}
          <td style="font-weight:900; background:#f1f5f9;" id="ebsF1Tr_TOTAL">0</td>
        </tr>
        <tr>
          <td style="text-align:left; font-weight:800; background:#f8fafc;">Contract (Self Finance)<br><span style="font-size:0.72rem; color:#475569;">(Govt.Aided / Matric &amp; Self Finance)</span></td>
          ${EBS_F1_TEACH_COLS.map(c => `<td><input type="number" class="ebs-num-inp" id="ebsF1Tc_${c.key}" min="0" value="${f1.teachCon[c.key] || 0}" oninput="recalcEbsForm1Totals()"></td>`).join("")}
          <td style="font-weight:900; background:#f1f5f9;" id="ebsF1Tc_TOTAL">0</td>
        </tr>
        <tr style="background:#e2e8f0; font-weight:900;">
          <td style="font-weight:900;">TOTAL</td>
          ${EBS_F1_TEACH_COLS.map(c => `<td id="ebsF1Tt_${c.key}">0</td>`).join("")}
          <td style="background:#dcfce7; color:#166534; font-size:0.95rem;" id="ebsF1Tt_TOTAL">0</td>
        </tr>
      `;
    }

    // Render Non-Teaching Staff Table Rows
    const nonTeachTbody = document.getElementById("ebsF1NonTeachTbody");
    if (nonTeachTbody) {
      nonTeachTbody.innerHTML = `
        <tr>
          <td style="text-align:left; font-weight:800; background:#f8fafc;">Regular (Govt.Salaried)<br><span style="font-size:0.72rem; color:#475569;">(Govt. &amp; Aided Schools only)</span></td>
          ${EBS_F1_NONTEACH_COLS.map(c => `<td><input type="number" class="ebs-num-inp" id="ebsF1Nr_${c.key}" min="0" value="${f1.nonTeachReg[c.key] || 0}" oninput="recalcEbsForm1Totals()"></td>`).join("")}
          <td style="font-weight:900; background:#f1f5f9;" id="ebsF1Nr_TOTAL">0</td>
        </tr>
        <tr>
          <td style="text-align:left; font-weight:800; background:#f8fafc;">Contract (Self Finance)<br><span style="font-size:0.72rem; color:#475569;">(Govt.Aided / Matric &amp; Self Finance)</span></td>
          ${EBS_F1_NONTEACH_COLS.map(c => `<td><input type="number" class="ebs-num-inp" id="ebsF1Nc_${c.key}" min="0" value="${f1.nonTeachCon[c.key] || 0}" oninput="recalcEbsForm1Totals()"></td>`).join("")}
          <td style="font-weight:900; background:#f1f5f9;" id="ebsF1Nc_TOTAL">0</td>
        </tr>
        <tr style="background:#e2e8f0; font-weight:900;">
          <td style="font-weight:900;">TOTAL</td>
          ${EBS_F1_NONTEACH_COLS.map(c => `<td id="ebsF1Nt_${c.key}">0</td>`).join("")}
          <td style="background:#dcfce7; color:#166534; font-size:0.95rem;" id="ebsF1Nt_TOTAL">0</td>
        </tr>
      `;
    }

    // SSLC & HSC inputs
    const sslc = f1.sslc || {};
    document.getElementById("ebsF1SslcTmB").value = sslc.tmB || 0;
    document.getElementById("ebsF1SslcTmG").value = sslc.tmG || 0;
    document.getElementById("ebsF1SslcEmB").value = sslc.emB || 0;
    document.getElementById("ebsF1SslcEmG").value = sslc.emG || 0;
    document.getElementById("ebsF1SslcOptB").value = sslc.optB || 0;
    document.getElementById("ebsF1SslcOptG").value = sslc.optG || 0;

    const hsc = f1.hsc || {};
    document.getElementById("ebsF1HscTmB").value = hsc.tmB || 0;
    document.getElementById("ebsF1HscTmG").value = hsc.tmG || 0;
    document.getElementById("ebsF1HscEmB").value = hsc.emB || 0;
    document.getElementById("ebsF1HscEmG").value = hsc.emG || 0;
    document.getElementById("ebsF1HscHinB").value = hsc.hinB || 0;
    document.getElementById("ebsF1HscHinG").value = hsc.hinG || 0;
    document.getElementById("ebsF1HscFreB").value = hsc.freB || 0;
    document.getElementById("ebsF1HscFreG").value = hsc.freG || 0;
    document.getElementById("ebsF1HscSanB").value = hsc.sanB || 0;
    document.getElementById("ebsF1HscSanG").value = hsc.sanG || 0;

    recalcEbsForm1Totals();
  }

  function recalcEbsForm1Totals() {
    if (!activeSchoolSession) return;
    const extra = getSchoolExtra(activeSchoolSession.uNo);
    const f1 = getSchoolEbsData(activeSchoolSession, extra).form1;

    let trSum = 0, tcSum = 0;
    EBS_F1_TEACH_COLS.forEach(c => {
      const rEl = document.getElementById("ebsF1Tr_" + c.key);
      const cEl = document.getElementById("ebsF1Tc_" + c.key);
      const rVal = (rEl && rEl.value !== "") ? Number(rEl.value) : Number(f1.teachReg[c.key] || 0);
      const cVal = (cEl && cEl.value !== "") ? Number(cEl.value) : Number(f1.teachCon[c.key] || 0);
      f1.teachReg[c.key] = rVal;
      f1.teachCon[c.key] = cVal;
      trSum += rVal;
      tcSum += cVal;
      if (rEl) {
        rEl.style.background = rVal > 0 ? "#dcfce7" : "#ffffff";
        rEl.style.color = rVal > 0 ? "#14532d" : "#1e293b";
        rEl.style.borderColor = rVal > 0 ? "#16a34a" : "#cbd5e1";
        rEl.style.fontWeight = rVal > 0 ? "900" : "700";
      }
      if (cEl) {
        cEl.style.background = cVal > 0 ? "#fef3c7" : "#ffffff";
        cEl.style.color = cVal > 0 ? "#92400e" : "#1e293b";
        cEl.style.borderColor = cVal > 0 ? "#d97706" : "#cbd5e1";
        cEl.style.fontWeight = cVal > 0 ? "900" : "700";
      }
      const colTotEl = document.getElementById("ebsF1Tt_" + c.key);
      if (colTotEl) {
        colTotEl.textContent = rVal + cVal;
        colTotEl.style.background = (rVal + cVal) > 0 ? "#bbf7d0" : "#e2e8f0";
        colTotEl.style.color = (rVal + cVal) > 0 ? "#14532d" : "#475569";
      }
    });
    const trTotEl = document.getElementById("ebsF1Tr_TOTAL");
    const tcTotEl = document.getElementById("ebsF1Tc_TOTAL");
    const ttTotEl = document.getElementById("ebsF1Tt_TOTAL");
    if (trTotEl) trTotEl.textContent = trSum;
    if (tcTotEl) tcTotEl.textContent = tcSum;
    if (ttTotEl) ttTotEl.textContent = trSum + tcSum;

    let nrSum = 0, ncSum = 0;
    EBS_F1_NONTEACH_COLS.forEach(c => {
      const rEl = document.getElementById("ebsF1Nr_" + c.key);
      const cEl = document.getElementById("ebsF1Nc_" + c.key);
      const rVal = (rEl && rEl.value !== "") ? Number(rEl.value) : Number(f1.nonTeachReg[c.key] || 0);
      const cVal = (cEl && cEl.value !== "") ? Number(cEl.value) : Number(f1.nonTeachCon[c.key] || 0);
      f1.nonTeachReg[c.key] = rVal;
      f1.nonTeachCon[c.key] = cVal;
      nrSum += rVal;
      ncSum += cVal;
      if (rEl) {
        rEl.style.background = rVal > 0 ? "#dcfce7" : "#ffffff";
        rEl.style.color = rVal > 0 ? "#14532d" : "#1e293b";
        rEl.style.borderColor = rVal > 0 ? "#16a34a" : "#cbd5e1";
        rEl.style.fontWeight = rVal > 0 ? "900" : "700";
      }
      if (cEl) {
        cEl.style.background = cVal > 0 ? "#fef3c7" : "#ffffff";
        cEl.style.color = cVal > 0 ? "#92400e" : "#1e293b";
        cEl.style.borderColor = cVal > 0 ? "#d97706" : "#cbd5e1";
        cEl.style.fontWeight = cVal > 0 ? "900" : "700";
      }
      const colTotEl = document.getElementById("ebsF1Nt_" + c.key);
      if (colTotEl) {
        colTotEl.textContent = rVal + cVal;
        colTotEl.style.background = (rVal + cVal) > 0 ? "#bbf7d0" : "#e2e8f0";
        colTotEl.style.color = (rVal + cVal) > 0 ? "#14532d" : "#475569";
      }
    });
    const nrTotEl = document.getElementById("ebsF1Nr_TOTAL");
    const ncTotEl = document.getElementById("ebsF1Nc_TOTAL");
    const ntTotEl = document.getElementById("ebsF1Nt_TOTAL");
    if (nrTotEl) nrTotEl.textContent = nrSum;
    if (ncTotEl) ncTotEl.textContent = ncSum;
    if (ntTotEl) ntTotEl.textContent = nrSum + ncSum;

    const f1Badge = document.getElementById("ebsF1StaffBadge");
    if (f1Badge) {
      f1Badge.textContent = `ஆசிரியர்: ${trSum + tcSum} | பணியாளர்: ${nrSum + ncSum}`;
    }
    const sumBanner = document.getElementById("ebsF1AutoFillSummary");
    const tmBanner = document.getElementById("teacherMasterDesignationSummary");
    if (sumBanner || tmBanner) {
      const ebsAll = getSchoolEbsData(activeSchoolSession, extra);
      const tParts = [];
      EBS_F1_TEACH_COLS.forEach(c => {
        const tot = (f1.teachReg[c.key] || 0) + (f1.teachCon[c.key] || 0);
        if (tot > 0) {
          const names = (ebsAll.form3Teachers || [])
            .filter(t => mapEmisDesigToEbs(t.desig || t.rawEmisDesig, true, activeSchoolSession.level).f1Col === c.key)
            .map(t => t.nameEn)
            .join(", ");
          tParts.push(`<span style="display:inline-block; background:#dcfce7; color:#14532d; border:1px solid #16a34a; padding:2px 8px; border-radius:6px; margin:2px;"><strong>${c.label}: ${tot}</strong>${names ? " (" + names + ")" : ""}</span>`);
        }
      });
      const ntParts = [];
      EBS_F1_NONTEACH_COLS.forEach(c => {
        const tot = (f1.nonTeachReg[c.key] || 0) + (f1.nonTeachCon[c.key] || 0);
        if (tot > 0) {
          const names = (ebsAll.form4NonTeaching || [])
            .filter(emp => mapEmisDesigToEbs(emp.desig || emp.rawEmisDesig, false, activeSchoolSession.level).f1Col === c.key)
            .map(emp => emp.nameEn)
            .join(", ");
          ntParts.push(`<span style="display:inline-block; background:#dbeafe; color:#1e40af; border:1px solid #2563eb; padding:2px 8px; border-radius:6px; margin:2px;"><strong>${c.label}: ${tot}</strong>${names ? " (" + names + ")" : ""}</span>`);
        }
      });
      const summaryHtml = `✅ <strong>Teacher Master (EMIS) பகுதியிலிருந்து பதவி வாரியாக (Designation-wise) தானாகப் பூர்த்தி செய்யப்பட்ட விவரம்:</strong><br>` +
        `<div style="margin-top:4px;">👨‍🏫 <strong>ஆசிரியர்கள் (மொத்தம்: ${trSum + tcSum} — Regular: ${trSum}, Contract: ${tcSum}):</strong> ${tParts.length > 0 ? tParts.join(" ") : "0"}</div>` +
        `<div style="margin-top:4px;">🏢 <strong>அலுவலகப் பணியாளர்கள் (மொத்தம்: ${nrSum + ncSum} — Regular: ${nrSum}, Contract: ${ncSum}):</strong> ${ntParts.length > 0 ? ntParts.join(" ") : "0"}</div>`;
      if (sumBanner) sumBanner.innerHTML = summaryHtml;
      if (tmBanner) tmBanner.innerHTML = summaryHtml;
    }

    // SSLC
    const sTmB = Number((document.getElementById("ebsF1SslcTmB") || {}).value || 0);
    const sTmG = Number((document.getElementById("ebsF1SslcTmG") || {}).value || 0);
    const sEmB = Number((document.getElementById("ebsF1SslcEmB") || {}).value || 0);
    const sEmG = Number((document.getElementById("ebsF1SslcEmG") || {}).value || 0);
    const sOptB = Number((document.getElementById("ebsF1SslcOptB") || {}).value || 0);
    const sOptG = Number((document.getElementById("ebsF1SslcOptG") || {}).value || 0);
    f1.sslc = { tmB: sTmB, tmG: sTmG, emB: sEmB, emG: sEmG, optB: sOptB, optG: sOptG };
    document.getElementById("ebsF1SslcTmT").textContent = sTmB + sTmG;
    document.getElementById("ebsF1SslcEmT").textContent = sEmB + sEmG;
    document.getElementById("ebsF1SslcTotB").textContent = sTmB + sEmB;
    document.getElementById("ebsF1SslcTotG").textContent = sTmG + sEmG;
    document.getElementById("ebsF1SslcTotT").textContent = sTmB + sTmG + sEmB + sEmG;
    document.getElementById("ebsF1SslcOptT").textContent = sOptB + sOptG;

    // HSC
    const hTmB = Number((document.getElementById("ebsF1HscTmB") || {}).value || 0);
    const hTmG = Number((document.getElementById("ebsF1HscTmG") || {}).value || 0);
    const hEmB = Number((document.getElementById("ebsF1HscEmB") || {}).value || 0);
    const hEmG = Number((document.getElementById("ebsF1HscEmG") || {}).value || 0);
    const hHinB = Number((document.getElementById("ebsF1HscHinB") || {}).value || 0);
    const hHinG = Number((document.getElementById("ebsF1HscHinG") || {}).value || 0);
    const hFreB = Number((document.getElementById("ebsF1HscFreB") || {}).value || 0);
    const hFreG = Number((document.getElementById("ebsF1HscFreG") || {}).value || 0);
    const hSanB = Number((document.getElementById("ebsF1HscSanB") || {}).value || 0);
    const hSanG = Number((document.getElementById("ebsF1HscSanG") || {}).value || 0);
    f1.hsc = { tmB: hTmB, tmG: hTmG, emB: hEmB, emG: hEmG, hinB: hHinB, hinG: hHinG, freB: hFreB, freG: hFreG, sanB: hSanB, sanG: hSanG };
    document.getElementById("ebsF1HscTmT").textContent = hTmB + hTmG;
    document.getElementById("ebsF1HscEmT").textContent = hEmB + hEmG;
    document.getElementById("ebsF1HscTotB").textContent = hTmB + hEmB;
    document.getElementById("ebsF1HscTotG").textContent = hTmG + hEmG;
    document.getElementById("ebsF1HscTotT").textContent = hTmB + hTmG + hEmB + hEmG;
    document.getElementById("ebsF1HscHinT").textContent = hHinB + hHinG;
    document.getElementById("ebsF1HscFreT").textContent = hFreB + hFreG;
    document.getElementById("ebsF1HscSanT").textContent = hSanB + hSanG;
    updateEbsReadinessScorecard();
  }

  function saveEbsForm1Submit(event) {
    event.preventDefault();
    if (isEbsLockedForSchool(activeSchoolSession)) { showToast('🔒 முதன்மைக் கல்வி அலுவலகத்தால் EBS படிவப் பதிவு முடக்கப்பட்டுள்ளது!', '#ef4444'); return false; }
    event.preventDefault();
    if (!activeSchoolSession) return;
    const extra = getSchoolExtra(activeSchoolSession.uNo);
    const f1 = getSchoolEbsData(activeSchoolSession, extra).form1;
    f1.schoolName = document.getElementById("ebsF1SchoolName").value.trim();
    f1.pincode = document.getElementById("ebsF1Pincode").value.trim();
    f1.hmName = document.getElementById("ebsF1HmName").value.trim();
    f1.hmMobile = document.getElementById("ebsF1HmMobile").value.trim();
    f1.ahmName = document.getElementById("ebsF1AhmName").value.trim();
    f1.ahmMobile = document.getElementById("ebsF1AhmMobile").value.trim();
    f1.gmail = document.getElementById("ebsF1Gmail").value.trim();
    f1.landline = document.getElementById("ebsF1Landline").value.trim();
    f1.totalRooms = Number(document.getElementById("ebsF1TotalRooms").value || 0);
    f1.examRooms = Number(document.getElementById("ebsF1ExamRooms").value || 0);
    f1.benchPairs = Number(document.getElementById("ebsF1BenchPairs").value || 0);
    recalcEbsForm1Totals();
    safeSetStorage("CEOSVG_SCHOOL_EXTRA_V6", schoolExtraDataStore);
    sendToAppsScript({ action: "save_ebs_form1", uNo: activeSchoolSession.uNo, udiseNo: activeSchoolSession.udiseNo, form1: f1 });
    showToast("✅ EBS FORM – I (School Profile) விவரங்கள் வெற்றிகரமாகச் சேமிக்கப்பட்டன!", "#22c55e");
  }

  // FORM - II UI & Logic
  function renderEbsForm2UI(s, f2Map) {
    const tbody = document.getElementById("ebsF2SubjectsTbody");
    if (!tbody) return;
    tbody.innerHTML = EBS_F2_SUBJECTS.map((item, idx) => {
      const rec = f2Map[item.key] || { tm: 0, em: 0, total: 0, otherName: "" };
      let subjectCells = "";
      if (idx === 0) {
        subjectCells = `<td rowspan="4" style="font-weight:800; width:110px; background:#f8fafc;">Language</td><td style="text-align:left; font-weight:700; padding-left:10px;">Tamil</td>`;
      } else if (idx >= 1 && idx <= 3) {
        subjectCells = `<td style="text-align:left; font-weight:700; padding-left:10px;">${item.sub}</td>`;
      } else if (item.hasOtherName) {
        subjectCells = `<td colspan="2" style="text-align:left; font-weight:700; padding-left:10px;">Others: <input type="text" id="ebsF2OtherName_${item.key}" class="form-control" style="display:inline-block; width:100%; max-width:220px; padding:4px 8px; margin-top:4px;" placeholder="Mention Subject Name" value="${rec.otherName || ""}"></td>`;
      } else {
        subjectCells = `<td colspan="2" style="text-align:left; font-weight:700; padding-left:10px;">${item.sub}</td>`;
      }

      const snoCell = idx === 0 ? `<td rowspan="4" style="font-weight:900;">01</td>` : (idx >= 1 && idx <= 3 ? "" : `<td style="font-weight:900;">${item.sno}</td>`);

      if (item.shadedMedium) {
        return `
          <tr>
            ${snoCell}
            ${subjectCells}
            <td class="ebs-shaded-cell">—</td>
            <td class="ebs-shaded-cell">—</td>
            <td><input type="number" class="ebs-num-inp" id="ebsF2Tot_${item.key}" min="0" value="${rec.total || 0}" oninput="onEbsForm2Input('${item.key}', true)"></td>
          </tr>
        `;
      } else {
        const tot = Number(rec.tm || 0) + Number(rec.em || 0);
        return `
          <tr>
            ${snoCell}
            ${subjectCells}
            <td><input type="number" class="ebs-num-inp" id="ebsF2Tm_${item.key}" min="0" value="${rec.tm || 0}" oninput="onEbsForm2Input('${item.key}', false)"></td>
            <td><input type="number" class="ebs-num-inp" id="ebsF2Em_${item.key}" min="0" value="${rec.em || 0}" oninput="onEbsForm2Input('${item.key}', false)"></td>
            <td style="font-weight:900; background:#f1f5f9;" id="ebsF2Tot_${item.key}">${tot}</td>
          </tr>
        `;
      }
    }).join("");
  }

  function onEbsForm2Input(subKey, isShadedMedium) {
    if (!activeSchoolSession) return;
    const extra = getSchoolExtra(activeSchoolSession.uNo);
    const f2 = getSchoolEbsData(activeSchoolSession, extra).form2;
    if (!f2[subKey]) f2[subKey] = { tm: 0, em: 0, total: 0, otherName: "" };
    if (isShadedMedium) {
      f2[subKey].total = Number((document.getElementById("ebsF2Tot_" + subKey) || {}).value || 0);
    } else {
      const tm = Number((document.getElementById("ebsF2Tm_" + subKey) || {}).value || 0);
      const em = Number((document.getElementById("ebsF2Em_" + subKey) || {}).value || 0);
      f2[subKey].tm = tm;
      f2[subKey].em = em;
      f2[subKey].total = tm + em;
      const totEl = document.getElementById("ebsF2Tot_" + subKey);
      if (totEl) totEl.textContent = tm + em;
    }
    updateEbsReadinessScorecard();
  }

  function saveEbsForm2Submit(event) {
    event.preventDefault();
    if (isEbsLockedForSchool(activeSchoolSession)) { showToast('🔒 முதன்மைக் கல்வி அலுவலகத்தால் EBS படிவப் பதிவு முடக்கப்பட்டுள்ளது!', '#ef4444'); return false; }
    event.preventDefault();
    if (!activeSchoolSession) return;
    const extra = getSchoolExtra(activeSchoolSession.uNo);
    const f2 = getSchoolEbsData(activeSchoolSession, extra).form2;
    const otherInp = document.getElementById("ebsF2OtherName_27_Others");
    if (otherInp && f2["27_Others"]) {
      f2["27_Others"].otherName = otherInp.value.trim();
    }
    safeSetStorage("CEOSVG_SCHOOL_EXTRA_V6", schoolExtraDataStore);
    sendToAppsScript({ action: "save_ebs_form2", uNo: activeSchoolSession.uNo, udiseNo: activeSchoolSession.udiseNo, form2: f2 });
    showToast("✅ EBS FORM – II (+2 Subject Strength) விவரங்கள் சேமிக்கப்பட்டன!", "#22c55e");
  }

  // FORM - III (Teachers Profile) Logic
  function resetEbsForm3Inputs() {
    document.getElementById("ebsF3EditId").value = "";
    document.getElementById("ebsF3FormTitle").textContent = "➕ தலைமையாசிரியர் / முதல்வர் / ஆசிரியர் சுயவிவரம் சேர்க்க (Add Teacher for FORM-III)";
    const f3SubBtn = document.getElementById("ebsF3SubmitBtn");
    if (f3SubBtn) {
      f3SubBtn.innerHTML = "💾 ஆசிரியர் சுயவிவரத்தை FORM – III பட்டியலில் சேமி (Save Teacher Profile)";
      f3SubBtn.className = "btn btn-primary";
    }
    const f3CancelBtn = document.getElementById("ebsF3CancelEditBtn");
    if (f3CancelBtn) f3CancelBtn.style.display = "none";
    ["ebsF3NameEn", "ebsF3NameTa", "ebsF3EmisId", "ebsF3Qual", "ebsF3Sub10", "ebsF3Sub11", "ebsF3Sub12", "ebsF3Med10", "ebsF3Med11", "ebsF3Med12", "ebsF3DojFirst", "ebsF3FirstPostName", "ebsF3Dob", "ebsF3DojPresPost", "ebsF3UnitTransDate", "ebsF3DojPresSchool", "ebsF3Mobile", "ebsF3AltMobile", "ebsF3Email", "ebsF3Ifhrms", "ebsF3PracSslc1", "ebsF3PracHsc1", "ebsF3PracHsc2", "ebsF3DutySslcCentre", "ebsF3DutyHscCentre", "ebsF3DutyCampCentre", "ebsF3Remarks"].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.value = "";
    });
    document.getElementById("ebsF3ChildCentre1").value = "NIL";
    document.getElementById("ebsF3ChildCentre2").value = "NIL";
    document.getElementById("ebsF3DiffAbled").value = "No";
    document.getElementById("ebsF3LongLeave").value = "No";
  }

  function saveEbsForm3TeacherSubmit(event) {
    event.preventDefault();
    if (isEbsLockedForSchool(activeSchoolSession)) { showToast('🔒 முதன்மைக் கல்வி அலுவலகத்தால் ஆசிரியர் சேர்க்கை மற்றும் திருத்தங்கள் முடக்கப்பட்டுள்ளன!', '#ef4444'); return false; }
    event.preventDefault();
    if (!activeSchoolSession) return;
    const extra = getSchoolExtra(activeSchoolSession.uNo);
    const ebs = getSchoolEbsData(activeSchoolSession, extra);
    const editId = document.getElementById("ebsF3EditId").value;
    const existingObj = editId ? (ebs.form3Teachers.find(t => t.id === editId) || {}) : {};

    const teacherObj = Object.assign({}, existingObj, {
      id: editId || ("EBS-T-" + Date.now()),
      nameEn: document.getElementById("ebsF3NameEn").value.trim(),
      nameTa: document.getElementById("ebsF3NameTa").value.trim(),
      desig: document.getElementById("ebsF3Desig").value,
      gender: document.getElementById("ebsF3Gender").value,
      emisId: document.getElementById("ebsF3EmisId").value.trim(),
      qual: document.getElementById("ebsF3Qual").value.trim(),
      mainSub: document.getElementById("ebsF3MainSub").value,
      chk10: document.getElementById("ebsF3Chk10").checked,
      chk11_12: document.getElementById("ebsF3Chk11_12").checked,
      sub10: document.getElementById("ebsF3Sub10").value.trim(),
      sub11: document.getElementById("ebsF3Sub11").value.trim(),
      sub12: document.getElementById("ebsF3Sub12").value.trim(),
      med10: document.getElementById("ebsF3Med10").value,
      med11: document.getElementById("ebsF3Med11").value,
      med12: document.getElementById("ebsF3Med12").value,
      firstAppMode: document.getElementById("ebsF3FirstAppMode").value,
      dojFirst: document.getElementById("ebsF3DojFirst").value,
      firstPostName: document.getElementById("ebsF3FirstPostName").value.trim(),
      dob: document.getElementById("ebsF3Dob").value,
      presAppMode: document.getElementById("ebsF3PresAppMode").value,
      presNature: document.getElementById("ebsF3PresNature").value,
      dojPresPost: document.getElementById("ebsF3DojPresPost").value,
      unitTransDate: document.getElementById("ebsF3UnitTransDate").value,
      dojPresSchool: document.getElementById("ebsF3DojPresSchool").value,
      mobile: document.getElementById("ebsF3Mobile").value.trim(),
      altMobile: document.getElementById("ebsF3AltMobile").value.trim(),
      email: document.getElementById("ebsF3Email").value.trim(),
      resPlace: document.getElementById("ebsF3ResPlace").value.trim(),
      resDist: document.getElementById("ebsF3ResDist").value.trim(),
      ifhrms: document.getElementById("ebsF3Ifhrms").value.trim(),
      pracSslc1: document.getElementById("ebsF3PracSslc1").value.trim(),
      pracHsc1: document.getElementById("ebsF3PracHsc1").value.trim(),
      pracHsc2: document.getElementById("ebsF3PracHsc2").value.trim(),
      dutySslcWork: document.getElementById("ebsF3DutySslcWork").value,
      dutySslcCentre: document.getElementById("ebsF3DutySslcCentre").value.trim(),
      dutyHscWork: document.getElementById("ebsF3DutyHscWork").value,
      dutyHscCentre: document.getElementById("ebsF3DutyHscCentre").value.trim(),
      dutyCampWork: document.getElementById("ebsF3DutyCampWork").value,
      dutyCampCentre: document.getElementById("ebsF3DutyCampCentre").value.trim(),
      childCentre1: document.getElementById("ebsF3ChildCentre1").value.trim(),
      childCentre2: document.getElementById("ebsF3ChildCentre2").value.trim(),
      diffAbled: document.getElementById("ebsF3DiffAbled").value.trim(),
      longLeave: document.getElementById("ebsF3LongLeave").value.trim(),
      remarks: document.getElementById("ebsF3Remarks").value.trim(),
      prefCamp: document.getElementById("ebsF3PrefCamp").value
    });

    const idx = ebs.form3Teachers.findIndex(t => t.id === teacherObj.id);
    if (idx >= 0) {
      ebs.form3Teachers[idx] = teacherObj;
    } else {
      ebs.form3Teachers.push(teacherObj);
    }

    syncForm1CountsFromForm3And4(false);
    safeSetStorage("CEOSVG_SCHOOL_EXTRA_V6", schoolExtraDataStore);
    renderEbsForm3ListUI(activeSchoolSession, ebs.form3Teachers);
    updateEbsReadinessScorecard(activeSchoolSession, extra);
    resetEbsForm3Inputs();
    sendToAppsScript({ action: "save_ebs_form3", uNo: activeSchoolSession.uNo, udiseNo: activeSchoolSession.udiseNo, teacher: teacherObj });
    showToast("✅ FORM – III ஆசிரியர் சுயவிவரம் வெற்றிகரமாகச் சேமிக்கப்பட்டது!", "#22c55e");
  }

  function ensureSelectOptionExists(selectId, val) {
    if (!val) return;
    const el = document.getElementById(selectId);
    if (!el) return;
    const exists = Array.from(el.options).some(o => o.value === val);
    if (!exists) {
      const opt = document.createElement("option");
      opt.value = val;
      opt.textContent = val;
      el.appendChild(opt);
    }
    el.value = val;
  }

  function editEbsForm3Teacher(id, skipScroll) {
    if (!activeSchoolSession) return;
    const extra = getSchoolExtra(activeSchoolSession.uNo);
    const ebs = getSchoolEbsData(activeSchoolSession, extra);
    const t = ebs.form3Teachers.find(item => item.id === id);
    if (!t) return;
    document.getElementById("ebsF3EditId").value = t.id;
    const f3Title = document.getElementById("ebsF3FormTitle");
    if (f3Title) {
      f3Title.textContent = `✏️ ஆசிரியர் விவரம் திருத்துதல் / சரிசெய்தல் (Data Correction): ${t.nameEn} (EMIS: ${t.emisId || "-"})`;
    }
    const f3SubBtn = document.getElementById("ebsF3SubmitBtn");
    if (f3SubBtn) {
      f3SubBtn.innerHTML = `💾 ${t.nameEn} - திருத்தங்களைச் சேமி (Save Corrections)`;
      f3SubBtn.className = "btn btn-success";
      f3SubBtn.style.padding = "10px 22px";
    }
    const f3CancelBtn = document.getElementById("ebsF3CancelEditBtn");
    if (f3CancelBtn) f3CancelBtn.style.display = "inline-block";
    document.getElementById("ebsF3NameEn").value = t.nameEn || "";
    document.getElementById("ebsF3NameTa").value = t.nameTa || "";
    ensureSelectOptionExists("ebsF3Desig", t.desig || "BT ASSISTANT");
    document.getElementById("ebsF3Gender").value = t.gender || "Male";
    document.getElementById("ebsF3EmisId").value = t.emisId || "";
    document.getElementById("ebsF3Qual").value = t.qual || "";
    ensureSelectOptionExists("ebsF3MainSub", t.mainSub || "All Subjects");
    document.getElementById("ebsF3Chk10").checked = Boolean(t.chk10);
    document.getElementById("ebsF3Chk11_12").checked = Boolean(t.chk11_12);
    document.getElementById("ebsF3Sub10").value = t.sub10 || "";
    document.getElementById("ebsF3Sub11").value = t.sub11 || "";
    document.getElementById("ebsF3Sub12").value = t.sub12 || "";
    document.getElementById("ebsF3Med10").value = t.med10 || "";
    document.getElementById("ebsF3Med11").value = t.med11 || "";
    document.getElementById("ebsF3Med12").value = t.med12 || "";
    document.getElementById("ebsF3FirstAppMode").value = t.firstAppMode || "TRB";
    document.getElementById("ebsF3DojFirst").value = t.dojFirst || "";
    document.getElementById("ebsF3FirstPostName").value = t.firstPostName || "";
    document.getElementById("ebsF3Dob").value = t.dob || "";
    document.getElementById("ebsF3PresAppMode").value = t.presAppMode || "New Appointment";
    document.getElementById("ebsF3PresNature").value = t.presNature || "Regular";
    document.getElementById("ebsF3DojPresPost").value = t.dojPresPost || "";
    document.getElementById("ebsF3UnitTransDate").value = t.unitTransDate || "";
    document.getElementById("ebsF3DojPresSchool").value = t.dojPresSchool || "";
    document.getElementById("ebsF3Mobile").value = t.mobile || "";
    document.getElementById("ebsF3AltMobile").value = t.altMobile || "";
    document.getElementById("ebsF3Email").value = t.email || "";
    document.getElementById("ebsF3ResPlace").value = t.resPlace || "";
    document.getElementById("ebsF3ResDist").value = t.resDist || "Sivagangai";
    document.getElementById("ebsF3Ifhrms").value = t.ifhrms || "";
    document.getElementById("ebsF3PracSslc1").value = t.pracSslc1 || "";
    document.getElementById("ebsF3PracHsc1").value = t.pracHsc1 || "";
    document.getElementById("ebsF3PracHsc2").value = t.pracHsc2 || "";
    document.getElementById("ebsF3DutySslcWork").value = t.dutySslcWork || "Invigilator";
    document.getElementById("ebsF3DutySslcCentre").value = t.dutySslcCentre || "";
    document.getElementById("ebsF3DutyHscWork").value = t.dutyHscWork || "Invigilator";
    document.getElementById("ebsF3DutyHscCentre").value = t.dutyHscCentre || "";
    document.getElementById("ebsF3DutyCampWork").value = t.dutyCampWork || "AE";
    document.getElementById("ebsF3DutyCampCentre").value = t.dutyCampCentre || "";
    document.getElementById("ebsF3ChildCentre1").value = t.childCentre1 || "NIL";
    document.getElementById("ebsF3ChildCentre2").value = t.childCentre2 || "NIL";
    document.getElementById("ebsF3DiffAbled").value = t.diffAbled || "No";
    document.getElementById("ebsF3LongLeave").value = t.longLeave || "No";
    document.getElementById("ebsF3Remarks").value = t.remarks || "";
    document.getElementById("ebsF3PrefCamp").value = t.prefCamp || "Sivagangai";
    const qSel3 = document.getElementById("ebsF3QuickSelect");
    if (qSel3) qSel3.value = t.id;
    if (!skipScroll) {
      document.getElementById("ebsF3FormTitle").scrollIntoView({ behavior: "smooth", block: "center" });
      if (!t.nameTa) document.getElementById("ebsF3NameTa").focus();
      else if (!t.mobile) document.getElementById("ebsF3Mobile").focus();
    }
  }

  function deleteEbsForm3Teacher(id) {
    openDeleteRequestModal("F3", id);
  }

  let ebsShowCardsF3 = false;
  let ebsShowCardsF4 = false;

  function isTeacherRecordComplete(t) {
    return Boolean(t && t.nameTa && t.mobile && String(t.mobile).trim().length >= 10 && t.ifhrms);
  }

  function isNonTeachRecordComplete(emp) {
    return Boolean(emp && emp.nameTa && emp.mobile && String(emp.mobile).trim().length >= 10 && (emp.gpfCps || emp.ifhrms));
  }

  function toggleEbsCardsPreview(formKey) {
    if (!activeSchoolSession) return;
    const extra = getSchoolExtra(activeSchoolSession.uNo);
    const ebs = getSchoolEbsData(activeSchoolSession, extra);
    if (formKey === "F3") {
      ebsShowCardsF3 = !ebsShowCardsF3;
      renderEbsForm3ListUI(activeSchoolSession, ebs.form3Teachers);
    } else if (formKey === "F4") {
      ebsShowCardsF4 = !ebsShowCardsF4;
      renderEbsForm4ListUI(activeSchoolSession, ebs.form4NonTeaching);
    }
  }

  function filterEbsForm3Table() {
    if (!activeSchoolSession) return;
    const extra = getSchoolExtra(activeSchoolSession.uNo);
    const ebs = getSchoolEbsData(activeSchoolSession, extra);
    renderEbsForm3ListUI(activeSchoolSession, ebs.form3Teachers);
  }

  function filterEbsForm4Table() {
    if (!activeSchoolSession) return;
    const extra = getSchoolExtra(activeSchoolSession.uNo);
    const ebs = getSchoolEbsData(activeSchoolSession, extra);
    renderEbsForm4ListUI(activeSchoolSession, ebs.form4NonTeaching);
  }

  function renderEbsForm3ListUI(s, list) {
    const isLocked = isEbsLockedForSchool(s);
    const allList = Array.isArray(list) ? list : [];
    const badge = document.getElementById("ebsF3CountBadge");
    if (badge) badge.textContent = allList.length;
    const qSel = document.getElementById("ebsF3QuickSelect");
    if (qSel) {
      qSel.innerHTML = allList.length === 0
        ? `<option value="">-- ஆசிரியர்கள் இல்லை --</option>`
        : allList.map((t, i) => `<option value="${t.id}">${i + 1}. ${t.nameEn} (${t.desig} - ${t.mainSub})</option>`).join("");
    }

    const q = ((document.getElementById("ebsF3SearchInput") || {}).value || "").trim().toLowerCase();
    const statusFilter = ((document.getElementById("ebsF3FilterStatus") || {}).value || "ALL");

    const completeCount = allList.filter(isTeacherRecordComplete).length;
    const incompleteCount = allList.length - completeCount;
    const statsBadge = document.getElementById("ebsF3FilterStatsBadge");
    if (statsBadge) {
      statsBadge.textContent = `மொத்தம்: ${allList.length} | ✅ முழுமை: ${completeCount} | ⚠️ விடுபட்டவை: ${incompleteCount}`;
    }

    const filtered = allList.filter(t => {
      const comp = isTeacherRecordComplete(t);
      if (statusFilter === "COMPLETE" && !comp) return false;
      if (statusFilter === "INCOMPLETE" && comp) return false;
      if (q) {
        const hay = `${t.nameEn || ""} ${t.nameTa || ""} ${t.desig || ""} ${t.mainSub || ""} ${t.emisId || ""} ${t.mobile || ""} ${t.ifhrms || ""}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });

    const tbody = document.getElementById("ebsF3TeachersListTbody");
    if (!tbody) return;
    if (filtered.length === 0) {
      tbody.innerHTML = `<tr><td colspan="7" style="text-align:center; padding:16px; color:#64748b;">தேர்ந்தெடுத்த வடிகட்டியில் FORM – III ஆசிரியர் விவரங்கள் ஏதுமில்லை.</td></tr>`;
    } else {
      tbody.innerHTML = filtered.map((t, idx) => {
        const isComplete = isTeacherRecordComplete(t);
        const isPendingDel = t.deleteReqStatus === "PENDING";
        return `
        <tr style="${isPendingDel ? 'background:#fffbeb;' : ''}">
          <td>${idx + 1}</td>
          <td>
            <strong>${t.nameEn}</strong><br>
            ${t.nameTa ? `<span style="color:#1e40af; font-weight:700;">${t.nameTa}</span>` : `<span style="color:#d97706; font-size:0.74rem; font-weight:800;">⚠️ தமிழ் பெயர் சேர்க்கவும்</span>`}
            ${isPendingDel ? `<div style="margin-top:4px; background:#fef3c7; color:#92400e; border:1px solid #f59e0b; padding:2px 6px; border-radius:4px; font-size:0.72rem; font-weight:800;">⏳ நீக்கக் கோரிக்கை நிலுவையில் (${t.deleteReqReason || ""})</div>` : ""}
          </td>
          <td><strong>${t.desig}</strong><br><span style="font-size:0.76rem; color:#475569;">${t.mainSub} (${t.qual || "-"})</span></td>
          <td>EMIS: <code>${t.emisId || "-"}</code><br>IFHRMS: <code>${t.ifhrms || "விடுபட்டுள்ளது"}</code></td>
          <td>${t.presNature} (${t.firstAppMode})<br><span style="font-size:0.75rem; color:#64748b;">DOB: ${t.dob || "-"} | DOJ: ${t.dojPresSchool || "-"}</span></td>
          <td>
            ${t.mobile ? `📞 <strong>${t.mobile}</strong>` : `<span style="color:#dc2626; font-size:0.75rem; font-weight:800;">⚠️ கைபேசி எண் சேர்க்கவும்</span>`}<br>
            <span class="${isComplete ? 'ebs-status-pill-ok' : 'ebs-status-pill-warn'}">${isComplete ? '✅ முழுமை பெற்றது' : '✏️ விடுபட்டவை நிரப்புக'}</span>
          </td>
          <td style="white-space:nowrap;">
            <button type="button" class="btn btn-secondary btn-sm" onclick="printSingleForm3Teacher('${t.id}')">🖨️ Print A4</button>
            ${isLocked
              ? `<button type="button" class="btn btn-outline btn-sm" disabled style="opacity:0.55; cursor:not-allowed;" title="🔒 சேர்க்கை &amp; திருத்தம் முடக்கப்பட்டுள்ளது (View &amp; Print Only)">🔒 திருத்து</button>`
              : `<button type="button" class="btn btn-primary btn-sm" onclick="editEbsForm3Teacher('${t.id}')">✏️ திருத்து / பூர்த்தி செய்</button>`
            }
            ${isLocked
              ? `<button type="button" class="btn btn-outline btn-sm" disabled style="opacity:0.45; cursor:not-allowed;" title="🔒 நீக்கக் கோரிக்கை முடக்கப்பட்டுள்ளது">🔒 நீக்கம்</button>`
              : (isPendingDel
                  ? `<button type="button" class="btn btn-outline btn-sm" style="border-color:#d97706; color:#92400e;" onclick="cancelSchoolDeleteRequest('F3', '${t.id}')">↩️ கோரிக்கை ரத்து</button>`
                  : `<button type="button" class="btn btn-danger btn-sm" onclick="openDeleteRequestModal('F3', '${t.id}')">🗑️ Delete Request</button>`
                )
            }
          </td>
        </tr>
      `;
      }).join("");
    }

    const cardsBox3 = document.getElementById("ebsF3AllCardsPreview");
    const toggleBtn3 = document.getElementById("ebsF3ToggleCardsBtn");
    if (toggleBtn3) {
      toggleBtn3.textContent = ebsShowCardsF3
        ? `🃏 சுயவிவர அட்டைகளை மறை (${filtered.length})`
        : `🃏 அனைத்து சுயவிவர அட்டைகள் காட்டு (${filtered.length})`;
    }
    if (cardsBox3) {
      if (!ebsShowCardsF3) {
        cardsBox3.innerHTML = "";
      } else {
        cardsBox3.innerHTML = `
          <div style="background:#f8fafc; border:1.5px solid #cbd5e1; border-radius:10px; padding:12px 14px;">
            <div style="font-weight:900; color:#0f294a; font-size:0.88rem; margin-bottom:8px;">📌 படிவம் 3 (FORM – III) பதிவு செய்யப்பட்டுள்ள ஆசிரியர்கள் சுருக்க அட்டைகள் (மொத்தம்: ${filtered.length}):</div>
            <div class="grid-3">
              ${filtered.map((t, idx) => `
                <div style="background:#ffffff; border:1.5px solid #93c5fd; border-left:5px solid #1d4ed8; border-radius:8px; padding:12px; font-size:0.95rem;">
                  <div style="display:flex; justify-content:space-between; align-items:center;">
                    <span style="background:#dbeafe; color:#1e40af; font-weight:900; padding:1px 8px; border-radius:999px;">#${idx + 1} ${t.desig}</span>
                    <code style="font-weight:800; color:#0f766e;">EMIS: ${t.emisId || "-"}</code>
                  </div>
                  <div style="font-weight:900; font-size:1.06rem; color:#0f294a; margin-top:4px;">${t.nameEn}</div>
                  <div style="font-weight:800; color:#1d4ed8;">${t.nameTa || "-"}</div>
                  <div style="color:#334155; margin-top:4px;">📚 பாடம்: <strong>${t.mainSub}</strong> | தகுதி: ${t.qual || "-"}</div>
                  <div style="color:#475569;">🎂 DOB: ${t.dob || "-"} | 🏫 DOJ: ${t.dojPresSchool || "-"} (${t.presNature})</div>
                  <div style="margin-top:6px; display:flex; gap:6px;">
                    <button type="button" class="btn btn-primary btn-sm" onclick="editEbsForm3Teacher('${t.id}')">✏️ படிவத்தில் திற</button>
                    <button type="button" class="btn btn-outline btn-sm" onclick="printSingleForm3Teacher('${t.id}')">🖨️ Print Form-III</button>
                  </div>
                </div>
              `).join("")}
            </div>
          </div>
        `;
      }
    }
    updateEbsReadinessScorecard();
  }

  // FORM - IV (Non-Teaching Staff Profile) Logic
  function resetEbsForm4Inputs() {
    document.getElementById("ebsF4EditId").value = "";
    document.getElementById("ebsF4FormTitle").textContent = "➕ ஆசிரியரல்லாத பணியாளர் சுயவிவரம் சேர்க்க (Add Non-Teaching Staff for FORM-IV)";
    const f4SubBtn = document.getElementById("ebsF4SubmitBtn");
    if (f4SubBtn) {
      f4SubBtn.innerHTML = "💾 பணியாளர் சுயவிவரத்தை FORM – IV பட்டியலில் சேமி (Save Non-Teaching Profile)";
      f4SubBtn.className = "btn btn-primary";
    }
    const f4CancelBtn = document.getElementById("ebsF4CancelEditBtn");
    if (f4CancelBtn) f4CancelBtn.style.display = "none";
    ["ebsF4NameEn", "ebsF4NameTa", "ebsF4EmisId", "ebsF4GpfCps", "ebsF4Dob", "ebsF4DojService", "ebsF4DojPresPost", "ebsF4DojPresSchool", "ebsF4Mobile", "ebsF4AltMobile", "ebsF4ResPlace", "ebsF4Ifhrms", "ebsF4DutySslcCentre", "ebsF4DutyHscCentre", "ebsF4DutyCampCentre", "ebsF4Remarks"].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.value = "";
    });
    document.getElementById("ebsF4ChildCentre1").value = "NIL";
    document.getElementById("ebsF4ChildCentre2").value = "NIL";
    document.getElementById("ebsF4DiffAbled").value = "No";
    document.getElementById("ebsF4LongLeave").value = "No";
  }

  function saveEbsForm4NonTeachSubmit(event) {
    event.preventDefault();
    if (isEbsLockedForSchool(activeSchoolSession)) { showToast('🔒 முதன்மைக் கல்வி அலுவலகத்தால் பணியாளர் சேர்க்கை மற்றும் திருத்தங்கள் முடக்கப்பட்டுள்ளன!', '#ef4444'); return false; }
    event.preventDefault();
    if (!activeSchoolSession) return;
    const extra = getSchoolExtra(activeSchoolSession.uNo);
    const ebs = getSchoolEbsData(activeSchoolSession, extra);
    const editId = document.getElementById("ebsF4EditId").value;
    const existingObj = editId ? (ebs.form4NonTeaching.find(item => item.id === editId) || {}) : {};

    const empObj = Object.assign({}, existingObj, {
      id: editId || ("EBS-NT-" + Date.now()),
      nameEn: document.getElementById("ebsF4NameEn").value.trim(),
      nameTa: document.getElementById("ebsF4NameTa").value.trim(),
      desig: document.getElementById("ebsF4Desig").value,
      gender: document.getElementById("ebsF4Gender").value,
      emisId: document.getElementById("ebsF4EmisId").value.trim(),
      gpfCps: document.getElementById("ebsF4GpfCps").value.trim(),
      dob: document.getElementById("ebsF4Dob").value,
      dojService: document.getElementById("ebsF4DojService").value,
      nature: document.getElementById("ebsF4Nature").value,
      dojPresPost: document.getElementById("ebsF4DojPresPost").value,
      dojPresSchool: document.getElementById("ebsF4DojPresSchool").value,
      mobile: document.getElementById("ebsF4Mobile").value.trim(),
      altMobile: document.getElementById("ebsF4AltMobile").value.trim(),
      resPlace: document.getElementById("ebsF4ResPlace").value.trim(),
      resDist: document.getElementById("ebsF4ResDist").value.trim(),
      ifhrms: document.getElementById("ebsF4Ifhrms").value.trim(),
      dutySslcWork: document.getElementById("ebsF4DutySslcWork").value,
      dutySslcCentre: document.getElementById("ebsF4DutySslcCentre").value.trim(),
      dutyHscWork: document.getElementById("ebsF4DutyHscWork").value,
      dutyHscCentre: document.getElementById("ebsF4DutyHscCentre").value.trim(),
      dutyCampWork: document.getElementById("ebsF4DutyCampWork").value,
      dutyCampCentre: document.getElementById("ebsF4DutyCampCentre").value.trim(),
      childCentre1: document.getElementById("ebsF4ChildCentre1").value.trim(),
      childCentre2: document.getElementById("ebsF4ChildCentre2").value.trim(),
      diffAbled: document.getElementById("ebsF4DiffAbled").value.trim(),
      longLeave: document.getElementById("ebsF4LongLeave").value.trim(),
      remarks: document.getElementById("ebsF4Remarks").value.trim()
    });

    const idx = ebs.form4NonTeaching.findIndex(item => item.id === empObj.id);
    if (idx >= 0) {
      ebs.form4NonTeaching[idx] = empObj;
    } else {
      ebs.form4NonTeaching.push(empObj);
    }

    syncForm1CountsFromForm3And4(false);
    safeSetStorage("CEOSVG_SCHOOL_EXTRA_V6", schoolExtraDataStore);
    renderEbsForm4ListUI(activeSchoolSession, ebs.form4NonTeaching);
    updateEbsReadinessScorecard(activeSchoolSession, extra);
    resetEbsForm4Inputs();
    sendToAppsScript({ action: "save_ebs_form4", uNo: activeSchoolSession.uNo, udiseNo: activeSchoolSession.udiseNo, employee: empObj });
    showToast("✅ FORM – IV ஆசிரியரல்லாத பணியாளர் சுயவிவரம் சேமிக்கப்பட்டது!", "#22c55e");
  }

  function editEbsForm4NonTeach(id, skipScroll) {
    if (!activeSchoolSession) return;
    const extra = getSchoolExtra(activeSchoolSession.uNo);
    const ebs = getSchoolEbsData(activeSchoolSession, extra);
    const emp = ebs.form4NonTeaching.find(item => item.id === id);
    if (!emp) return;
    document.getElementById("ebsF4EditId").value = emp.id;
    const f4Title = document.getElementById("ebsF4FormTitle");
    if (f4Title) {
      f4Title.textContent = `✏️ பணியாளர் விவரம் திருத்துதல் / சரிசெய்தல் (Data Correction): ${emp.nameEn} (EMIS: ${emp.emisId || "-"})`;
    }
    const f4SubBtn = document.getElementById("ebsF4SubmitBtn");
    if (f4SubBtn) {
      f4SubBtn.innerHTML = `💾 ${emp.nameEn} - திருத்தங்களைச் சேமி (Save Corrections)`;
      f4SubBtn.className = "btn btn-success";
      f4SubBtn.style.padding = "10px 22px";
    }
    const f4CancelBtn = document.getElementById("ebsF4CancelEditBtn");
    if (f4CancelBtn) f4CancelBtn.style.display = "inline-block";
    document.getElementById("ebsF4NameEn").value = emp.nameEn || "";
    document.getElementById("ebsF4NameTa").value = emp.nameTa || "";
    ensureSelectOptionExists("ebsF4Desig", emp.desig || "JUNIOR ASSISTANT");
    document.getElementById("ebsF4Gender").value = emp.gender || "Male";
    document.getElementById("ebsF4EmisId").value = emp.emisId || "";
    document.getElementById("ebsF4GpfCps").value = emp.gpfCps || "";
    document.getElementById("ebsF4Dob").value = emp.dob || "";
    document.getElementById("ebsF4DojService").value = emp.dojService || "";
    document.getElementById("ebsF4Nature").value = emp.nature || "Regular";
    document.getElementById("ebsF4DojPresPost").value = emp.dojPresPost || "";
    document.getElementById("ebsF4DojPresSchool").value = emp.dojPresSchool || "";
    document.getElementById("ebsF4Mobile").value = emp.mobile || "";
    document.getElementById("ebsF4AltMobile").value = emp.altMobile || "";
    document.getElementById("ebsF4ResPlace").value = emp.resPlace || "";
    document.getElementById("ebsF4ResDist").value = emp.resDist || "Sivagangai";
    document.getElementById("ebsF4Ifhrms").value = emp.ifhrms || "";
    document.getElementById("ebsF4DutySslcWork").value = emp.dutySslcWork || "Others";
    document.getElementById("ebsF4DutySslcCentre").value = emp.dutySslcCentre || "";
    document.getElementById("ebsF4DutyHscWork").value = emp.dutyHscWork || "Others";
    document.getElementById("ebsF4DutyHscCentre").value = emp.dutyHscCentre || "";
    document.getElementById("ebsF4DutyCampWork").value = emp.dutyCampWork || "Not Allotted";
    document.getElementById("ebsF4DutyCampCentre").value = emp.dutyCampCentre || "";
    document.getElementById("ebsF4ChildCentre1").value = emp.childCentre1 || "NIL";
    document.getElementById("ebsF4ChildCentre2").value = emp.childCentre2 || "NIL";
    document.getElementById("ebsF4DiffAbled").value = emp.diffAbled || "No";
    document.getElementById("ebsF4LongLeave").value = emp.longLeave || "No";
    document.getElementById("ebsF4Remarks").value = emp.remarks || "";
    const qSel4 = document.getElementById("ebsF4QuickSelect");
    if (qSel4) qSel4.value = emp.id;
    if (!skipScroll) {
      document.getElementById("ebsF4FormTitle").scrollIntoView({ behavior: "smooth", block: "center" });
      if (!emp.nameTa) document.getElementById("ebsF4NameTa").focus();
      else if (!emp.mobile) document.getElementById("ebsF4Mobile").focus();
    }
  }

  function deleteEbsForm4NonTeach(id) {
    openDeleteRequestModal("F4", id);
  }

  function renderEbsForm4ListUI(s, list) {
    const isLocked = isEbsLockedForSchool(s);
    const allList = Array.isArray(list) ? list : [];
    const badge = document.getElementById("ebsF4CountBadge");
    if (badge) badge.textContent = allList.length;
    const qSel = document.getElementById("ebsF4QuickSelect");
    if (qSel) {
      qSel.innerHTML = allList.length === 0
        ? `<option value="">-- பணியாளர்கள் இல்லை --</option>`
        : allList.map((emp, i) => `<option value="${emp.id}">${i + 1}. ${emp.nameEn} (${emp.desig})</option>`).join("");
    }

    const q = ((document.getElementById("ebsF4SearchInput") || {}).value || "").trim().toLowerCase();
    const statusFilter = ((document.getElementById("ebsF4FilterStatus") || {}).value || "ALL");

    const completeCount = allList.filter(isNonTeachRecordComplete).length;
    const incompleteCount = allList.length - completeCount;
    const statsBadge = document.getElementById("ebsF4FilterStatsBadge");
    if (statsBadge) {
      statsBadge.textContent = `மொத்தம்: ${allList.length} | ✅ முழுமை: ${completeCount} | ⚠️ விடுபட்டவை: ${incompleteCount}`;
    }

    const filtered = allList.filter(emp => {
      const comp = isNonTeachRecordComplete(emp);
      if (statusFilter === "COMPLETE" && !comp) return false;
      if (statusFilter === "INCOMPLETE" && comp) return false;
      if (q) {
        const hay = `${emp.nameEn || ""} ${emp.nameTa || ""} ${emp.desig || ""} ${emp.emisId || ""} ${emp.gpfCps || ""} ${emp.mobile || ""} ${emp.ifhrms || ""}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });

    const tbody = document.getElementById("ebsF4NonTeachListTbody");
    if (!tbody) return;
    if (filtered.length === 0) {
      tbody.innerHTML = `<tr><td colspan="7" style="text-align:center; padding:16px; color:#64748b;">தேர்ந்தெடுத்த வடிகட்டியில் FORM – IV ஆசிரியரல்லாத பணியாளர் விவரங்கள் ஏதுமில்லை.</td></tr>`;
    } else {
      tbody.innerHTML = filtered.map((emp, idx) => {
        const isComplete = isNonTeachRecordComplete(emp);
        const isPendingDel = emp.deleteReqStatus === "PENDING";
        return `
        <tr style="${isPendingDel ? 'background:#fffbeb;' : ''}">
          <td>${idx + 1}</td>
          <td>
            <strong>${emp.nameEn}</strong><br>
            ${emp.nameTa ? `<span style="color:#1e40af; font-weight:700;">${emp.nameTa}</span>` : `<span style="color:#d97706; font-size:0.74rem; font-weight:800;">⚠️ தமிழ் பெயர் சேர்க்கவும்</span>`}
            ${isPendingDel ? `<div style="margin-top:4px; background:#fef3c7; color:#92400e; border:1px solid #f59e0b; padding:2px 6px; border-radius:4px; font-size:0.72rem; font-weight:800;">⏳ நீக்கக் கோரிக்கை நிலுவையில் (${emp.deleteReqReason || ""})</div>` : ""}
          </td>
          <td><strong>${emp.desig}</strong><br><span style="font-size:0.75rem; color:#64748b;">${emp.gender}</span></td>
          <td>EMIS: <code>${emp.emisId || "-"}</code><br>GPF/CPS: <code>${emp.gpfCps || "விடுபட்டுள்ளது"}</code></td>
          <td>${emp.nature}<br><span style="font-size:0.75rem; color:#64748b;">DOB: ${emp.dob || "-"} | DOJ: ${emp.dojPresSchool || "-"}</span></td>
          <td>
            ${emp.mobile ? `📞 <strong>${emp.mobile}</strong>` : `<span style="color:#dc2626; font-size:0.75rem; font-weight:800;">⚠️ கைபேசி எண் சேர்க்கவும்</span>`}<br>
            <span class="${isComplete ? 'ebs-status-pill-ok' : 'ebs-status-pill-warn'}">${isComplete ? '✅ முழுமை பெற்றது' : '✏️ விடுபட்டவை நிரப்புக'}</span>
          </td>
          <td style="white-space:nowrap;">
            <button type="button" class="btn btn-secondary btn-sm" onclick="printSingleForm4NonTeach('${emp.id}')">🖨️ Print A4</button>
            ${isLocked
              ? `<button type="button" class="btn btn-outline btn-sm" disabled style="opacity:0.55; cursor:not-allowed;" title="🔒 சேர்க்கை &amp; திருத்தம் முடக்கப்பட்டுள்ளது (View &amp; Print Only)">🔒 திருத்து</button>`
              : `<button type="button" class="btn btn-primary btn-sm" onclick="editEbsForm4NonTeach('${emp.id}')">✏️ திருத்து / பூர்த்தி செய்</button>`
            }
            ${isLocked
              ? `<button type="button" class="btn btn-outline btn-sm" disabled style="opacity:0.45; cursor:not-allowed;" title="🔒 நீக்கக் கோரிக்கை முடக்கப்பட்டுள்ளது">🔒 நீக்கம்</button>`
              : (isPendingDel
                  ? `<button type="button" class="btn btn-outline btn-sm" style="border-color:#d97706; color:#92400e;" onclick="cancelSchoolDeleteRequest('F4', '${emp.id}')">↩️ கோரிக்கை ரத்து</button>`
                  : `<button type="button" class="btn btn-danger btn-sm" onclick="openDeleteRequestModal('F4', '${emp.id}')">🗑️ Delete Request</button>`
                )
            }
          </td>
        </tr>
      `;
      }).join("");
    }

    const cardsBox4 = document.getElementById("ebsF4AllCardsPreview");
    const toggleBtn4 = document.getElementById("ebsF4ToggleCardsBtn");
    if (toggleBtn4) {
      toggleBtn4.textContent = ebsShowCardsF4
        ? `🃏 சுயவிவர அட்டைகளை மறை (${filtered.length})`
        : `🃏 அனைத்து சுயவிவர அட்டைகள் காட்டு (${filtered.length})`;
    }
    if (cardsBox4) {
      if (!ebsShowCardsF4) {
        cardsBox4.innerHTML = "";
      } else {
        cardsBox4.innerHTML = `
          <div style="background:#f8fafc; border:1.5px solid #cbd5e1; border-radius:10px; padding:12px 14px;">
            <div style="font-weight:900; color:#0f294a; font-size:0.88rem; margin-bottom:8px;">📌 படிவம் 4 (FORM – IV) பதிவு செய்யப்பட்டுள்ள அலுவலகப் பணியாளர்கள் சுருக்க அட்டைகள் (மொத்தம்: ${filtered.length}):</div>
            <div class="grid-3">
              ${filtered.map((emp, idx) => `
                <div style="background:#ffffff; border:1.5px solid #86efac; border-left:5px solid #15803d; border-radius:8px; padding:12px; font-size:0.95rem;">
                  <div style="display:flex; justify-content:space-between; align-items:center;">
                    <span style="background:#dcfce7; color:#14532d; font-weight:900; padding:1px 8px; border-radius:999px;">#${idx + 1} ${emp.desig}</span>
                    <code style="font-weight:800; color:#0f766e;">EMIS: ${emp.emisId || "-"}</code>
                  </div>
                  <div style="font-weight:900; font-size:1.06rem; color:#0f294a; margin-top:4px;">${emp.nameEn}</div>
                  <div style="font-weight:800; color:#15803d;">${emp.nameTa || "-"}</div>
                  <div style="color:#334155; margin-top:4px;">🗂️ GPF/CPS: <strong>${emp.gpfCps || "-"}</strong> | IFHRMS: ${emp.ifhrms || "-"}</div>
                  <div style="color:#475569;">🎂 DOB: ${emp.dob || "-"} | 🏫 DOJ: ${emp.dojPresSchool || "-"} (${emp.nature})</div>
                  <div style="margin-top:6px; display:flex; gap:6px;">
                    <button type="button" class="btn btn-primary btn-sm" onclick="editEbsForm4NonTeach('${emp.id}')">✏️ படிவத்தில் திற</button>
                    <button type="button" class="btn btn-outline btn-sm" onclick="printSingleForm4NonTeach('${emp.id}')">🖨️ Print Form-IV</button>
                  </div>
                </div>
              `).join("")}
            </div>
          </div>
        `;
      }
    }
    updateEbsReadinessScorecard();
  }

  // =========================================================================
  // STAFF DELETE REQUEST & ADMIN APPROVAL ENGINE
  // =========================================================================
  function openDeleteRequestModal(formType, staffId) {
    if (!activeSchoolSession) return;
    const s = activeSchoolSession;
    const extra = getSchoolExtra(s.uNo);
    const ebs = getSchoolEbsData(s, extra);

    let staffObj = null;
    let formLabel = "";
    if (formType === "F3") {
      staffObj = (ebs.form3Teachers || []).find(t => t.id === staffId);
      formLabel = "FORM – III (ஆசிரியர் சுயவிவரப் பட்டியல்)";
    } else if (formType === "F4") {
      staffObj = (ebs.form4NonTeaching || []).find(emp => emp.id === staffId);
      formLabel = "FORM – IV (ஆசிரியரல்லாத பணியாளர் பட்டியல்)";
    } else if (formType === "STF") {
      staffObj = (extra.staff || []).find(st => st.id === staffId);
      formLabel = "பள்ளி பணியாளர் பதிவேடு (Staff Register)";
    }
    if (!staffObj) return;

    document.getElementById("delReqFormType").value = formType;
    document.getElementById("delReqStaffId").value = staffId;
    document.getElementById("delReqReasonCategory").value = "";
    document.getElementById("delReqReasonDetail").value = "";

    const summaryBox = document.getElementById("delReqStaffSummaryBox");
    summaryBox.innerHTML = `
      <div><strong>பள்ளி:</strong> [${s.uNo}] ${s.nameTa} (UDISE: ${s.udiseNo})</div>
      <div><strong>படிவம்:</strong> <span style="color:#1d4ed8; font-weight:800;">${formLabel}</span></div>
      <div><strong>பணியாளர் பெயர்:</strong> <span style="color:#991b1b; font-weight:900;">${staffObj.nameEn || staffObj.name || ""} ${staffObj.nameTa ? "(" + staffObj.nameTa + ")" : ""}</span></div>
      <div><strong>பதவி (Designation):</strong> ${staffObj.desig || "-"} | <strong>EMIS ID:</strong> <code>${staffObj.emisId || "-"}</code></div>
    `;

    document.getElementById("deleteRequestModal").classList.add("open");
  }

  function closeDeleteRequestModal() {
    document.getElementById("deleteRequestModal").classList.remove("open");
  }

  function submitStaffDeleteRequest(event) {
    event.preventDefault();
    if (isEbsLockedForSchool(activeSchoolSession)) { showToast('🔒 முதன்மைக் கல்வி அலுவலகத்தால் பணியாளர் நீக்கக் கோரிக்கைகள் முடக்கப்பட்டுள்ளன!', '#ef4444'); return false; }
    event.preventDefault();
    if (!activeSchoolSession) return;
    const s = activeSchoolSession;
    const extra = getSchoolExtra(s.uNo);
    const ebs = getSchoolEbsData(s, extra);

    const formType = document.getElementById("delReqFormType").value;
    const staffId = document.getElementById("delReqStaffId").value;
    const reasonCat = document.getElementById("delReqReasonCategory").value;
    const reasonDet = document.getElementById("delReqReasonDetail").value.trim();

    if (!reasonCat || !reasonDet) {
      showToast("⚠️ நீக்குவதற்கான காரணத்தைத் தேர்ந்தெடுத்து விவரத்தை உள்ளிடவும்.", "#ef4444");
      return;
    }

    let staffObj = null;
    if (formType === "F3") staffObj = (ebs.form3Teachers || []).find(t => t.id === staffId);
    else if (formType === "F4") staffObj = (ebs.form4NonTeaching || []).find(emp => emp.id === staffId);
    else if (formType === "STF") staffObj = (extra.staff || []).find(st => st.id === staffId);
    if (!staffObj) return;

    const reqId = "DEL-" + s.uNo + "-" + Date.now();
    const reqObj = {
      reqId: reqId,
      uNo: s.uNo,
      udiseNo: s.udiseNo,
      schoolNameTa: s.nameTa,
      schoolNameEn: s.nameEn,
      block: s.block,
      formType: formType,
      staffId: staffId,
      staffNameEn: staffObj.nameEn || staffObj.name || "",
      staffNameTa: staffObj.nameTa || "",
      desig: staffObj.desig || "",
      emisId: staffObj.emisId || "",
      reasonCategory: reasonCat,
      reasonDetail: reasonDet,
      requestedAt: new Date().toLocaleString("en-IN"),
      status: "PENDING",
      adminNote: "",
      resolvedAt: ""
    };

    // Remove any previous pending request for the same staffId
    staffDeleteRequests = (staffDeleteRequests || []).filter(r => !(r.uNo === s.uNo && r.staffId === staffId && r.status === "PENDING"));
    staffDeleteRequests.unshift(reqObj);
    safeSetStorage("CEOSVG_DELETE_REQUESTS", staffDeleteRequests);

    staffObj.deleteReqStatus = "PENDING";
    staffObj.deleteReqReason = reasonCat + " - " + reasonDet;
    safeSetStorage("CEOSVG_SCHOOL_EXTRA_V6", schoolExtraDataStore);

    updateAllSummaryCounters();
    renderEbsForm3ListUI(s, ebs.form3Teachers);
    renderEbsForm4ListUI(s, ebs.form4NonTeaching);
    renderSchoolStaffTable(extra);
    closeDeleteRequestModal();

    sendToAppsScript({ action: "submit_delete_request", request: reqObj });
    showToast("📤 நீக்கக் கோரிக்கை (Delete Request) மாவட்ட நிர்வாகி ஒப்புதலுக்கு வெற்றிகரமாக அனுப்பப்பட்டது!", "#f59e0b");
  }

  function cancelSchoolDeleteRequest(formType, staffId) {
    if (!activeSchoolSession) return;
    const s = activeSchoolSession;
    const extra = getSchoolExtra(s.uNo);
    const ebs = getSchoolEbsData(s, extra);

    staffDeleteRequests = (staffDeleteRequests || []).filter(r => !(r.uNo === s.uNo && r.staffId === staffId && r.status === "PENDING"));
    safeSetStorage("CEOSVG_DELETE_REQUESTS", staffDeleteRequests);

    let staffObj = null;
    if (formType === "F3") staffObj = (ebs.form3Teachers || []).find(t => t.id === staffId);
    else if (formType === "F4") staffObj = (ebs.form4NonTeaching || []).find(emp => emp.id === staffId);
    else if (formType === "STF") staffObj = (extra.staff || []).find(st => st.id === staffId);
    if (staffObj) {
      staffObj.deleteReqStatus = "";
      staffObj.deleteReqReason = "";
    }
    safeSetStorage("CEOSVG_SCHOOL_EXTRA_V6", schoolExtraDataStore);
    updateAllSummaryCounters();
    renderEbsForm3ListUI(s, ebs.form3Teachers);
    renderEbsForm4ListUI(s, ebs.form4NonTeaching);
    renderSchoolStaffTable(extra);
    showToast("↩️ நீக்கக் கோரிக்கை திரும்பப் பெறப்பட்டது.", "#38bdf8");
  }

  function renderAdminDeleteRequestsTable() {
    const tbody = document.getElementById("admDeleteRequestsTbody");
    if (!tbody) return;
    const statusFilter = (document.getElementById("admDelReqStatusFilter") || {}).value || "PENDING";
    const q = ((document.getElementById("admDelReqSearchInput") || {}).value || "").trim().toLowerCase();

    const filtered = (staffDeleteRequests || []).filter(r => {
      if (statusFilter !== "ALL" && r.status !== statusFilter) return false;
      if (q) {
        const hay = `${r.uNo} ${r.udiseNo} ${r.schoolNameTa} ${r.schoolNameEn} ${r.staffNameEn} ${r.staffNameTa} ${r.emisId} ${r.desig} ${r.reasonCategory} ${r.reasonDetail}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });

    if (filtered.length === 0) {
      tbody.innerHTML = `<tr><td colspan="8" style="text-align:center; padding:18px; color:#64748b;">தேர்ந்தெடுத்தப் பிரிவில் பணியாளர் நீக்கக் கோரிக்கைகள் ஏதுமில்லை.</td></tr>`;
      return;
    }

    tbody.innerHTML = filtered.map(r => {
      const fBadge = r.formType === "F3"
        ? `<span style="background:#dbeafe; color:#1e40af; padding:2px 8px; border-radius:999px; font-weight:800; font-size:0.75rem;">FORM-III (Teacher)</span>`
        : (r.formType === "F4"
          ? `<span style="background:#dcfce7; color:#166534; padding:2px 8px; border-radius:999px; font-weight:800; font-size:0.75rem;">FORM-IV (Non-Teaching)</span>`
          : `<span style="background:#f3e8ff; color:#6b21a8; padding:2px 8px; border-radius:999px; font-weight:800; font-size:0.75rem;">Staff Register</span>`);

      let statusHtml = "";
      if (r.status === "PENDING") {
        statusHtml = `<span style="background:#fef3c7; color:#92400e; border:1px solid #f59e0b; padding:3px 8px; border-radius:6px; font-weight:800; font-size:0.76rem;">⏳ ஒப்புதல் நிலுவை</span>`;
      } else if (r.status === "APPROVED") {
        statusHtml = `<span style="background:#dcfce7; color:#166534; border:1px solid #86efac; padding:3px 8px; border-radius:6px; font-weight:800; font-size:0.76rem;">✅ நீக்கப்பட்டது</span><br><span style="font-size:0.7rem; color:#64748b;">${r.resolvedAt || ""}</span>`;
      } else {
        statusHtml = `<span style="background:#fee2e2; color:#991b1b; border:1px solid #fca5a5; padding:3px 8px; border-radius:6px; font-weight:800; font-size:0.76rem;">❌ நிராகரிக்கப்பட்டது</span><br><span style="font-size:0.7rem; color:#64748b;">${r.resolvedAt || ""}</span>`;
      }

      return `
        <tr>
          <td style="font-size:0.78rem;"><strong>${r.reqId}</strong><br><span style="color:#64748b;">${r.requestedAt}</span></td>
          <td><strong style="color:#c2410c;">[U.NO: ${r.uNo}]</strong> <strong>${r.schoolNameTa}</strong><br><span style="font-size:0.75rem; color:#64748b;">UDISE: ${r.udiseNo} | ${r.block || ""}</span></td>
          <td>${fBadge}</td>
          <td><strong>${r.staffNameEn}</strong>${r.staffNameTa ? "<br><span style='color:#1d4ed8; font-weight:700;'>" + r.staffNameTa + "</span>" : ""}<br><span style="font-size:0.76rem; color:#475569;">${r.desig}</span></td>
          <td><code>${r.emisId || "-"}</code></td>
          <td style="max-width:260px;">
            <div style="font-weight:800; color:#991b1b;">${r.reasonCategory}</div>
            <div style="font-size:0.78rem; color:#334155; margin-top:2px;">${r.reasonDetail}</div>
          </td>
          <td>${statusHtml}</td>
          <td style="white-space:nowrap;">
            ${r.status === "PENDING"
              ? `<button type="button" class="btn btn-success btn-sm" onclick="adminApproveDeleteRequest('${r.reqId}')">✅ ஒப்புதல் அளித்து நீக்கு</button>
                 <button type="button" class="btn btn-danger btn-sm" onclick="adminRejectDeleteRequest('${r.reqId}')">❌ நிராகரி</button>`
              : `<span style="font-size:0.76rem; color:#64748b; font-weight:700;">நடவடிக்கை முடிந்தது</span>`
            }
          </td>
        </tr>
      `;
    }).join("");
  }

  function adminApproveDeleteRequest(reqId) {
    const req = (staffDeleteRequests || []).find(r => r.reqId === reqId);
    if (!req) return;
    const s = findSchoolByUNoOrUdise(req.uNo);
    if (s) {
      const extra = getSchoolExtra(s.uNo);
      const ebs = getSchoolEbsData(s, extra);
      if (req.formType === "F3") {
        ebs.form3Teachers = (ebs.form3Teachers || []).filter(t => t.id !== req.staffId && t.emisId !== req.emisId);
      } else if (req.formType === "F4") {
        ebs.form4NonTeaching = (ebs.form4NonTeaching || []).filter(emp => emp.id !== req.staffId && emp.emisId !== req.emisId);
      }
      extra.staff = (extra.staff || []).filter(st => st.id !== req.staffId);
    }

    req.status = "APPROVED";
    req.resolvedAt = new Date().toLocaleString("en-IN");
    safeSetStorage("CEOSVG_DELETE_REQUESTS", staffDeleteRequests);
    safeSetStorage("CEOSVG_SCHOOL_EXTRA_V6", schoolExtraDataStore);

    updateAllSummaryCounters();
    renderAdminDeleteRequestsTable();
    renderAdminEbsMonitorTable();

    sendToAppsScript({ action: "admin_resolve_delete_request", reqId: reqId, decision: "APPROVED", request: req });
    showToast(`✅ ஒப்புதல் அளிக்கப்பட்டது! [${req.uNo}] பள்ளியின் பட்டியலிலிருந்து ${req.staffNameEn} நீக்கப்பட்டார்.`, "#22c55e");
  }

  function adminRejectDeleteRequest(reqId) {
    const req = (staffDeleteRequests || []).find(r => r.reqId === reqId);
    if (!req) return;
    const s = findSchoolByUNoOrUdise(req.uNo);
    if (s) {
      const extra = getSchoolExtra(s.uNo);
      const ebs = getSchoolEbsData(s, extra);
      const t = (ebs.form3Teachers || []).find(item => item.id === req.staffId);
      if (t) { t.deleteReqStatus = "REJECTED"; }
      const emp = (ebs.form4NonTeaching || []).find(item => item.id === req.staffId);
      if (emp) { emp.deleteReqStatus = "REJECTED"; }
      const st = (extra.staff || []).find(item => item.id === req.staffId);
      if (st) { st.deleteReqStatus = "REJECTED"; }
    }

    req.status = "REJECTED";
    req.resolvedAt = new Date().toLocaleString("en-IN");
    safeSetStorage("CEOSVG_DELETE_REQUESTS", staffDeleteRequests);
    safeSetStorage("CEOSVG_SCHOOL_EXTRA_V6", schoolExtraDataStore);

    updateAllSummaryCounters();
    renderAdminDeleteRequestsTable();

    sendToAppsScript({ action: "admin_resolve_delete_request", reqId: reqId, decision: "REJECTED", request: req });
    showToast(`❌ நீக்கக் கோரிக்கை நிராகரிக்கப்பட்டது. ${req.staffNameEn} பள்ளியின் பட்டியலில் தொடர்வார்.`, "#f59e0b");
  }

  function exportDeleteRequestsCsv() {
    const headers = ["Req ID", "Date", "U.NO", "UDISE", "School Name", "Form Type", "Staff Name (EN)", "Staff Name (TA)", "Designation", "EMIS ID", "Reason Category", "Detailed Reason", "Status", "Resolved At"];
    const rows = (staffDeleteRequests || []).map(r => [
      r.reqId, `"${r.requestedAt || ""}"`, r.uNo, r.udiseNo, `"${(r.schoolNameEn || "").replace(/"/g, '""')}"`,
      r.formType, `"${(r.staffNameEn || "").replace(/"/g, '""')}"`, `"${(r.staffNameTa || "").replace(/"/g, '""')}"`,
      `"${r.desig || ""}"`, r.emisId, `"${(r.reasonCategory || "").replace(/"/g, '""')}"`,
      `"${(r.reasonDetail || "").replace(/"/g, '""')}"`, r.status, `"${r.resolvedAt || ""}"`
    ].join(","));
    const csvContent = "\uFEFF" + headers.join(",") + "\n" + rows.join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "EBS_2026_27_Staff_Delete_Requests.csv";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast("📥 நீக்கக் கோரிக்கைகள் பட்டியல் CSV ஆகப் பதிவிறக்கப்பட்டது!", "#22c55e");
  }

  function saveAllEbsDataToCloud() {
    if (isEbsLockedForSchool(activeSchoolSession)) { showToast('🔒 முதன்மைக் கல்வி அலுவலகத்தால் EBS சேர்க்கை மற்றும் திருத்தங்கள் முடக்கப்பட்டுள்ளன! பார்வை மற்றும் பதிவிறக்கம் மட்டுமே அனுமதிக்கப்பட்டுள்ளது.', '#ef4444'); return; }
    if (!activeSchoolSession) return;
    const extra = getSchoolExtra(activeSchoolSession.uNo);
    const ebs = getSchoolEbsData(activeSchoolSession, extra);
    safeSetStorage("CEOSVG_SCHOOL_EXTRA_V6", schoolExtraDataStore);
    sendToAppsScript({
      action: "save_ebs_all",
      uNo: activeSchoolSession.uNo,
      udiseNo: activeSchoolSession.udiseNo,
      ebs2026: ebs
    });
    showToast("✅ உங்கள் பள்ளியின் அனைத்து EBS_2026_27 படிவங்களும் (Form I - IV) சேமிக்கப்பட்டன!", "#22c55e");
  }

  // =========================================================================
  // 9. EXACT A4 PRINT / PDF GENERATOR FOR EBS FORMS I, II, III, IV
  // =========================================================================
  function buildEbsUnoHeaderHtml(formLabel, uNo) {
    const d = String(uNo || "000").padStart(3, "0").slice(-3);
    return `
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
        <div style="border:2px solid #000; border-radius:999px; padding:4px 24px; font-weight:900; font-size:11pt;">${formLabel}</div>
        <div style="display:inline-flex; align-items:center; border:2px solid #000;">
          <span style="padding:4px 10px; font-weight:800; border-right:2px solid #000;">School Unique Number</span>
          <span style="width:28px; text-align:center; font-weight:900; border-right:1.5px solid #000;">${d[0]}</span>
          <span style="width:28px; text-align:center; font-weight:900; border-right:1.5px solid #000;">${d[1]}</span>
          <span style="width:28px; text-align:center; font-weight:900;">${d[2]}</span>
        </div>
      </div>
    `;
  }

  function buildForm1PrintHtml(s, ebs) {
    const f1 = ebs.form1;
    let trTot = 0, tcTot = 0;
    EBS_F1_TEACH_COLS.forEach(c => { trTot += Number(f1.teachReg[c.key] || 0); tcTot += Number(f1.teachCon[c.key] || 0); });
    let nrTot = 0, ncTot = 0;
    EBS_F1_NONTEACH_COLS.forEach(c => { nrTot += Number(f1.nonTeachReg[c.key] || 0); ncTot += Number(f1.nonTeachCon[c.key] || 0); });
    const sslc = f1.sslc || {};
    const hsc = f1.hsc || {};

    return `
      <div class="ebs-print-page">
        ${buildEbsUnoHeaderHtml("FORM – I", s.uNo)}
        <div style="text-align:center; font-weight:900; font-size:11.5pt; text-decoration:underline; margin-bottom:8px;">
          SIVAGANGAI DISTRICT --- 2026 - 2027 – SCHOOL PROFILE FOR EBS
        </div>
        <table class="ebs-p-table">
          <tr><td style="width:34%; font-weight:bold;">Name of the School with Pincode</td><td colspan="2"><strong>${f1.schoolName || s.nameEn}</strong> - ${f1.pincode || ""}</td></tr>
          <tr><td style="font-weight:bold;">Headmaster/ Principal Name &amp; Mobile Number</td><td>${f1.hmName || s.hmName || ""}</td><td><strong>${f1.hmMobile || s.mobile || ""}</strong></td></tr>
          <tr><td style="font-weight:bold;">AHM or Senior Tr. / Vice Principal Name &amp; Mobile No.</td><td>${f1.ahmName || "-"}</td><td>${f1.ahmMobile || "-"}</td></tr>
          <tr><td style="font-weight:bold;">School Gmail Address</td><td colspan="2">${f1.gmail || "-"}</td></tr>
          <tr><td style="font-weight:bold;">School Landline Number with STD Code</td><td colspan="2">${f1.landline || "NIL"}</td></tr>
        </table>

        <table class="ebs-p-table" style="text-align:center;">
          <tr><th>Total No. of Classrooms</th><th>No. of Eligible rooms for Exam Purpose</th><th>No.of Bench Desk Available (Pair)</th></tr>
          <tr><td><strong>${f1.totalRooms || 0}</strong></td><td><strong>${f1.examRooms || 0}</strong></td><td><strong>${f1.benchPairs || 0}</strong></td></tr>
        </table>

        <div style="font-weight:bold; margin:6px 0 3px;">No. of Teaching Staff Working ( Include Self Finance Staff )</div>
        <table class="ebs-p-table" style="text-align:center;">
          <tr>
            <th>Nature of Post</th>
            ${EBS_F1_TEACH_COLS.map(c => `<th>${c.label}</th>`).join("")}
            <th>TOTAL</th>
          </tr>
          <tr>
            <td style="text-align:left; font-weight:bold;">Regular (Govt. Salaried)</td>
            ${EBS_F1_TEACH_COLS.map(c => `<td>${f1.teachReg[c.key] || 0}</td>`).join("")}
            <td><strong>${trTot}</strong></td>
          </tr>
          <tr>
            <td style="text-align:left; font-weight:bold;">Contract (Self Finance)</td>
            ${EBS_F1_TEACH_COLS.map(c => `<td>${f1.teachCon[c.key] || 0}</td>`).join("")}
            <td><strong>${tcTot}</strong></td>
          </tr>
          <tr>
            <td style="font-weight:bold;">TOTAL</td>
            ${EBS_F1_TEACH_COLS.map(c => `<td><strong>${Number(f1.teachReg[c.key] || 0) + Number(f1.teachCon[c.key] || 0)}</strong></td>`).join("")}
            <td><strong>${trTot + tcTot}</strong></td>
          </tr>
        </table>

        <div style="font-weight:bold; margin:6px 0 3px;">No. of Non-Teaching Staff Working ( All Type Schools – Include Matric &amp; Self Finance Schools )</div>
        <table class="ebs-p-table" style="text-align:center;">
          <tr>
            <th>Nature of Post</th>
            ${EBS_F1_NONTEACH_COLS.map(c => `<th>${c.label}</th>`).join("")}
            <th>TOTAL</th>
          </tr>
          <tr>
            <td style="text-align:left; font-weight:bold;">Regular (Govt.Salaried)</td>
            ${EBS_F1_NONTEACH_COLS.map(c => `<td>${f1.nonTeachReg[c.key] || 0}</td>`).join("")}
            <td><strong>${nrTot}</strong></td>
          </tr>
          <tr>
            <td style="text-align:left; font-weight:bold;">Contract (Self Finance)</td>
            ${EBS_F1_NONTEACH_COLS.map(c => `<td>${f1.nonTeachCon[c.key] || 0}</td>`).join("")}
            <td><strong>${ncTot}</strong></td>
          </tr>
          <tr>
            <td style="font-weight:bold;">TOTAL</td>
            ${EBS_F1_NONTEACH_COLS.map(c => `<td><strong>${Number(f1.nonTeachReg[c.key] || 0) + Number(f1.nonTeachCon[c.key] || 0)}</strong></td>`).join("")}
            <td><strong>${nrTot + ncTot}</strong></td>
          </tr>
        </table>

        <div style="font-weight:bold; margin:6px 0 3px;">SSLC - Total No. of Students</div>
        <table class="ebs-p-table" style="text-align:center;">
          <tr><th colspan="3">TAMIL MEDIUM</th><th colspan="3">ENGLISH MEDIUM</th><th colspan="3">TOTAL</th><th colspan="3">Part-IV Optional Language</th></tr>
          <tr><th>Boys</th><th>Girls</th><th>Total</th><th>Boys</th><th>Girls</th><th>Total</th><th>Boys</th><th>Girls</th><th>Total</th><th>Boys</th><th>Girls</th><th>Total</th></tr>
          <tr>
            <td>${sslc.tmB || 0}</td><td>${sslc.tmG || 0}</td><td><strong>${(sslc.tmB || 0) + (sslc.tmG || 0)}</strong></td>
            <td>${sslc.emB || 0}</td><td>${sslc.emG || 0}</td><td><strong>${(sslc.emB || 0) + (sslc.emG || 0)}</strong></td>
            <td><strong>${(sslc.tmB || 0) + (sslc.emB || 0)}</strong></td><td><strong>${(sslc.tmG || 0) + (sslc.emG || 0)}</strong></td><td><strong>${(sslc.tmB || 0) + (sslc.tmG || 0) + (sslc.emB || 0) + (sslc.emG || 0)}</strong></td>
            <td>${sslc.optB || 0}</td><td>${sslc.optG || 0}</td><td><strong>${(sslc.optB || 0) + (sslc.optG || 0)}</strong></td>
          </tr>
        </table>

        <div style="font-weight:bold; margin:6px 0 3px;">HSC SECOND YEAR (+2) - Total No. of Students</div>
        <table class="ebs-p-table" style="text-align:center;">
          <tr><th colspan="3" rowspan="2">Tamil Medium</th><th colspan="3" rowspan="2">English Medium</th><th colspan="3" rowspan="2">TOTAL</th><th colspan="9">Part-1 - Other Language</th></tr>
          <tr><th colspan="3">HINDI</th><th colspan="3">FRENCH</th><th colspan="3">SANSKRIT</th></tr>
          <tr>
            <th>Boys</th><th>Girls</th><th>Total</th><th>Boys</th><th>Girls</th><th>Total</th><th>Boys</th><th>Girls</th><th>Total</th>
            <th>Boys</th><th>Girls</th><th>Total</th><th>Boys</th><th>Girls</th><th>Total</th><th>Boys</th><th>Girls</th><th>Total</th>
          </tr>
          <tr>
            <td>${hsc.tmB || 0}</td><td>${hsc.tmG || 0}</td><td><strong>${(hsc.tmB || 0) + (hsc.tmG || 0)}</strong></td>
            <td>${hsc.emB || 0}</td><td>${hsc.emG || 0}</td><td><strong>${(hsc.emB || 0) + (hsc.emG || 0)}</strong></td>
            <td><strong>${(hsc.tmB || 0) + (hsc.emB || 0)}</strong></td><td><strong>${(hsc.tmG || 0) + (hsc.emG || 0)}</strong></td><td><strong>${(hsc.tmB || 0) + (hsc.tmG || 0) + (hsc.emB || 0) + (hsc.emG || 0)}</strong></td>
            <td>${hsc.hinB || 0}</td><td>${hsc.hinG || 0}</td><td><strong>${(hsc.hinB || 0) + (hsc.hinG || 0)}</strong></td>
            <td>${hsc.freB || 0}</td><td>${hsc.freG || 0}</td><td><strong>${(hsc.freB || 0) + (hsc.freG || 0)}</strong></td>
            <td>${hsc.sanB || 0}</td><td>${hsc.sanG || 0}</td><td><strong>${(hsc.sanB || 0) + (hsc.sanG || 0)}</strong></td>
          </tr>
        </table>

        <div style="text-align:right; font-weight:bold; margin-top:28px;">Signature of the Headmaster / Principal</div>
      </div>
    `;
  }

  function buildForm2PrintHtml(s, ebs) {
    const f2 = ebs.form2 || {};
    const rowsHtml = EBS_F2_SUBJECTS.map((item, idx) => {
      const rec = f2[item.key] || { tm: 0, em: 0, total: 0, otherName: "" };
      const snoCell = idx === 0 ? `<td rowspan="4" style="text-align:center; font-weight:bold;">01</td>` : (idx >= 1 && idx <= 3 ? "" : `<td style="text-align:center; font-weight:bold;">${item.sno}</td>`);
      let subCell = "";
      if (idx === 0) {
        subCell = `<td rowspan="4" style="font-weight:bold;">Language</td><td>Tamil</td>`;
      } else if (idx >= 1 && idx <= 3) {
        subCell = `<td>${item.sub}</td>`;
      } else {
        subCell = `<td colspan="2">${item.sub}${rec.otherName ? " (" + rec.otherName + ")" : ""}</td>`;
      }
      if (item.shadedMedium) {
        return `<tr>${snoCell}${subCell}<td style="background:#cbd5e1; text-align:center;">—</td><td style="background:#cbd5e1; text-align:center;">—</td><td style="text-align:center; font-weight:bold;">${rec.total || 0}</td></tr>`;
      }
      return `<tr>${snoCell}${subCell}<td style="text-align:center;">${rec.tm || 0}</td><td style="text-align:center;">${rec.em || 0}</td><td style="text-align:center; font-weight:bold;">${(rec.tm || 0) + (rec.em || 0)}</td></tr>`;
    }).join("");

    return `
      <div class="ebs-print-page">
        ${buildEbsUnoHeaderHtml("FORM – II (Hr.Sec.Schools only)", s.uNo)}
        <div style="text-align:center; font-weight:900; font-size:11pt; text-decoration:underline; margin-bottom:6px;">
          SIVAGANGAI DISTRICT - 2026 - 2027 – HSE (+2) - SUBJECT WISE STUDENT STRENGTH FOR EBS
        </div>
        <div style="font-weight:bold; margin-bottom:6px;">Name of the School : ${s.nameEn} (${s.nameTa})</div>
        <table class="ebs-p-table">
          <thead>
            <tr><th rowspan="2" style="width:45px;">S. No</th><th rowspan="2" colspan="2">SUBJECT</th><th colspan="3">TOTAL NO. OF STUDENTS – SUBJECT WISE – MEDIUM WISE</th></tr>
            <tr><th>TAMIL MEDIUM</th><th>ENGLISH MEDIUM</th><th>TOTAL</th></tr>
          </thead>
          <tbody>${rowsHtml}</tbody>
        </table>
        <div style="text-align:right; font-weight:bold; margin-top:24px;">Signature of the Headmaster / Principal</div>
      </div>
    `;
  }

  function buildForm3SingleTeacherPrintHtml(s, t) {
    return `
      <div class="ebs-print-page">
        ${buildEbsUnoHeaderHtml("FORM – III", s.uNo)}
        <div style="text-align:center; font-weight:900; font-size:11pt; text-decoration:underline; margin-bottom:6px;">
          SIVAGANGAI DISTRICT 2026 - 2027 HEADMASTER/ PRINCIPAL &amp; TEACHERS PROFILE
        </div>
        <div style="font-weight:bold; margin-bottom:6px;">Name of the School: ${s.nameEn} (${s.nameTa})</div>
        <table class="ebs-p-table">
          <tr>
            <td rowspan="2" style="width:18%; font-weight:bold;">Name of the Teacher</td>
            <td style="width:34%;"><strong>(In English):</strong> ${t.nameEn || ""}</td>
            <td style="width:16%; font-weight:bold;">Designation</td>
            <td colspan="2"><strong>${t.desig || ""}</strong></td>
          </tr>
          <tr>
            <td><strong>(தமிழில்):</strong> ${t.nameTa || ""}</td>
            <td style="font-weight:bold;">Gender: ${t.gender || ""}</td>
            <td colspan="2"><strong>EMIS ID:</strong> ${t.emisId || ""}</td>
          </tr>
          <tr>
            <td style="font-weight:bold;">Educational Qualification</td>
            <td>${t.qual || ""}</td>
            <td style="font-weight:bold;">Main Subject</td>
            <td colspan="2"><strong>${t.mainSub || ""}</strong></td>
          </tr>
        </table>

        <table class="ebs-p-table" style="text-align:center;">
          <tr><th>Handling Classes</th><th>Teaching</th><th>10th STD</th><th>XIth STD</th><th>XIIth STD</th></tr>
          <tr>
            <td rowspan="2" style="text-align:left;">
              ${t.chk10 ? "☑" : "☐"} 10th<br>
              ${t.chk11_12 ? "☑" : "☐"} 11&amp;12th
            </td>
            <td style="font-weight:bold;">Subject</td>
            <td>${t.sub10 || "-"}</td><td>${t.sub11 || "-"}</td><td>${t.sub12 || "-"}</td>
          </tr>
          <tr>
            <td style="font-weight:bold;">Medium</td>
            <td>${t.med10 || "-"}</td><td>${t.med11 || "-"}</td><td>${t.med12 || "-"}</td>
          </tr>
        </table>

        <table class="ebs-p-table">
          <tr>
            <th style="width:42%;">Mode of First Appointment</th>
            <th style="width:28%;">D.O.J in First Appointment</th>
            <th>Name of the Post (First Join)</th>
          </tr>
          <tr>
            <td><strong>${t.firstAppMode || ""}</strong></td>
            <td style="text-align:center;">${t.dojFirst || "-"}</td>
            <td style="text-align:center;">${t.firstPostName || "-"}</td>
          </tr>
          <tr>
            <td><strong>Date of Birth:</strong> ${t.dob || "-"}</td>
            <td colspan="2"><strong>Mode of Appointment in Present Post:</strong> ${t.presAppMode || ""}</td>
          </tr>
        </table>

        <table class="ebs-p-table" style="text-align:center;">
          <tr>
            <th>Nature of Present Post</th>
            <th>Date of Join in Present Post</th>
            <th>Unit Transfer Date</th>
            <th>Date of Join in Present School</th>
          </tr>
          <tr>
            <td><strong>${t.presNature || "Regular"}</strong></td>
            <td>${t.dojPresPost || "-"}</td>
            <td>${t.unitTransDate || "-"}</td>
            <td>${t.dojPresSchool || "-"}</td>
          </tr>
        </table>

        <table class="ebs-p-table">
          <tr>
            <td><strong>Mobile Number (WhatsApp):</strong> ${t.mobile || ""}</td>
            <td><strong>Alternate Mobile No.:</strong> ${t.altMobile || "-"}</td>
          </tr>
          <tr>
            <td colspan="2"><strong>Personal E-mail ID :</strong> ${t.email || "-"}</td>
          </tr>
          <tr>
            <td><strong>Present Residential Place &amp; District:</strong> ${t.resPlace || ""} (${t.resDist || "Sivagangai"})</td>
            <td><strong>IFHRMS ID:</strong> ${t.ifhrms || "-"}</td>
          </tr>
        </table>

        <table class="ebs-p-table">
          <tr>
            <td rowspan="2" style="width:42%; font-weight:bold;">Name of the Exam Centre in which acted as External Examiner in Feb'2025 Practical Exam</td>
            <td><strong>SSLC:</strong> 1) ${t.pracSslc1 || "NIL"}</td>
          </tr>
          <tr>
            <td><strong>HSC:</strong> 1) ${t.pracHsc1 || "NIL"} &nbsp;&nbsp; 2) ${t.pracHsc2 || "NIL"}</td>
          </tr>
        </table>

        <table class="ebs-p-table">
          <tr><th style="width:22%;">2025-26 Exam Duty</th><th style="width:30%;">Nature of Work</th><th>Name of the Exam Centre / Valuation Camp</th></tr>
          <tr><td style="font-weight:bold; text-align:center;">SSLC</td><td>${t.dutySslcWork || "-"}</td><td>${t.dutySslcCentre || "-"}</td></tr>
          <tr><td style="font-weight:bold; text-align:center;">HSC</td><td>${t.dutyHscWork || "-"}</td><td>${t.dutyHscCentre || "-"}</td></tr>
          <tr><td style="font-weight:bold; text-align:center;">Valuation Camp</td><td>${t.dutyCampWork || "-"}</td><td>${t.dutyCampCentre || "-"}</td></tr>
        </table>

        <table class="ebs-p-table">
          <tr><td style="width:52%; font-weight:bold;">Specify the Name of the centre in which son / daughter of the teacher appearing for SSLC / +1 / +2 in Mar/Apr-2027 Examination</td><td>1) ${t.childCentre1 || "NIL"}<br>2) ${t.childCentre2 || "NIL"}</td></tr>
          <tr><td colspan="2"><strong>If Differently abled Specify – Details:</strong> ${t.diffAbled || "No"}</td></tr>
          <tr><td colspan="2"><strong>If any Long Leave (Maternity/ ML / Others with Date):</strong> ${t.longLeave || "No"}</td></tr>
          <tr>
            <td><strong>Remarks :</strong> ${t.remarks || "-"}</td>
            <td><strong>Preferred Valuation Camp 2026-27:</strong> ☑ ${t.prefCamp || "Sivagangai"}</td>
          </tr>
        </table>

        <div style="text-align:right; font-weight:bold; margin:8px 0 24px;">Verified as per SR &amp; Other Records</div>
        <div style="display:flex; justify-content:space-between; font-weight:bold;">
          <div>Signature of the Teacher</div>
          <div>Signature of the Headmaster / Principal</div>
        </div>
      </div>
    `;
  }

  function buildForm4SingleNonTeachPrintHtml(s, emp) {
    return `
      <div class="ebs-print-page">
        ${buildEbsUnoHeaderHtml("FORM – IV", s.uNo)}
        <div style="text-align:center; font-weight:900; font-size:11pt; text-decoration:underline;">
          SIVAGANGAI DISTRICT 2026 - 2027 --- NON-TEACHING STAFF PROFILE
        </div>
        <div style="text-align:center; font-size:9pt; margin-bottom:6px;">(All Type Schools – Include Matric &amp; Self Finance Schools)</div>
        <div style="font-weight:bold; margin-bottom:6px;">Name of the School: ${s.nameEn} (${s.nameTa})</div>
        <table class="ebs-p-table">
          <tr>
            <td rowspan="2" style="width:18%; font-weight:bold;">Name of the Employee</td>
            <td style="width:36%;"><strong>(In English):</strong> ${emp.nameEn || ""}</td>
            <td style="width:16%; font-weight:bold;">Designation</td>
            <td><strong>${emp.desig || ""}</strong></td>
          </tr>
          <tr>
            <td><strong>(தமிழில்):</strong> ${emp.nameTa || ""}</td>
            <td style="font-weight:bold;">Gender: ${emp.gender || ""}</td>
            <td><strong>EMIS ID:</strong> ${emp.emisId || "-"}</td>
          </tr>
        </table>

        <table class="ebs-p-table" style="text-align:center;">
          <tr>
            <th>GPF/ CPS Number</th>
            <th>Date of Birth</th>
            <th>Date of Join in Govt. Service</th>
            <th>Nature of Present Post</th>
            <th>Date of Join In Present Post</th>
            <th>Date of Join in Present School</th>
          </tr>
          <tr>
            <td>${emp.gpfCps || "-"}</td>
            <td>${emp.dob || "-"}</td>
            <td>${emp.dojService || "-"}</td>
            <td><strong>${emp.nature || "Regular"}</strong></td>
            <td>${emp.dojPresPost || "-"}</td>
            <td>${emp.dojPresSchool || "-"}</td>
          </tr>
        </table>

        <table class="ebs-p-table">
          <tr>
            <td><strong>Mobile Number (WhatsApp):</strong> ${emp.mobile || ""}</td>
            <td><strong>Alternate Mobile No.:</strong> ${emp.altMobile || "-"}</td>
          </tr>
          <tr>
            <td><strong>Present Residential Place &amp; District:</strong> ${emp.resPlace || ""} (${emp.resDist || "Sivagangai"})</td>
            <td><strong>IFHRMS ID:</strong> ${emp.ifhrms || "-"}</td>
          </tr>
        </table>

        <table class="ebs-p-table">
          <tr><th style="width:22%;">2026-27 Exam Duty</th><th style="width:30%;">Nature of Work</th><th>Name of the Exam Centre / Valuation Camp</th></tr>
          <tr><td style="font-weight:bold; text-align:center;">SSLC</td><td>${emp.dutySslcWork || "-"}</td><td>${emp.dutySslcCentre || "-"}</td></tr>
          <tr><td style="font-weight:bold; text-align:center;">HSC</td><td>${emp.dutyHscWork || "-"}</td><td>${emp.dutyHscCentre || "-"}</td></tr>
          <tr><td style="font-weight:bold; text-align:center;">Valuation Camp</td><td>${emp.dutyCampWork || "-"}</td><td>${emp.dutyCampCentre || "-"}</td></tr>
        </table>

        <table class="ebs-p-table">
          <tr><td style="width:52%; font-weight:bold;">Specify the Name of the centre in which son / daughter of the employee appearing for SSLC/+2 in Mar/Apr-2027 Examination</td><td>1) ${emp.childCentre1 || "NIL"}<br>2) ${emp.childCentre2 || "NIL"}</td></tr>
          <tr><td><strong>If Differently abled Specify - Details:</strong></td><td>${emp.diffAbled || "No"}</td></tr>
          <tr><td><strong>If any Long Leave such as Maternity/ ML / Others:</strong></td><td>${emp.longLeave || "No"}</td></tr>
          <tr><td colspan="2"><strong>Any other remarks:</strong> ${emp.remarks || "-"}</td></tr>
        </table>

        <div style="text-align:right; font-weight:bold; margin:12px 0 28px;">Verified as per SR &amp; Other Records</div>
        <div style="display:flex; justify-content:space-between; font-weight:bold;">
          <div>Signature of the Employee</div>
          <div>Signature of the Headmaster / Principal</div>
        </div>
      </div>
    `;
  }

  function printSingleForm3Teacher(id) {
    if (!activeSchoolSession) return;
    const extra = getSchoolExtra(activeSchoolSession.uNo);
    const ebs = getSchoolEbsData(activeSchoolSession, extra);
    const t = ebs.form3Teachers.find(item => item.id === id);
    if (!t) return;
    const area = document.getElementById("printReportArea");
    if (!area) return;
    area.innerHTML = buildForm3SingleTeacherPrintHtml(activeSchoolSession, t);
    window.print();
  }

  function printSingleForm4NonTeach(id) {
    if (!activeSchoolSession) return;
    const extra = getSchoolExtra(activeSchoolSession.uNo);
    const ebs = getSchoolEbsData(activeSchoolSession, extra);
    const emp = ebs.form4NonTeaching.find(item => item.id === id);
    if (!emp) return;
    const area = document.getElementById("printReportArea");
    if (!area) return;
    area.innerHTML = buildForm4SingleNonTeachPrintHtml(activeSchoolSession, emp);
    window.print();
  }

  function printEbsForms(mode) {
    if (!activeSchoolSession) return;
    const s = activeSchoolSession;
    const extra = getSchoolExtra(s.uNo);
    const ebs = getSchoolEbsData(s, extra);
    const area = document.getElementById("printReportArea");
    if (!area) return;

    let pages = "";
    if (mode === "F1" || mode === "ALL") {
      pages += buildForm1PrintHtml(s, ebs);
    }
    if (mode === "F2" || mode === "ALL") {
      pages += buildForm2PrintHtml(s, ebs);
    }
    if (mode === "F3" || mode === "ALL") {
      if (ebs.form3Teachers.length > 0) {
        pages += ebs.form3Teachers.map(t => buildForm3SingleTeacherPrintHtml(s, t)).join("");
      } else if (mode === "F3") {
        pages += buildForm3SingleTeacherPrintHtml(s, { nameEn: "", nameTa: "", desig: "", prefCamp: "Sivagangai" });
      }
    }
    if (mode === "F4" || mode === "ALL") {
      if (ebs.form4NonTeaching.length > 0) {
        pages += ebs.form4NonTeaching.map(emp => buildForm4SingleNonTeachPrintHtml(s, emp)).join("");
      } else if (mode === "F4") {
        pages += buildForm4SingleNonTeachPrintHtml(s, { nameEn: "", nameTa: "", desig: "" });
      }
    }
    area.innerHTML = pages;
    window.print();
  }

  // Admin EBS_2026_27 Monitor & CSV Export
  // Admin EBS_2026_27 Monitor & CSV Export (Enhanced with Block/Mgmt/Level/Search Filters)
  function renderAdminEbsMonitorTable() {
    const tbody = document.getElementById("admEbsMonitorTbody");
    if (!tbody) return;

    const blkSel = document.getElementById("admEbsBlockFilter");
    if (blkSel && blkSel.options.length <= 1 && typeof divisionsRegistry !== "undefined" && divisionsRegistry.block) {
      blkSel.innerHTML = `<option value="">அனைத்து ஒன்றியங்கள் (All Blocks)</option>` +
        divisionsRegistry.block.map(b => `<option value="${b.code}">${b.label}</option>`).join("");
    }

    const q = ((document.getElementById("admEbsSearchInput") || {}).value || "").trim().toLowerCase();
    const blk = ((document.getElementById("admEbsBlockFilter") || {}).value || "");
    const mgmt = ((document.getElementById("admEbsMgmtFilter") || {}).value || "");
    const lvl = ((document.getElementById("admEbsLevelFilter") || {}).value || "");

    let totalT = 0;
    let totalNT = 0;
    let readyCount = 0;

    const filteredSchools = masterSchools.filter(s => {
      if (blk && s.block !== blk) return false;
      if (mgmt && s.mgmt1 !== mgmt) return false;
      if (lvl && s.level !== lvl) return false;
      if (q) {
        const hay = `${s.uNo || ""} ${s.udiseNo || ""} ${s.nameTa || ""} ${s.nameEn || ""} ${s.block || ""}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });

    tbody.innerHTML = filteredSchools.map(s => {
      const extra = schoolExtraDataStore[s.uNo];
      const ebs = extra && extra.ebs2026 ? extra.ebs2026 : null;
      const rawEmis = (EMIS_STAFF_DATA && EMIS_STAFF_DATA.byUNo && EMIS_STAFF_DATA.byUNo[s.uNo]) ? EMIS_STAFF_DATA.byUNo[s.uNo] : [];
      const tCount = ebs && ebs.form3Teachers ? ebs.form3Teachers.length : rawEmis.filter(r => r[0] === 1).length;
      const ntCount = ebs && ebs.form4NonTeaching ? ebs.form4NonTeaching.length : rawEmis.filter(r => r[0] === 0).length;
      const schDelReqs = (staffDeleteRequests || []).filter(r => r.uNo === s.uNo && r.status === "PENDING").length;

      totalT += tCount;
      totalNT += ntCount;
      if (ebs) readyCount++;

      return `
        <tr>
          <td style="font-weight:900; color:#c2410c;">${s.uNo}</td>
          <td style="font-family:monospace;">${s.udiseNo}</td>
          <td><strong>${s.nameTa}</strong><br><span style="font-size:0.75rem; color:#64748b;">${s.block}</span></td>
          <td><span class="${getMgmtBadgeClass(s.mgmt1)}">${s.mgmt1} (${s.level})</span></td>
          <td>${ebs ? '<span style="color:#15803d; font-weight:800;">✅ தயார்</span>' : '<span style="color:#64748b;">நிலுவை</span>'}</td>
          <td>${s.level === "HSS" ? (ebs ? '<span style="color:#15803d; font-weight:800;">✅ +2 பதிவு</span>' : 'நிலுவை') : '<span style="color:#94a3b8;">HS (N/A)</span>'}</td>
          <td style="font-weight:800; color:#1d4ed8;">${tCount} ஆசிரியர்கள்</td>
          <td style="font-weight:800; color:#0f766e;">${ntCount} பணியாளர்கள்${schDelReqs > 0 ? `<br><span style="background:#fef2f2; color:#dc2626; border:1px solid #fca5a5; padding:1px 6px; border-radius:4px; font-size:0.7rem; font-weight:900;">🗑️ ${schDelReqs} நீக்கக் கோரிக்கை</span>` : ""}</td>
          <td style="white-space:nowrap;">
            <button type="button" class="btn btn-primary btn-sm" onclick="adminInspectSchoolEbs('${s.uNo}')">✏️ EBS படிவங்கள் / தரவுத் திருத்தம்</button>
          </td>
        </tr>
      `;
    }).join("");

    const sumBar = document.getElementById("admEbsSummaryBar");
    if (sumBar) {
      sumBar.textContent = `பள்ளிகள்: ${filteredSchools.length} | 👨‍🏫 ஆசிரியர்கள்: ${totalT} | 🧑‍💼 பணியாளர்கள்: ${totalNT} | ✅ EBS திறக்கப்பட்டவை: ${readyCount}`;
    }
  }

  function adminInspectSchoolEbs(uNo) {
    const s = findSchoolByUNoOrUdise(uNo);
    if (!s) return;
    s.isAdminInspection = true;
    loginAsSchool(s);
    switchSchoolTab("ebs");
    showToast(`🛡️ மாவட்ட நிர்வாகி: ${s.nameTa} பள்ளியின் EBS தரவுத் திருத்த முகப்பு திறக்கப்பட்டது.`, "#f59e0b");
  }

  function exportAdminEbsCsv(formType) {
    let headers = [];
    let rows = [];
    let fileName = "EBS_2026_27_Report.csv";

    if (formType === "F1") {
      headers = ["U.NO", "UDISE", "School Name", "Block", "Management", "HM Name", "HM Mobile", "Gmail", "Total Rooms", "Exam Rooms", "Bench Pairs", "SSLC Total", "HSC +2 Total"];
      masterSchools.forEach(s => {
        const extra = getSchoolExtra(s.uNo);
        const f1 = getSchoolEbsData(s, extra).form1;
        const sslcTot = (f1.sslc.tmB || 0) + (f1.sslc.tmG || 0) + (f1.sslc.emB || 0) + (f1.sslc.emG || 0);
        const hscTot = (f1.hsc.tmB || 0) + (f1.hsc.tmG || 0) + (f1.hsc.emB || 0) + (f1.hsc.emG || 0);
        rows.push([
          s.uNo, s.udiseNo, `"${(s.nameEn || "").replace(/"/g, '""')}"`, s.block, s.mgmt1,
          `"${(f1.hmName || s.hmName || "").replace(/"/g, '""')}"`, f1.hmMobile || s.mobile, f1.gmail,
          f1.totalRooms, f1.examRooms, f1.benchPairs, sslcTot, hscTot
        ].join(","));
      });
      fileName = "EBS_2026_27_Form1_Schools_Summary.csv";
    } else if (formType === "F3") {
      headers = ["U.NO", "UDISE", "School Name", "Teacher Name (EN)", "Teacher Name (TA)", "Designation", "Gender", "EMIS ID", "Qualification", "Main Subject", "Nature", "Mobile", "IFHRMS ID", "Preferred Camp"];
      masterSchools.forEach(s => {
        const extra = getSchoolExtra(s.uNo);
        const ebs = getSchoolEbsData(s, extra);
        (ebs.form3Teachers || []).forEach(t => {
          rows.push([
            s.uNo, s.udiseNo, `"${(s.nameEn || "").replace(/"/g, '""')}"`,
            `"${(t.nameEn || "").replace(/"/g, '""')}"`, `"${(t.nameTa || "").replace(/"/g, '""')}"`,
            `"${t.desig || ""}"`, t.gender, t.emisId, `"${t.qual || ""}"`, `"${t.mainSub || ""}"`,
            t.presNature, t.mobile, t.ifhrms, `"${t.prefCamp || ""}"`
          ].join(","));
        });
      });
      fileName = "EBS_2026_27_Form3_Teachers_List.csv";
    } else if (formType === "F4") {
      headers = ["U.NO", "UDISE", "School Name", "Employee Name (EN)", "Employee Name (TA)", "Designation", "Gender", "EMIS ID", "GPF/CPS No", "Nature", "Mobile", "IFHRMS ID"];
      masterSchools.forEach(s => {
        const extra = getSchoolExtra(s.uNo);
        const ebs = getSchoolEbsData(s, extra);
        (ebs.form4NonTeaching || []).forEach(emp => {
          rows.push([
            s.uNo, s.udiseNo, `"${(s.nameEn || "").replace(/"/g, '""')}"`,
            `"${(emp.nameEn || "").replace(/"/g, '""')}"`, `"${(emp.nameTa || "").replace(/"/g, '""')}"`,
            `"${emp.desig || ""}"`, emp.gender, emp.emisId, emp.gpfCps, emp.nature, emp.mobile, emp.ifhrms
          ].join(","));
        });
      });
      fileName = "EBS_2026_27_Form4_NonTeaching_List.csv";
    }

    const csvContent = "\uFEFF" + headers.join(",") + "\n" + rows.join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast(`📥 ${fileName} வெற்றிகரமாகப் பதிவிறக்கப்பட்டது!`, "#22c55e");
  }



  // =========================================================================
  // 10. EBS_2026_27 v2.0 MODULAR ENHANCEMENTS (Scorecard, Cross-Check & Sync)
  // =========================================================================
  function updateEbsReadinessScorecard() {
    if (!activeSchoolSession) return;
    const s = activeSchoolSession;
    const extra = getSchoolExtra(s.uNo);
    const ebs = getSchoolEbsData(s, extra);
    if (!ebs) return;

    const f1 = ebs.form1 || {};
    const hmMob = (document.getElementById("ebsF1HmMobile") || {}).value || f1.hmMobile || "";
    const gmail = (document.getElementById("ebsF1Gmail") || {}).value || f1.gmail || "";
    const rooms = Number((document.getElementById("ebsF1ExamRooms") || {}).value || f1.examRooms || 0);
    const benches = Number((document.getElementById("ebsF1BenchPairs") || {}).value || f1.benchPairs || 0);
    let f1Score = 0;
    if (hmMob && String(hmMob).trim().length >= 10) f1Score += 25;
    if (gmail && String(gmail).includes("@")) f1Score += 25;
    if (rooms > 0) f1Score += 25;
    if (benches > 0) f1Score += 25;

    const c1 = document.getElementById("ebsReadyCardF1");
    const s1 = document.getElementById("ebsReadyStatusF1");
    const m1 = document.getElementById("ebsReadyMetaF1");
    const b1 = document.getElementById("ebsReadyBarF1");
    if (c1 && s1 && m1 && b1) {
      c1.className = "ebs-readiness-item " + (f1Score === 100 ? "ready-ok" : "ready-warn");
      s1.textContent = f1Score === 100 ? "✅ 100% தயார்" : `⚠️ ${f1Score}%`;
      m1.textContent = f1Score === 100
        ? `தேர்வு அறைகள்: ${rooms} | மேசை இணைகள்: ${benches}`
        : "HM கைபேசி, Gmail & அறைகள் சரிபார்க்கவும்";
      b1.style.width = f1Score + "%";
    }

    const f2 = ebs.form2 || {};
    const hscTotEl = document.getElementById("ebsF1HscTotT");
    const f1HscTot = hscTotEl ? Number(hscTotEl.textContent || 0) : ((f1.hsc ? (f1.hsc.tmB || 0) + (f1.hsc.tmG || 0) + (f1.hsc.emB || 0) + (f1.hsc.emG || 0) : 0));
    const f2EngTot = (f2["02_English"] && f2["02_English"].total) ? Number(f2["02_English"].total) : 0;
    const f2LangTot = (Number((f2["01_Tamil"] || {}).total || 0) + Number((f2["01_Hindi"] || {}).total || 0) + Number((f2["01_French"] || {}).total || 0) + Number((f2["01_Sanskrit"] || {}).total || 0));

    const c2 = document.getElementById("ebsReadyCardF2");
    const s2 = document.getElementById("ebsReadyStatusF2");
    const m2 = document.getElementById("ebsReadyMetaF2");
    const b2 = document.getElementById("ebsReadyBarF2");
    const f2BannerTxt = document.getElementById("ebsF2CrossCheckText");
    if (s.level !== "HSS") {
      if (c2 && s2 && m2 && b2) {
        c2.className = "ebs-readiness-item ready-ok";
        s2.textContent = "✔️ HS பள்ளி (N/A)";
        m2.textContent = "மேல்நிலைப்பள்ளிகளுக்கு மட்டும் (Hr.Sec Only)";
        b2.style.width = "100%";
      }
      if (f2BannerTxt) {
        f2BannerTxt.innerHTML = "ℹ️ இப்பள்ளி உயர்நிலைப்பள்ளி (HS) என்பதால் FORM-II (+2 பாடவாரி எண்ணிக்கை) பொருந்தாது.";
      }
    } else {
      const isF2Match = f1HscTot > 0 && f2EngTot === f1HscTot && f2LangTot === f1HscTot;
      const f2Pct = isF2Match ? 100 : (f2EngTot > 0 ? 60 : 20);
      if (c2 && s2 && m2 && b2) {
        c2.className = "ebs-readiness-item " + (isF2Match ? "ready-ok" : "ready-warn");
        s2.textContent = isF2Match ? `✅ பொருத்தம் (${f1HscTot})` : "⚠️ ஒப்பிடுக";
        m2.textContent = `Form-I (+2): ${f1HscTot} | Form-II (Eng): ${f2EngTot}`;
        b2.style.width = f2Pct + "%";
      }
      if (f2BannerTxt) {
        f2BannerTxt.innerHTML = isF2Match
          ? `✅ <strong>சரிபார்ப்பு வெற்றி:</strong> FORM-I (+2 மொத்த மாணவர்கள்: <strong>${f1HscTot}</strong>) மற்றும் FORM-II (Language: <strong>${f2LangTot}</strong>, English: <strong>${f2EngTot}</strong>) எண்ணிக்கை துல்லியமாகப் பொருந்துகிறது.`
          : `⚠️ <strong>கவனத்திற்கு:</strong> FORM-I (+2 மொத்தம்: <strong>${f1HscTot}</strong>) மற்றும் FORM-II (Language: <strong>${f2LangTot}</strong>, English: <strong>${f2EngTot}</strong>) வேறுபடுகிறது. வலதுபுற பொத்தானை அழுத்தி ஒத்திசைக்கலாம்.`;
      }
    }

    const tList = ebs.form3Teachers || [];
    const tComp = tList.filter(isTeacherRecordComplete).length;
    const tPct = tList.length > 0 ? Math.round((tComp / tList.length) * 100) : 100;
    const c3 = document.getElementById("ebsReadyCardF3");
    const s3 = document.getElementById("ebsReadyStatusF3");
    const m3 = document.getElementById("ebsReadyMetaF3");
    const b3 = document.getElementById("ebsReadyBarF3");
    if (c3 && s3 && m3 && b3) {
      c3.className = "ebs-readiness-item " + (tPct === 100 ? "ready-ok" : "ready-warn");
      s3.textContent = `${tComp} / ${tList.length} (${tPct}%)`;
      m3.textContent = tPct === 100 ? "✅ அனைத்து ஆசிரியர் விவரங்களும் முழுமை" : `⚠️ ${tList.length - tComp} ஆசிரியர் விவரம் நிரப்ப வேண்டும்`;
      b3.style.width = tPct + "%";
    }

    const ntList = ebs.form4NonTeaching || [];
    const ntComp = ntList.filter(isNonTeachRecordComplete).length;
    const ntPct = ntList.length > 0 ? Math.round((ntComp / ntList.length) * 100) : 100;
    const c4 = document.getElementById("ebsReadyCardF4");
    const s4 = document.getElementById("ebsReadyStatusF4");
    const m4 = document.getElementById("ebsReadyMetaF4");
    const b4 = document.getElementById("ebsReadyBarF4");
    if (c4 && s4 && m4 && b4) {
      c4.className = "ebs-readiness-item " + (ntPct === 100 ? "ready-ok" : "ready-warn");
      s4.textContent = `${ntComp} / ${ntList.length} (${ntPct}%)`;
      m4.textContent = ntPct === 100 ? "✅ அனைத்து பணியாளர் விவரங்களும் முழுமை" : `⚠️ ${ntList.length - ntComp} பணியாளர் விவரம் நிரப்ப வேண்டும்`;
      b4.style.width = ntPct + "%";
    }
  }

  function syncForm2FromForm1Hsc() {
    if (!activeSchoolSession) return;
    const s = activeSchoolSession;
    const extra = getSchoolExtra(s.uNo);
    const ebs = getSchoolEbsData(s, extra);
    const hsc = ebs.form1.hsc || {};
    const totHsc = (Number(hsc.tmB || 0) + Number(hsc.tmG || 0) + Number(hsc.emB || 0) + Number(hsc.emG || 0));
    const hinTot = Number(hsc.hinB || 0) + Number(hsc.hinG || 0);
    const freTot = Number(hsc.freB || 0) + Number(hsc.freG || 0);
    const sanTot = Number(hsc.sanB || 0) + Number(hsc.sanG || 0);
    const tamTot = Math.max(0, totHsc - (hinTot + freTot + sanTot));

    if (!ebs.form2["01_Tamil"]) ebs.form2["01_Tamil"] = { tm: 0, em: 0, total: 0, otherName: "" };
    if (!ebs.form2["01_Hindi"]) ebs.form2["01_Hindi"] = { tm: 0, em: 0, total: 0, otherName: "" };
    if (!ebs.form2["01_French"]) ebs.form2["01_French"] = { tm: 0, em: 0, total: 0, otherName: "" };
    if (!ebs.form2["01_Sanskrit"]) ebs.form2["01_Sanskrit"] = { tm: 0, em: 0, total: 0, otherName: "" };
    if (!ebs.form2["02_English"]) ebs.form2["02_English"] = { tm: 0, em: 0, total: 0, otherName: "" };

    ebs.form2["01_Tamil"].total = tamTot;
    ebs.form2["01_Hindi"].total = hinTot;
    ebs.form2["01_French"].total = freTot;
    ebs.form2["01_Sanskrit"].total = sanTot;
    ebs.form2["02_English"].total = totHsc;

    safeSetStorage("CEOSVG_SCHOOL_EXTRA_V6", schoolExtraDataStore);
    renderEbsForm2UI(s, ebs.form2);
    updateEbsReadinessScorecard();
    showToast(`✅ FORM-I (+2 மாணவர் எண்ணிக்கை: ${totHsc}) அடிப்படையில் FORM-II மொழி மற்றும் ஆங்கிலப் பாட எண்ணிக்கை ஒத்திசைக்கப்பட்டது!`, "#22c55e");
  }

  function syncAddedStaffToEbs(stf, s, extra) {
    if (!stf || !s || !extra) return;
    const ebs = getSchoolEbsData(s, extra);
    const codeMatch = (stf.desig || "").match(/\((\d+)\)/);
    const dCode = codeMatch ? Number(codeMatch[1]) : 12;
    const cleanDesig = (stf.desig || "").replace(/\s*\(\d+\)/, "").trim();
    const cleanSub = (stf.subject || "").replace(/\s*\(\d+\)/, "").trim();
    if (dCode <= 25) {
      ebs.form3Teachers.push({
        id: stf.id,
        nameEn: stf.name,
        nameTa: (stf.prefix ? stf.prefix + " " : "") + stf.name,
        desig: cleanDesig,
        rawEmisDesig: cleanDesig,
        gender: stf.gender,
        emisId: "",
        qual: "",
        mainSub: cleanSub,
        chk10: true,
        chk11_12: s.level === "HSS",
        sub10: cleanSub,
        sub11: "",
        sub12: "",
        med10: "TM",
        med11: "",
        med12: "",
        firstAppMode: stf.firstApp,
        dojFirst: "",
        firstPostName: cleanDesig,
        dob: "",
        presAppMode: "New Appointment",
        presNature: stf.nature === "Regular" ? "Regular" : "Contract",
        dojPresPost: "",
        unitTransDate: "",
        dojPresSchool: "",
        mobile: stf.mobile,
        altMobile: "",
        email: "",
        resPlace: "",
        resDist: "Sivagangai",
        ifhrms: "",
        pracSslc1: "",
        pracHsc1: "",
        pracHsc2: "",
        dutySslcWork: stf.examDuty,
        dutySslcCentre: "",
        dutyHscWork: stf.examDuty,
        dutyHscCentre: "",
        dutyCampWork: stf.campDuty,
        dutyCampCentre: "",
        childCentre1: "NIL",
        childCentre2: "NIL",
        diffAbled: "No",
        longLeave: "No",
        remarks: "",
        prefCamp: "Sivagangai"
      });
    } else {
      ebs.form4NonTeaching.push({
        id: stf.id,
        nameEn: stf.name,
        nameTa: (stf.prefix ? stf.prefix + " " : "") + stf.name,
        desig: cleanDesig,
        rawEmisDesig: cleanDesig,
        gender: stf.gender,
        emisId: "",
        gpfCps: "",
        dob: "",
        dojService: "",
        nature: stf.nature === "Regular" ? "Regular" : "Contract",
        dojPresPost: "",
        dojPresSchool: "",
        mobile: stf.mobile,
        altMobile: "",
        resPlace: "",
        resDist: "Sivagangai",
        ifhrms: "",
        dutySslcWork: stf.examDuty,
        dutySslcCentre: "",
        dutyHscWork: stf.examDuty,
        dutyHscCentre: "",
        dutyCampWork: stf.campDuty,
        dutyCampCentre: "",
        childCentre1: "NIL",
        childCentre2: "NIL",
        diffAbled: "No",
        longLeave: "No",
        remarks: ""
      });
    }
    syncForm1CountsFromForm3And4(false);
    renderEbsForm3ListUI(s, ebs.form3Teachers);
    renderEbsForm4ListUI(s, ebs.form4NonTeaching);
  }

  window.EBSModule = {
    version: "2.1.0-modular",
    isEnabled: isEbsModuleEnabled,
    setStatus: setEbsModuleStatus,
    toggleStatus: toggleEbsModuleStatus,
    updateControlUI: updateAllEbsControlUI,
    getDeadlineInfo: getEbsDeadlineInfo,
    setDeadline: setEbsDeadline,
    clearDeadline: clearEbsDeadline,
    saveDeadlineSubmit: saveEbsDeadlineSubmit,
    clearDeadlineSubmit: clearEbsDeadlineSubmit,
    initForSchool: initEbsModuleForSchool,
    getSchoolData: getSchoolEbsData,
    switchSubForm: switchEbsSubForm,
    recalcForm1Totals: recalcEbsForm1Totals,
    syncForm1FromForm3And4: syncForm1CountsFromForm3And4,
    syncForm2FromForm1Hsc: syncForm2FromForm1Hsc,
    resyncEmisStaff: resyncSchoolEmisStaff,
    updateReadinessScorecard: updateEbsReadinessScorecard,
    syncAddedStaff: syncAddedStaffToEbs,
    saveAllToCloud: saveAllEbsDataToCloud,
    printForms: printEbsForms,
    renderAdminMonitor: renderAdminEbsMonitorTable,
    exportAdminCsv: exportAdminEbsCsv
  };

