/**
 * Youth of Tomorrow — sign-up form → Google Sheet
 *
 * Setup (one time, about 5 minutes):
 *  1. Create a new Google Sheet named "Youth of Tomorrow sign-ups".
 *  2. In the sheet: Extensions → Apps Script. Delete what's there, paste this whole file, click Save.
 *  3. Choose the function "setup" in the toolbar and click Run. Approve the permissions
 *     (it only needs access to this one spreadsheet). This creates the header row.
 *  4. Deploy → New deployment → type "Web app".
 *       Execute as: Me
 *       Who has access: Anyone
 *     Click Deploy and copy the Web app URL (ends in /exec).
 *  5. Paste that URL into SHEET_URL near the top of js/join.js on the website.
 *
 * Suggestions from the Get involved page are saved to a second tab, "Suggestions",
 * which the script creates by itself the first time one arrives.
 *
 * If you edit this script later, use Deploy → Manage deployments → Edit → Version: New version,
 * so the same URL keeps working.
 */

const SHEET_NAME = "Sign-ups";
const HEADERS = [
  "Submitted", "Role", "Name", "Email", "Phone",
  "Age", "Parent/guardian name", "Parent/guardian phone", "Guardian knows",
  "Children", "Interests", "How they'll help", "Message",
];
const FIELDS = [
  null, "role", "name", "email", "phone",
  "age", "guardian_name", "guardian_phone", "guardian_ok",
  "children", "interests", "help", "message",
];

function setup() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);
  sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]).setFontWeight("bold");
  sheet.setFrozenRows(1);
}

// Suggestions from the Get involved page go to their own tab. Name and contact are optional.
const SUGGEST_SHEET = "Suggestions";
const SUGGEST_HEADERS = ["Submitted", "From", "Topic", "Suggestion", "Name", "Email or phone"];
const SUGGEST_FIELDS = [null, "from", "topic", "suggestion", "name", "contact"];

function getTab(ss, name, headers) {
  let sheet = ss.getSheetByName(name);
  if (!sheet) {
    sheet = ss.insertSheet(name);
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]).setFontWeight("bold");
    sheet.setFrozenRows(1);
  }
  return sheet;
}

// Prefix with ' so a value starting with = + - @ is stored as text, not run as a formula.
function clean(v) {
  const s = String(v || "").slice(0, 2000);
  return /^[=+\-@]/.test(s) ? "'" + s : s;
}

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.tryLock(10000);
  try {
    const p = e.parameter;
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    if (!ss) throw new Error("This script isn't attached to a Google Sheet. Open the sheet, then Extensions → Apps Script, and paste the script there.");

    if (p.form === "suggestion") {
      if (!p.suggestion) throw new Error("The suggestion is empty.");
      const sheet = getTab(ss, SUGGEST_SHEET, SUGGEST_HEADERS);
      sheet.appendRow(SUGGEST_FIELDS.map((f) => (f ? clean(p[f]) : new Date())));
      return json({ result: "success" });
    }

    if (!p.name || !p.email) throw new Error("Missing name or email.");
    const sheet = getTab(ss, SHEET_NAME, HEADERS);
    sheet.appendRow(FIELDS.map((f) => (f ? clean(p[f]) : new Date())));
    return json({ result: "success" });
  } catch (err) {
    return json({ result: "error", error: String(err.message || err) });
  } finally {
    lock.releaseLock();
  }
}

function json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
