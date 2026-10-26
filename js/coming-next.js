// Coming next page: idea cards, theme filter and "I'd join" picks.
// Picks are remembered in this browser only, then sent through the sign-up form.

const themeOf = (id) => YOT.themes.find((t) => t.id === id);
const heart = `<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M8 14s-6-3.6-6-8a3.2 3.2 0 0 1 6-1.6A3.2 3.2 0 0 1 14 6c0 4.4-6 8-6 8Z" fill="currentColor"/></svg>`;

let picks = [];
try { picks = JSON.parse(localStorage.getItem("yot-picks") || "[]"); } catch {}
const savePicks = () => { try { localStorage.setItem("yot-picks", JSON.stringify(picks)); } catch {} };

function card(idea) {
  const t = themeOf(idea.theme);
  const on = picks.includes(idea.id);
  return `<li class="idea${on ? " is-picked" : ""}" data-id="${idea.id}" data-theme="${idea.theme}" style="--c: ${t.color}">
      <span class="theme">${YOT.esc(t.name)}</span>
      <h3>${YOT.esc(idea.name)}</h3>
      <p>${YOT.esc(idea.text)}</p>
      <button class="pick" type="button" aria-pressed="${on}" aria-label="I'd join: ${YOT.esc(idea.name)}">${heart}<span>${on ? "Picked" : "I'd join"}</span></button>
    </li>`;
}

$("#first-ideas").innerHTML = YOT.ideas.filter((i) => i.first).map(card).join("");
$("#ideas").innerHTML = YOT.ideas.filter((i) => !i.first).map(card).join("");

/* Theme filter */
$("#theme-filters").innerHTML =
  `<button class="chip is-on" data-theme="all" aria-pressed="true">All</button>` +
  YOT.themes.map((t) => `<button class="chip" data-theme="${t.id}" aria-pressed="false">${YOT.esc(t.name)}</button>`).join("");
$$("#theme-filters .chip").forEach((chip) =>
  chip.addEventListener("click", () => {
    const theme = chip.dataset.theme;
    $$("#theme-filters .chip").forEach((c) => {
      c.classList.toggle("is-on", c === chip);
      c.setAttribute("aria-pressed", c === chip);
    });
    $$("#ideas .idea").forEach((el) => (el.hidden = theme !== "all" && el.dataset.theme !== theme));
  })
);

/* Picks + tray */
const tray = $("#tray");
function syncTray() {
  const n = picks.length;
  tray.classList.toggle("is-shown", n > 0);
  document.body.classList.toggle("has-tray", n > 0);
  $("#tray-count").textContent = `You picked ${n} idea${n === 1 ? "" : "s"}`;
  $("#tray-send").href = `join.html?ideas=${encodeURIComponent(picks.join(","))}`;
}
document.addEventListener("click", (e) => {
  const btn = e.target.closest(".pick");
  if (!btn) return;
  const li = btn.closest(".idea");
  const id = li.dataset.id;
  picks = picks.includes(id) ? picks.filter((x) => x !== id) : [...picks, id];
  const on = picks.includes(id);
  li.classList.toggle("is-picked", on);
  btn.setAttribute("aria-pressed", on);
  $("span", btn).textContent = on ? "Picked" : "I'd join";
  savePicks();
  syncTray();
});
$("#tray-clear").addEventListener("click", () => {
  picks = [];
  savePicks();
  $$(".idea").forEach((li) => {
    li.classList.remove("is-picked");
    $(".pick", li).setAttribute("aria-pressed", "false");
    $(".pick span", li).textContent = "I'd join";
  });
  syncTray();
});
syncTray();
