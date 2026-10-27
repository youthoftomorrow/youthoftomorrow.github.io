// About page: builds the leadership and board cards from js/data/board.js,
// and opens a member's full bio in a pop-up when "Read bio" is pressed.

const initialsOf = (name) => {
  const words = name.replace(/^Dr\.\s*/, "").split(",")[0].split(/\s+/).filter(Boolean);
  return (words[0][0] + words[words.length - 1][0]).toUpperCase();
};
const telLink = (p) => "tel:+1" + p.replace(/\D/g, "");

function portrait(m, i, big = false) {
  return m.photo
    ? `<img class="person-photo" src="assets/img/team/${m.photo}" alt="Portrait of ${YOT.esc(m.name)}"${big ? "" : ' loading="lazy"'}>`
    : `<div class="person-photo person-initials t${i % 4}" aria-hidden="true"><span>${initialsOf(m.name)}</span></div>`;
}

function card(m, i, group) {
  return `<li class="person">
      ${portrait(m, i)}
      <div class="person-text">
        <h4>${YOT.esc(m.name)}</h4>
        <p class="person-role">${YOT.esc(m.role)}</p>
        ${m.contactFor ? `<p class="person-tag tag-${m.contactFor}">Contact for ${m.contactFor}</p>` : ""}
        ${m.bio ? `<button class="bio-btn" type="button" data-group="${group}" data-i="${i}">Read bio</button>` : ""}
      </div>
    </li>`;
}

const groups = { leaders: YOT.board.leaders, members: YOT.board.members };
$("#leaders").innerHTML = groups.leaders.map((m, i) => card(m, i, "leaders")).join("");
$("#members").innerHTML = groups.members.map((m, i) => card(m, i, "members")).join("");

/* Bio pop-up */
const bio = document.createElement("dialog");
bio.className = "bio-dialog";
bio.setAttribute("aria-labelledby", "bio-name");
document.body.append(bio);

function openBio(m, i) {
  bio.innerHTML = `<button class="bio-close" aria-label="Close">×</button>
    <div class="bio-layout">
      ${portrait(m, i, true)}
      <div class="bio-text">
        <p class="person-role">${YOT.esc(m.role)}</p>
        <h3 id="bio-name">${YOT.esc(m.name)}</h3>
        ${m.bio.map((p) => `<p>${YOT.esc(p)}</p>`).join("")}
        ${
          m.phone
            ? `<div class="bio-contact">
                <strong>Contact for ${m.contactFor}</strong>
                <a href="${telLink(m.phone)}">${YOT.esc(m.phone)}</a>
                <a href="mailto:${YOT.esc(m.email)}">${YOT.esc(m.email)}</a>
              </div>`
            : ""
        }
      </div>
    </div>`;
  $(".bio-close", bio).addEventListener("click", () => bio.close());
  bio.showModal();
}
document.addEventListener("click", (e) => {
  const btn = e.target.closest(".bio-btn");
  if (!btn) return;
  const i = Number(btn.dataset.i);
  openBio(groups[btn.dataset.group][i], i);
});
bio.addEventListener("click", (e) => { if (e.target === bio) bio.close(); });
