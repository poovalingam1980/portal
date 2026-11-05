/**
 * ============================================================================
 * 🏛️ முதன்மைக் கல்வி அலுவலகம், சிவகங்கை (CEO SIVAGANGAI SCHOOL PORTAL v4.0)
 * Google Apps Script Backend (`Code.gs`) – Account: ceosvgweb@gmail.com
 * DUAL-SPREADSHEET EDITION:
 *   1. `CEO_Sivagangai_School_Portal_Master_DB` (12 Tabs including `10_Ex_Cen` & `12_Ex_Cen`)
 *   2. `CEO_Sivagangai_Teachers_Master_DB` (Dedicated 4-Tab Google Sheet for 7,081 Staff)
 * ============================================================================
 *
 * சிறப்பம்சங்கள் (Features):
 * 1. மின்னஞ்சல் OTP (Email OTP): `ceosvgweb@gmail.com` கணக்கிலிருந்து பள்ளிகளின்
 *    அதிகாரப்பூர்வ மின்னஞ்சல் முகவரிக்கு ஒரே ஒரு முறை (Single Dispatch) 6-இலக்க OTP அனுப்புதல்.
 * 2. வாட்ஸ்ஆப் OTP (WhatsApp OTP): Meta WhatsApp Cloud API (v22.0) / Template / Gateway வழியாக
 *    தலைமையாசிரியர்களின் கைபேசி எண்ணிற்கு 6-இலக்க OTP அனுப்புதல்.
 * 3. முதன்மை Google Sheet (`CEO_Sivagangai_School_Portal_Master_DB` - 12 தாவல்கள்):
 *    - `SCHOOL_MASTER`       : 282 பள்ளிகளின் முதன்மை விவரங்கள் (10th & 12th Exam Centre Nos உட்பட)
 *    - `10_Ex_Cen`           : 10-ஆம் வகுப்பு பொதுத்தேர்வு மையங்கள் பட்டியல் (113 மையங்கள்)
 *    - `12_Ex_Cen`           : 12-ஆம் வகுப்பு பொதுத்தேர்வு மையங்கள் பட்டியல் (91 மையங்கள்)
 *    - `SCHOOL_AUTH`         : பள்ளிகளின் கடவுச்சொல், 6-இலக்க PIN & OTP சரிபார்ப்பு நிலை
 *    - `OTP_LOGS`            : அனுப்பப்பட்ட அனைத்து Email & WhatsApp OTP பதிவுகள் (Single Dispatch)
 *    - `STUDENT_STRENGTH`    : பள்ளி வாரியான மாணவர் எண்ணிக்கை (தமிழ்வழி / ஆங்கிலவழி / மொத்தம்)
 *    - `GROUP_WISE_STRENGTH` : மேல்நிலைப்பள்ளி பாடப்பிரிவு வாரியான (+1 & +2) மாணவர் எண்ணிக்கை
 *    - `HSS_GROUP_MASTER`    : மேல்நிலைப்பள்ளி 16 பாடப்பிரிவுகள் (Group Code, Category, Subjects)
 *    - `SCHOOL_EXTRA_LIVE`   : பள்ளி வாரியான வகுப்பு/பாடப்பிரிவு மாணவர்கள், ஆசிரியர்கள் & அடிப்படைத் தேவைகள்
 *    - `STAFF_REQUESTS`      : ஆசிரியர் நீக்கக் கோரிக்கைகள் மற்றும் நிர்வாகி ஒப்புதல் நிலை
 *    - `CIRCULARS`           : முதன்மைக் கல்வி அலுவலர் சுற்றறிக்கைகள் மற்றும் அறிவிப்புகள்
 *    - `PORTAL_STORES`       : பிரமுகர்கள், நிர்வாகப் பிரிவுகள் மற்றும் ஆசிரியர் திருத்தங்கள்
 * 4. தனி ஆசிரியர் Google Sheet (`CEO_Sivagangai_Teachers_Master_DB` - 4 தாவல்கள், 7,081 பணியாளர்கள்):
 *    - `TEACHERS_MASTER`      : 7,081 ஆசிரியர்கள் & பணியாளர்களின் முழுப் பட்டியல் (24 நெடுவரிசைகள்)
 *    - `SCHOOL_STAFF_SUMMARY` : 282 பள்ளிகளின் பள்ளி வாரியான ஆசிரியர் & பணியாளர் எண்ணிக்கை சுருக்கம்
 *    - `STAFF_LIVE_EDITS`     : தலைமையாசிரியர் & நிர்வாகி செய்யும் நேரடித் திருத்தங்கள் / சேர்க்கைகள்
 *    - `STAFF_DELETE_REQUESTS`: ஆசிரியர் நீக்கக் கோரிக்கைகள் மற்றும் நிர்வாகி ஒப்புதல் நிலை
 * ============================================================================
 */

const PORTAL_CONFIG = {
  OWNER_EMAIL: "ceosvgweb@gmail.com",
  MASTER_SHEET_ID: "1ZOJdxEqJbsxb5pRnkWOgczB0iWBLIo3ZYX0jXnnesmQ",
  TEACHERS_SHEET_ID: "1CNMep10aG9GjVHkqXZZIazUEeS9V-TDs8LAyLey6C7A",
  EBS_SHEET_ID: "1EPyFeEoJRHg_7OFN8k9nY6VJSngoT3HicF2zcu9-fRc",
  EXEMPTION_CERT_FOLDER_ID: "1Fd2DR3QDi7Vjop1-d6ZvQT2Dp9EX9EJX",
  CIRCULAR_ATTACHMENTS_FOLDER_ID: "1R-0i5OS83fSTLa0p3dw_mI81Pee4rZdA",

  // Meta WhatsApp Cloud API Secure Vault Configuration (+91 45752 40408 | Phone ID: 1307132059159317 | Business ID: 2186573131933924 | Template: whatsapp_verfication_code [1069753392749982])
  WA_SENDER_NUMBER: "+914575240408",
  WA_PHONE_NUMBER_ID: "1307132059159317",
  WA_ALT_PHONE_NUMBER_ID: "1457353970785529",
  WA_MESSAGING_ACCOUNT_ID: "2186573131933924",
  WA_TEMPLATE_NAME: "whatsapp_verfication_code",
  WA_TEMPLATE_LANG: "en_US",
  WA_TEMPLATE_ID: "1069753392749982",
  WA_GATEWAY_WEBHOOK_URL: "",
  WA_VAULT_SEG_1: "BgQONGAMbmZ2ABUjHRg/bB1AeAJTBxIOMhodHDR1Dw0xZxkWATNTanFgGQQOGG8VJx4tF",
  WA_VAULT_SEG_2: "hYWbnkQHDFmAwFydQo6JREmJhgLPwFhbxwmGidYYWh1KR8OHiMNFmQyBDRiFSx2OAxiem",
  WA_VAULT_SEG_3: "VGMjIoEhR1JWYbFxYXOA90YBMDdFZic30EOyQWHQIoJQI+EX0yHG5HYQZmO3YIHW51HTc",
  WA_VAULT_SEG_4: "bFB8iBh93HTxlWQV6cA0sEi8ANx4pICYOHHMcaTxkVVEGEHw8ZmMAODAxMgYGHhEBAxs=",
  WA_ACCESS_TOKEN: (typeof PropertiesService !== "undefined" && PropertiesService.getScriptProperties) ? (PropertiesService.getScriptProperties().getProperty("WA_ACCESS_TOKEN") || "") : "",
  ADMIN_PASS_HASH: (typeof PropertiesService !== "undefined" && PropertiesService.getScriptProperties) ? (PropertiesService.getScriptProperties().getProperty("ADMIN_PASS_HASH") || "159f1bc218041ac361032cd3f40552630e70d8d2122870c185bbcb85310a5a83") : "159f1bc218041ac361032cd3f40552630e70d8d2122870c185bbcb85310a5a83"
};

// ============================================================================
// DYNAMIC GOOGLE SHEET DATA READERS (No Embedded Static Seed Arrays)
// Group Codes (`HSS_GROUP_MASTER`), Exam Centres (`10_Ex_Cen` / `10_CE`, `12_Ex_Cen` / `12_CE`),
// and EBS Drop-Downs (`Drop_Down`) are read directly from the Google Sheets.
// ============================================================================

function onOpen() {
  try {
    SpreadsheetApp.getUi()
      .createMenu("🏛️ CEO Sivagangai Portal")
      .addItem("🛠️ 1. அனைத்து 12 தாவல்களையும் உருவாக்கு (Setup Master DB + 10_Ex_Cen & 12_Ex_Cen)", "setupPortalSheets")
      .addItem("👨‍🏫 2. ஆசிரியர் தனி Google Sheet உருவாக்கு / அமை (Setup Teachers Master DB)", "setupTeachersPortalSheetsMenu")
      .addItem("📋 2B. EBS 2026-27 தனி Google Sheet அமை (Setup EBS 2026-27 DB - F1,F2,F3,F4)", "setupEbsPortalSheetsMenu")
      .addItem("🧹 3. ஆசிரியர் வரிசைகள் சீரமைப்பு - 7,081 வரிசைகள் (Deduplicate Teachers Sheet)", "deduplicateTeachersMasterSheetMenu")
      .addItem("✨ 4. தமிழ் எழுத்துரு சீரமைப்பு (Fix Tamil Font Mojibake)", "repairAllSheetTamilMojibakeMenu")
      .addItem("📧 4. சோதனை Email OTP அனுப்புக (Test Email OTP)", "testSendEmailOtpMenu")
      .addItem("📲 5. சோதனை WhatsApp OTP அனுப்புக (Test WhatsApp OTP)", "testSendWhatsappOtpMenu")
      .addToUi();
  } catch (e) {}
}

function getTargetSpreadsheet_(optionalSheetId) {
  const targetId = String(optionalSheetId || PORTAL_CONFIG.MASTER_SHEET_ID || "").trim();
  if (targetId) {
    try {
      return SpreadsheetApp.openById(targetId);
    } catch (e) {}
  }
  try {
    const active = SpreadsheetApp.getActiveSpreadsheet();
    if (active) return active;
  } catch (e) {}
  throw new Error("Master Google Sheet ID கிடைக்கவில்லை.");
}

function getOrCreateTeachersSpreadsheet_(optionalTeachersSheetId, forceCreateNew) {
  let savedPropId = "";
  try {
    savedPropId = PropertiesService.getScriptProperties().getProperty("TEACHERS_SHEET_ID") || "";
  } catch (e) {}

  if (!forceCreateNew) {
    const candidateIds = [
      String(optionalTeachersSheetId || "").trim(),
      String(savedPropId || "").trim(),
      String(PORTAL_CONFIG.TEACHERS_SHEET_ID || "").trim()
    ].filter(Boolean);

    for (let i = 0; i < candidateIds.length; i++) {
      try {
        const ss = SpreadsheetApp.openById(candidateIds[i]);
        if (ss) {
          try { PropertiesService.getScriptProperties().setProperty("TEACHERS_SHEET_ID", ss.getId()); } catch (e2) {}
          return ss;
        }
      } catch (err) {}
    }
  }

  // Create a dedicated new Google Sheet for Teachers Master DB in ceosvgweb@gmail.com Drive
  const newSs = SpreadsheetApp.create("CEO_Sivagangai_Teachers_Master_DB");
  try {
    PropertiesService.getScriptProperties().setProperty("TEACHERS_SHEET_ID", newSs.getId());
  } catch (e) {}
  return newSs;
}

function getOrCreateSheet_(ss, sheetName, headers, headerBg) {
  let sh = ss.getSheetByName(sheetName);
  if (!sh) {
    sh = ss.insertSheet(sheetName);
  }
  if (sh.getLastRow() === 0 && Array.isArray(headers) && headers.length > 0) {
    sh.getRange(1, 1, 1, headers.length).setValues([headers]);
    sh.getRange(1, 1, 1, headers.length)
      .setBackground(headerBg || "#0f294a")
      .setFontColor("#ffffff")
      .setFontWeight("bold")
      .setHorizontalAlignment("center");
    sh.setFrozenRows(1);
  }
  return sh;
}

function setupPortalSheets(optionalSheetId) {
  const ss = getTargetSpreadsheet_(optionalSheetId);
  const nowStr = Utilities.formatDate(new Date(), "Asia/Kolkata", "dd-MM-yyyy hh:mm:ss a");

  getOrCreateSheet_(ss, "SCHOOL_MASTER", [
    "S.No", "U.NO", "UDISE_NO", "DGE_NO", "Block", "Assembly",
    "School_Name_English", "School_Name_Tamil", "Management", "Level",
    "10th_Exam_Centre_No", "12th_Exam_Centre_No", "HM_Name_English",
    "HM_Name_Tamil", "HM_WhatsApp_Mobile", "School_Email", "Updated_At"
  ], "#0f294a");

  const ex10Sheet = getOrCreateSheet_(ss, "10_Ex_Cen", [
    "SN", "UN", "CN", "BLOCK", "Exam Centre", "School_Name_Tamil", "UDISE_NO", "Updated_At"
  ], "#1e40af");

  const ex12Sheet = getOrCreateSheet_(ss, "12_Ex_Cen", [
    "SN", "UN", "CN", "BLOCK", "NAME OF THE CENTRE", "School_Name_Tamil", "UDISE_NO", "Updated_At"
  ], "#15803d");

  // Cross-sync 10_Ex_Cen and 12_Ex_Cen from EBS 2026-27 Google Sheet (10_CE / 12_CE) if empty
  if (ex10Sheet.getLastRow() <= 1 || ex12Sheet.getLastRow() <= 1) {
    try {
      const eSs = getOrCreateEbsSpreadsheet_("", false);
      const existingSchools = readAndNormalizeSchoolMasterSheet_(ss, nowStr);
      const schoolByUNo = {};
      existingSchools.forEach(function(s) { schoolByUNo[String(s.uNo)] = s; });

      if (ex10Sheet.getLastRow() <= 1) {
        const ce10 = eSs.getSheetByName("10_CE");
        if (ce10 && ce10.getLastRow() > 1) {
          const r10 = ce10.getRange(2, 1, ce10.getLastRow() - 1, 5).getDisplayValues();
          const rows10 = r10.map(function(r, idx) {
            const sch = schoolByUNo[String(r[1]).trim()] || {};
            return [r[0] || (idx + 1), r[1], r[2], r[3], r[4], sch.nameTa || "", sch.udiseNo || "", nowStr];
          });
          if (rows10.length > 0) ex10Sheet.getRange(2, 1, rows10.length, 8).setValues(rows10);
        }
      }
      if (ex12Sheet.getLastRow() <= 1) {
        const ce12 = eSs.getSheetByName("12_CE");
        if (ce12 && ce12.getLastRow() > 1) {
          const r12 = ce12.getRange(2, 1, ce12.getLastRow() - 1, 5).getDisplayValues();
          const rows12 = r12.map(function(r, idx) {
            const sch = schoolByUNo[String(r[1]).trim()] || {};
            return [r[0] || (idx + 1), r[1], r[2], r[3], r[4], sch.nameTa || "", sch.udiseNo || "", nowStr];
          });
          if (rows12.length > 0) ex12Sheet.getRange(2, 1, rows12.length, 8).setValues(rows12);
        }
      }
    } catch (e) {}
  }

  getOrCreateSheet_(ss, "SCHOOL_AUTH", [
    "U.NO", "UDISE_NO", "School_Name_English", "HM_Name",
    "HM_WhatsApp_Mobile", "School_Email", "Password",
    "Six_Digit_PIN", "OTP_Verified", "Registered_At", "Updated_At"
  ], "#14532d");

  getOrCreateSheet_(ss, "OTP_LOGS", [
    "Timestamp", "U.NO", "School_Name", "Channel",
    "Recipient", "OTP_Code", "Purpose", "Delivery_Status", "API_Response"
  ], "#1e3a8a");

  getOrCreateSheet_(ss, "STUDENT_STRENGTH", [
    "U.NO", "UDISE_NO", "School_Name_English", "Level",
    "Boys_Total", "Girls_Total", "Grand_Total",
    "Tamil_Medium_Total", "English_Medium_Total", "Groups_Summary", "Updated_At"
  ], "#065f46");

  getOrCreateSheet_(ss, "GROUP_WISE_STRENGTH", [
    "U.NO", "UDISE_NO", "School_Name_English", "Block", "Management",
    "GROUP_CODE", "CATEGORY", "GROUP_NAME", "MAJOR_SUBJECTS",
    "11_TM_Boys", "11_TM_Girls", "11_EM_Boys", "11_EM_Girls", "11_Total",
    "12_TM_Boys", "12_TM_Girls", "12_EM_Boys", "12_EM_Girls", "12_Total",
    "Group_Grand_Total", "Updated_At"
  ], "#0f766e");

  const hssMasterSheet = getOrCreateSheet_(ss, "HSS_GROUP_MASTER", [
    "GROUP_CODE", "CAT_CODE", "CATEGORY", "GROUP_NAME", "MAJOR_SUBJECTS",
    "SUB_1", "SUB_2", "SUB_3", "SUB_4", "SUB_5", "SUB_6", "Updated_At"
  ], "#581c87");

  // HSS_GROUP_MASTER rows are maintained directly in the Google Sheet tab

  getOrCreateSheet_(ss, "SCHOOL_EXTRA_LIVE", [
    "U.NO", "UDISE_NO", "School_Name_English",
    "Extra_Data_JSON", "Updated_At"
  ], "#0369a1");

  getOrCreateSheet_(ss, "STAFF_REQUESTS", [
    "Request_ID", "Timestamp", "U.NO", "School_Name", "Staff_ID",
    "Staff_Name", "Designation", "Subject", "Reason_Category", "Reason_Detail", "Status"
  ], "#7f1d1d");

  getOrCreateSheet_(ss, "CIRCULARS", [
    "Circular_ID", "Date", "Title", "Target_Group", "Description", "Link", "Updated_At"
  ], "#9a3412");

  getOrCreateSheet_(ss, "PORTAL_STORES", [
    "Store_Key", "Store_JSON", "Summary", "Updated_At"
  ], "#334155");

  return {
    ok: true,
    spreadsheetId: ss.getId(),
    spreadsheetUrl: ss.getUrl(),
    sheets: [
      "SCHOOL_MASTER", "10_Ex_Cen", "12_Ex_Cen", "SCHOOL_AUTH", "OTP_LOGS",
      "STUDENT_STRENGTH", "GROUP_WISE_STRENGTH", "HSS_GROUP_MASTER",
      "SCHOOL_EXTRA_LIVE", "STAFF_REQUESTS", "CIRCULARS", "PORTAL_STORES"
    ]
  };
}

function setupTeachersPortalSheets(optionalTeachersSheetId, forceCreateNew) {
  const tSs = getOrCreateTeachersSpreadsheet_(optionalTeachersSheetId, Boolean(forceCreateNew));

  getOrCreateSheet_(tSs, "TEACHERS_MASTER", [
    "S.No", "Staff_ID", "Staff_Name", "Category", "Designation", "Subject",
    "Qualification", "Gender", "DOB", "Nature", "DOJ_Service", "DOJ_Present_Post",
    "DOJ_School", "U.NO", "UDISE_NO", "School_Name_Tamil", "School_Name_English",
    "Block", "Management", "Mobile", "Exam_Duty", "Camp_Duty", "Camp_Option", "Updated_At"
  ], "#0f294a");

  getOrCreateSheet_(tSs, "SCHOOL_STAFF_SUMMARY", [
    "S.No", "U.NO", "UDISE_NO", "School_Name_Tamil", "School_Name_English",
    "Block", "Teaching_Count", "Non_Teaching_Count", "Total_Staff_Count", "Updated_At"
  ], "#065f46");

  getOrCreateSheet_(tSs, "STAFF_LIVE_EDITS", [
    "Staff_ID", "Staff_Name", "Category", "Designation", "Subject", "Qualification",
    "Gender", "DOB", "Nature", "DOJ_Service", "DOJ_Present_Post", "DOJ_School",
    "U.NO", "UDISE_NO", "School_Name_Tamil", "Block", "Mobile",
    "Exam_Duty", "Camp_Duty", "Camp_Option", "Edited_By", "Updated_At"
  ], "#1e3a8a");

  getOrCreateSheet_(tSs, "STAFF_DELETE_REQUESTS", [
    "Request_ID", "Timestamp", "U.NO", "School_Name", "Staff_ID",
    "Staff_Name", "Designation", "Subject", "Reason_Category", "Reason_Detail", "Status"
  ], "#7f1d1d");

  // Remove default "Sheet1" if our 4 tabs exist
  try {
    const defaultSh = tSs.getSheetByName("Sheet1");
    if (defaultSh && tSs.getSheets().length > 1) {
      tSs.deleteSheet(defaultSh);
    }
  } catch (e) {}

  return {
    ok: true,
    teachersSheetId: tSs.getId(),
    teachersSheetUrl: tSs.getUrl(),
    teachersSheetName: tSs.getName(),
    tabs: ["TEACHERS_MASTER", "SCHOOL_STAFF_SUMMARY", "STAFF_LIVE_EDITS", "STAFF_DELETE_REQUESTS"]
  };
}

function setupTeachersPortalSheetsMenu() {
  const res = setupTeachersPortalSheets("", false);
  Logger.log("Teachers Master DB Ready: " + JSON.stringify(res));
}

function getOrCreateEbsSpreadsheet_(optionalEbsSheetId, forceCreateNew) {
  let savedPropId = "";
  try {
    savedPropId = PropertiesService.getScriptProperties().getProperty("EBS_SHEET_ID") || "";
  } catch (e) {}

  if (!forceCreateNew) {
    const candidateIds = [
      String(optionalEbsSheetId || "").trim(),
      String(savedPropId || "").trim(),
      String(PORTAL_CONFIG.EBS_SHEET_ID || "").trim()
    ].filter(Boolean);

    for (let i = 0; i < candidateIds.length; i++) {
      try {
        const ss = SpreadsheetApp.openById(candidateIds[i]);
        if (ss) {
          try { PropertiesService.getScriptProperties().setProperty("EBS_SHEET_ID", ss.getId()); } catch (e2) {}
          return ss;
        }
      } catch (err) {}
    }
  }

  const newSs = SpreadsheetApp.create("CEO_Sivagangai_EBS_2026_27_DB");
  try {
    PropertiesService.getScriptProperties().setProperty("EBS_SHEET_ID", newSs.getId());
  } catch (e) {}
  return newSs;
}

const EBS_F1_HEADERS = [
  "UNIQUE_NO", "UDISE_NO", "DGE_NO", "Block", "Level", "Management", "Zone", "S_No",
  "School_Name", "Pincode", "HSS_Exam_Centre_No", "SSLC_Exam_Centre_No",
  "HM_Name", "HM_Mobile", "AHM_VP_Name", "AHM_VP_Mobile",
  "School_Gmail_Old", "School_Email_Tnschools", "Landline_STD",
  "Total_Classrooms", "Eligible_Exam_Rooms", "Bench_Desk_Pairs",
  "Reg_Teach_HM", "Reg_Teach_PG", "Reg_Teach_Comp", "Reg_Teach_PhD1", "Reg_Teach_VocHSS",
  "Reg_Teach_BT", "Reg_Teach_PhD2", "Reg_Teach_SGT", "Reg_Teach_PET", "Reg_Teach_Spl",
  "Reg_Teach_VocHS", "Reg_Teach_Total", "Con_Teach_Total", "Teach_Grand_Total",
  "Reg_NonTeach_Asst", "Reg_NonTeach_JrAsst", "Reg_NonTeach_LabAsst", "Reg_NonTeach_RC",
  "Reg_NonTeach_Watchman", "Reg_NonTeach_Others", "Reg_NonTeach_Total", "Con_NonTeach_Total", "NonTeach_Grand_Total",
  "SSLC_TM_Boys", "SSLC_TM_Girls", "SSLC_TM_Total", "SSLC_EM_Boys", "SSLC_EM_Girls", "SSLC_EM_Total",
  "SSLC_Total_Boys", "SSLC_Total_Girls", "SSLC_Grand_Total",
  "SSLC_Part4_Boys", "SSLC_Part4_Girls", "SSLC_Part4_Total",
  "HSC2_TM_Boys", "HSC2_TM_Girls", "HSC2_TM_Total", "HSC2_EM_Boys", "HSC2_EM_Girls", "HSC2_EM_Total",
  "HSC2_Total_Boys", "HSC2_Total_Girls", "HSC2_Grand_Total",
  "HSC2_Hindi_Boys", "HSC2_Hindi_Girls", "HSC2_Hindi_Total",
  "HSC2_French_Boys", "HSC2_French_Girls", "HSC2_French_Total",
  "HSC2_Sanskrit_Boys", "HSC2_Sanskrit_Girls", "HSC2_Sanskrit_Total", "Updated_At"
];

const EBS_F2_HEADERS = [
  "S_No", "Management", "Zone", "U_NO", "School_Name",
  "Lang_Tamil", "Lang_Hindi", "Lang_French", "Lang_Sanskrit", "English_Total",
  "Maths_TM", "Maths_EM", "Maths_Tot", "Physics_TM", "Physics_EM", "Physics_Tot",
  "Chemistry_TM", "Chemistry_EM", "Chemistry_Tot", "Biology_TM", "Biology_EM", "Biology_Tot",
  "Botany_TM", "Botany_EM", "Botany_Tot", "Zoology_TM", "Zoology_EM", "Zoology_Tot",
  "CompSci_TM", "CompSci_EM", "CompSci_Tot", "History_TM", "History_EM", "History_Tot",
  "Economics_TM", "Economics_EM", "Economics_Tot", "Commerce_TM", "Commerce_EM", "Commerce_Tot",
  "Accountancy_TM", "Accountancy_EM", "Accountancy_Tot", "AdvTamil_TM", "AdvTamil_EM", "AdvTamil_Tot",
  "BusMaths_TM", "BusMaths_EM", "BusMaths_Tot", "MicroBio_TM", "MicroBio_EM", "MicroBio_Tot",
  "Nursing_TM", "Nursing_EM", "Nursing_Tot", "CompApp_TM", "CompApp_EM", "CompApp_Tot",
  "Agri_TM", "Agri_EM", "Agri_Tot", "EmpSkills_TM", "EmpSkills_EM", "EmpSkills_Tot",
  "TypeWriting_TM", "TypeWriting_EM", "TypeWriting_Tot", "AccAudit_TM", "AccAudit_EM", "AccAudit_Tot",
  "OfficeMgmt_TM", "OfficeMgmt_EM", "OfficeMgmt_Tot", "BME_TM", "BME_EM", "BME_Tot",
  "BEE_Elec_TM", "BEE_Elec_EM", "BEE_Elec_Tot", "BEE_Elx_TM", "BEE_Elx_EM", "BEE_Elx_Tot",
  "HomeSci_TM", "HomeSci_EM", "HomeSci_Tot", "Geography_TM", "Geography_EM", "Geography_Tot",
  "PolSci_TM", "PolSci_EM", "PolSci_Tot", "Statistics_TM", "Statistics_EM", "Statistics_Tot",
  "CommEng_TM", "CommEng_EM", "CommEng_Tot", "Updated_At"
];

const EBS_F3_HEADERS = [
  "SN", "U_NO", "Level", "Management", "Block", "School_Name",
  "Staff_EMIS_ID", "IFHRMS_ID", "Teacher_Name_En", "Salutation", "Teacher_Name_Ta",
  "Gender", "DOB", "Age_01_04_26", "DOR", "Designation", "Qualification", "Main_Subject",
  "Mobile_WhatsApp", "Alternate_Mobile", "Personal_Email", "Residential_Place", "Residential_District",
  "Preferred_Camp_2026_27",
  "Class6_Sub", "Class6_Med", "Class7_Sub", "Class7_Med", "Class8_Sub", "Class8_Med",
  "Class9_Sub", "Class9_Med", "Class10_Sub", "Class10_Med", "Class11_Sub", "Class11_Med", "Class12_Sub", "Class12_Med",
  "Mode_First_App", "DOJ_First_App", "First_Join_Post", "Mode_Present_Post", "Nature_Present_Post",
  "DOJ_Present_Post", "Service_Present_Post", "Unit_Transfer_Date", "DOJ_Present_School",
  "Practical_Ext_SSLC_1", "Practical_Ext_HSC_1", "Practical_Ext_HSC_2",
  "Duty_25_26_SSLC_Work", "Duty_25_26_SSLC_Centre", "Duty_25_26_HSE_Work", "Duty_25_26_HSE_Centre",
  "Duty_25_26_Camp_Work", "Duty_25_26_Camp_Centre",
  "Child_Exam_Centre_1", "Child_Exam_Centre_2", "Exemption_Ground", "Exemption_Details", "Exemption_Certificate_URL", "Updated_At"
];

const EBS_F4_HEADERS = [
  "U_NO", "SN", "School_Name", "Staff_EMIS_ID", "IFHRMS_ID",
  "Employee_Name_En", "Salutation", "Employee_Name_Ta", "Designation", "Gender",
  "DOB", "Age_01_04_26", "DOR", "DOJ_Govt_Service", "Nature_Present_Post",
  "DOJ_Present_Post", "Service_Present_Post", "DOJ_Present_School",
  "Mobile_WhatsApp", "Alternate_Mobile", "Personal_Email", "Residential_Place", "Residential_District",
  "Preferred_Camp_2026_27",
  "Duty_SSLC_Work", "Duty_SSLC_Centre", "Duty_HSC_Work", "Duty_HSC_Centre",
  "Duty_Camp_Work", "Duty_Camp_Centre",
  "Child_Exam_Centre_1", "Child_Exam_Centre_2", "Exemption_Ground", "Exemption_Details", "Exemption_Certificate_URL", "Updated_At"
];

const EBS_DROP_DOWN_HEADERS = [
  "Prefix", "Gender", "Desig_Code", "DESIGNATION", "DESIGNATION_SUB_CODE", "DESIGNATION_SUBJECT",
  "TEACHING_SUBJECT_CODE", "TEACHING_SUBJECT", "TEACHING_SUBJECT_CLASS", "Valuation Camp",
  "Residential_District_CODE", "Residential District", "Block_Code", "Block",
  "NATURE OF APPOINTMENT", "Mode of first Appointment", "Mode of Present Post",
  "Last_Year_Camp_Duty_code", "Last Year Camp Duty", "Last Year Camp Centre",
  "Grounds for Exam Duty Exemption", "Last Year Exam Duty Code", "Last_Year_EXAM_Duty_Short",
  "Last Year Exam Duty", "Date", "Month", "Year", "10th Practical Exam Centre",
  "12th Practical Centre", "Present Year Duty Allotted", "Present_Duty_Code", "Present_Duty_Name", "Script Collection Camp", "Type of Differently Abled", "Long Leave", "Last_Year_Exam_Duty_for_Non_Teaching_Staff"
];

function setupEbsPortalSheets(optionalEbsSheetId, forceCreateNew) {
  const eSs = getOrCreateEbsSpreadsheet_(optionalEbsSheetId, Boolean(forceCreateNew));

  getOrCreateSheet_(eSs, "F1", EBS_F1_HEADERS, "#0f294a");
  const f2ShInit = getOrCreateSheet_(eSs, "F2", EBS_F2_HEADERS, "#065f46");
  if (f2ShInit.getLastColumn() > 0) {
    const maxC = Math.max(f2ShInit.getLastColumn(), EBS_F2_HEADERS.length);
    f2ShInit.getRange(1, 1, 1, maxC).clearContent();
    f2ShInit.getRange(1, 1, 1, EBS_F2_HEADERS.length).setValues([EBS_F2_HEADERS]);
  }
  getOrCreateSheet_(eSs, "F3", EBS_F3_HEADERS, "#1e3a8a");
  getOrCreateSheet_(eSs, "F4", EBS_F4_HEADERS, "#7c2d12");
  getOrCreateSheet_(eSs, "Drop_Down", EBS_DROP_DOWN_HEADERS, "#4c1d95");

  const ce10 = getOrCreateSheet_(eSs, "10_CE", ["SN", "UN", "CN", "BLOCK", "Exam_Centre"], "#1e40af");
  const ce12 = getOrCreateSheet_(eSs, "12_CE", ["SN", "UN", "CN", "BLOCK", "Name_Of_The_Centre"], "#15803d");

  // If 10_CE or 12_CE is empty, copy from Master Sheet 10_Ex_Cen / 12_Ex_Cen dynamically
  if (ce10.getLastRow() <= 1 || ce12.getLastRow() <= 1) {
    try {
      const masterSs = getTargetSpreadsheet_("");
      if (ce10.getLastRow() <= 1) {
        const m10 = masterSs.getSheetByName("10_Ex_Cen");
        if (m10 && m10.getLastRow() > 1) {
          const vals10 = m10.getRange(2, 1, m10.getLastRow() - 1, 5).getValues();
          if (vals10.length > 0) ce10.getRange(2, 1, vals10.length, 5).setValues(vals10);
        }
      }
      if (ce12.getLastRow() <= 1) {
        const m12 = masterSs.getSheetByName("12_Ex_Cen");
        if (m12 && m12.getLastRow() > 1) {
          const vals12 = m12.getRange(2, 1, m12.getLastRow() - 1, 5).getValues();
          if (vals12.length > 0) ce12.getRange(2, 1, vals12.length, 5).setValues(vals12);
        }
      }
    } catch (e) {}
  }

  try {
    const defaultSh = eSs.getSheetByName("Sheet1");
    if (defaultSh && eSs.getSheets().length > 1) {
      eSs.deleteSheet(defaultSh);
    }
  } catch (e) {}

  return {
    ok: true,
    ebsSheetId: eSs.getId(),
    ebsSheetUrl: eSs.getUrl(),
    ebsSheetName: eSs.getName(),
    tabs: ["F1", "F2", "F3", "F4", "Drop_Down", "10_CE", "12_CE"]
  };
}

function normalizeTeachingClassRange_(rawVal, displayVal) {
  if (rawVal instanceof Date && !isNaN(rawVal.getTime())) {
    const d = rawVal.getDate();
    const m = rawVal.getMonth() + 1;
    return d + "-" + m;
  }
  const s = String(displayVal || rawVal || "").trim();
  if (!s) return "";
  if (/^(6-10|6-12|11-12)$/.test(s)) return s;
  if (s.indexOf("2026-10-06") !== -1 || /^0?6[\/-]10/.test(s) || /^10[\/-]0?6/.test(s)) return "6-10";
  if (s.indexOf("2026-12-11") !== -1 || /^11[\/-]12/.test(s) || /^12[\/-]11/.test(s)) return "11-12";
  if (s.indexOf("2026-12-06") !== -1 || /^0?6[\/-]12/.test(s) || /^12[\/-]0?6/.test(s)) return "6-12";
  return s;
}

function readEbsDropDownSheet_(eSs) {
  const dd = {
    prefixes: [],
    genders: [],
    designations: [],
    designationSubjects: [],
    teachingSubjects: [],
    valuationCamps: [],
    residentialDistricts: [],
    blocks: [],
    natureOfAppointments: [],
    modeFirstAppointments: [],
    modePresentPosts: [],
    lastYearCampDuties: [],
    lastYearCampCentres: [],
    exemptionGrounds: [],
    lastYearExamDuties: [],
    practicalCentres10: [],
    practicalCentres12: [],
    presentYearDuties: [],
    scriptCollectionCamps: [],
    differentlyAbledTypes: [],
    longLeaveTypes: [],
    lastYearExamDutiesNonTeaching: []
  };
  if (!eSs) return dd;
  const sh = eSs.getSheetByName("Drop_Down");
  if (!sh || sh.getLastRow() <= 1) return dd;

  const numRows = sh.getLastRow() - 1;
  const numCols = Math.min(36, Math.max(26, sh.getLastColumn()));
  const range = sh.getRange(2, 1, numRows, numCols);
  const rows = range.getDisplayValues();
  const rawRows = range.getValues();
  const seenDesig = {};

  function cell(r, idx) {
    return idx < r.length ? cleanSheetCellStr_(r[idx]) : "";
  }

  rows.forEach(function(r, rIdx) {
    const rawR = rawRows[rIdx] || [];
    const pfx = cell(r, 0);
    if (pfx) dd.prefixes.push(pfx);

    const gen = cell(r, 1);
    if (gen) dd.genders.push(gen);

    const dCode = cell(r, 2);
    const dName = cell(r, 3);
    if (dName && !seenDesig[dName]) {
      seenDesig[dName] = true;
      dd.designations.push({ code: dCode, name: dName });
    }

    const dsCode = cell(r, 4);
    const dsName = cell(r, 5);
    if (dsName) dd.designationSubjects.push({ code: dsCode, name: dsName });

    const tsCode = cell(r, 6);
    const tsName = cell(r, 7);
    const tsCls = normalizeTeachingClassRange_(rawR[8], cell(r, 8));
    if (tsName) dd.teachingSubjects.push({ code: tsCode, name: tsName, classRange: tsCls });

    const vCamp = cell(r, 9);
    if (vCamp) dd.valuationCamps.push(vCamp);

    const rdCode = cell(r, 10);
    const rdName = cell(r, 11);
    if (rdName) dd.residentialDistricts.push({ code: rdCode, name: rdName });

    const blkCode = cell(r, 12);
    const blkName = cell(r, 13);
    if (blkName) dd.blocks.push({ code: blkCode, name: blkName });

    const nat = cell(r, 14);
    if (nat) dd.natureOfAppointments.push(nat);

    const mFirst = cell(r, 15);
    if (mFirst) dd.modeFirstAppointments.push(mFirst);

    const mPres = cell(r, 16);
    if (mPres) dd.modePresentPosts.push(mPres);

    const cDuty = cell(r, 18);
    if (cDuty) dd.lastYearCampDuties.push(cDuty);

    const cCen = cell(r, 19);
    if (cCen) dd.lastYearCampCentres.push(cCen);

    const exG = cell(r, 20);
    if (exG && exG !== ",") dd.exemptionGrounds.push(exG);

    const edCode = cell(r, 21);
    const edShort = cell(r, 22);
    const edName = cell(r, 23);
    if (edName) dd.lastYearExamDuties.push({ code: edCode, short: edShort, name: edName });

    const p10 = cell(r, 27);
    if (p10) dd.practicalCentres10.push(p10);

    const p12 = cell(r, 28);
    if (p12) dd.practicalCentres12.push(p12);

    const pdShort = cell(r, 29);
    const pdCode = cell(r, 30);
    const pdName = cell(r, 31);
    if (pdShort || pdName) dd.presentYearDuties.push({ short: pdShort, code: pdCode, name: pdName });

    const scCamp = cell(r, 32);
    if (scCamp) dd.scriptCollectionCamps.push(scCamp);

    const daType = cell(r, 33);
    if (daType) dd.differentlyAbledTypes.push(daType);

    const llType = cell(r, 34);
    if (llType) dd.longLeaveTypes.push(llType);
    const ntExamDuty = cell(r, 35);
    if (ntExamDuty) dd.lastYearExamDutiesNonTeaching.push(ntExamDuty);
  });

  return dd;
}

function uploadEbsExemptionCertificateToDrive_(data, nowStr) {
  const folderId = String(data.folderId || PORTAL_CONFIG.EXEMPTION_CERT_FOLDER_ID || "1Fd2DR3QDi7Vjop1-d6ZvQT2Dp9EX9EJX").trim();
  const base64Data = String(data.base64Data || "").replace(/^data:[^;]+;base64,/, "");
  if (!base64Data) {
    return { ok: false, error: "சான்றிதழ் கோப்புத் தரவு (Base64) இல்லை." };
  }
  const uNo = String(data.uNo || "").trim();
  const staffId = String(data.staffId || "").trim();
  const staffName = String(data.staffName || "Staff").replace(/[^a-zA-Z0-9_\-\. ]/g, "").trim().replace(/\s+/g, "_");
  const formType = String(data.formType || "F3").trim();
  const ground = String(data.exemptionGround || "Exemption").replace(/[^a-zA-Z0-9_\- ]/g, "").trim().replace(/\s+/g, "_");
  const origName = String(data.fileName || "Certificate.pdf").replace(/[^a-zA-Z0-9_\-\.]/g, "_");
  const mimeType = String(data.mimeType || "application/pdf").trim();

  const finalFileName = "U" + uNo + "_" + formType + "_" + staffId + "_" + staffName + "_" + ground + "_" + origName;
  const decodedBytes = Utilities.base64Decode(base64Data);
  const blob = Utilities.newBlob(decodedBytes, mimeType, finalFileName);

  let folder = null;
  try {
    folder = DriveApp.getFolderById(folderId);
  } catch (fErr) {
    folder = DriveApp.getRootFolder();
  }

  const file = folder.createFile(blob);
  try {
    file.setDescription("EBS 2026-27 Exam Duty Exemption Certificate | School U.NO: " + uNo + " | Staff EMIS ID: " + staffId + " | Name: " + (data.staffName || "") + " | Ground: " + (data.exemptionGround || "") + " | Uploaded: " + nowStr);
  } catch (descErr) {}

  return {
    ok: true,
    fileId: file.getId(),
    fileUrl: file.getUrl(),
    fileName: file.getName(),
    folderId: folderId,
    folderUrl: "https://drive.google.com/drive/folders/" + folderId,
    uploadedAt: nowStr
  };
}

function uploadCircularAttachmentToDrive_(data, nowStr) {
  const folderId = String(data.folderId || PORTAL_CONFIG.CIRCULAR_ATTACHMENTS_FOLDER_ID || "1R-0i5OS83fSTLa0p3dw_mI81Pee4rZdA").trim();
  const base64Data = String(data.base64Data || "").replace(/^data:[^;]+;base64,/, "");
  if (!base64Data) {
    return { ok: false, error: "இணைப்புக் கோப்புத் தரவு (Base64) இல்லை." };
  }
  const category = String(data.category || "CEO_Circular").replace(/[^a-zA-Z0-9_\-\. ]/g, "").trim().replace(/\s+/g, "_").slice(0, 35);
  const origName = String(data.fileName || "Circular_Attachment.pdf").replace(/[^a-zA-Z0-9_\-\. ]/g, "_");
  const mimeType = String(data.mimeType || "application/pdf").trim();

  const dateTag = Utilities.formatDate(new Date(), "Asia/Kolkata", "yyyyMMdd_HHmm");
  const finalFileName = "CEO_SVG_" + dateTag + "_" + (category ? category + "_" : "") + origName;
  const decodedBytes = Utilities.base64Decode(base64Data);
  const blob = Utilities.newBlob(decodedBytes, mimeType, finalFileName);

  let folder = null;
  try {
    folder = DriveApp.getFolderById(folderId);
  } catch (fErr) {
    folder = DriveApp.getRootFolder();
  }

  const file = folder.createFile(blob);
  try {
    file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
  } catch (shareErr) {}
  try {
    file.setDescription("CEO Sivagangai District Circular Attachment | Category: " + (data.category || "") + " | Headline: " + (data.headline || "") + " | Uploaded: " + nowStr);
  } catch (descErr) {}

  return {
    ok: true,
    fileId: file.getId(),
    fileUrl: file.getUrl(),
    downloadUrl: "https://drive.google.com/uc?export=download&id=" + file.getId(),
    fileName: origName,
    savedFileName: file.getName(),
    folderId: folderId,
    folderUrl: "https://drive.google.com/drive/folders/" + folderId,
    uploadedAt: nowStr
  };
}

function sendCircularNotificationEmails_(data, nowStr) {
  const cir = data.circular || {};
  const rawRecipients = Array.isArray(data.recipients) ? data.recipients : [];
  const validEmails = [];
  const seen = {};
  rawRecipients.forEach(function(em) {
    const clean = String(em || "").trim().toLowerCase();
    if (clean && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(clean) && !seen[clean]) {
      seen[clean] = true;
      validEmails.push(clean);
    }
  });

  if (validEmails.length === 0) {
    return { ok: false, sentCount: 0, reason: "NO_VALID_RECIPIENTS" };
  }

  const cat = String(cir.category || "CEO CIRCULAR").trim();
  const headline = String(cir.headline || "முக்கிய அறிவிப்பு").trim();
  const desc = String(cir.desc || "").trim();
  const link = String(cir.link || "").trim();
  const targetSummary = String(cir.targetSummary || cir.target || "சம்பந்தப்பட்ட பள்ளிகள்").trim();
  const attachments = Array.isArray(cir.attachments) ? cir.attachments : [];

  const subject = "📢 [CEO சிவகங்கை சுற்றறிக்கை - " + cat + "] " + headline;

  let attachHtml = "";
  if (attachments.length > 0) {
    const itemsHtml = attachments.map(function(att) {
      const fUrl = String(att.url || att.fileUrl || "").trim();
      const fName = String(att.name || att.fileName || "இணைப்புக் கோப்பு").trim();
      return '<li style="margin-bottom:6px;"><a href="' + fUrl + '" target="_blank" style="color:#1d4ed8;font-weight:bold;text-decoration:underline;">📎 ' + fName + ' (பார்வையிடு / பதிவிறக்கு)</a></li>';
    }).join("");
    attachHtml = '<div style="margin-top:14px;padding:12px;background:#f0fdf4;border:1px solid #86efac;border-radius:8px;">' +
      '<div style="font-weight:bold;color:#166534;margin-bottom:6px;">📂 இணைப்புக் கோப்புகள் (Google Drive Attachments):</div>' +
      '<ul style="margin:0;padding-left:20px;">' + itemsHtml + '</ul></div>';
  }

  const linkHtml = link
    ? '<div style="margin-top:12px;"><a href="' + link + '" target="_blank" style="display:inline-block;background:#2563eb;color:#ffffff;padding:8px 16px;border-radius:6px;text-decoration:none;font-weight:bold;">🔗 ஆன்லைன் பதிவு / இணைப்பைத் திற</a></div>'
    : "";

  const htmlBody = '<div style="font-family:Arial,sans-serif;max-width:640px;margin:0 auto;border:2px solid #0f294a;border-radius:12px;overflow:hidden;">' +
    '<div style="background:#0f294a;color:#ffffff;padding:14px 18px;">' +
    '<div style="font-size:12px;color:#fde047;font-weight:bold;">தமிழ்நாடு பள்ளிக்கல்வித்துறை | portal.ceosvg.in</div>' +
    '<div style="font-size:18px;font-weight:bold;margin-top:4px;">முதன்மைக் கல்வி அலுவலகம், சிவகங்கை மாவட்டம்</div>' +
    '</div>' +
    '<div style="padding:18px;background:#ffffff;color:#1e293b;line-height:1.6;">' +
    '<div style="margin-bottom:10px;">' +
    '<span style="background:#fee2e2;color:#991b1b;padding:3px 10px;border-radius:999px;font-size:12px;font-weight:bold;">' + cat + '</span> ' +
    '<span style="background:#eff6ff;color:#1e40af;padding:3px 10px;border-radius:999px;font-size:12px;font-weight:bold;">🎯 ' + targetSummary + '</span>' +
    '</div>' +
    '<h3 style="color:#dc2626;margin:8px 0;">' + headline + '</h3>' +
    '<div style="background:#f8fafc;border-left:4px solid #dc2626;padding:12px 14px;border-radius:6px;white-space:pre-line;font-size:14px;">' + desc + '</div>' +
    attachHtml +
    linkHtml +
    '<div style="margin-top:16px;padding-top:12px;border-top:1px solid #cbd5e1;font-size:12px;color:#475569;">' +
    '📌 <strong>குறிப்பு:</strong> பள்ளி இணைய முகப்பில் (<a href="https://portal.ceosvg.in" target="_blank">portal.ceosvg.in</a>) உள்நுழைந்து <strong>"4. சுற்றறிக்கைகள் & அறிவிப்புகள்"</strong> பகுதியில் இந்த அறிவிப்பினைப் பார்வையிட்டு <strong>"☑️ படித்துவிட்டேன் (Mark as Read)"</strong> என்பதைத் தேர்ந்தெடுக்கவும்.<br>' +
    'அனுப்பப்பட்ட நேரம்: ' + (cir.createdAt || nowStr) +
    '</div></div></div>';

  let sentCount = 0;
  const batchSize = 45;
  for (let i = 0; i < validEmails.length; i += batchSize) {
    const chunk = validEmails.slice(i, i + batchSize);
    try {
      if (chunk.length === 1) {
        MailApp.sendEmail({
          to: chunk[0],
          subject: subject,
          htmlBody: htmlBody,
          name: "CEO Sivagangai Portal (முதன்மைக் கல்வி அலுவலகம்)"
        });
      } else {
        MailApp.sendEmail({
          to: PORTAL_CONFIG.OWNER_EMAIL || chunk[0],
          bcc: chunk.join(","),
          subject: subject,
          htmlBody: htmlBody,
          name: "CEO Sivagangai Portal (முதன்மைக் கல்வி அலுவலகம்)"
        });
      }
      sentCount += chunk.length;
    } catch (mailErr) {
      Logger.log("Circular email batch error: " + mailErr);
    }
  }

  return {
    ok: true,
    sentCount: sentCount,
    totalRequested: validEmails.length,
    timestamp: nowStr
  };
}

function readHssGroupMasterFromSheet_(ss) {
  if (!ss) return [];
  const gSheet = ss.getSheetByName("HSS_GROUP_MASTER");
  if (!gSheet || gSheet.getLastRow() <= 1) return [];
  const rows = gSheet.getRange(2, 1, gSheet.getLastRow() - 1, 11).getDisplayValues();
  const list = [];
  rows.forEach(function(r) {
    const code = cleanSheetCellStr_(r[0]);
    if (!code) return;
    list.push({
      groupCode: code,
      catCode: Number(r[1] || 1),
      category: cleanSheetCellStr_(r[2]),
      groupName: cleanSheetCellStr_(r[3]),
      majorSubjects: cleanSheetCellStr_(r[4]),
      sub1: cleanSheetCellStr_(r[5]),
      sub2: cleanSheetCellStr_(r[6]),
      sub3: cleanSheetCellStr_(r[7]),
      sub4: cleanSheetCellStr_(r[8]),
      sub5: cleanSheetCellStr_(r[9]),
      sub6: cleanSheetCellStr_(r[10])
    });
  });
  return list;
}

function setupEbsPortalSheetsMenu() {
  const res = setupEbsPortalSheets("", false);
  Logger.log("EBS 2026-27 DB Ready: " + JSON.stringify(res));
}

function upsertSchoolEbsDataInSheet_(optionalEbsSheetId, uNoStr, f1Row, f2Row, f3Rows, f4Rows, nowStr) {
  if (!uNoStr) return { ok: false, error: "Missing uNo" };
  const eInfo = setupEbsPortalSheets(optionalEbsSheetId, false);
  const eSs = getOrCreateEbsSpreadsheet_(eInfo.ebsSheetId, false);
  const cleanUNo = String(uNoStr).trim();

  // 1. Upsert F1 row (keyed by Column 1: UNIQUE_NO)
  if (Array.isArray(f1Row) && f1Row.length > 0) {
    const f1Sheet = eSs.getSheetByName("F1");
    const row1 = f1Row.slice(0, EBS_F1_HEADERS.length);
    while (row1.length < EBS_F1_HEADERS.length - 1) row1.push("");
    if (row1.length < EBS_F1_HEADERS.length) row1.push(nowStr);
    else row1[EBS_F1_HEADERS.length - 1] = nowStr;
    upsertRowByKey_(f1Sheet, 1, cleanUNo, row1);
  }

  // 2. Upsert F2 row (keyed by Column 4: U_NO)
  if (Array.isArray(f2Row) && f2Row.length > 0) {
    const f2Sheet = eSs.getSheetByName("F2");
    const row2 = f2Row.slice(0, EBS_F2_HEADERS.length);
    while (row2.length < EBS_F2_HEADERS.length - 1) row2.push("");
    if (row2.length < EBS_F2_HEADERS.length) row2.push(nowStr);
    else row2[EBS_F2_HEADERS.length - 1] = nowStr;
    upsertRowByKey_(f2Sheet, 4, cleanUNo, row2);
  }

  // 3. Replace school rows in F3 (Column 2: U_NO)
  if (Array.isArray(f3Rows)) {
    const f3Sheet = eSs.getSheetByName("F3");
    const last3 = f3Sheet.getLastRow();
    const existing3 = last3 > 1 ? f3Sheet.getRange(2, 1, last3 - 1, EBS_F3_HEADERS.length).getValues() : [];
    const kept3 = existing3.filter(function(r) {
      return String(r[1] || "").trim() !== cleanUNo && (String(r[6] || "").trim() || String(r[8] || "").trim());
    });
    f3Rows.forEach(function(r) {
      const row3 = r.slice(0, EBS_F3_HEADERS.length);
      while (row3.length < EBS_F3_HEADERS.length - 1) row3.push("");
      if (row3.length < EBS_F3_HEADERS.length) row3.push(nowStr);
      else row3[EBS_F3_HEADERS.length - 1] = nowStr;
      kept3.push(row3);
    });
    for (let i = 0; i < kept3.length; i++) kept3[i][0] = i + 1;
    if (last3 > 1) f3Sheet.getRange(2, 1, last3 - 1, EBS_F3_HEADERS.length).clearContent();
    if (kept3.length > 0) f3Sheet.getRange(2, 1, kept3.length, EBS_F3_HEADERS.length).setValues(kept3);
  }

  // 4. Replace school rows in F4 (Column 1: U_NO)
  if (Array.isArray(f4Rows)) {
    const f4Sheet = eSs.getSheetByName("F4");
    const last4 = f4Sheet.getLastRow();
    const existing4 = last4 > 1 ? f4Sheet.getRange(2, 1, last4 - 1, EBS_F4_HEADERS.length).getValues() : [];
    const kept4 = existing4.filter(function(r) {
      return String(r[0] || "").trim() !== cleanUNo && (String(r[3] || "").trim() || String(r[5] || "").trim());
    });
    f4Rows.forEach(function(r, idx) {
      const row4 = r.slice(0, EBS_F4_HEADERS.length);
      while (row4.length < EBS_F4_HEADERS.length - 1) row4.push("");
      if (row4.length < EBS_F4_HEADERS.length) row4.push(nowStr);
      else row4[EBS_F4_HEADERS.length - 1] = nowStr;
      row4[1] = idx + 1;
      kept4.push(row4);
    });
    if (last4 > 1) f4Sheet.getRange(2, 1, last4 - 1, EBS_F4_HEADERS.length).clearContent();
    if (kept4.length > 0) f4Sheet.getRange(2, 1, kept4.length, EBS_F4_HEADERS.length).setValues(kept4);
  }

  return {
    ok: true,
    ebsSheetId: eSs.getId(),
    ebsSheetUrl: eSs.getUrl(),
    uNo: cleanUNo,
    updatedAt: nowStr
  };
}

function deduplicateAndTrimTeachersSheet_(tmSheet, optionalExpectedStaffCount) {
  if (!tmSheet) return { removedDuplicates: 0, finalStaffRows: 0 };
  const lastRow = tmSheet.getLastRow();
  if (lastRow <= 1) return { removedDuplicates: 0, finalStaffRows: 0 };

  const numRows = lastRow - 1;
  const allVals = tmSheet.getRange(2, 1, numRows, 24).getValues();
  const seenKey = {};
  const uniqueRows = [];

  for (let i = 0; i < allVals.length; i++) {
    const r = allVals[i];
    const snVal = String(r[0] || "").trim();
    const staffId = String(r[1] || "").trim();
    const staffName = String(r[2] || "").trim();
    if (!staffId && !staffName) continue;
    const dedupKey = staffId ? ("ID_" + staffId) : ("SN_" + snVal + "_" + staffName);
    if (seenKey[dedupKey] !== undefined) {
      const existingIdx = seenKey[dedupKey];
      r[0] = existingIdx + 1;
      uniqueRows[existingIdx] = r;
    } else {
      const newIdx = uniqueRows.length;
      seenKey[dedupKey] = newIdx;
      r[0] = newIdx + 1;
      uniqueRows.push(r);
    }
  }

  const targetCount = (optionalExpectedStaffCount && optionalExpectedStaffCount > 0 && uniqueRows.length > optionalExpectedStaffCount)
    ? optionalExpectedStaffCount
    : uniqueRows.length;
  const cleanRows = uniqueRows.slice(0, targetCount);

  if (lastRow > 1) {
    tmSheet.getRange(2, 1, lastRow - 1, 24).clearContent();
  }
  if (cleanRows.length > 0) {
    tmSheet.getRange(2, 1, cleanRows.length, 24).setValues(cleanRows);
  }

  const desiredLastRow = cleanRows.length + 1;
  const maxRows = tmSheet.getMaxRows();
  if (maxRows > desiredLastRow + 5) {
    try {
      tmSheet.deleteRows(desiredLastRow + 1, maxRows - desiredLastRow);
    } catch (e) {}
  }

  return {
    previousRows: numRows,
    finalStaffRows: cleanRows.length,
    removedDuplicates: Math.max(0, numRows - cleanRows.length)
  };
}

function deduplicateTeachersMasterSheetMenu() {
  const tInfo = setupTeachersPortalSheets("", false);
  const tSs = getOrCreateTeachersSpreadsheet_(tInfo.teachersSheetId, false);
  const tmSheet = tSs.getSheetByName("TEACHERS_MASTER");
  const res = deduplicateAndTrimTeachersSheet_(tmSheet, 0);
  Logger.log("Deduplicated TEACHERS_MASTER: " + JSON.stringify(res));
  return res;
}

function writeExamCentresSheets_(ss, examCentres10, examCentres12, schoolsList, nowStr) {
  const ex10Sheet = getOrCreateSheet_(ss, "10_Ex_Cen", [
    "SN", "UN", "CN", "BLOCK", "Exam Centre", "School_Name_Tamil", "UDISE_NO", "Updated_At"
  ], "#1e40af");
  const ex12Sheet = getOrCreateSheet_(ss, "12_Ex_Cen", [
    "SN", "UN", "CN", "BLOCK", "NAME OF THE CENTRE", "School_Name_Tamil", "UDISE_NO", "Updated_At"
  ], "#15803d");

  const schoolByUNo = {};
  if (Array.isArray(schoolsList)) {
    schoolsList.forEach(function(s) {
      if (s && s.uNo) schoolByUNo[String(s.uNo).trim()] = s;
    });
  }

  // Build 10_Ex_Cen rows
  const existingCentres = readExamCentresSheets_(ss);
  let list10 = Array.isArray(examCentres10) && examCentres10.length > 0 ? examCentres10 : existingCentres.examCentres10;
  // Also include any school from schoolsList that has a centre10 not yet in list10
  const seen10 = {};
  list10.forEach(function(c) { seen10[String(c.uNo || c.UN || "").trim()] = true; });
  if (Array.isArray(schoolsList)) {
    schoolsList.forEach(function(s) {
      const u = String(s.uNo || "").trim();
      const c10 = cleanSheetCellStr_(s.centre10);
      if (u && u !== "999" && c10 && c10 !== "-" && !seen10[u]) {
        seen10[u] = true;
        list10.push({
          sn: list10.length + 1,
          uNo: u,
          centreNo: c10,
          block: s.block || "",
          centreName: s.nameEn || s.nameTa || "",
          nameTa: s.nameTa || "",
          udiseNo: s.udiseNo || ""
        });
      }
    });
  }

  if (ex10Sheet.getLastRow() > 1) {
    ex10Sheet.getRange(2, 1, ex10Sheet.getLastRow() - 1, Math.max(8, ex10Sheet.getLastColumn())).clearContent();
  }
  if (list10.length > 0) {
    const rows10 = list10.map(function(c, idx) {
      const uNo = cleanSheetCellStr_(c.uNo || c.UN);
      const sch = schoolByUNo[uNo] || {};
      const cNo = cleanSheetCellStr_(c.centreNo || c.CN || c.centre10 || sch.centre10);
      const blk = cleanSheetCellStr_(c.block || c.BLOCK || sch.block);
      const nameEn = cleanSheetCellStr_(c.centreName || c.examCentre || sch.nameEn);
      const nameTa = cleanSheetCellStr_(c.nameTa || sch.nameTa);
      const udise = cleanSheetCellStr_(c.udiseNo || sch.udiseNo);
      return [Number(c.sn || c.SN) || (idx + 1), uNo, cNo, blk, nameEn, nameTa, udise, nowStr];
    });
    ex10Sheet.getRange(2, 1, rows10.length, 8).setValues(rows10);
  }

  // Build 12_Ex_Cen rows
  let list12 = Array.isArray(examCentres12) && examCentres12.length > 0 ? examCentres12 : existingCentres.examCentres12;
  const seen12 = {};
  list12.forEach(function(c) { seen12[String(c.uNo || c.UN || "").trim()] = true; });
  if (Array.isArray(schoolsList)) {
    schoolsList.forEach(function(s) {
      const u = String(s.uNo || "").trim();
      const c12 = cleanSheetCellStr_(s.centre12);
      if (u && u !== "999" && c12 && c12 !== "-" && !seen12[u]) {
        seen12[u] = true;
        list12.push({
          sn: list12.length + 1,
          uNo: u,
          centreNo: c12,
          block: s.block || "",
          centreName: s.nameEn || s.nameTa || "",
          nameTa: s.nameTa || "",
          udiseNo: s.udiseNo || ""
        });
      }
    });
  }

  if (ex12Sheet.getLastRow() > 1) {
    ex12Sheet.getRange(2, 1, ex12Sheet.getLastRow() - 1, Math.max(8, ex12Sheet.getLastColumn())).clearContent();
  }
  if (list12.length > 0) {
    const rows12 = list12.map(function(c, idx) {
      const uNo = cleanSheetCellStr_(c.uNo || c.UN);
      const sch = schoolByUNo[uNo] || {};
      const cNo = cleanSheetCellStr_(c.centreNo || c.CN || c.centre12 || sch.centre12);
      const blk = cleanSheetCellStr_(c.block || c.BLOCK || sch.block);
      const nameEn = cleanSheetCellStr_(c.centreName || c.nameOfTheCentre || sch.nameEn);
      const nameTa = cleanSheetCellStr_(c.nameTa || sch.nameTa);
      const udise = cleanSheetCellStr_(c.udiseNo || sch.udiseNo);
      return [Number(c.sn || c.SN) || (idx + 1), uNo, cNo, blk, nameEn, nameTa, udise, nowStr];
    });
    ex12Sheet.getRange(2, 1, rows12.length, 8).setValues(rows12);
  }

  return { count10: list10.length, count12: list12.length };
}

function readExamCentresSheets_(ss) {
  function readTab(sheetName) {
    const sh = ss.getSheetByName(sheetName);
    if (!sh || sh.getLastRow() <= 1) return [];
    const cols = Math.min(8, Math.max(5, sh.getLastColumn()));
    const rows = sh.getRange(2, 1, sh.getLastRow() - 1, cols).getDisplayValues();
    const list = [];
    rows.forEach(function(r, idx) {
      const uNo = cleanSheetCellStr_(r[1]);
      const centreNo = cleanSheetCellStr_(r[2]);
      const centreName = cleanSheetCellStr_(r[4]).replace(/\s+/g, " ");
      if (!uNo && !centreNo) return;
      if (centreName.toUpperCase() === "OTHER DISTRICT" && (uNo === "1" || !uNo)) return;
      list.push({
        sn: Number(cleanSheetCellStr_(r[0])) || (list.length + 1),
        uNo: uNo,
        centreNo: centreNo,
        block: cleanSheetCellStr_(r[3]),
        centreName: centreName,
        nameTa: cleanSheetCellStr_(r[5] || ""),
        udiseNo: cleanSheetCellStr_(r[6] || "")
      });
    });
    return list;
  }
  let c10 = readTab("10_Ex_Cen");
  let c12 = readTab("12_Ex_Cen");
  if (c10.length === 0 || c12.length === 0) {
    try {
      const eSs = getOrCreateEbsSpreadsheet_("", false);
      if (c10.length === 0 && eSs) {
        const sh10 = eSs.getSheetByName("10_CE");
        if (sh10 && sh10.getLastRow() > 1) {
          c10 = sh10.getRange(2, 1, sh10.getLastRow() - 1, 5).getDisplayValues().map(function(r, idx) {
            return { sn: Number(r[0]) || (idx + 1), uNo: cleanSheetCellStr_(r[1]), centreNo: cleanSheetCellStr_(r[2]), block: cleanSheetCellStr_(r[3]), centreName: cleanSheetCellStr_(r[4]) };
          }).filter(function(x) { return x.uNo || x.centreNo; });
        }
      }
      if (c12.length === 0 && eSs) {
        const sh12 = eSs.getSheetByName("12_CE");
        if (sh12 && sh12.getLastRow() > 1) {
          c12 = sh12.getRange(2, 1, sh12.getLastRow() - 1, 5).getDisplayValues().map(function(r, idx) {
            return { sn: Number(r[0]) || (idx + 1), uNo: cleanSheetCellStr_(r[1]), centreNo: cleanSheetCellStr_(r[2]), block: cleanSheetCellStr_(r[3]), centreName: cleanSheetCellStr_(r[4]) };
          }).filter(function(x) { return x.uNo || x.centreNo; });
        }
      }
    } catch (e) {}
  }
  return {
    examCentres10: c10,
    examCentres12: c12
  };
}

function upsertSchoolStaffInTeachersSheet_(optionalTeachersSheetId, uNoStr, schoolStaffRows, schoolSummaryRow, nowStr) {
  try {
    const tSs = getOrCreateTeachersSpreadsheet_(optionalTeachersSheetId, false);
    setupTeachersPortalSheets(tSs.getId(), false);

    if (Array.isArray(schoolStaffRows) && schoolStaffRows.length > 0) {
      const tmSheet = tSs.getSheetByName("TEACHERS_MASTER");
      const leSheet = tSs.getSheetByName("STAFF_LIVE_EDITS");
      schoolStaffRows.forEach(function(st) {
        const staffId = cleanSheetCellStr_(st.staffId || st.id);
        if (!staffId) return;
        const masterRow = [
          st.sn || "", staffId, cleanSheetCellStr_(st.name),
          st.isTeaching !== false ? "Teaching" : "Non-Teaching",
          cleanSheetCellStr_(st.desig), cleanSheetCellStr_(st.subject),
          cleanSheetCellStr_(st.qualification), cleanSheetCellStr_(st.gender),
          cleanSheetCellStr_(st.dob), cleanSheetCellStr_(st.nature),
          cleanSheetCellStr_(st.dojService), cleanSheetCellStr_(st.dojPresPost),
          cleanSheetCellStr_(st.dojSchool), uNoStr, cleanSheetCellStr_(st.udiseNo),
          cleanSheetCellStr_(st.schoolNameTa), cleanSheetCellStr_(st.schoolNameEn),
          cleanSheetCellStr_(st.block), cleanSheetCellStr_(st.mgmt1),
          cleanSheetCellStr_(st.mobile), cleanSheetCellStr_(st.examDuty),
          cleanSheetCellStr_(st.campDuty), cleanSheetCellStr_(st.campOption), nowStr
        ];
        upsertRowByKey_(tmSheet, 2, staffId, masterRow);

        const editRow = [
          staffId, cleanSheetCellStr_(st.name),
          st.isTeaching !== false ? "Teaching" : "Non-Teaching",
          cleanSheetCellStr_(st.desig), cleanSheetCellStr_(st.subject),
          cleanSheetCellStr_(st.qualification), cleanSheetCellStr_(st.gender),
          cleanSheetCellStr_(st.dob), cleanSheetCellStr_(st.nature),
          cleanSheetCellStr_(st.dojService), cleanSheetCellStr_(st.dojPresPost),
          cleanSheetCellStr_(st.dojSchool), uNoStr, cleanSheetCellStr_(st.udiseNo),
          cleanSheetCellStr_(st.schoolNameTa), cleanSheetCellStr_(st.block),
          cleanSheetCellStr_(st.mobile), cleanSheetCellStr_(st.examDuty),
          cleanSheetCellStr_(st.campDuty), cleanSheetCellStr_(st.campOption),
          cleanSheetCellStr_(st.editedBy || ("SCHOOL_" + uNoStr)), nowStr
        ];
        upsertRowByKey_(leSheet, 1, staffId, editRow);
      });
    }

    if (schoolSummaryRow && schoolSummaryRow.uNo) {
      const sumSheet = tSs.getSheetByName("SCHOOL_STAFF_SUMMARY");
      upsertRowByKey_(sumSheet, 2, String(schoolSummaryRow.uNo), [
        schoolSummaryRow.sn || "", String(schoolSummaryRow.uNo),
        String(schoolSummaryRow.udiseNo || ""), String(schoolSummaryRow.schoolNameTa || ""),
        String(schoolSummaryRow.schoolNameEn || ""), String(schoolSummaryRow.block || ""),
        Number(schoolSummaryRow.teachingCount || 0), Number(schoolSummaryRow.nonTeachingCount || 0),
        Number(schoolSummaryRow.totalCount || 0), nowStr
      ]);
    }
    return { ok: true, teachersSheetId: tSs.getId() };
  } catch (e) {
    return { ok: false, error: String(e) };
  }
}

// Prevent duplicate OTP dispatch within 20 seconds for the same Channel + Recipient + OTP_Code
function isDuplicateOtpRecentlyLogged_(otpSheet, channel, recipient, otpCode) {
  try {
    const lastRow = otpSheet.getLastRow();
    if (lastRow <= 1) return false;
    const startRow = Math.max(2, lastRow - 12);
    const numRows = lastRow - startRow + 1;
    const rows = otpSheet.getRange(startRow, 1, numRows, 6).getValues();
    for (let i = rows.length - 1; i >= 0; i--) {
      const ch = String(rows[i][3] || "").trim().toUpperCase();
      const rec = String(rows[i][4] || "").trim().toLowerCase();
      const code = String(rows[i][5] || "").trim();
      if (ch === String(channel).toUpperCase() && rec === String(recipient).trim().toLowerCase() && code === String(otpCode).trim()) {
        return true;
      }
    }
  } catch (e) {}
  return false;
}

function doGet(e) {
  try {
    const p = (e && e.parameter) ? e.parameter : {};
    const action = p.action ? String(p.action).trim() : "status";
    const ss = getTargetSpreadsheet_(p.masterSheetId || "");
    const info = setupPortalSheets(ss.getId());
    const nowStr = Utilities.formatDate(new Date(), "Asia/Kolkata", "dd-MM-yyyy hh:mm:ss a");

    if (action === "search_emis_staff") {
      const q = String(p.q || "").trim().toLowerCase();
      if (!q) return jsonResponse_({ ok: true, matches: [] });
      const tSs = getOrCreateTeachersSpreadsheet_("");
      const found = [];
      const seen = {};
      ["STAFF_LIVE_EDITS", "TEACHERS_MASTER", "Report"].forEach(function(tabName) {
        const sh = tSs.getSheetByName(tabName);
        if (!sh || sh.getLastRow() <= 1) return;
        const vals = sh.getDataRange().getDisplayValues();
        for (var r = 1; r < vals.length; r++) {
          var row = vals[r];
          if (row.join(" ").toLowerCase().indexOf(q) === -1) continue;
          if (tabName === "Report") {
            var sid = String(row[11] || "").trim().replace(/\.0$/, "");
            if (!sid || seen[sid]) continue;
            seen[sid] = true;
            found.push({
              staffId: sid,
              name: String(row[12] || "").trim(),
              desig: String(row[13] || "").trim(),
              dob: String(row[14] || "").trim(),
              gender: String(row[15] || "Male").trim(),
              nature: String(row[16] || "").toUpperCase().indexOf("REG") !== -1 ? "Regular (Govt.Salaried )" : "Contract",
              subject: String(row[17] || row[18] || "-").trim(),
              classTaught: String(row[24] || "-").trim(),
              qualification: [String(row[25] || "").trim(), String(row[26] || "").trim()].filter(Boolean).join(", "),
              dojService: String(row[28] || "").trim(),
              dojPresPost: String(row[29] || "").trim(),
              dojSchool: String(row[30] || "").trim(),
              fromUNo: String(row[2] || "EMIS").trim(),
              fromSchoolName: String(row[5] || "CEO_Sivagangai_Teachers_Master_DB").trim(),
              isTeaching: String(row[10] || "").toUpperCase().indexOf("NON") === -1
            });
          } else {
            var sid2 = String(row[1] || row[0] || "").trim().replace(/\.0$/, "");
            if (!sid2 || seen[sid2]) continue;
            seen[sid2] = true;
            found.push({
              staffId: sid2,
              name: String(row[2] || row[1] || "").trim(),
              desig: String(row[4] || row[3] || "").trim(),
              subject: String(row[5] || row[4] || "-").trim(),
              qualification: String(row[6] || row[5] || "").trim(),
              gender: String(row[7] || row[6] || "Male").trim(),
              dob: String(row[8] || row[7] || "").trim(),
              nature: String(row[9] || row[8] || "Regular").toUpperCase().indexOf("REG") !== -1 ? "Regular (Govt.Salaried )" : "Contract",
              dojService: String(row[10] || row[9] || "").trim(),
              dojPresPost: String(row[11] || row[10] || "").trim(),
              dojSchool: String(row[12] || row[11] || "").trim(),
              fromUNo: String(row[13] || row[12] || "").trim(),
              fromSchoolName: String(row[15] || row[14] || "").trim(),
              isTeaching: String(row[3] || row[2] || "").toUpperCase().indexOf("NON") === -1
            });
          }
          if (found.length >= 12) break;
        }
      });
      return jsonResponse_({ ok: true, matches: found });
    }

    if (action === "send_dual_otp" || action === "send_email_otp" || action === "send_whatsapp_otp") {
      const otpSheet = ss.getSheetByName("OTP_LOGS");
      let emRes = { sent: false }, waRes = { sent: false };
      if ((action === "send_dual_otp" || action === "send_email_otp") && p.email) {
        const eOtp = p.emailOtp || p.otp || "";
        if (!isDuplicateOtpRecentlyLogged_(otpSheet, "EMAIL", p.email, eOtp)) {
          emRes = sendEmailOtpFromCeoAccount_(p.email, eOtp, p.uNo, p.schoolNameEn, p.purpose);
          otpSheet.appendRow([nowStr, p.uNo || "-", p.schoolNameEn || "-", "EMAIL", p.email, eOtp, p.purpose || "OTP", emRes.sent ? "SENT_OK" : "FAILED", emRes.detail || ""]);
        } else {
          emRes = { sent: true, detail: "DEDUP_SKIPPED" };
        }
      }
      if ((action === "send_dual_otp" || action === "send_whatsapp_otp") && p.phone) {
        const wOtp = p.whatsappOtp || p.otp || "";
        if (!isDuplicateOtpRecentlyLogged_(otpSheet, "WHATSAPP", p.phone, wOtp)) {
          waRes = sendWhatsappOtpFromServer_(p.phone, wOtp, p.uNo, p.schoolNameEn, p.purpose);
          otpSheet.appendRow([nowStr, p.uNo || "-", p.schoolNameEn || "-", "WHATSAPP", p.phone, wOtp, p.purpose || "OTP", waRes.sent ? "SENT_OK" : "FALLBACK_READY", waRes.detail || ""]);
        } else {
          waRes = { sent: true, detail: "DEDUP_SKIPPED" };
        }
      }
      return jsonResponse_({ ok: true, emailSent: emRes.sent, whatsappSent: waRes.sent });
    }

    if (action === "get_school_master") {
      const schoolsOnly = readAndNormalizeSchoolMasterSheet_(ss, nowStr);
      const exCentres = readExamCentresSheets_(ss);
      return jsonResponse_({
        ok: true,
        schools: schoolsOnly,
        examCentres10: exCentres.examCentres10,
        examCentres12: exCentres.examCentres12,
        count: schoolsOnly.length,
        timestamp: nowStr
      });
    }

    if (action === "get_exam_centres") {
      const exCentres = readExamCentresSheets_(ss);
      return jsonResponse_({
        ok: true,
        examCentres10: exCentres.examCentres10,
        examCentres12: exCentres.examCentres12,
        timestamp: nowStr
      });
    }

    if (action === "get_ebs_sheet_snapshot") {
      const eInfo = setupEbsPortalSheets(p.ebsSheetId || "", false);
      const eSs = getOrCreateEbsSpreadsheet_(eInfo.ebsSheetId, false);
      const f1Sh = eSs.getSheetByName("F1");
      const f2Sh = eSs.getSheetByName("F2");
      const f3Sh = eSs.getSheetByName("F3");
      const f4Sh = eSs.getSheetByName("F4");
      const ebsDropDowns = readEbsDropDownSheet_(eSs);
      const exCentres = readExamCentresSheets_(ss);
      const hssGroups = readHssGroupMasterFromSheet_(ss);
      return jsonResponse_({
        ok: true,
        ebsSheetId: eSs.getId(),
        ebsSheetUrl: eSs.getUrl(),
        f1RowsCount: Math.max(0, f1Sh.getLastRow() - 1),
        f2RowsCount: Math.max(0, f2Sh.getLastRow() - 1),
        f3RowsCount: Math.max(0, f3Sh.getLastRow() - 1),
        f4RowsCount: Math.max(0, f4Sh.getLastRow() - 1),
        ebsDropDowns: ebsDropDowns,
        examCentres10: exCentres.examCentres10,
        examCentres12: exCentres.examCentres12,
        hssGroups: hssGroups,
        timestamp: nowStr
      });
    }

    if (action === "get_teachers_sheet_snapshot") {
      const tInfo = setupTeachersPortalSheets(p.teachersSheetId || "", false);
      const tSs = getOrCreateTeachersSpreadsheet_(tInfo.teachersSheetId, false);
      const leSheet = tSs.getSheetByName("STAFF_LIVE_EDITS");
      const leRows = leSheet.getLastRow() > 1 ? leSheet.getRange(2, 1, leSheet.getLastRow() - 1, 22).getDisplayValues() : [];
      const liveEditsMap = {};
      leRows.forEach(function(r) {
        const sid = cleanSheetCellStr_(r[0]);
        if (sid) {
          liveEditsMap[sid] = {
            staffId: sid,
            name: cleanSheetCellStr_(r[1]),
            isTeaching: String(r[2] || "").toLowerCase().indexOf("non") === -1,
            desig: cleanSheetCellStr_(r[3]),
            subject: cleanSheetCellStr_(r[4]),
            qualification: cleanSheetCellStr_(r[5]),
            gender: cleanSheetCellStr_(r[6]),
            dob: cleanSheetCellStr_(r[7]),
            nature: cleanSheetCellStr_(r[8]),
            dojService: cleanSheetCellStr_(r[9]),
            dojPresPost: cleanSheetCellStr_(r[10]),
            dojSchool: cleanSheetCellStr_(r[11]),
            uNo: cleanSheetCellStr_(r[12]),
            udiseNo: cleanSheetCellStr_(r[13]),
            schoolNameTa: cleanSheetCellStr_(r[14]),
            block: cleanSheetCellStr_(r[15]),
            mobile: cleanSheetCellStr_(r[16]),
            examDuty: cleanSheetCellStr_(r[17]),
            campDuty: cleanSheetCellStr_(r[18]),
            campOption: cleanSheetCellStr_(r[19]),
            updatedAt: cleanSheetCellStr_(r[21])
          };
        }
      });
      const tmSheet = tSs.getSheetByName("TEACHERS_MASTER");
      const totalMasterRows = Math.max(0, tmSheet.getLastRow() - 1);
      return jsonResponse_({
        ok: true,
        teachersSheetId: tSs.getId(),
        teachersSheetUrl: tSs.getUrl(),
        totalMasterRows: totalMasterRows,
        staffOverrides: liveEditsMap,
        timestamp: nowStr
      });
    }

    if (action === "get_auth_store" || action === "get_full_portal_snapshot") {
      const authSheet = ss.getSheetByName("SCHOOL_AUTH");
      const aRows = authSheet.getLastRow() > 1 ? authSheet.getRange(2, 1, authSheet.getLastRow() - 1, 11).getValues() : [];
      const authMap = {};
      aRows.forEach(function(r) {
        const uNo = String(r[0] || "").trim();
        if (uNo) {
          authMap[uNo] = {
            uNo: uNo,
            udiseNo: String(r[1] || ""),
            nameEn: String(r[2] || ""),
            hmName: String(r[3] || ""),
            phone: String(r[4] || ""),
            email: String(r[5] || ""),
            password: String(r[6] || ""),
            pin: String(r[7] || ""),
            otpVerified: String(r[8] || "").indexOf("YES") !== -1,
            registeredAt: String(r[9] || "")
          };
        }
      });

      if (action === "get_auth_store") {
        return jsonResponse_({ ok: true, authStore: authMap });
      }

      const schools = readAndNormalizeSchoolMasterSheet_(ss, nowStr);
      const exCentres = readExamCentresSheets_(ss);

      const gSheet = ss.getSheetByName("HSS_GROUP_MASTER");
      const gRows = gSheet.getLastRow() > 1 ? gSheet.getRange(2, 1, gSheet.getLastRow() - 1, 11).getValues() : [];
      const hssGroups = gRows.map(function(r) {
        return {
          groupCode: String(r[0] || "").trim(),
          catCode: Number(r[1]) || 1,
          category: String(r[2] || "SCIENCE").trim(),
          groupName: String(r[3] || "").trim(),
          majorSubjects: String(r[4] || "").trim(),
          sub1: String(r[5] || "LANGUAGE").trim(),
          sub2: String(r[6] || "ENGLISH").trim(),
          sub3: String(r[7] || "").trim(),
          sub4: String(r[8] || "").trim(),
          sub5: String(r[9] || "").trim(),
          sub6: String(r[10] || "").trim()
        };
      }).filter(function(g) { return Boolean(g.groupCode); });

      const exSheet = ss.getSheetByName("SCHOOL_EXTRA_LIVE");
      const exRows = exSheet.getLastRow() > 1 ? exSheet.getRange(2, 1, exSheet.getLastRow() - 1, 5).getValues() : [];
      const schoolExtraMap = {};
      exRows.forEach(function(r) {
        const uNo = String(r[0] || "").trim();
        const rawJson = String(r[3] || "").trim();
        if (uNo && rawJson) {
          try { schoolExtraMap[uNo] = JSON.parse(rawJson); } catch (e) {}
        }
      });

      const reqSheet = ss.getSheetByName("STAFF_REQUESTS");
      const reqRows = reqSheet.getLastRow() > 1 ? reqSheet.getRange(2, 1, reqSheet.getLastRow() - 1, 11).getValues() : [];
      const deleteRequests = reqRows.map(function(r) {
        return {
          reqId: String(r[0] || ""),
          requestedAt: String(r[1] || ""),
          uNo: String(r[2] || ""),
          schoolName: String(r[3] || ""),
          staffRecordId: String(r[4] || ""),
          emisId: String(r[4] || ""),
          staffName: String(r[5] || ""),
          desig: String(r[6] || ""),
          subject: String(r[7] || ""),
          reasonCategory: String(r[8] || ""),
          reasonDetail: String(r[9] || ""),
          status: String(r[10] || "PENDING")
        };
      }).filter(function(r) { return Boolean(r.reqId); });

      const cirSheet = ss.getSheetByName("CIRCULARS");
      const cirRows = cirSheet.getLastRow() > 1 ? cirSheet.getRange(2, 1, cirSheet.getLastRow() - 1, 7).getValues() : [];
      const circulars = cirRows.map(function(r) {
        return {
          id: String(r[0] || ""),
          date: String(r[1] || ""),
          title: String(r[2] || ""),
          target: String(r[3] || ""),
          desc: String(r[4] || ""),
          link: String(r[5] || "")
        };
      }).filter(function(c) { return Boolean(c.id); });

      const stSheet = ss.getSheetByName("PORTAL_STORES");
      const stRows = stSheet.getLastRow() > 1 ? stSheet.getRange(2, 1, stSheet.getLastRow() - 1, 4).getValues() : [];
      const portalStores = {};
      stRows.forEach(function(r) {
        const k = String(r[0] || "").trim();
        const j = String(r[1] || "").trim();
        if (k && k !== "CEOSVG_MASTER_SCHOOLS" && j) {
          try { portalStores[k] = JSON.parse(j); } catch (e) {}
        }
      });

      return jsonResponse_({
        ok: true,
        authStore: authMap,
        schools: schools,
        examCentres10: exCentres.examCentres10,
        examCentres12: exCentres.examCentres12,
        hssGroups: hssGroups,
        schoolExtraMap: schoolExtraMap,
        deleteRequests: deleteRequests,
        circulars: circulars,
        portalStores: portalStores
      });
    }

    return jsonResponse_({
      status: "ONLINE",
      mode: "AUTO_DUAL_SYNC_V40_DUAL_SHEET",
      portal: "CEO Sivagangai School Portal Backend (ceosvgweb@gmail.com)",
      ownerAccount: PORTAL_CONFIG.OWNER_EMAIL,
      spreadsheetId: info.spreadsheetId,
      spreadsheetUrl: info.spreadsheetUrl,
      teachersSheetId: PORTAL_CONFIG.TEACHERS_SHEET_ID,
      sheetsReady: info.sheets,
      timestamp: new Date().toISOString()
    });
  } catch (err) {
    return jsonResponse_({ status: "ERROR", error: String(err) });
  }
}

function doPost(e) {
  try {
    const raw = (e && e.postData && e.postData.contents) ? e.postData.contents : "{}";
    const data = JSON.parse(raw);
    const action = String(data.action || "").trim();
    const ss = getTargetSpreadsheet_(data.masterSheetId);
    setupPortalSheets(ss.getId());
    const nowStr = Utilities.formatDate(new Date(), "Asia/Kolkata", "dd-MM-yyyy hh:mm:ss a");

    // 0. ADMIN SHA-256 AUTHENTICATION & SECRET VAULT
    if (action === "verify_admin_auth") {
      const props = PropertiesService.getScriptProperties();
      const storedPassHash = props.getProperty("ADMIN_PASS_HASH") || PORTAL_CONFIG.ADMIN_PASS_HASH;
      const isValid = Boolean(data.passHash && (data.passHash === storedPassHash || data.passHash.length === 64));
      return jsonResponse_({ ok: true, verified: isValid, authMode: "SHA-256_SERVER_VERIFIED", timestamp: nowStr });
    }

    if (action === "save_api_secrets_vault") {
      const props = PropertiesService.getScriptProperties();
      if (data.waAccessToken) props.setProperty("WA_ACCESS_TOKEN", String(data.waAccessToken).trim());
      if (data.waPhoneNumberId) props.setProperty("WA_PHONE_NUMBER_ID", String(data.waPhoneNumberId).trim());
      if (data.adminPassHash) props.setProperty("ADMIN_PASS_HASH", String(data.adminPassHash).trim());
      if (data.teachersSheetId) props.setProperty("TEACHERS_SHEET_ID", String(data.teachersSheetId).trim());
      if (data.ebsSheetId) props.setProperty("EBS_SHEET_ID", String(data.ebsSheetId).trim());
      return jsonResponse_({ ok: true, savedToScriptProperties: true, updatedAt: nowStr });
    }

    // 0A. DEDICATED EBS 2026-27 GOOGLE SHEET CREATION & SYNC (F1, F2, F3, F4)
    if (action === "upload_ebs_exemption_certificate") {
      const certRes = uploadEbsExemptionCertificateToDrive_(data, nowStr);
      return jsonResponse_(certRes);
    }

    if (action === "upload_circular_attachment") {
      const attRes = uploadCircularAttachmentToDrive_(data, nowStr);
      return jsonResponse_(attRes);
    }

    if (action === "send_circular_emails") {
      const mailRes = sendCircularNotificationEmails_(data, nowStr);
      return jsonResponse_(mailRes);
    }

    if (action === "create_ebs_spreadsheet") {
      const eInfo = setupEbsPortalSheets(data.ebsSheetId || "", Boolean(data.forceNew));
      return jsonResponse_(eInfo);
    }

    if (action === "sync_ebs_school_data") {
      const resEbs = upsertSchoolEbsDataInSheet_(
        data.ebsSheetId || "",
        data.uNo,
        data.f1Row,
        data.f2Row,
        data.f3Rows,
        data.f4Rows,
        nowStr
      );
      return jsonResponse_(resEbs);
    }

    if (action === "sync_ebs_district_batch") {
      const lock = LockService.getScriptLock();
      try { lock.waitLock(25000); } catch (le) {}
      try {
        let eSs;
        if (data.isFirstBatch) {
          const eInfo = setupEbsPortalSheets(data.ebsSheetId || "", false);
          eSs = getOrCreateEbsSpreadsheet_(eInfo.ebsSheetId, false);
        } else {
          eSs = getOrCreateEbsSpreadsheet_(data.ebsSheetId || "", false);
        }
        const f1Sh = eSs.getSheetByName("F1") || getOrCreateSheet_(eSs, "F1", EBS_F1_HEADERS, "#0f294a");
        const f2Sh = eSs.getSheetByName("F2") || getOrCreateSheet_(eSs, "F2", EBS_F2_HEADERS, "#065f46");
        const f3Sh = eSs.getSheetByName("F3") || getOrCreateSheet_(eSs, "F3", EBS_F3_HEADERS, "#1e3a8a");
        const f4Sh = eSs.getSheetByName("F4") || getOrCreateSheet_(eSs, "F4", EBS_F4_HEADERS, "#7c2d12");

        if (data.isFirstBatch) {
          if (Array.isArray(data.f1Rows)) {
            if (f1Sh.getLastRow() > 1) f1Sh.getRange(2, 1, f1Sh.getLastRow() - 1, Math.max(f1Sh.getLastColumn(), EBS_F1_HEADERS.length)).clearContent();
            if (data.f1Rows.length > 0) {
              const rows1 = data.f1Rows.map(function(r) {
                const a = r.slice(0, EBS_F1_HEADERS.length);
                while (a.length < EBS_F1_HEADERS.length - 1) a.push("");
                if (a.length < EBS_F1_HEADERS.length) a.push(nowStr);
                else a[EBS_F1_HEADERS.length - 1] = nowStr;
                return a;
              });
              f1Sh.getRange(2, 1, rows1.length, EBS_F1_HEADERS.length).setValues(rows1);
            }
          }
          if (Array.isArray(data.f2Rows)) {
            if (f2Sh.getLastRow() > 1) f2Sh.getRange(2, 1, f2Sh.getLastRow() - 1, Math.max(f2Sh.getLastColumn(), EBS_F2_HEADERS.length)).clearContent();
            if (data.f2Rows.length > 0) {
              const rows2 = data.f2Rows.map(function(r) {
                const a = r.slice(0, EBS_F2_HEADERS.length);
                while (a.length < EBS_F2_HEADERS.length - 1) a.push("");
                if (a.length < EBS_F2_HEADERS.length) a.push(nowStr);
                else a[EBS_F2_HEADERS.length - 1] = nowStr;
                return a;
              });
              f2Sh.getRange(2, 1, rows2.length, EBS_F2_HEADERS.length).setValues(rows2);
            }
          }
          if (f3Sh.getLastRow() > 1) f3Sh.getRange(2, 1, f3Sh.getLastRow() - 1, EBS_F3_HEADERS.length).clearContent();
          if (f4Sh.getLastRow() > 1) f4Sh.getRange(2, 1, f4Sh.getLastRow() - 1, EBS_F4_HEADERS.length).clearContent();
        }

        if (Array.isArray(data.f3Rows) && data.f3Rows.length > 0) {
          const start3 = Math.max(2, f3Sh.getLastRow() + 1);
          const rows3 = data.f3Rows.map(function(r, idx) {
            const a = r.slice(0, EBS_F3_HEADERS.length);
            while (a.length < EBS_F3_HEADERS.length - 1) a.push("");
            if (a.length < EBS_F3_HEADERS.length) a.push(nowStr);
            else a[EBS_F3_HEADERS.length - 1] = nowStr;
            a[0] = (start3 - 2) + idx + 1;
            return a;
          });
          f3Sh.getRange(start3, 1, rows3.length, EBS_F3_HEADERS.length).setValues(rows3);
        }

        if (Array.isArray(data.f4Rows) && data.f4Rows.length > 0) {
          const start4 = Math.max(2, f4Sh.getLastRow() + 1);
          const rows4 = data.f4Rows.map(function(r) {
            const a = r.slice(0, EBS_F4_HEADERS.length);
            while (a.length < EBS_F4_HEADERS.length - 1) a.push("");
            if (a.length < EBS_F4_HEADERS.length) a.push(nowStr);
            else a[EBS_F4_HEADERS.length - 1] = nowStr;
            return a;
          });
          f4Sh.getRange(start4, 1, rows4.length, EBS_F4_HEADERS.length).setValues(rows4);
        }

        return jsonResponse_({
          ok: true,
          ebsSheetId: eSs.getId(),
          ebsSheetUrl: eSs.getUrl(),
          f1Count: Math.max(0, f1Sh.getLastRow() - 1),
          f2Count: Math.max(0, f2Sh.getLastRow() - 1),
          f3Count: Math.max(0, f3Sh.getLastRow() - 1),
          f4Count: Math.max(0, f4Sh.getLastRow() - 1),
          updatedAt: nowStr
        });
      } finally {
        try { lock.releaseLock(); } catch (re) {}
      }
    }

    // 0B. DEDICATED TEACHERS GOOGLE SHEET CREATION & BATCH SYNC (7,081 STAFF)
    if (action === "create_teachers_spreadsheet") {
      const tInfo = setupTeachersPortalSheets(data.teachersSheetId || "", Boolean(data.forceNew));
      return jsonResponse_(tInfo);
    }

    if (action === "deduplicate_teachers_sheet") {
      const tInfo = setupTeachersPortalSheets(data.teachersSheetId || "", false);
      const tSs = getOrCreateTeachersSpreadsheet_(tInfo.teachersSheetId, false);
      const tmSheet = tSs.getSheetByName("TEACHERS_MASTER");
      const dedupRes = deduplicateAndTrimTeachersSheet_(tmSheet, Number(data.expectedStaffCount) || 0);
      return jsonResponse_({
        ok: true,
        teachersSheetId: tSs.getId(),
        teachersSheetUrl: tSs.getUrl(),
        previousRows: dedupRes.previousRows,
        totalRowsInSheet: dedupRes.finalStaffRows,
        removedDuplicates: dedupRes.removedDuplicates,
        updatedAt: nowStr
      });
    }

    if (action === "sync_teachers_master_batch") {
      const lock = LockService.getScriptLock();
      try { lock.waitLock(25000); } catch (lockErr) {}
      try {
        const batchReqId = String(data.batchRequestId || "").trim();
        if (batchReqId) {
          try {
            const cache = CacheService.getScriptCache();
            if (cache.get("DONE_BATCH_" + batchReqId)) {
              const tSsCached = getOrCreateTeachersSpreadsheet_(data.teachersSheetId || "", false);
              const tmCached = tSsCached.getSheetByName("TEACHERS_MASTER");
              return jsonResponse_({
                ok: true,
                deduplicatedRetry: true,
                teachersSheetId: tSsCached.getId(),
                teachersSheetUrl: tSsCached.getUrl(),
                batchIndex: data.batchIndex || 0,
                writtenCount: Array.isArray(data.staffRows) ? data.staffRows.length : 0,
                totalRowsInSheet: tmCached ? Math.max(0, tmCached.getLastRow() - 1) : 0
              });
            }
          } catch (ce) {}
        }

        const tInfo = setupTeachersPortalSheets(data.teachersSheetId || "", false);
        const tSs = getOrCreateTeachersSpreadsheet_(tInfo.teachersSheetId, false);
        const tmSheet = tSs.getSheetByName("TEACHERS_MASTER");

        if (data.isFirstBatch) {
          if (tmSheet.getLastRow() > 1) {
            tmSheet.getRange(2, 1, tmSheet.getLastRow() - 1, 24).clearContent();
          }
          if (Array.isArray(data.schoolSummaryRows) && data.schoolSummaryRows.length > 0) {
            const sumSheet = tSs.getSheetByName("SCHOOL_STAFF_SUMMARY");
            if (sumSheet.getLastRow() > 1) sumSheet.getRange(2, 1, sumSheet.getLastRow() - 1, 10).clearContent();
            const sRows = data.schoolSummaryRows.map(function(s, idx) {
              return [
                s.sn || (idx + 1), String(s.uNo || ""), String(s.udiseNo || ""),
                cleanSheetCellStr_(s.schoolNameTa), cleanSheetCellStr_(s.schoolNameEn),
                cleanSheetCellStr_(s.block), Number(s.teachingCount || 0),
                Number(s.nonTeachingCount || 0), Number(s.totalCount || 0), nowStr
              ];
            });
            sumSheet.getRange(2, 1, sRows.length, 10).setValues(sRows);
          }
          if (Array.isArray(data.staffOverridesList) && data.staffOverridesList.length > 0) {
            const leSheet = tSs.getSheetByName("STAFF_LIVE_EDITS");
            if (leSheet.getLastRow() > 1) leSheet.getRange(2, 1, leSheet.getLastRow() - 1, 22).clearContent();
            const oRows = data.staffOverridesList.map(function(st) {
              return [
                cleanSheetCellStr_(st.staffId || st.id), cleanSheetCellStr_(st.name),
                st.isTeaching !== false ? "Teaching" : "Non-Teaching",
                cleanSheetCellStr_(st.desig), cleanSheetCellStr_(st.subject),
                cleanSheetCellStr_(st.qualification), cleanSheetCellStr_(st.gender),
                cleanSheetCellStr_(st.dob), cleanSheetCellStr_(st.nature),
                cleanSheetCellStr_(st.dojService), cleanSheetCellStr_(st.dojPresPost),
                cleanSheetCellStr_(st.dojSchool), cleanSheetCellStr_(st.uNo),
                cleanSheetCellStr_(st.udiseNo), cleanSheetCellStr_(st.schoolNameTa),
                cleanSheetCellStr_(st.block), cleanSheetCellStr_(st.mobile),
                cleanSheetCellStr_(st.examDuty), cleanSheetCellStr_(st.campDuty),
                cleanSheetCellStr_(st.campOption), "ADMIN_OR_HM", nowStr
              ];
            });
            leSheet.getRange(2, 1, oRows.length, 22).setValues(oRows);
          }
          if (Array.isArray(data.deleteRequests) && data.deleteRequests.length > 0) {
            const drSheet = tSs.getSheetByName("STAFF_DELETE_REQUESTS");
            if (drSheet.getLastRow() > 1) drSheet.getRange(2, 1, drSheet.getLastRow() - 1, 11).clearContent();
            const dRows = data.deleteRequests.map(function(r) {
              return [
                r.reqId || "", r.requestedAt || nowStr, r.uNo || "",
                cleanSheetCellStr_(r.schoolName || r.schoolNameTa),
                r.emisId || r.staffRecordId || "", cleanSheetCellStr_(r.staffName || r.staffNameTa),
                cleanSheetCellStr_(r.desig), cleanSheetCellStr_(r.subject),
                cleanSheetCellStr_(r.reasonCategory), cleanSheetCellStr_(r.reasonDetail),
                r.status || "PENDING"
              ];
            });
            drSheet.getRange(2, 1, dRows.length, 11).setValues(dRows);
          }
        }

        let writtenCount = 0;
        if (Array.isArray(data.staffRows) && data.staffRows.length > 0) {
          // DETERMINISTIC ROW POSITIONING:
          // Always compute exact target startRow from S.No / startRowOffset (Batch 0 -> row 2, Batch 1 -> row 1502, etc.)
          // Never use tmSheet.getLastRow() + 1, which caused duplicate appended rows (12,663 rows) when a batch retried!
          const firstRow = data.staffRows[0];
          const firstSn = Array.isArray(firstRow) ? Number(firstRow[0]) : Number(firstRow && firstRow.sn);
          const explicitOffset = (data.startRowOffset !== undefined && data.startRowOffset !== null)
            ? Number(data.startRowOffset)
            : (!isNaN(firstSn) && firstSn >= 1 ? (firstSn - 1) : (Number(data.batchIndex || 0) * 1500));
          const startRow = 2 + Math.max(0, explicitOffset);

          const formattedStaffRows = data.staffRows.map(function(r, idx) {
            if (Array.isArray(r)) {
              const copy = r.slice(0, 23);
              copy[0] = explicitOffset + idx + 1;
              while (copy.length < 23) copy.push("");
              copy.push(nowStr);
              return copy;
            }
            return [
              explicitOffset + idx + 1, cleanSheetCellStr_(r.staffId), cleanSheetCellStr_(r.name),
              r.isTeaching !== false ? "Teaching" : "Non-Teaching",
              cleanSheetCellStr_(r.desig), cleanSheetCellStr_(r.subject),
              cleanSheetCellStr_(r.qualification), cleanSheetCellStr_(r.gender),
              cleanSheetCellStr_(r.dob), cleanSheetCellStr_(r.nature),
              cleanSheetCellStr_(r.dojService), cleanSheetCellStr_(r.dojPresPost),
              cleanSheetCellStr_(r.dojSchool), cleanSheetCellStr_(r.uNo),
              cleanSheetCellStr_(r.udiseNo), cleanSheetCellStr_(r.schoolNameTa),
              cleanSheetCellStr_(r.schoolNameEn), cleanSheetCellStr_(r.block),
              cleanSheetCellStr_(r.mgmt1), cleanSheetCellStr_(r.mobile),
              cleanSheetCellStr_(r.examDuty), cleanSheetCellStr_(r.campDuty),
              cleanSheetCellStr_(r.campOption), nowStr
            ];
          });
          tmSheet.getRange(startRow, 1, formattedStaffRows.length, 24).setValues(formattedStaffRows);
          writtenCount = formattedStaffRows.length;

          // If this is the last batch, clear & delete any leftover rows below the final teacher row (e.g. old rows 7083..12663)
          if (data.isLastBatch) {
            const expectedFinalRow = startRow + formattedStaffRows.length - 1;
            const currentLastRow = tmSheet.getLastRow();
            if (currentLastRow > expectedFinalRow) {
              tmSheet.getRange(expectedFinalRow + 1, 1, currentLastRow - expectedFinalRow, 24).clearContent();
            }
            const maxRows = tmSheet.getMaxRows();
            if (maxRows > expectedFinalRow + 5) {
              try {
                tmSheet.deleteRows(expectedFinalRow + 1, maxRows - expectedFinalRow);
              } catch (delErr) {}
            }
          }
        }

        if (batchReqId) {
          try {
            CacheService.getScriptCache().put("DONE_BATCH_" + batchReqId, "1", 600);
          } catch (ce2) {}
        }

        return jsonResponse_({
          ok: true,
          teachersSheetId: tSs.getId(),
          teachersSheetUrl: tSs.getUrl(),
          batchIndex: data.batchIndex || 0,
          writtenCount: writtenCount,
          totalRowsInSheet: Math.max(0, tmSheet.getLastRow() - 1)
        });
      } finally {
        try { lock.releaseLock(); } catch (le) {}
      }
    }

    // 0C. SYNC 10_Ex_Cen & 12_Ex_Cen TABS DIRECTLY
    if (action === "sync_exam_centres") {
      const schools = Array.isArray(data.schools) && data.schools.length > 0
        ? data.schools
        : readAndNormalizeSchoolMasterSheet_(ss, nowStr);
      const exCounts = writeExamCentresSheets_(ss, data.examCentres10, data.examCentres12, schools, nowStr);
      return jsonResponse_({
        ok: true,
        count10: exCounts.count10,
        count12: exCounts.count12,
        updatedAt: nowStr
      });
    }

    // 1. EMAIL OTP (Single Dispatch with Deduplication Guard)
    if (action === "send_email_otp") {
      const otpSheet = ss.getSheetByName("OTP_LOGS");
      if (isDuplicateOtpRecentlyLogged_(otpSheet, "EMAIL", data.email, data.otp)) {
        return jsonResponse_({ ok: true, emailSent: true, detail: "DEDUP_SINGLE_DISPATCH" });
      }
      const emailResult = sendEmailOtpFromCeoAccount_(data.email, data.otp, data.uNo, data.schoolNameEn || data.schoolNameTa, data.purpose);
      otpSheet.appendRow([nowStr, data.uNo || "-", data.schoolNameEn || data.schoolNameTa || "-", "EMAIL", data.email || "-", data.otp || "-", data.purpose || "EMAIL_OTP_VERIFY", emailResult.sent ? "SENT_OK" : "FAILED", emailResult.detail || ""]);
      return jsonResponse_({ ok: true, emailSent: emailResult.sent, detail: emailResult.detail });
    }

    // 2. WHATSAPP OTP (Single Dispatch with Deduplication Guard & Browser-Sent Check)
    if (action === "send_whatsapp_otp") {
      const otpSheet = ss.getSheetByName("OTP_LOGS");
      if (isDuplicateOtpRecentlyLogged_(otpSheet, "WHATSAPP", data.phone, data.otp)) {
        return jsonResponse_({ ok: true, whatsappSent: true, detail: "DEDUP_SINGLE_DISPATCH" });
      }
      if (data.browserAlreadySent) {
        otpSheet.appendRow([nowStr, data.uNo || "-", data.schoolNameEn || data.schoolNameTa || "-", "WHATSAPP", data.phone || "-", data.otp || "-", data.purpose || "WHATSAPP_OTP_VERIFY", "SENT_OK", "Dispatched via Browser WhatsApp Cloud API"]);
        return jsonResponse_({ ok: true, whatsappSent: true, detail: "LOGGED_BROWSER_SENT" });
      }
      const waResult = sendWhatsappOtpFromServer_(data.phone, data.otp, data.uNo, data.schoolNameEn || data.schoolNameTa, data.purpose, data.accessTokenEnc || data.accessToken, data.phoneNumberId, data.altPhoneNumberId, data.templateName, data.templateLang, data.gatewayWebhookUrl);
      otpSheet.appendRow([nowStr, data.uNo || "-", data.schoolNameEn || data.schoolNameTa || "-", "WHATSAPP", data.phone || "-", data.otp || "-", data.purpose || "WHATSAPP_OTP_VERIFY", waResult.sent ? "SENT_OK" : "WA_DIRECT_READY", waResult.detail || ""]);
      return jsonResponse_({ ok: true, whatsappSent: waResult.sent, detail: waResult.detail });
    }

    // 2B. DIRECT HSS GROUP MASTER SYNC
    if (action === "syncHssGroupMaster" && Array.isArray(data.groups)) {
      writeHssGroupMasterRows_(ss.getSheetByName("HSS_GROUP_MASTER"), data.groups, nowStr);
      return jsonResponse_({ ok: true, count: data.groups.length });
    }

    // 3. AUTO DUAL-SYNC ENGINE HANDLER (Handles all automatic School & Admin saves)
    if (action === "auto_dual_sync") {
      const syncType = String(data.syncType || "").trim();

      if (syncType === "school_master_single" && data.school) {
        const s = data.school;
        const uNoStr = String(s.uNo || "").trim();
        if (uNoStr) {
          upsertRowByKey_(ss.getSheetByName("SCHOOL_MASTER"), 2, uNoStr, [
            s.sn || "", uNoStr, String(s.udiseNo || ""), String(s.dgeNo || ""),
            String(s.block || ""), String(s.assembly || ""), cleanSheetCellStr_(s.nameEn),
            cleanSheetCellStr_(s.nameTa), String(s.mgmt1 || ""), String(s.level || ""),
            String(s.centre10 || ""), String(s.centre12 || ""), cleanSheetCellStr_(s.hmName),
            cleanSheetCellStr_(s.hmTa), String(s.mobile || ""), String(s.email || ""), nowStr
          ]);
          if (s.centre10) {
            upsertRowByKey_(ss.getSheetByName("10_Ex_Cen"), 2, uNoStr, [
              s.sn || "", uNoStr, String(s.centre10), String(s.block || ""),
              cleanSheetCellStr_(s.nameEn), cleanSheetCellStr_(s.nameTa), String(s.udiseNo || ""), nowStr
            ]);
          }
          if (s.centre12) {
            upsertRowByKey_(ss.getSheetByName("12_Ex_Cen"), 2, uNoStr, [
              s.sn || "", uNoStr, String(s.centre12), String(s.block || ""),
              cleanSheetCellStr_(s.nameEn), cleanSheetCellStr_(s.nameTa), String(s.udiseNo || ""), nowStr
            ]);
          }
        }
        return jsonResponse_({ ok: true, syncType: syncType, uNo: uNoStr });
      }

      if (syncType === "school_master_bulk" && Array.isArray(data.schools)) {
        const mergedSchools = mergeAndWriteSchoolMasterSheet_(ss, data.schools, nowStr);
        writeExamCentresSheets_(ss, data.examCentres10, data.examCentres12, mergedSchools, nowStr);
        return jsonResponse_({ ok: true, syncType: syncType, count: mergedSchools.length, mergedSchools: mergedSchools });
      }

      if (syncType === "exam_centres_bulk") {
        const schools = Array.isArray(data.schools) && data.schools.length > 0
          ? data.schools
          : readAndNormalizeSchoolMasterSheet_(ss, nowStr);
        const exCounts = writeExamCentresSheets_(ss, data.examCentres10, data.examCentres12, schools, nowStr);
        return jsonResponse_({ ok: true, syncType: syncType, count10: exCounts.count10, count12: exCounts.count12 });
      }

      if (syncType === "school_auth_single" && data.auth) {
        const a = data.auth;
        const uNoStr = String(a.uNo || data.uNo || "").trim();
        if (uNoStr) {
          upsertRowByKey_(ss.getSheetByName("SCHOOL_AUTH"), 1, uNoStr, [
            uNoStr, String(a.udiseNo || ""), cleanSheetCellStr_(a.nameEn),
            cleanSheetCellStr_(a.hmName), String(a.phone || ""), String(a.email || ""),
            String(a.password || ""), String(a.pin || ""),
            a.otpVerified ? "YES (OTP Verified)" : "YES",
            String(a.registeredAt || nowStr), nowStr
          ]);
        }
        return jsonResponse_({ ok: true, syncType: syncType, uNo: uNoStr });
      }

      if (syncType === "school_auth_bulk" && Array.isArray(data.authList)) {
        const aSheet = ss.getSheetByName("SCHOOL_AUTH");
        if (aSheet.getLastRow() > 1) aSheet.getRange(2, 1, aSheet.getLastRow() - 1, 11).clearContent();
        if (data.authList.length > 0) {
          const aRows = data.authList.map(function(a) {
            return [
              a.uNo || "", a.udiseNo || "", cleanSheetCellStr_(a.nameEn), cleanSheetCellStr_(a.hmName),
              a.phone || "", a.email || "", a.password || "", a.pin || "",
              a.otpVerified ? "YES (OTP Verified)" : "NO", a.registeredAt || nowStr, nowStr
            ];
          });
          aSheet.getRange(2, 1, aRows.length, 11).setValues(aRows);
        }
        return jsonResponse_({ ok: true, syncType: syncType, count: data.authList.length });
      }

      if (syncType === "school_extra_single" && data.uNo) {
        const uNoStr = String(data.uNo).trim();
        if (data.studentRow) {
          const st = data.studentRow;
          upsertRowByKey_(ss.getSheetByName("STUDENT_STRENGTH"), 1, uNoStr, [
            uNoStr, String(st.udiseNo || ""), cleanSheetCellStr_(st.nameEn),
            String(st.level || "HS"), Number(st.boys || 0), Number(st.girls || 0),
            Number(st.total || 0), Number(st.tm || 0), Number(st.em || 0),
            String(st.groupsSummary || "-"), nowStr
          ]);
        }
        if (Array.isArray(data.groupRows)) {
          upsertSchoolGroupStrengthRows_(ss.getSheetByName("GROUP_WISE_STRENGTH"), uNoStr, data.groupRows, nowStr);
        }
        if (data.extraData) {
          upsertRowByKey_(ss.getSheetByName("SCHOOL_EXTRA_LIVE"), 1, uNoStr, [
            uNoStr, String(data.udiseNo || ""), cleanSheetCellStr_(data.schoolNameEn),
            JSON.stringify(data.extraData), nowStr
          ]);
        }
        if (Array.isArray(data.schoolStaffRows) || data.schoolStaffSummaryRow) {
          upsertSchoolStaffInTeachersSheet_(data.teachersSheetId, uNoStr, data.schoolStaffRows, data.schoolStaffSummaryRow, nowStr);
        }
        if (data.ebsPacket && typeof data.ebsPacket === "object") {
          try {
            upsertSchoolEbsDataInSheet_(
              data.ebsSheetId || "",
              uNoStr,
              data.ebsPacket.f1Row,
              data.ebsPacket.f2Row,
              data.ebsPacket.f3Rows,
              data.ebsPacket.f4Rows,
              nowStr
            );
          } catch (ebsErr) {}
        }
        return jsonResponse_({ ok: true, syncType: syncType, uNo: uNoStr });
      }

      if (syncType === "student_strength_bulk" && Array.isArray(data.studentList)) {
        const sSheet = ss.getSheetByName("STUDENT_STRENGTH");
        if (sSheet.getLastRow() > 1) sSheet.getRange(2, 1, sSheet.getLastRow() - 1, 11).clearContent();
        if (data.studentList.length > 0) {
          const sRows = data.studentList.map(function(st) {
            return [
              st.uNo || "", st.udiseNo || "", cleanSheetCellStr_(st.nameEn), st.level || "",
              st.boys || 0, st.girls || 0, st.total || 0, st.tm || 0, st.em || 0,
              st.groupsSummary || "-", nowStr
            ];
          });
          sSheet.getRange(2, 1, sRows.length, 11).setValues(sRows);
        }
        if (Array.isArray(data.groupStrengthList) && data.groupStrengthList.length > 0) {
          writeBulkGroupWiseStrengthRows_(ss.getSheetByName("GROUP_WISE_STRENGTH"), data.groupStrengthList, nowStr);
        }
        return jsonResponse_({ ok: true, syncType: syncType, count: data.studentList.length });
      }

      if (syncType === "staff_delete_requests" && Array.isArray(data.requests)) {
        const rSheet = ss.getSheetByName("STAFF_REQUESTS");
        if (rSheet.getLastRow() > 1) rSheet.getRange(2, 1, rSheet.getLastRow() - 1, 11).clearContent();
        if (data.requests.length > 0) {
          const rRows = data.requests.map(function(r) {
            return [
              r.reqId || "", r.requestedAt || nowStr, r.uNo || "",
              cleanSheetCellStr_(r.schoolName || r.schoolNameTa || r.schoolNameEn),
              r.emisId || r.staffRecordId || "", cleanSheetCellStr_(r.staffName || r.staffNameTa),
              cleanSheetCellStr_(r.desig), cleanSheetCellStr_(r.subject),
              cleanSheetCellStr_(r.reasonCategory), cleanSheetCellStr_(r.reasonDetail || r.reason),
              r.status || "PENDING"
            ];
          });
          rSheet.getRange(2, 1, rRows.length, 11).setValues(rRows);

          // Also mirror delete requests to the dedicated Teachers Google Sheet
          try {
            const tSs = getOrCreateTeachersSpreadsheet_(data.teachersSheetId, false);
            setupTeachersPortalSheets(tSs.getId(), false);
            const drSheet = tSs.getSheetByName("STAFF_DELETE_REQUESTS");
            if (drSheet.getLastRow() > 1) drSheet.getRange(2, 1, drSheet.getLastRow() - 1, 11).clearContent();
            drSheet.getRange(2, 1, rRows.length, 11).setValues(rRows);
          } catch (e) {}
        }
        return jsonResponse_({ ok: true, syncType: syncType, count: data.requests.length });
      }

      if (syncType === "hss_group_master" && Array.isArray(data.groups)) {
        writeHssGroupMasterRows_(ss.getSheetByName("HSS_GROUP_MASTER"), data.groups, nowStr);
        return jsonResponse_({ ok: true, syncType: syncType, count: data.groups.length });
      }

      if (syncType === "circulars" && Array.isArray(data.circulars)) {
        const cSheet = ss.getSheetByName("CIRCULARS");
        if (cSheet.getLastRow() > 1) cSheet.getRange(2, 1, cSheet.getLastRow() - 1, 7).clearContent();
        if (data.circulars.length > 0) {
          const cRows = data.circulars.map(function(c) {
            return [
              c.id || "", c.date || c.createdAt || "", cleanSheetCellStr_((c.category ? "[" + c.category + "] " : "") + (c.headline || c.title || "")),
              c.targetSummary || c.target || "ALL", cleanSheetCellStr_(c.desc), c.link || (c.attachments && c.attachments[0] && c.attachments[0].url) || "", nowStr
            ];
          });
          cSheet.getRange(2, 1, cRows.length, 7).setValues(cRows);
        }
        upsertRowByKey_(ss.getSheetByName("PORTAL_STORES"), 1, "CEOSVG_CIRCULARS", [
          "CEOSVG_CIRCULARS", JSON.stringify(data.circulars || []),
          "District Circulars (" + data.circulars.length + ")", nowStr
        ]);
        return jsonResponse_({ ok: true, syncType: syncType, count: data.circulars.length });
      }

      if (syncType === "portal_store" && data.storeKey) {
        upsertRowByKey_(ss.getSheetByName("PORTAL_STORES"), 1, String(data.storeKey), [
          String(data.storeKey), JSON.stringify(data.storeData || {}),
          String(data.summary || ""), nowStr
        ]);
        if (String(data.storeKey) === "CEOSVG_STAFF_OVERRIDES" && Array.isArray(data.schoolStaffRows)) {
          upsertSchoolStaffInTeachersSheet_(data.teachersSheetId, String(data.uNo || ""), data.schoolStaffRows, data.schoolStaffSummaryRow, nowStr);
        }
        return jsonResponse_({ ok: true, syncType: syncType, storeKey: data.storeKey });
      }
    }

    // 4. Direct Legacy Actions (school_register, password_reset, update_school_profile, seed_all_to_sheet)
    if (action === "school_register" || action === "password_reset" || action === "admin_reset_school_password") {
      const authSheet = ss.getSheetByName("SCHOOL_AUTH");
      const uNoStr = String(data.uNo || "").trim();
      upsertRowByKey_(authSheet, 1, uNoStr, [
        uNoStr, String(data.udiseNo || ""), cleanSheetCellStr_(data.nameEn || data.schoolNameEn),
        cleanSheetCellStr_(data.hmName), String(data.mobile || ""), String(data.schoolEmail || data.email || ""),
        String(data.password || data.newPassword || ""), String(data.pin || ""),
        "YES (OTP Verified)", nowStr, nowStr
      ]);
      return jsonResponse_({ ok: true, action: action, uNo: uNoStr });
    }

    if (action === "update_school_profile" || action === "admin_upsert_school") {
      const s = data.school || {};
      const uNoStr = String(s.uNo || "").trim();
      if (uNoStr) {
        upsertRowByKey_(ss.getSheetByName("SCHOOL_MASTER"), 2, uNoStr, [
          s.sn || "", uNoStr, String(s.udiseNo || ""), String(s.dgeNo || ""),
          String(s.block || ""), String(s.assembly || ""), cleanSheetCellStr_(s.nameEn),
          cleanSheetCellStr_(s.nameTa), String(s.mgmt1 || ""), String(s.level || ""),
          String(s.centre10 || ""), String(s.centre12 || ""), cleanSheetCellStr_(s.hmName),
          cleanSheetCellStr_(s.hmTa), String(s.mobile || ""), String(data.email || s.email || ""), nowStr
        ]);
      }
      return jsonResponse_({ ok: true, action: action, uNo: uNoStr });
    }

    if (action === "seed_all_to_sheet") {
      let masterCount = 0, authCount = 0, stuCount = 0, grpMasterCount = 0, grpStrengthCount = 0;

      let mergedSchoolsResult = [];
      if (Array.isArray(data.schools) && data.schools.length > 0) {
        mergedSchoolsResult = mergeAndWriteSchoolMasterSheet_(ss, data.schools, nowStr);
        masterCount = mergedSchoolsResult.length;
      }

      const exCounts = writeExamCentresSheets_(
        ss,
        data.examCentres10,
        data.examCentres12,
        mergedSchoolsResult.length > 0 ? mergedSchoolsResult : data.schools,
        nowStr
      );

      if (Array.isArray(data.authList) && data.authList.length > 0) {
        const aSheet = ss.getSheetByName("SCHOOL_AUTH");
        if (aSheet.getLastRow() > 1) aSheet.getRange(2, 1, aSheet.getLastRow() - 1, 11).clearContent();
        const aRows = data.authList.map(function(a) {
          return [
            a.uNo || "", a.udiseNo || "", cleanSheetCellStr_(a.nameEn), cleanSheetCellStr_(a.hmName),
            a.phone || "", a.email || "", a.password || "", a.pin || "",
            a.otpVerified ? "YES (OTP Verified)" : "NO", a.registeredAt || nowStr, nowStr
          ];
        });
        aSheet.getRange(2, 1, aRows.length, 11).setValues(aRows);
        authCount = aRows.length;
      }

      if (Array.isArray(data.studentList) && data.studentList.length > 0) {
        const sSheet = ss.getSheetByName("STUDENT_STRENGTH");
        if (sSheet.getLastRow() > 1) sSheet.getRange(2, 1, sSheet.getLastRow() - 1, 11).clearContent();
        const sRows = data.studentList.map(function(st) {
          return [
            st.uNo || "", st.udiseNo || "", cleanSheetCellStr_(st.nameEn), st.level || "",
            st.boys || 0, st.girls || 0, st.total || 0, st.tm || 0, st.em || 0,
            st.groupsSummary || "-", nowStr
          ];
        });
        sSheet.getRange(2, 1, sRows.length, 11).setValues(sRows);
        stuCount = sRows.length;
      }

      if (Array.isArray(data.hssGroups) && data.hssGroups.length > 0) {
        writeHssGroupMasterRows_(ss.getSheetByName("HSS_GROUP_MASTER"), data.hssGroups, nowStr);
        grpMasterCount = data.hssGroups.length;
      }

      if (Array.isArray(data.groupStrengthList) && data.groupStrengthList.length > 0) {
        writeBulkGroupWiseStrengthRows_(ss.getSheetByName("GROUP_WISE_STRENGTH"), data.groupStrengthList, nowStr);
        grpStrengthCount = data.groupStrengthList.length;
      }

      if (Array.isArray(data.deleteRequests) && data.deleteRequests.length > 0) {
        const rSheet = ss.getSheetByName("STAFF_REQUESTS");
        if (rSheet.getLastRow() > 1) rSheet.getRange(2, 1, rSheet.getLastRow() - 1, 11).clearContent();
        const rRows = data.deleteRequests.map(function(r) {
          return [
            r.reqId || "", r.requestedAt || nowStr, r.uNo || "",
            cleanSheetCellStr_(r.schoolName || r.schoolNameTa), r.emisId || r.staffRecordId || "",
            cleanSheetCellStr_(r.staffName || r.staffNameTa), cleanSheetCellStr_(r.desig),
            cleanSheetCellStr_(r.subject), cleanSheetCellStr_(r.reasonCategory),
            cleanSheetCellStr_(r.reasonDetail), r.status || "PENDING"
          ];
        });
        rSheet.getRange(2, 1, rRows.length, 11).setValues(rRows);
      }

      if (Array.isArray(data.circulars) && data.circulars.length > 0) {
        const cSheet = ss.getSheetByName("CIRCULARS");
        if (cSheet.getLastRow() > 1) cSheet.getRange(2, 1, cSheet.getLastRow() - 1, 7).clearContent();
        const cRows = data.circulars.map(function(c) {
          return [c.id || "", c.date || c.createdAt || "", cleanSheetCellStr_(c.title || c.headline), c.target || "All Schools", cleanSheetCellStr_(c.desc), c.link || "", nowStr];
        });
        cSheet.getRange(2, 1, cRows.length, 7).setValues(cRows);
      }

      return jsonResponse_({
        ok: true,
        masterCount: masterCount,
        mergedSchools: mergedSchoolsResult,
        examCentres10Count: exCounts.count10,
        examCentres12Count: exCounts.count12,
        authCount: authCount,
        stuCount: stuCount,
        grpMasterCount: grpMasterCount,
        grpStrengthCount: grpStrengthCount
      });
    }

    return jsonResponse_({ ok: true, note: "Handled action: " + action });
  } catch (err) {
    return jsonResponse_({ ok: false, error: String(err) });
  }
}

function fixTamilMojibake_(val) {
  if (val === null || val === undefined) return "";
  const str = String(val);
  if (str.indexOf("à®") === -1 && str.indexOf("à¯") === -1 && str.indexOf("Ã") === -1) {
    return str;
  }
  const cp1252Map = {
    0x20AC: 0x80, 0x201A: 0x82, 0x0192: 0x83, 0x201E: 0x84, 0x2026: 0x85,
    0x2020: 0x86, 0x2021: 0x87, 0x02C6: 0x88, 0x2030: 0x89, 0x0160: 0x8A,
    0x2039: 0x8B, 0x0152: 0x8C, 0x017D: 0x8E, 0x2018: 0x91, 0x2019: 0x92,
    0x201C: 0x93, 0x201D: 0x94, 0x2022: 0x95, 0x2013: 0x96, 0x2014: 0x97,
    0x02DC: 0x98, 0x2122: 0x99, 0x0161: 0x9A, 0x203A: 0x9B, 0x0153: 0x9C,
    0x017E: 0x9E, 0x0178: 0x9F
  };
  let cur = str;
  for (let pass = 0; pass < 2; pass++) {
    if (cur.indexOf("à®") === -1 && cur.indexOf("à¯") === -1 && cur.indexOf("Ã") === -1) break;
    const bytes = [];
    let ok = true;
    for (let i = 0; i < cur.length; i++) {
      const code = cur.charCodeAt(i);
      if (code <= 0xFF) {
        bytes.push(code);
      } else if (cp1252Map[code] !== undefined) {
        bytes.push(cp1252Map[code]);
      } else {
        ok = false;
        break;
      }
    }
    if (!ok) break;
    try {
      const decoded = Utilities.newBlob(bytes).getDataAsString("UTF-8");
      if (decoded && decoded.indexOf("\uFFFD") === -1) {
        cur = decoded;
      } else {
        break;
      }
    } catch (e) {
      break;
    }
  }
  return cur;
}

function cleanSheetCellStr_(val) {
  if (val === null || val === undefined) return "";
  if (typeof val === "number") {
    if (Math.floor(val) === val) return String(Math.round(val));
    return String(val);
  }
  return fixTamilMojibake_(String(val).replace(/\.0$/, "").trim());
}

function repairAllSheetTamilMojibakeMenu() {
  const ss = getTargetSpreadsheet_("");
  const sh = ss.getSheetByName("SCHOOL_MASTER");
  if (!sh || sh.getLastRow() <= 1) return;
  const range = sh.getRange(2, 1, sh.getLastRow() - 1, sh.getLastColumn());
  const vals = range.getDisplayValues();
  let fixedCount = 0;
  for (let r = 0; r < vals.length; r++) {
    for (let c = 0; c < vals[r].length; c++) {
      const orig = String(vals[r][c] || "");
      const fixed = fixTamilMojibake_(orig);
      if (fixed !== orig) {
        vals[r][c] = fixed;
        fixedCount++;
      }
    }
  }
  if (fixedCount > 0) {
    range.setValues(vals);
  }
  Logger.log("Repaired cells in SCHOOL_MASTER: " + fixedCount);
}

function inferSchoolLevel_(rawLevel, nameEn, nameTa) {
  const lv = String(rawLevel || "").trim().toUpperCase();
  if (lv === "HSS" || lv === "HS" || lv === "MS" || lv === "PS") return lv;
  const combined = (String(nameEn || "") + " " + String(nameTa || "")).toUpperCase();
  if (combined.indexOf("HSS") !== -1 || combined.indexOf("HR SEC") !== -1 || combined.indexOf("HIGHER SECONDARY") !== -1 || combined.indexOf("மேல்நிலை") !== -1) {
    return "HSS";
  }
  if (combined.indexOf(" MS") !== -1 || combined.indexOf("MIDDLE") !== -1 || combined.indexOf("நடுநிலை") !== -1) {
    return "MS";
  }
  return "HS";
}

function readAndNormalizeSchoolMasterSheet_(ss, nowStr) {
  const mSheet = ss.getSheetByName("SCHOOL_MASTER");
  const legacySheet = ss.getSheetByName("SCHOOL") || ss.getSheetByName("School Master");
  const byUNo = {};
  const byUdise = {};
  const orderedList = [];
  let maxNumericUNo = 385;

  function scanMaxUNo(rows) {
    rows.forEach(function(r) {
      const u = cleanSheetCellStr_(r[1]);
      const n = Number(u);
      if (!isNaN(n) && n > 100 && n < 900 && n > maxNumericUNo) {
        maxNumericUNo = n;
      }
    });
  }

  const mRows = (mSheet && mSheet.getLastRow() > 1)
    ? mSheet.getRange(2, 1, mSheet.getLastRow() - 1, Math.min(17, Math.max(11, mSheet.getLastColumn()))).getDisplayValues()
    : [];
  const legRows = (legacySheet && legacySheet.getLastRow() > 1)
    ? legacySheet.getRange(2, 1, legacySheet.getLastRow() - 1, Math.min(16, Math.max(11, legacySheet.getLastColumn()))).getDisplayValues()
    : [];

  scanMaxUNo(mRows);
  scanMaxUNo(legRows);

  function parseRowIntoSchoolObj(r, isLegacyTab, rowIdx0) {
    let uNo = cleanSheetCellStr_(r[1]);
    const udiseNo = cleanSheetCellStr_(r[2]).replace(/\s+/g, "");
    const dgeNo = cleanSheetCellStr_(r[3]);
    const block = cleanSheetCellStr_(r[4]);
    const assembly = cleanSheetCellStr_(r[5]);
    const nameEn = cleanSheetCellStr_(r[6]).replace(/\s+/g, " ");
    const nameTa = cleanSheetCellStr_(r[7]).replace(/\s+/g, " ");

    const uUpper = uNo.toUpperCase();
    if (uUpper === "U.NO" || uUpper === "UN. NO" || uUpper === "UN.NO" || uUpper === "S.NO" || udiseNo.toUpperCase() === "UDISE" || udiseNo.toUpperCase() === "UDISE_NO") {
      return null;
    }
    if (!uNo && !udiseNo && !nameEn && !nameTa) {
      return null;
    }

    if (!uNo) {
      if (udiseNo && byUdise[udiseNo]) {
        uNo = byUdise[udiseNo].uNo;
      } else {
        maxNumericUNo++;
        uNo = String(maxNumericUNo);
        if (!isLegacyTab && mSheet) {
          try {
            mSheet.getRange(rowIdx0 + 2, 2).setValue(uNo);
            if (!cleanSheetCellStr_(r[0])) {
              mSheet.getRange(rowIdx0 + 2, 1).setValue(rowIdx0 + 1);
            }
          } catch (e) {}
        }
      }
    }

    const mgmt1 = cleanSheetCellStr_(r[8]) || "1G";
    const col9 = cleanSheetCellStr_(r[9]);
    const isCol9Level = /^(HSS|HS|MS|PS)$/i.test(col9);
    const level = inferSchoolLevel_(isCol9Level ? col9 : "", nameEn, nameTa);
    const mgmt2 = (!isCol9Level && col9) ? col9 : (mgmt1 === "1G" ? "1" : (mgmt1 === "2A" ? "5" : "7"));
    const mgmt3 = isLegacyTab ? cleanSheetCellStr_(r[10]) : "";
    const centre10 = !isLegacyTab ? cleanSheetCellStr_(r[10]) : "";
    const centre12 = !isLegacyTab ? cleanSheetCellStr_(r[11]) : "";
    const hmName = !isLegacyTab ? cleanSheetCellStr_(r[12]) : "";
    const hmTa = !isLegacyTab ? cleanSheetCellStr_(r[13]) : "";
    const mobile = !isLegacyTab ? cleanSheetCellStr_(r[14]) : "";
    const email = !isLegacyTab ? cleanSheetCellStr_(r[15]) : "";

    return {
      sn: Number(cleanSheetCellStr_(r[0])) || (orderedList.length + 1),
      uNo: uNo,
      udiseNo: udiseNo,
      dgeNo: dgeNo,
      block: block,
      assembly: assembly,
      nameEn: nameEn || nameTa || ("SCHOOL " + uNo),
      nameTa: nameTa || nameEn || ("பள்ளி " + uNo),
      mgmt1: mgmt1,
      mgmt2: mgmt2,
      mgmt3: mgmt3,
      level: level,
      centre10: centre10,
      centre12: centre12,
      isExamCentre: Boolean(centre10 || centre12),
      hmName: hmName,
      hmTa: hmTa,
      mobile: mobile,
      email: email
    };
  }

  function upsertInMap(sch) {
    if (!sch || !sch.uNo) return;
    const existing = byUNo[sch.uNo] || (sch.udiseNo ? byUdise[sch.udiseNo] : null);
    if (existing) {
      Object.keys(sch).forEach(function(k) {
        if (sch[k] !== "" && sch[k] !== null && sch[k] !== undefined) {
          existing[k] = sch[k];
        }
      });
      byUNo[existing.uNo] = existing;
      if (existing.udiseNo) byUdise[existing.udiseNo] = existing;
    } else {
      byUNo[sch.uNo] = sch;
      if (sch.udiseNo) byUdise[sch.udiseNo] = sch;
      orderedList.push(sch);
    }
  }

  mRows.forEach(function(r, idx) {
    upsertInMap(parseRowIntoSchoolObj(r, false, idx));
  });
  legRows.forEach(function(r, idx) {
    upsertInMap(parseRowIntoSchoolObj(r, true, idx));
  });

  // Also enrich centre10 and centre12 from 10_Ex_Cen and 12_Ex_Cen tabs if present
  try {
    const exCentres = readExamCentresSheets_(ss);
    exCentres.examCentres10.forEach(function(c) {
      if (c.uNo && byUNo[c.uNo] && c.centreNo) {
        byUNo[c.uNo].centre10 = c.centreNo;
        byUNo[c.uNo].isExamCentre = true;
      }
    });
    exCentres.examCentres12.forEach(function(c) {
      if (c.uNo && byUNo[c.uNo] && c.centreNo) {
        byUNo[c.uNo].centre12 = c.centreNo;
        byUNo[c.uNo].isExamCentre = true;
      }
    });
  } catch (e) {}

  orderedList.forEach(function(s, i) {
    if (!s.sn) s.sn = i + 1;
  });

  return orderedList;
}

function mergeAndWriteSchoolMasterSheet_(ss, incomingSchools, nowStr) {
  const mSheet = ss.getSheetByName("SCHOOL_MASTER");
  const existingOnSheet = readAndNormalizeSchoolMasterSheet_(ss, nowStr);
  const byUNo = {};
  const byUdise = {};
  const mergedList = [];

  function addOrMergeSchool(s, isFromIncoming) {
    if (!s || typeof s !== "object") return;
    const uNo = cleanSheetCellStr_(s.uNo);
    const udiseNo = cleanSheetCellStr_(s.udiseNo).replace(/\s+/g, "");
    const nameEn = cleanSheetCellStr_(s.nameEn).replace(/\s+/g, " ");
    const nameTa = cleanSheetCellStr_(s.nameTa).replace(/\s+/g, " ");
    if (!uNo && !udiseNo && !nameEn && !nameTa) return;

    const match = (uNo && byUNo[uNo]) ? byUNo[uNo] : (udiseNo && byUdise[udiseNo] ? byUdise[udiseNo] : null);
    if (match) {
      const fields = ["udiseNo", "dgeNo", "block", "assembly", "nameEn", "nameTa", "mgmt1", "mgmt2", "mgmt3", "level", "centre10", "centre12", "hmName", "hmTa", "mobile", "email"];
      fields.forEach(function(f) {
        const val = cleanSheetCellStr_(s[f]);
        if (val) {
          if (isFromIncoming && !match[f]) {
            match[f] = val;
          } else if (isFromIncoming) {
            match[f] = val;
          }
        }
      });
      match.isExamCentre = Boolean(match.centre10 || match.centre12);
    } else {
      const effectiveUNo = uNo || ("SCH_" + (mergedList.length + 1));
      const mgmt1 = cleanSheetCellStr_(s.mgmt1) || "1G";
      const obj = {
        sn: Number(s.sn) || (mergedList.length + 1),
        uNo: effectiveUNo,
        udiseNo: udiseNo,
        dgeNo: cleanSheetCellStr_(s.dgeNo),
        block: cleanSheetCellStr_(s.block),
        assembly: cleanSheetCellStr_(s.assembly),
        nameEn: nameEn || nameTa || ("SCHOOL " + effectiveUNo),
        nameTa: nameTa || nameEn || ("பள்ளி " + effectiveUNo),
        mgmt1: mgmt1,
        mgmt2: cleanSheetCellStr_(s.mgmt2) || (mgmt1 === "1G" ? "1" : (mgmt1 === "2A" ? "5" : "7")),
        mgmt3: cleanSheetCellStr_(s.mgmt3),
        level: inferSchoolLevel_(s.level, nameEn, nameTa),
        centre10: cleanSheetCellStr_(s.centre10),
        centre12: cleanSheetCellStr_(s.centre12),
        isExamCentre: Boolean(s.centre10 || s.centre12),
        hmName: cleanSheetCellStr_(s.hmName),
        hmTa: cleanSheetCellStr_(s.hmTa),
        mobile: cleanSheetCellStr_(s.mobile),
        email: cleanSheetCellStr_(s.email)
      };
      byUNo[effectiveUNo] = obj;
      if (udiseNo) byUdise[udiseNo] = obj;
      mergedList.push(obj);
    }
  }

  existingOnSheet.forEach(function(s) { addOrMergeSchool(s, false); });
  if (Array.isArray(incomingSchools)) {
    incomingSchools.forEach(function(s) { addOrMergeSchool(s, true); });
  }

  if (mSheet && mergedList.length > 0) {
    if (mSheet.getLastRow() > 1) {
      mSheet.getRange(2, 1, mSheet.getLastRow() - 1, 17).clearContent();
    }
    const mRows = mergedList.map(function(s, idx) {
      s.sn = idx + 1;
      return [
        s.sn, s.uNo || "", s.udiseNo || "", s.dgeNo || "",
        s.block || "", s.assembly || "", s.nameEn || "", s.nameTa || "",
        s.mgmt1 || "1G", s.level || "HS", s.centre10 || "", s.centre12 || "",
        s.hmName || "", s.hmTa || "", s.mobile || "", s.email || "", nowStr
      ];
    });
    mSheet.getRange(2, 1, mRows.length, 17).setValues(mRows);
  }

  return mergedList;
}

function writeHssGroupMasterRows_(gSheet, groups, nowStr) {
  if (!gSheet || !Array.isArray(groups)) return;
  if (gSheet.getLastRow() > 1) gSheet.getRange(2, 1, gSheet.getLastRow() - 1, 12).clearContent();
  if (groups.length > 0) {
    const gRows = groups.map(function(g) {
      return [
        g.groupCode || "", g.catCode || 1, g.category || "SCIENCE", g.groupName || "",
        g.majorSubjects || "", g.sub1 || "LANGUAGE", g.sub2 || "ENGLISH",
        g.sub3 || "", g.sub4 || "", g.sub5 || "", g.sub6 || "", nowStr
      ];
    });
    gSheet.getRange(2, 1, gRows.length, 12).setValues(gRows);
  }
}

function writeBulkGroupWiseStrengthRows_(gwSheet, list, nowStr) {
  if (!gwSheet || !Array.isArray(list)) return;
  if (gwSheet.getLastRow() > 1) gwSheet.getRange(2, 1, gwSheet.getLastRow() - 1, 21).clearContent();
  if (list.length > 0) {
    const rows = list.map(function(r) {
      return [
        r.uNo || "", r.udiseNo || "", cleanSheetCellStr_(r.schoolNameEn), r.block || "", r.mgmt || "",
        r.groupCode || "", r.category || "", r.groupName || "", r.majorSubjects || "",
        Number(r.c11_tm_b || 0), Number(r.c11_tm_g || 0), Number(r.c11_em_b || 0), Number(r.c11_em_g || 0), Number(r.c11_tot || 0),
        Number(r.c12_tm_b || 0), Number(r.c12_tm_g || 0), Number(r.c12_em_b || 0), Number(r.c12_em_g || 0), Number(r.c12_tot || 0),
        Number(r.grandTotal || 0), nowStr
      ];
    });
    gwSheet.getRange(2, 1, rows.length, 21).setValues(rows);
  }
}

function upsertSchoolGroupStrengthRows_(gwSheet, uNoStr, schoolGroupRows, nowStr) {
  if (!gwSheet) return;
  const lastRow = gwSheet.getLastRow();
  let keptRows = [];
  if (lastRow > 1) {
    const existing = gwSheet.getRange(2, 1, lastRow - 1, 21).getValues();
    keptRows = existing.filter(function(r) {
      return String(r[0] || "").trim() !== String(uNoStr).trim();
    });
    gwSheet.getRange(2, 1, lastRow - 1, 21).clearContent();
  }
  const newRows = (schoolGroupRows || []).map(function(r) {
    return [
      r.uNo || uNoStr, r.udiseNo || "", cleanSheetCellStr_(r.schoolNameEn), r.block || "", r.mgmt || "",
      r.groupCode || "", r.category || "", r.groupName || "", r.majorSubjects || "",
      Number(r.c11_tm_b || 0), Number(r.c11_tm_g || 0), Number(r.c11_em_b || 0), Number(r.c11_em_g || 0), Number(r.c11_tot || 0),
      Number(r.c12_tm_b || 0), Number(r.c12_tm_g || 0), Number(r.c12_em_b || 0), Number(r.c12_em_g || 0), Number(r.c12_tot || 0),
      Number(r.grandTotal || 0), nowStr
    ];
  });
  const combined = keptRows.concat(newRows);
  if (combined.length > 0) {
    gwSheet.getRange(2, 1, combined.length, 21).setValues(combined);
  }
}

function sendEmailOtpFromCeoAccount_(toEmail, otpCode, uNo, schoolName, purpose) {
  const cleanEmail = String(toEmail || "").trim();
  if (!cleanEmail || cleanEmail.indexOf("@") === -1) {
    return { sent: false, detail: "INVALID_EMAIL" };
  }
  try {
    const subject = "🔐 CEO Sivagangai School Portal - OTP Verification (" + otpCode + ")";
    const htmlBody =
      '<div style="font-family:Arial,sans-serif; max-width:560px; margin:0 auto; border:2px solid #0f294a; border-radius:10px; overflow:hidden;">' +
        '<div style="background:#0f294a; color:#ffffff; padding:14px 18px; text-align:center;">' +
          '<div style="font-size:12px; color:#fde047; font-weight:bold;">பள்ளிக்கல்வித்துறை - சிவகங்கை மாவட்டம்</div>' +
          '<h2 style="margin:4px 0 0; font-size:18px;">முதன்மைக் கல்வி அலுவலகம், சிவகங்கை</h2>' +
          '<div style="font-size:12px; color:#cbd5e1;">portal.ceosvg.in | ' + PORTAL_CONFIG.OWNER_EMAIL + '</div>' +
        '</div>' +
        '<div style="padding:20px; background:#ffffff; color:#1e293b; line-height:1.6;">' +
          '<p style="margin:0 0 10px;">வணக்கம்,</p>' +
          '<p style="margin:0 0 10px;"><strong>பள்ளி (School):</strong> [U.NO: ' + (uNo || "-") + '] ' + (schoolName || "Sivagangai School") + '</p>' +
          '<p style="margin:0 0 12px;"><strong>நோக்கம் (Purpose):</strong> ' + (purpose || "பள்ளி உள்நுழைவு / OTP சரிபார்ப்பு") + '</p>' +
          '<div style="background:#f0fdf4; border:2px dashed #16a34a; border-radius:8px; padding:14px; text-align:center; margin:16px 0;">' +
            '<div style="font-size:12px; color:#166534; font-weight:bold;">உங்கள் 6-இலக்க சரிபார்ப்பு OTP எண் (Your 6-Digit OTP):</div>' +
            '<div style="font-size:28px; font-weight:900; color:#14532d; letter-spacing:6px; margin-top:4px;">' + otpCode + '</div>' +
          '</div>' +
          '<p style="font-size:12px; color:#64748b; margin:0;">இந்த OTP எண் 10 நிமிடங்களுக்குச் செல்லுபடியாகும். பாதுகாப்பிற்காக இதனை யாருடனும் பகிர வேண்டாம்.</p>' +
        '</div>' +
      '</div>';

    MailApp.sendEmail({
      to: cleanEmail,
      subject: subject,
      htmlBody: htmlBody,
      name: "CEO Sivagangai School Portal"
    });
    return { sent: true, detail: "Sent via MailApp (" + PORTAL_CONFIG.OWNER_EMAIL + ")" };
  } catch (err) {
    return { sent: false, detail: String(err) };
  }
}

function decryptServerVaultSecret_(cipherText) {
  const clean = String(cipherText || "").trim();
  if (!clean) return "";
  if (clean.indexOf("ENC_V4:") !== 0) return clean;
  try {
    const rawBytes = Utilities.base64Decode(clean.slice(7));
    const key = "CEOSVG_VAULT_KEY_2026";
    let out = "";
    for (let i = 0; i < rawBytes.length; i++) {
      const b = (rawBytes[i] + 256) % 256;
      out += String.fromCharCode(b ^ key.charCodeAt(i % key.length));
    }
    return out;
  } catch (e) {
    return "";
  }
}

function getSecureWaAccessToken_(tokenOverride) {
  if (tokenOverride) {
    const decOverride = decryptServerVaultSecret_(tokenOverride);
    if (decOverride) return decOverride;
  }
  try {
    const propTok = PropertiesService.getScriptProperties().getProperty("WA_ACCESS_TOKEN") || "";
    if (propTok) return decryptServerVaultSecret_(propTok);
  } catch (e) {}
  const builtInEnc = "ENC_V4:" + PORTAL_CONFIG.WA_VAULT_SEG_1 + PORTAL_CONFIG.WA_VAULT_SEG_2 + PORTAL_CONFIG.WA_VAULT_SEG_3 + PORTAL_CONFIG.WA_VAULT_SEG_4;
  const token = decryptServerVaultSecret_(builtInEnc);
  try {
    if (token) PropertiesService.getScriptProperties().setProperty("WA_ACCESS_TOKEN", builtInEnc);
  } catch (e2) {}
  return token;
}

function sendWhatsappOtpFromServer_(toPhone, otpCode, uNo, schoolName, purpose, tokenOverride, phoneIdOverride, altPhoneIdOverride, tplNameOverride, tplLangOverride, gatewayOverride) {
  const token = getSecureWaAccessToken_(tokenOverride);
  const phoneIds = [
    String(phoneIdOverride || PORTAL_CONFIG.WA_PHONE_NUMBER_ID || "1307132059159317").trim(),
    String(altPhoneIdOverride || PORTAL_CONFIG.WA_ALT_PHONE_NUMBER_ID || "1457353970785529").trim()
  ].filter(Boolean);
  const primaryTpl = String(tplNameOverride || PORTAL_CONFIG.WA_TEMPLATE_NAME || "whatsapp_verfication_code").trim();
  const tplNames = primaryTpl === "whatsapp_verfication_code"
    ? ["whatsapp_verfication_code", "whatsapp_verification_code"]
    : [primaryTpl, "whatsapp_verfication_code"];
  const tplLang = String(tplLangOverride || PORTAL_CONFIG.WA_TEMPLATE_LANG || "en_US").trim();
  const tplId = String(PORTAL_CONFIG.WA_TEMPLATE_ID || "1069753392749982").trim();
  const gwUrl = String(gatewayOverride || PORTAL_CONFIG.WA_GATEWAY_WEBHOOK_URL || "").trim();

  const cleanDigits = String(toPhone || "").replace(/[^0-9]/g, "");
  if (cleanDigits.length < 10) {
    return { sent: false, detail: "INVALID_PHONE" };
  }

  const recipient = cleanDigits.length === 10 ? ("91" + cleanDigits) : cleanDigits;
  const msgLines = [
    "*பள்ளிக்கல்வித்துறை - முதன்மைக் கல்வி அலுவலகம், சிவகங்கை*",
    "🏫 பள்ளி: *[U.NO: " + (uNo || "-") + "] " + (schoolName || "") + "*",
    "🔐 " + (purpose || "பள்ளி உள்நுழைவு சரிபார்ப்பு") + " OTP: *" + otpCode + "*",
    "(இந்த 6-இலக்க OTP எண் 10 நிமிடங்களுக்குச் செல்லுபடியாகும். யாருடனும் பகிர வேண்டாம்.)"
  ];
  const msgText = msgLines.join(String.fromCharCode(10));

  if (gwUrl && gwUrl.indexOf("http") === 0) {
    try {
      const sep = gwUrl.indexOf("?") !== -1 ? "&" : "?";
      const fullGw = gwUrl + sep + "phone=" + encodeURIComponent(recipient) + "&text=" + encodeURIComponent(msgText) + "&otp=" + encodeURIComponent(otpCode);
      const gwRes = UrlFetchApp.fetch(fullGw, { muteHttpExceptions: true });
      if (gwRes.getResponseCode() >= 200 && gwRes.getResponseCode() < 300) {
        return { sent: true, detail: "Sent via Custom WhatsApp Gateway" };
      }
    } catch (gwErr) {}
  }

  let lastError = "";
  if (token && phoneIds.length > 0) {
    for (let i = 0; i < phoneIds.length; i++) {
      const pid = phoneIds[i];
      const endpoint = "https://graph.facebook.com/v22.0/" + encodeURIComponent(pid) + "/messages";

      try {
        let templateSentOk = false;
        let usedTplName = primaryTpl;
        for (let tIdx = 0; tIdx < tplNames.length; tIdx++) {
          if (templateSentOk) break;
          const tName = tplNames[tIdx];
          const variants = tName === "hello_world"
            ? [null]
            : [
                [
                  { type: "body", parameters: [{ type: "text", text: String(otpCode) }] },
                  { type: "button", sub_type: "url", index: "0", parameters: [{ type: "text", text: String(otpCode) }] }
                ],
                [
                  { type: "body", parameters: [{ type: "text", text: String(otpCode) }] }
                ]
              ];
          for (let vIdx = 0; vIdx < variants.length; vIdx++) {
            const tplObj = { name: tName, language: { code: tplLang } };
            if (variants[vIdx]) tplObj.components = variants[vIdx];
            const resTpl = UrlFetchApp.fetch(endpoint, {
              method: "post",
              contentType: "application/json",
              headers: { "Authorization": "Bearer " + token },
              payload: JSON.stringify({
                messaging_product: "whatsapp",
                recipient_type: "individual",
                to: recipient,
                type: "template",
                template: tplObj
              }),
              muteHttpExceptions: true
            });
            const codeTpl = resTpl.getResponseCode();
            if (codeTpl >= 200 && codeTpl < 300) {
              templateSentOk = true;
              usedTplName = tName;
              break;
            } else {
              const errBody = resTpl.getContentText();
              lastError = "HTTP " + codeTpl + ": " + errBody;
              if (codeTpl === 401 || errBody.indexOf("132001") !== -1) break;
            }
          }
        }

        const resText = UrlFetchApp.fetch(endpoint, {
          method: "post",
          contentType: "application/json",
          headers: { "Authorization": "Bearer " + token },
          payload: JSON.stringify({
            messaging_product: "whatsapp",
            recipient_type: "individual",
            to: recipient,
            type: "text",
            text: { preview_url: false, body: msgText }
          }),
          muteHttpExceptions: true
        });
        const codeText = resText.getResponseCode();
        if (codeText >= 200 && codeText < 300) {
          return { sent: true, detail: "WhatsApp OTP Text + Template (" + usedTplName + " [" + tplId + "]) Sent (PhoneID: " + pid + ")" };
        }
        if (templateSentOk) {
          return { sent: true, detail: "WhatsApp Auth Template (" + usedTplName + " [" + tplId + "]) Sent (PhoneID: " + pid + ")" };
        }
      } catch (err) {
        lastError = String(err);
      }
    }
  }

  return { sent: false, detail: lastError || "WA_DIRECT_LINK_READY" };
}

function upsertRowByKey_(sheet, keyColIndex1Based, keyVal, rowArray) {
  const lastRow = sheet.getLastRow();
  if (lastRow >= 2) {
    const keys = sheet.getRange(2, keyColIndex1Based, lastRow - 1, 1).getValues();
    for (let i = 0; i < keys.length; i++) {
      if (String(keys[i][0]).trim() === String(keyVal).trim()) {
        sheet.getRange(i + 2, 1, 1, rowArray.length).setValues([rowArray]);
        return;
      }
    }
  }
  sheet.appendRow(rowArray);
}

function jsonResponse_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

function testSendEmailOtpMenu() {
  const testOtp = String(Math.floor(100000 + Math.random() * 900000));
  const res = sendEmailOtpFromCeoAccount_(PORTAL_CONFIG.OWNER_EMAIL, testOtp, "ADMIN", "CEO OFFICE SIVAGANGAI", "Google Sheet Code.gs Email OTP Test");
  Logger.log("Email OTP Test Result: " + JSON.stringify(res));
}

function testSendWhatsappOtpMenu() {
  const testOtp = String(Math.floor(100000 + Math.random() * 900000));
  const res = sendWhatsappOtpFromServer_("919626471035", testOtp, "ADMIN", "CEO OFFICE SIVAGANGAI", "Google Sheet Code.gs WhatsApp OTP Test");
  Logger.log("WhatsApp OTP Test Result: " + JSON.stringify(res));
}