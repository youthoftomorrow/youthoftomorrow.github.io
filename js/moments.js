// Moments page: photo gallery with filters. Link to a filter with moments.html?filter=faith

const gallery = $("#gallery");
const count = $("#count");
const labels = { play: "Play", learn: "Learn", faith: "Faith", community: "Community" };

gallery.innerHTML = YOT.photos
  .map(
    (p, i) => `<button class="tile" data-cat="${p.cat}" data-i="${i}" aria-label="Open photo: ${YOT.esc(p.cap)}">
      <img src="assets/thumb/${p.f}.jpg" alt="${YOT.esc(p.cap)}" loading="lazy">
      <span>${YOT.esc(p.cap)}</span>
    </button>`
  )
  .join("");
const tiles = $$(".tile", gallery);

function applyFilter(cat) {
  if (cat !== "all" && !labels[cat]) cat = "all";
  $$(".chip").forEach((c) => {
    const on = c.dataset.filter === cat;
    c.classList.toggle("is-on", on);
    c.setAttribute("aria-pressed", on);
  });
  let n = 0;
  tiles.forEach((t) => {
    const show = cat === "all" || t.dataset.cat === cat;
    t.classList.toggle("is-hidden", !show);
    if (show) n++;
  });
  count.textContent = cat === "all" ? `Showing all ${n} photos` : `Showing ${n} ${labels[cat]} photos`;
}
$$(".chip").forEach((c) => c.addEventListener("click", () => applyFilter(c.dataset.filter)));
applyFilter(new URLSearchParams(location.search).get("filter") || "all");

tiles.forEach((t) =>
  t.addEventListener("click", () => {
    const visible = tiles.filter((x) => !x.classList.contains("is-hidden"));
    const items = visible.map((x) => {
      const p = YOT.photos[x.dataset.i];
      return { src: `assets/img/${p.f}.jpg`, cap: p.cap };
    });
    YOT.lightbox.open(items, visible.indexOf(t));
  })
);
