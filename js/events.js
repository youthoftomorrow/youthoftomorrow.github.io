// Events page: plays an event's video in place when its poster is pressed.
// The video id in data-video matches an "f" name in js/data/videos.js.

$$(".ds-video").forEach((box) =>
  $(".ds-play", box).addEventListener("click", () => {
    box.insertAdjacentHTML("beforeend", YOT.videoPlayer(YOT.findVideo(box.dataset.video)));
    box.classList.add("is-playing");
  })
);
