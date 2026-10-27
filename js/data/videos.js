// Videos on the Videos page.
//   f    → poster image name in assets/poster (JPG). Also the MP4 name in assets/video for videos without yt.
//   yt   → YouTube video ID (the part after /shorts/ or watch?v=). When set, the video plays from YouTube.
//   len  → running time shown on the card.
window.YOT = window.YOT || {};

YOT.videos = [
  { f: "chess-with-master-habba", yt: "AP2Er0twocg", len: "0:43", title: "Chess with Master Habba", text: "A look inside a weekly chess session." },
  { f: "img_2546", yt: "6vVZKEX1EBs", len: "1:06", title: "Lesson at the shelter", text: "Kids gather at the painted picnic tables for an outdoor talk." },
  { f: "img_2407", yt: "lilY1wZHAV8", len: "0:35", title: "Laser tag briefing", text: "Gearing up and learning the rules before the first round." },
  { f: "img_2408", yt: "To82m45d8oE", len: "1:41", title: "Into the arena", text: "Lights down, vests on: laser tag night." },
  { f: "img_2986", yt: "D0YTiWshOpo", len: "0:10", title: "Circle at the mosque", text: "Sitting together for a talk at the Iowa City mosque." },
  { f: "img_1775", yt: "hp5dazgBkos", len: "0:10", title: "Youth meeting", text: "Teens trading ideas at the center." },
  { f: "img_3216", yt: "UJhmlCtQgbY", len: "3:08", title: "Design Shift in Ames", text: "Students designed a logo for Youth of Tomorrow at Design Shift in Ames, Iowa." },
  { f: "img_1774", yt: "JxVSKFxazDM", len: "19:48", title: "Meeting with Ustaz Mahmoud Lutfi", text: "The full recording of our youth meeting with Ustaz Mahmoud Lutfi at Mamma House." },
];

// Builds the right player for a video: a YouTube embed, or the MP4 file.
// YouTube won't play embeds on a page opened straight from a file (file://),
// so in that case show a link to watch on YouTube instead.
YOT.videoPlayer = (v) =>
  v.yt && location.protocol === "file:"
    ? `<div class="video-fallback">
        <p>YouTube videos can't play when the site is opened from a file on your computer.</p>
        <a class="btn btn-sun" href="https://www.youtube.com/watch?v=${v.yt}" target="_blank" rel="noopener">Watch on YouTube</a>
      </div>`
    : v.yt
    ? `<iframe src="https://www.youtube-nocookie.com/embed/${v.yt}?autoplay=1&playsinline=1&rel=0" title="${v.title}" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowfullscreen></iframe>`
    : `<video src="assets/video/${v.f}.mp4" controls autoplay playsinline></video>`;
