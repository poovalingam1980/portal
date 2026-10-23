/**
 * portal.ceosvg.in - Sivagangai District Education Office
 * Dedicated 5-Component Seniority & Task Priority Engine (v2.8)
 * 
 * Implements customizable priority sorting and multi-criteria filtering across 7,081 staff members:
 * - Component 1: Administrative Purpose (Transfer Counseling, Promotion Panel, Exam Duties, Camp Duties, etc.)
 * - Component 2: Primary Seniority Factor (DOJ School / DOJ Service / Age DOB / Qualification)
 * - Component 3: Secondary Factor / Tie-Breaker 1 (DOJ Service / DOJ School / Age DOB / Staff ID)
 * - Component 4: Tertiary Factor / Tie-Breaker 2 (Age DOB / Staff ID / Alphabetical)
 * - Component 5: Special Priority Concessions & Operational Constraints (Age 55+ Priority, Female Preference, Regular Only, Min Station Tenure)
 */

// Seniority Custom Rule Configuration State (5 Components)
let isSeniorityMode = true; // Default ON
let seniorityCriteria = {
  purpose: "transfer",       // "transfer", "promotion", "examDuty", "campDuty", "stationIncharge", "general", "custom"
  primary: "dojSchool",      // "dojSchool", "dojService", "dob", "qualification"
  secondary: "dojService",   // "dojService", "dojSchool", "dob", "staffId"
  tertiary: "dob",           // "dob", "staffId", "name"
  sortDirection: "asc",      // "asc", "desc"
  age55Priority: true,       // true: Age 55+ gets top priority
  femalePriority: false,     // true: Female staff preference
  regularOnly: true,         // true: Only regular staff
  minStationYears: "1"       // "0", "1", "2", "3" (minimum years in current school)
};

/**
 * 1-Click Administrative Duty Presets (Standard Government Seniority Rules)
 */
function applySeniorityDutyPreset(dutyKey) {
  isSeniorityMode = true;
  if (typeof updateSeniorityModeUI === "function") updateSeniorityModeUI();

  if (dutyKey === "transfer") {
    // 1. General Transfer Counseling: Station Seniority weighted
    seniorityCriteria = {
      purpose: "transfer",
      primary: "dojSchool",
      secondary: "dojService",
      tertiary: "dob",
      sortDirection: "asc",
      age55Priority: true,
      femalePriority: false,
      regularOnly: true,
      minStationYears: "1"
    };
    if (typeof showToast === "function") showToast("🚀 பொது மாறுதல் கலந்தாய்வு முன்னுரிமை விதிகள் (நிலைய பணி மூப்பு) அமைக்கப்பட்டன!", "#1d4ed8");
  } else if (dutyKey === "promotion") {
    // 2. Promotion Panel: Cadre / Service Seniority weighted
    seniorityCriteria = {
      purpose: "promotion",
      primary: "dojService",
      secondary: "dojSchool",
      tertiary: "dob",
      sortDirection: "asc",
      age55Priority: false,
      femalePriority: false,
      regularOnly: true,
      minStationYears: "0"
    };
    if (typeof showToast === "function") showToast("🎓 பதவி உயர்வு தகுதிப் பட்டியல் முன்னுரிமை விதிகள் (அரசுப் பணி மூப்பு) அமைக்கப்பட்டன!", "#9333ea");
  } else if (dutyKey === "examDuty") {
    // 3. Board Exam Duties: Chief Superintendent (CS) & Department Officer (DO)
    seniorityCriteria = {
      purpose: "examDuty",
      primary: "dojService",
      secondary: "dob",
      tertiary: "staffId",
      sortDirection: "asc",
      age55Priority: false,
      femalePriority: false,
      regularOnly: true,
      minStationYears: "0"
    };
    if (typeof showToast === "function") showToast("📝 பொதுத்தேர்வு CS / DO பணிகள் முன்னுரிமை விதிகள் அமைக்கப்பட்டன!", "#15803d");
  } else if (dutyKey === "campDuty") {
    // 4. Valuation Camp Duties: CE, SO, AE
    seniorityCriteria = {
      purpose: "campDuty",
      primary: "dojService",
      secondary: "dojSchool",
      tertiary: "dob",
      sortDirection: "asc",
      age55Priority: false,
      femalePriority: false,
      regularOnly: true,
      minStationYears: "0"
    };
    if (typeof showToast === "function") showToast("📚 விடைத்தாள் மதிப்பீட்டு முகாம் அலுவலர் பணி முன்னுரிமை விதிகள் அமைக்கப்பட்டன!", "#c2410c");
  } else if (dutyKey === "general") {
    // 5. General District Seniority
    seniorityCriteria = {
      purpose: "general",
      primary: "dojService",
      secondary: "dob",
      tertiary: "staffId",
      sortDirection: "asc",
      age55Priority: false,
      femalePriority: false,
      regularOnly: false,
      minStationYears: "0"
    };
    if (typeof showToast === "function") showToast("🏛️ மாவட்ட பொதுப் பணி மூப்பு முன்னுரிமை விதிகள் அமைக்கப்பட்டன!", "#475569");
  }

  if (typeof syncSeniorityCriteriaToUI === "function") syncSeniorityCriteriaToUI();
  if (typeof updateSeniorityFormulaBadge === "function") updateSeniorityFormulaBadge();
  if (typeof adminStaffCurrentPage !== "undefined") adminStaffCurrentPage = 1;
  if (typeof applyAdminStaffFiltersAndRender === "function") applyAdminStaffFiltersAndRender();
}

/**
 * Multi-Tier Seniority Comparator
 */
function compareSeniorityStaff(a, b, cfg) {
  // 1. Concession Tier 1: Age 55+ Priority (born on or before 1971-12-31 for current year 2026)
  if (cfg.age55Priority) {
    const aIs55 = Boolean(a.dob && a.dob <= "1971-12-31");
    const bIs55 = Boolean(b.dob && b.dob <= "1971-12-31");
    if (aIs55 !== bIs55) return aIs55 ? -1 : 1;
  }

  // 2. Concession Tier 2: Female Priority
  if (cfg.femalePriority) {
    const aIsFem = a.gender === "Female";
    const bIsFem = b.gender === "Female";
    if (aIsFem !== bIsFem) return aIsFem ? -1 : 1;
  }

  function getFactorVal(item, factor) {
    if (factor === "dojSchool") return item.dojSchool || "9999-99-99";
    if (factor === "dojService") return item.dojService || "9999-99-99";
    if (factor === "dob") return item.dob || "9999-99-99";
    if (factor === "qualification") return item.qualification || "";
    if (factor === "staffId") return item.staffId || "";
    if (factor === "name") return item.name || "";
    return "";
  }

  // 3. Primary Factor (1st Order Sort)
  const pA = getFactorVal(a, cfg.primary);
  const pB = getFactorVal(b, cfg.primary);
  let pCmp = pA.localeCompare(pB);
  if (cfg.sortDirection === "desc") pCmp = -pCmp;
  if (pCmp !== 0) return pCmp;

  // 4. Secondary Factor (Tie-Breaker 1)
  const sA = getFactorVal(a, cfg.secondary);
  const sB = getFactorVal(b, cfg.secondary);
  const sCmp = sA.localeCompare(sB);
  if (sCmp !== 0) return sCmp;

  // 5. Tertiary Factor (Tie-Breaker 2)
  const tA = getFactorVal(a, cfg.tertiary);
  const tB = getFactorVal(b, cfg.tertiary);
  const tCmp = tA.localeCompare(tB);
  if (tCmp !== 0) return tCmp;

  // 6. Absolute Tie-Breaker
  return a.staffId.localeCompare(b.staffId);
}

// Export for module systems if available
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    seniorityCriteria,
    applySeniorityDutyPreset,
    compareSeniorityStaff
  };
}
