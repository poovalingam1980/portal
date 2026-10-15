/**
 * portal.ceosvg.in - முதன்மைக் கல்வி அலுவலகம், சிவகங்கை மாவட்டம்
 * ஒருங்கிணைந்த பள்ளி மற்றும் மாவட்ட நிர்வாக மேலாண்மை தளம் (Google Apps Script Backend)
 *
 * இணைக்கப்பட்ட முதன்மை கூகுள் சீட் (School-Master):
 * Spreadsheet ID: 1QesgNBu6tHCgM5xNIwfi4rwvU8quM2y7qXOc47_A64o
 */

var MASTER_SPREADSHEET_ID = "1QesgNBu6tHCgM5xNIwfi4rwvU8quM2y7qXOc47_A64o";
var SHEET_SCHOOL_MASTER = "SCHOOL";
var SHEET_SCHOOLS_AUTH = "Schools_Auth";
var SHEET_DIVISIONS = "Management_Divisions";
var SENDER_DISPLAY_NAME = "CHIEF EDUCATIONAL OFFICE - SIVAGANGAI (portal.ceosvg.in)";

function doGet(e) {
  var p = (e && e.parameter) ? e.parameter : {};
  var action = p.action || "status";
  var callback = p.callback;
  var result;

  try {
    if (action === "get_all_schools") {
      result = getAllSchoolsFromMaster();
    } else if (action === "lookup_school") {
      result = lookupSchoolByUNoOrUdise(p.query);
    } else if (action === "school_login") {
      result = handleSchoolLogin(p.username, p.password);
    } else {
      result = { status: "active", domain: "portal.ceosvg.in", masterSheetId: MASTER_SPREADSHEET_ID };
    }
  } catch (err) {
    result = { status: "error", message: err.toString() };
  }

  if (callback) {
    return ContentService.createTextOutput(callback + "(" + JSON.stringify(result) + ")")
      .setMimeType(ContentService.MimeType.JAVASCRIPT);
  }
  return ContentService.createTextOutput(JSON.stringify(result))
    .setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.waitLock(15000);
  try {
    var data = {};
    if (e && e.postData && e.postData.contents) {
      data = JSON.parse(e.postData.contents);
    }
    var action = data.action || "";
    var result = { status: "success" };

    if (action === "school_register") {
      result = registerOrUpdateSchoolAuth(data);
    } else if (action === "admin_upsert_school") {
      result = upsertSchoolInMasterSheet(data.school);
    } else if (action === "update_school_profile") {
      result = upsertSchoolInMasterSheet(data.school);
    } else if (action === "admin_reset_school_password") {
      result = adminResetSchoolPassword(data);
    }

    lock.releaseLock();
    return ContentService.createTextOutput(JSON.stringify(result))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    lock.releaseLock();
    return ContentService.createTextOutput(JSON.stringify({ status: "error", message: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function getAllSchoolsFromMaster() {
  var ss = SpreadsheetApp.openById(MASTER_SPREADSHEET_ID);
  var sheet = ss.getSheetByName(SHEET_SCHOOL_MASTER) || ss.getSheets()[0];
  var rows = sheet.getDataRange().getValues();
  var schools = [];
  for (var i = 1; i < rows.length; i++) {
    var r = rows[i];
    if (!r[1] && !r[2]) continue;
    schools.push({
      sn: r[0],
      uNo: String(r[1]).trim(),
      udiseNo: String(r[2]).trim(),
      dgeNo: String(r[3] || "").trim(),
      block: String(r[4] || "").trim(),
      assembly: String(r[5] || "").trim(),
      nameEn: String(r[6] || "").trim(),
      nameTa: String(r[7] || "").trim(),
      mgmt1: String(r[8] || "1G").trim(),
      mgmt2: String(r[9] || "1").trim(),
      mgmt3: String(r[10] || "").trim()
    });
  }
  return { status: "success", count: schools.length, schools: schools };
}

function upsertSchoolInMasterSheet(s) {
  if (!s || !s.uNo) return { status: "error", message: "Missing U.No" };
  var ss = SpreadsheetApp.openById(MASTER_SPREADSHEET_ID);
  var sheet = ss.getSheetByName(SHEET_SCHOOL_MASTER) || ss.getSheets()[0];
  var rows = sheet.getDataRange().getValues();
  for (var i = 1; i < rows.length; i++) {
    if (String(rows[i][1]).trim() === String(s.uNo).trim() || String(rows[i][2]).trim() === String(s.udiseNo).trim()) {
      sheet.getRange(i + 1, 2, 1, 10).setValues([[
        s.uNo, s.udiseNo, s.dgeNo || "", s.block || "", s.assembly || "",
        s.nameEn || "", s.nameTa || "", s.mgmt1 || "1G", s.mgmt2 || "1", s.mgmt3 || ""
      ]]);
      return { status: "success", mode: "updated", uNo: s.uNo };
    }
  }
  var nextSn = rows.length;
  sheet.appendRow([
    nextSn, s.uNo, s.udiseNo, s.dgeNo || "", s.block || "", s.assembly || "",
    s.nameEn || "", s.nameTa || "", s.mgmt1 || "1G", s.mgmt2 || "1", s.mgmt3 || ""
  ]);
  return { status: "success", mode: "inserted", uNo: s.uNo };
}

function getOrCreateAuthSheet() {
  var ss = SpreadsheetApp.openById(MASTER_SPREADSHEET_ID);
  var sheet = ss.getSheetByName(SHEET_SCHOOLS_AUTH);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_SCHOOLS_AUTH);
    sheet.appendRow(["UDISE NO", "U.NO", "School Name (English)", "பள்ளியின் பெயர் (தமிழ்)", "Block", "School Phone", "School Email", "Management", "Headmaster Name", "Password", "Registered At", "Last Password Reset"]);
  }
  return sheet;
}

function registerOrUpdateSchoolAuth(data) {
  var sheet = getOrCreateAuthSheet();
  var rows = sheet.getDataRange().getValues();
  var now = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
  for (var i = 1; i < rows.length; i++) {
    if (String(rows[i][1]).trim() === String(data.uNo).trim() || String(rows[i][0]).trim() === String(data.udiseNo).trim()) {
      sheet.getRange(i + 1, 6, 1, 7).setValues([[
        data.mobile || "", data.schoolEmail || "", data.schoolManagement || "", data.hmName || "", data.password || "", rows[i][10] || now, now
      ]]);
      return { status: "success", updated: true };
    }
  }
  sheet.appendRow([
    data.udiseNo, data.uNo, data.nameEn || "", data.nameTa || "", data.block || "",
    data.mobile || "", data.schoolEmail || "", data.schoolManagement || "1G", data.hmName || "", data.password || data.uNo, now, ""
  ]);
  return { status: "success", created: true };
}

function adminResetSchoolPassword(data) {
  var sheet = getOrCreateAuthSheet();
  var rows = sheet.getDataRange().getValues();
  var now = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
  for (var i = 1; i < rows.length; i++) {
    if (String(rows[i][1]).trim() === String(data.uNo).trim() || String(rows[i][0]).trim() === String(data.udiseNo).trim()) {
      sheet.getRange(i + 1, 10).setValue(data.newPassword);
      sheet.getRange(i + 1, 12).setValue(now);
      return { status: "success", uNo: data.uNo };
    }
  }
  sheet.appendRow([data.udiseNo || "", data.uNo || "", "", "", "", "", "", "", "", data.newPassword, now, now]);
  return { status: "success", uNo: data.uNo };
}
