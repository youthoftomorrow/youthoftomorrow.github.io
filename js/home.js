// Home page: draggable photo pile, program cards, moments strip.

/* Draggable photo pile in the hero */
let topZ = 10;
$$(".print").forEach((card) => {
  let startX, startY, baseX = 0, baseY = 0, dragging = false;
  card.addEventListener("pointerdown", (e) => {
    dragging = true;
    card.setPointerCapture(e.pointerId);
    card.classList.add("is-dragging");
    card.style.zIndex = ++topZ;
    startX = e.clientX - baseX;
    startY = e.clientY - baseY;
  });
  card.addEventListener("pointermove", (e) => {
    if (!dragging) return;
    baseX = e.clientX - startX;
    baseY = e.clientY - startY;
    const tilt = Math.max(-6, Math.min(6, e.movementX * 0.6));
    card.style.transform = `translate(${baseX}px, ${baseY}px) rotate(calc(var(--r) + ${tilt}deg))`;
  });
  const end = () => {
    if (!dragging) return;
    dragging = false;
    card.classList.remove("is-dragging");
    card.style.transform = `translate(${baseX}px, ${baseY}px) rotate(var(--r))`;
  };
  card.addEventListener("pointerup", end);
  card.addEventListener("pointercancel", end);
});

/* Program cards, plus a "Coming next" card at the end */
$("#home-programs").innerHTML =
  YOT.programs
    .map(
      (p) => `<li class="program-card" style="--accent: var(--${p.accent})">
        <a href="programs.html#${p.id}">
          <img src="assets/thumb/${p.photo}.jpg" alt="" loading="lazy">
          <div><h3>${YOT.esc(p.name)}</h3><p>${YOT.esc(p.tagline)}</p></div>
        </a>
      </li>`
    )
    .join("") +
  `<li class="program-card next">
    <a href="coming-next.html">
      <div><h3>Coming next</h3><p>Art nights, bike building, adventure days and more. Help us choose.</p></div>
      <span>See what's planned</span>
    </a>
  </li>`;

/* Moments strip: six favorites that open in the photo viewer */
const favorites = ["img_1805", "img_2557", "img_3430", "img_1980", "img_2597", "img_2485"].map(YOT.findPhoto);
$("#moments-strip").innerHTML = favorites
  .map((p, i) => `<button data-i="${i}" aria-label="Open photo: ${YOT.esc(p.cap)}"><img src="assets/thumb/${p.f}.jpg" alt="${YOT.esc(p.cap)}" loading="lazy"></button>`)
  .join("");
$$("#moments-strip button").forEach((b) =>
  b.addEventListener("click", () =>
    YOT.lightbox.open(favorites.map((p) => ({ src: `assets/img/${p.f}.jpg`, cap: p.cap })), Number(b.dataset.i))
  )
);
