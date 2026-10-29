# Youth of Tomorrow website

A plain HTML/CSS/JS site. No build step: open `index.html` in a browser, or upload the folder to any web host.

## Pages

| Page | HTML | Styles | Script |
|---|---|---|---|
| Home | `index.html` | `css/home.css` | `js/home.js` |
| About & board | `about.html` | `css/about.css` | `js/about.js` |
| Programs | `programs.html` | `css/programs.css` | `js/programs.js` |
| Coming next | `coming-next.html` | `css/coming-next.css` | `js/coming-next.js` |
| Videos | `videos.html` | `css/videos.css` | `js/videos.js` |
| Moments (photos) | `moments.html` | `css/moments.css` | `js/moments.js` |
| Events | `events.html` | `css/events.css` | `js/events.js` |
| Donate | `donate.html` | `css/donate.css` | `js/donate.js` |
| Get involved | `join.html` | `css/join.css` | `js/join.js` |
| Partners | `partners.html` | `css/partners.css` | none |
| Contact | `contact.html` | `css/contact.css` | none |

Every page also loads the shared files:

- `css/base.css`: colors, fonts, buttons, header, footer, photo viewer.
- `js/site.js`: builds the header menu and the footer. Edit the menu here once and every page updates.

## Common edits

- **Add or change a program**: edit `js/data/programs.js`. The Programs page and its buttons, the footer, the home page cards and the sign-up checkboxes all update.
- **Add a future program idea**: edit `js/data/ideas.js`.
- **Add a photo**: put a large copy in `assets/img/` and a small copy (about 700px wide) in `assets/thumb/` with the same name, then add a line to `js/data/photos.js`.
- **Add a video**: upload it to YouTube, put a poster image (a still from the video) in `assets/poster/`, then add a line to `js/data/videos.js` with the YouTube ID in `yt` (the part after `/shorts/`, `youtu.be/` or `watch?v=`).
- **Add an event**: copy an `<li class="event">` block in `events.html`.
- **Board members**: edit `js/data/board.js`. Add a tall photo (3:4) to `assets/img/team/` and put its file name in `photo`; people without a photo show their initials. A `bio` adds a "Read bio" button.
- **Points of contact** (phone and email cards): edit `CONTACTS` at the top of `js/site.js`.
- **Office hours**: search `contact.html` for "To be announced".
- **Partners**: copy an `<article class="partner">` block in `partners.html`, and add the logo to the strip in `index.html`.
- **Connect the sign-up form**: follow the steps at the top of `google-apps-script.gs`, then paste the URL into `SHEET_URL` in `js/join.js`.

## After editing a script or stylesheet

Browsers keep saved copies of the files in `js/` and `css/`. Each HTML page loads them with a version tag, for example `js/site.js?v=20261025`. After you change any of those files, change the number in every HTML page (any new number works, today's date is easiest) so visitors get the new version.

From Terminal, in this folder, this replaces the old number with a new one in all pages:

    sed -i '' 's/?v=20261025/?v=20261101/g' *.html

## Useful links

- `programs.html#chess`: jump to a program (ids are in `js/data/programs.js`).
- `moments.html?filter=faith`: open the gallery filtered (`play`, `learn`, `faith`, `community`).
- `join.html?role=volunteer`: open the sign-up form on a role (`youth`, `youth-volunteer`, `parent`, `volunteer`).
- `join.html#volunteer-hours`: the volunteer hours certificate card.
- `join.html?interest=chess`: tick a program on the sign-up form.
