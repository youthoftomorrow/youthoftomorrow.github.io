// Programs page: builds one section per program from js/data/programs.js.

const caption = (f) => (YOT.findPhoto(f) || {}).cap || "";

/* Jump links */
$("#jump").innerHTML =
  YOT.programs.map((p) => `<a class="chip" href="#${p.id}">${esc(p.name)}</a>`).join("") +
  `<a class="chip next" href="coming-next.html">Coming next</a>`;

/* Program sections */
$("#program-sections").innerHTML = YOT.programs
  .map((p) => {
    const photos = [p.photo, ...p.photos].slice(0, 4);
    const video = p.video && YOT.findVideo(p.video);
    return `<section class="program-detail" id="${p.id}" style="--accent: var(--${p.accent})" aria-labelledby="${p.id}-title">
      <div class="wrap pd-grid">
        <div class="pd-copy">
          <h2 id="${p.id}-title">${esc(p.name)}</h2>
          ${p.about.map((t) => `<p>${esc(t)}</p>`).join("")}
          <h3>What it looks like</h3>
          <ul class="looks">${p.looksLike.map((t) => `<li>${esc(t)}</li>`).join("")}</ul>
          <div class="pd-actions">
            <a class="btn btn-sun" href="join.html?interest=${p.id}">Sign up for this</a>
            ${video ? `<button class="btn btn-line" data-video="${video.f}">Watch the video (${video.len})</button>` : ""}
          </div>
        </div>
        <div class="pd-media">
          ${photos
            .map(
              (f, i) => `<button data-program="${p.id}" data-i="${i}" aria-label="Open photo: ${esc(caption(f))}">
                <img src="assets/${i === 0 ? "img" : "thumb"}/${f}.jpg" alt="${esc(caption(f))}" loading="lazy">
              </button>`
            )
            .join("")}
        </div>
      </div>
    </section>`;
  })
  .join("");

/* Photos open in the shared viewer */
$$(".pd-media button").forEach((b) =>
  b.addEventListener("click", () => {
    const p = YOT.programs.find((x) => x.id === b.dataset.program);
    const items = [p.photo, ...p.photos].slice(0, 4).map((f) => ({ src: `assets/img/${f}.jpg`, cap: caption(f) }));
    YOT.lightbox.open(items, Number(b.dataset.i));
  })
);

/* Video player dialog (YouTube or MP4, see YOT.videoPlayer in js/data/videos.js) */
const dlg = document.createElement("dialog");
dlg.className = "video-dialog";
dlg.setAttribute("aria-label", "Video player");
dlg.innerHTML = `<button class="lb-close" aria-label="Close video">×</button><div class="video-slot"></div>`;
document.body.append(dlg);
const slot = $(".video-slot", dlg);
$$("[data-video]").forEach((b) =>
  b.addEventListener("click", () => {
    slot.innerHTML = YOT.videoPlayer(YOT.findVideo(b.dataset.video));
    dlg.showModal();
  })
);
$(".lb-close", dlg).addEventListener("click", () => dlg.close());
dlg.addEventListener("click", (e) => { if (e.target === dlg) dlg.close(); });
dlg.addEventListener("close", () => (slot.innerHTML = "")); // stops playback

/* Highlight the program you're reading in the jump bar */
const chips = $$("#jump .chip[href^='#']");
const spy = new IntersectionObserver(
  (entries) =>
    entries.forEach((e) => {
      if (e.isIntersecting) chips.forEach((c) => c.classList.toggle("is-on", c.getAttribute("href") === "#" + e.target.id));
    }),
  { rootMargin: "-40% 0px -55% 0px" }
);
$$(".program-detail").forEach((s) => spy.observe(s));

// Sections are built after the page loads, so jump to programs.html#chess etc. ourselves.
if (location.hash) {
  const target = document.getElementById(location.hash.slice(1));
  if (target) requestAnimationFrame(() => target.scrollIntoView());
}
// Dropdown links to another program on this same page.
window.addEventListener("hashchange", () => {
  const target = document.getElementById(location.hash.slice(1));
  if (target) target.scrollIntoView({ behavior: "smooth" });
});
