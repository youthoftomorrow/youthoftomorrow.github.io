// Videos page: one card per video in js/data/videos.js. One video plays at a time.
// Cards show our own poster image; YouTube only loads after someone presses play.

$("#clips").innerHTML = YOT.videos
  .map(
    (v, i) => `<li class="clip" data-i="${i}">
      <div class="clip-frame">
        <img class="clip-poster" src="assets/poster/${v.f}.jpg" alt="" loading="lazy">
        <button class="clip-play" aria-label="Play video: ${YOT.esc(v.title)} (${v.len})"></button>
        <span class="clip-len">${v.len}</span>
      </div>
      <h2>${YOT.esc(v.title)}</h2>
      <p>${YOT.esc(v.text)}</p>
    </li>`
  )
  .join("");

const clips = $$(".clip");

// Stop a clip by removing its player, which brings the poster back.
function stop(clip) {
  const player = $("iframe, video", clip);
  if (player) player.remove();
  clip.classList.remove("is-playing");
}

clips.forEach((clip) => {
  $(".clip-play", clip).addEventListener("click", () => {
    clips.forEach((c) => c !== clip && stop(c));
    $(".clip-frame", clip).insertAdjacentHTML("beforeend", YOT.videoPlayer(YOT.videos[clip.dataset.i]));
    clip.classList.add("is-playing");
    const video = $("video", clip);
    if (video) video.addEventListener("ended", () => stop(clip));
  });
});

// Stop a video once it scrolls out of view.
const offscreen = new IntersectionObserver((entries) =>
  entries.forEach((e) => { if (!e.isIntersecting && e.target.classList.contains("is-playing")) stop(e.target); })
);
clips.forEach((clip) => offscreen.observe(clip));
