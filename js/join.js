// Get involved page: sign-up form that saves to a Google Sheet.
// Links can pre-fill the form:
//   join.html?role=volunteer          → picks "I want to help" (youth | youth-volunteer | parent | volunteer)
//   join.html?interest=chess          → ticks a program (ids from js/data/programs.js)
//   join.html?ideas=drop-in,council   → lists "Coming next" picks in the message

// Google Sheets endpoint: paste the Web app URL from Apps Script here (see google-apps-script.gs).
const SHEET_URL = "https://script.google.com/macros/s/AKfycbzEBoYzrU6yMpcWz3CdA6v_CRrtJI3gc1eFZ5T49rEM_HDeRHi_ZyaSapaeTND7xJC7/exec";

/* Program checkboxes */
$("#interests").insertAdjacentHTML(
  "beforeend",
  YOT.programs
    .map((p) => `<label><input type="checkbox" name="interests" value="${YOT.esc(p.name)}" data-id="${p.id}">${YOT.esc(p.name)}</label>`)
    .join("")
);

/* Get involved: role tabs + form */
const roleTitles = {
  "Youth member": "Sign up as a youth member",
  "Youth volunteer": "Sign up as a youth volunteer",
  Parent: "Get updates for your family",
  "Volunteer or mentor": "Offer to help",
};
$$(".path").forEach((p) =>
  p.addEventListener("click", () => {
    $$(".path").forEach((x) => {
      x.classList.toggle("is-on", x === p);
      x.setAttribute("aria-selected", x === p);
    });
    $("#role").value = p.dataset.role;
    $("#form-title").textContent = roleTitles[p.dataset.role];
  })
);


const form = $("#join-form");
const status = $("#form-status");
const submitBtn = $("button[type=submit]", form);

// Show only the fields that fit the selected role; hidden fields are disabled so they're skipped.
function syncRoleFields() {
  const key = { "Youth member": "youth", "Youth volunteer": "youthvol", Parent: "parent", "Volunteer or mentor": "volunteer" }[$("#role").value];
  $$("[data-for]", form).forEach((el) => {
    const on = el.dataset.for.split(" ").includes(key);
    el.hidden = !on;
    $$("input, textarea", el).forEach((i) => (i.disabled = !on));
    if (el.matches("input, textarea")) el.disabled = !on;
  });
}
$$(".path").forEach((p) => p.addEventListener("click", syncRoleFields));
syncRoleFields();

function setStatus(msg, kind) {
  status.textContent = msg;
  status.className = "form-status" + (kind ? " is-" + kind : "");
}

function validate() {
  let first = null;
  $$("[required]", form).forEach((el) => {
    if (el.disabled) return;
    const bad = el.type === "checkbox" ? !el.checked : !el.value.trim() || !el.checkValidity();
    el.setAttribute("aria-invalid", bad);
    if (el.type === "checkbox") el.closest("label").setAttribute("aria-invalid", bad);
    if (bad && !first) first = el;
  });
  return first;
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const bad = validate();
  if (bad) {
    setStatus(
      bad.type === "checkbox"
        ? "Check the box to confirm a parent or guardian knows you're signing up."
        : bad.type === "email" && bad.value
        ? "That email doesn't look complete. Check it and try again."
        : "Fill in the highlighted fields so we can reach you.",
      "error"
    );
    bad.focus();
    return;
  }
  if (form.website.value) return; // spam bot filled the hidden field

  const data = new FormData(form);
  data.set("interests", data.getAll("interests").join(", "));
  data.delete("website");

  submitBtn.disabled = true;
  setStatus("Sending your sign-up…");
  try {
    if (SHEET_URL.startsWith("PASTE")) throw new Error("Sign-ups aren't connected yet — SHEET_URL is not set in js/join.js.");
    let json;
    try {
      // Sent as a plain form post, which Google Apps Script reads reliably.
      const res = await fetch(SHEET_URL, { method: "POST", body: new URLSearchParams(data) });
      json = await res.json();
    } catch {
      throw new Error("NETWORK");
    }
    // The sheet answered but couldn't save: show its reason so it can be fixed.
    if (json.result !== "success") throw new Error(`The sign-up sheet couldn't save this: ${json.error || "unknown error"}`);
    setStatus(`Thanks, ${data.get("name").split(" ")[0]}! You're signed up — we'll reach out before the next event.`, "ok");
    form.reset();
    $("#role").value = $(".path.is-on").dataset.role;
    syncRoleFields();
    $$("[aria-invalid]", form).forEach((el) => el.removeAttribute("aria-invalid"));
  } catch (err) {
    setStatus(
      err.message === "NETWORK"
        ? "Your sign-up didn't go through. Check your connection and try again."
        : err.message,
      "error"
    );
    console.error(err);
  } finally {
    submitBtn.disabled = false;
  }
});

/* Pre-fill from the link */
const params = new URLSearchParams(location.search);
const roleParam = { youth: "Youth member", "youth-volunteer": "Youth volunteer", parent: "Parent", volunteer: "Volunteer or mentor" }[params.get("role")];
if (roleParam) $(`.path[data-role="${roleParam}"]`).click();

// "Sign up as a youth volunteer" on this page picks that option and scrolls up to the form.
$$("[data-pick-role]").forEach((a) =>
  a.addEventListener("click", (e) => {
    e.preventDefault();
    $(`.path[data-role="${a.dataset.pickRole}"]`).click();
    $("#signup").scrollIntoView({ behavior: "smooth" });
  })
);
const interest = params.get("interest");
if (interest) {
  const box = $(`#interests input[data-id="${CSS.escape(interest)}"]`);
  if (box) box.checked = true;
}
const ideas = (params.get("ideas") || "")
  .split(",")
  .map((id) => (YOT.ideas || []).find((i) => i.id === id))
  .filter(Boolean);
if (ideas.length) {
  $("#message").value = `New programs I'd join: ${ideas.map((i) => i.name).join(", ")}.`;
}

/* Suggestions form: saved to the "Suggestions" tab of the same Google Sheet. */
const suggestForm = $("#suggest-form");
const suggestStatus = $("#suggest-status");
const setSuggestStatus = (msg, kind) => {
  suggestStatus.textContent = msg;
  suggestStatus.className = "form-status" + (kind ? " is-" + kind : "");
};
suggestForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const box = suggestForm.elements.suggestion;
  const empty = !box.value.trim();
  box.setAttribute("aria-invalid", empty);
  if (empty) {
    setSuggestStatus("Write your suggestion first, then send it.", "error");
    box.focus();
    return;
  }
  if (suggestForm.elements.website.value) return; // spam bot filled the hidden field

  const data = new FormData(suggestForm);
  data.delete("website");
  const btn = $("button[type=submit]", suggestForm);
  btn.disabled = true;
  setSuggestStatus("Sending your suggestion…");
  try {
    if (SHEET_URL.startsWith("PASTE")) throw new Error("Suggestions aren't connected yet — SHEET_URL is not set in js/join.js.");
    let json;
    try {
      const res = await fetch(SHEET_URL, { method: "POST", body: new URLSearchParams(data) });
      json = await res.json();
    } catch {
      throw new Error("Your suggestion didn't go through. Check your connection and try again.");
    }
    if (json.result !== "success") throw new Error(`The suggestion box couldn't save this: ${json.error || "unknown error"}`);
    setSuggestStatus("Thank you! Your suggestion was sent to our board.", "ok");
    suggestForm.reset();
    box.removeAttribute("aria-invalid");
  } catch (err) {
    setSuggestStatus(err.message, "error");
    console.error(err);
  } finally {
    btn.disabled = false;
  }
});
