// =========================================================
// Youth of Tomorrow — shared script (every page loads this)
// Builds the header and footer, so menu
// changes only need to be made here.
// Each page sets <body data-page="..."> to mark its menu link.
// =========================================================
window.YOT = window.YOT || {};
const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
YOT.$ = $;
YOT.$$ = $$;

const ORG_EMAIL = "youthoftomorrowic@gmail.com";
const ORG_ADDRESS = ["1556 S 1st Ave #C", "Iowa City, IA 52240"];
const ORG_MAP = "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(ORG_ADDRESS.join(", "));

// Points of contact. Shown wherever a page has <div data-contacts></div>.
const CONTACTS = [
  { for: "girls", name: "Hanan Ali Yousif", title: "President", phone: "319-471-7171", email: "ali.hanan@yahoo.com" },
  { for: "boys", name: "Nasr Mohammed", title: "Executive Director", phone: "515-512-5795", email: "oshar2008@gmail.com" },
];

// Main menu.
const NAV = [
  { key: "about", href: "about.html", label: "About" },
  { key: "partners", href: "partners.html", label: "Partners" },
  { key: "programs", href: "programs.html", label: "Programs" },
  { key: "videos", href: "videos.html", label: "Videos" },
  { key: "moments", href: "moments.html", label: "Moments" },
  { key: "events", href: "events.html", label: "Events" },
  { key: "donate", href: "donate.html", label: "Donate" },
  { key: "contact", href: "contact.html", label: "Contact" },
];

const page = document.body.dataset.page;
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);

/* ---------- Header ---------- */
function headerHTML() {
  const links = NAV.map((n) => {
    // "Coming next" belongs to Programs, so it marks Programs as the current page too.
    const current = page === n.key || (n.key === "programs" && page === "coming-next");
    return `<a class="nav-link" href="${n.href}"${current ? ' aria-current="page"' : ""}>${n.label}</a>`;
  }).join("");

  return `<div class="wrap header-inner">
      <a class="brand" href="index.html" aria-label="Youth of Tomorrow, home">
        <img src="assets/img/logo-mark.png" alt="" width="40" height="46">
        <span class="brand-name">Youth of Tomorrow</span>
      </a>
      <nav class="nav" id="nav" aria-label="Main">
        ${links}
        <a class="btn btn-sun nav-cta" href="join.html"${page === "join" ? ' aria-current="page"' : ""}>Get involved</a>
      </nav>
      <button class="menu-btn" aria-expanded="false" aria-controls="nav" aria-label="Open menu"><span></span><span></span></button>
    </div>`;
}

/* ---------- Footer ---------- */
function footerHTML() {
  const programs = (YOT.programs || []).map((p) => `<li><a href="programs.html#${p.id}">${esc(p.name)}</a></li>`).join("");
  return `<div class="wrap footer-grid">
      <div>
        <img class="footer-logo" src="assets/img/logo-sm.png" alt="Youth of Tomorrow" width="170">
        <p lang="ar" dir="rtl" class="footer-ar">منظمة شباب الغد</p>
      </div>
      <div>
        <h4>Find us</h4>
        <address class="footer-address">
          <a href="${ORG_MAP}" target="_blank" rel="noopener">${ORG_ADDRESS.join("<br>")}</a>
        </address>
        <p>Events across Johnson County<br><a href="mailto:${ORG_EMAIL}">${ORG_EMAIL}</a></p>
      </div>
      <div>
        <h4>Programs</h4>
        <ul>${programs}<li><a href="coming-next.html">Coming next</a></li></ul>
      </div>
      <div>
        <h4>Explore</h4>
        <ul>
          <li><a href="about.html">About &amp; leadership</a></li>
          <li><a href="about.html#mission">Mission &amp; vision</a></li>
          <li><a href="partners.html">Partners</a></li>
          <li><a href="videos.html">Videos</a></li>
          <li><a href="moments.html">Photo moments</a></li>
          <li><a href="events.html">Events</a></li>
          <li><a href="donate.html">Donate</a></li>
          <li><a href="join.html">Get involved</a></li>
          <li><a href="contact.html">Contact us</a></li>
        </ul>
      </div>
    </div>
    <div class="wrap footer-base">
      <p>© ${new Date().getFullYear()} Youth of Tomorrow. Made with love in Iowa City.</p>
      <a href="#">Back to top</a>
    </div>`;
}

const header = $("#site-header");
const footer = $("#site-footer");
if (header) header.innerHTML = headerHTML();
if (footer) footer.innerHTML = footerHTML();

/* ---------- Header behavior ---------- */
const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 24);
onScroll();
window.addEventListener("scroll", onScroll, { passive: true });

const menuBtn = $(".menu-btn");
const nav = $("#nav");
const setMenu = (open) => {
  nav.classList.toggle("is-open", open);
  header.classList.toggle("menu-open", open);
  menuBtn.setAttribute("aria-expanded", open);
  menuBtn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
};
menuBtn.addEventListener("click", () => setMenu(!nav.classList.contains("is-open")));
$$("a", nav).forEach((a) => a.addEventListener("click", () => setMenu(false)));

/* ---------- Lightbox: YOT.lightbox.open([{src, cap}], startIndex) ---------- */
YOT.lightbox = (() => {
  const lb = document.createElement("dialog");
  lb.className = "lightbox";
  lb.setAttribute("aria-label", "Photo viewer");
  lb.innerHTML = `<button class="lb-close" aria-label="Close">×</button>
    <button class="lb-nav lb-prev" aria-label="Previous photo">‹</button>
    <figure><img alt=""><figcaption></figcaption></figure>
    <button class="lb-nav lb-next" aria-label="Next photo">›</button>`;
  document.body.append(lb);
  const img = $("img", lb);
  const cap = $("figcaption", lb);
  let list = [];
  let idx = 0;

  function show(i) {
    idx = (i + list.length) % list.length;
    img.src = list[idx].src;
    img.alt = list[idx].cap;
    cap.textContent = list[idx].cap;
    img.style.animation = "none";
    img.offsetHeight; // restart the pop animation
    img.style.animation = "";
  }
  function open(items, i = 0) {
    list = items;
    $$(".lb-nav", lb).forEach((b) => (b.hidden = items.length < 2));
    show(i);
    lb.showModal();
  }
  $(".lb-close", lb).addEventListener("click", () => lb.close());
  $(".lb-prev", lb).addEventListener("click", () => show(idx - 1));
  $(".lb-next", lb).addEventListener("click", () => show(idx + 1));
  lb.addEventListener("click", (e) => { if (e.target === lb) lb.close(); });
  lb.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") show(idx + 1);
    if (e.key === "ArrowLeft") show(idx - 1);
  });
  let touchX = null;
  lb.addEventListener("touchstart", (e) => (touchX = e.touches[0].clientX), { passive: true });
  lb.addEventListener("touchend", (e) => {
    if (touchX === null || list.length < 2) return;
    const dx = e.changedTouches[0].clientX - touchX;
    if (Math.abs(dx) > 50) show(idx + (dx < 0 ? 1 : -1));
    touchX = null;
  });
  return { open };
})();

// Any image with data-full="assets/img/...jpg" opens in the viewer when clicked.
document.addEventListener("click", (e) => {
  const el = e.target.closest("[data-full]");
  if (!el) return;
  YOT.lightbox.open([{ src: el.dataset.full, cap: el.dataset.caption || el.alt || "" }]);
});

/* ---------- Contact cards ---------- */
const telHref = (phone) => "tel:+1" + phone.replace(/\D/g, "");
$$("[data-contacts]").forEach((el) => {
  el.classList.add("contact-cards");
  el.innerHTML = CONTACTS.map(
    (c) => `<div class="contact-card contact-${c.for}">
        <p class="contact-for">Contact for ${c.for}</p>
        <h3>${esc(c.name)}</h3>
        <p class="contact-title">${esc(c.title)}</p>
        <p class="contact-lines">
          <a href="${telHref(c.phone)}">${esc(c.phone)}</a>
          <a href="mailto:${esc(c.email)}">${esc(c.email)}</a>
        </p>
      </div>`
  ).join("");
});

/* ---------- Helpers shared by page scripts ---------- */
YOT.esc = esc;
YOT.findPhoto = (f) => (YOT.photos || []).find((p) => p.f === f);
YOT.findVideo = (f) => (YOT.videos || []).find((v) => v.f === f);
