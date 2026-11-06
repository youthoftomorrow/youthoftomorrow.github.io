// Current programs. This list feeds the Programs page and its buttons, the footer,
// the home page and the sign-up form. To add a program, add an entry here.
//   id      → used in links, e.g. programs.html#chess
//   photo   → file name in assets/thumb + assets/img (no extension)
//   photos  → extra photos shown on the Programs page
//   video   → optional file name in assets/video (no extension)
//   cta     → optional button on the Programs page, e.g. { href: "join.html", label: "Sign up" }
//   active  → false hides a program everywhere on the site (Programs page, home, footer,
//             sign-up form) without deleting it. Remove the line to bring it back.
window.YOT = window.YOT || {};

YOT.programs = [
  {
    id: "swimming",
    name: "Swimming with the Iowa City Eels",
    tagline: "Swim lessons for boys and girls ages 10–18",
    accent: "sky",
    photo: "swimming",
    photos: [],
    alt: "Two kids swimming in an indoor pool",
    cta: { href: "join.html?role=swimming#signup", label: "Register for swimming" },
    about: [
      "We've partnered with the Iowa City Eels swim club to bring swim lessons to our youth. Boys and girls ages 10 to 18 train with the club's coaches in small groups, three days a week.",
      "Registration is open now. Sign up through our Get involved page. Each swimmer starts with a tryout, and the club then places them in the right group.",
    ],
    looksLike: [
      "A tryout with the club first; the club assigns each swimmer's group",
      "Dolphin group: $70/month · Mon, Wed, Thu 5:00–5:30 pm",
      "Sunfish 2 group: $75/month · Mon, Wed, Thu 5:00–5:30 pm",
      "Sunfish 1 group: $82/month · Mon, Wed, Thu 5:30–6:15 pm",
      "Liability insurance: $35 per swimmer, once a year (required for all swimmers)",
      "The club provides the equipment; each swimmer needs their own fins ($10–12)",
      "SafeSport training required for parents and for swimmers 12 and older",
      "Certificates from the club",
      "Girls are welcome to dress modestly and stay covered",
      "The club is willing to separate boys and girls",
    ],
  },
  {
    id: "game-nights",
    active: false,
    name: "Game nights & outings",
    tagline: "Bowling, laser tag, trampolines and more",
    accent: "sun",
    photo: "img_1799",
    photos: ["img_1804", "img_1769", "laser-tag", "foosball"],
    video: "img_2408",
    about: [
      "Monthly trips to the bowling alley, laser tag arena and trampoline park, plus foosball and table games at the center.",
      "The point is fun. The side effect is friendship: kids who meet on a game night start showing up for each other everywhere else.",
    ],
    looksLike: ["A group outing about once a month", "Foosball at the center", "Cards and board games every other week (starting soon)", "Rides arranged for kids who need them"],
  },
  {
    id: "chess",
    active: false,
    name: "Chess with Master Ismael Habba",
    tagline: "Weekly chess for beginners and strong players",
    accent: "sky",
    photo: "chess-kids",
    photos: ["img_1772", "img_1773"],
    video: "chess-with-master-habba",
    about: [
      "Weekly chess sessions where beginners learn the board and strong players get pushed.",
      "Patience, planning and losing gracefully, one game at a time.",
    ],
    looksLike: ["Lessons for first-timers", "Practice games and puzzles", "Friendly tournaments with prizes"],
  },
  {
    id: "faith",
    active: false,
    name: "Faith & Ramadan",
    tagline: "Mosque visits, youth talks and Eid",
    accent: "sun",
    photo: "ramadan",
    photos: ["iowacity-mosque", "img_2484", "img_2485"],
    video: "img_2986",
    about: [
      "Visits to the Iowa City mosque, youth talks with local scholars, iftar gatherings and an Eid celebration every year.",
      "We talk honestly about the challenges young Muslims face and how to keep faith and friendships strong.",
    ],
    looksLike: ["Talks with local scholars", "Iftars during Ramadan", "An Eid outing for the whole crew"],
  },
  {
    id: "careers",
    active: false,
    name: "Careers & workshops",
    tagline: "Interview practice, campus visits and mentors",
    accent: "sky",
    photo: "img_3427",
    photos: ["img_3429", "img_3432", "img_3430", "img_3426"],
    about: [
      "Interview practice, campus visits and conversations with professionals who look like our kids and came from the same places.",
      "Teens leave with a résumé, a few new contacts and a clearer picture of what's possible.",
    ],
    looksLike: ["Résumé and interview workshops", "Visits to campuses and workplaces", "Guest speakers from the community"],
  },
  {
    id: "community",
    active: false,
    name: "Community & health days",
    tagline: "Potlucks, field games and family afternoons",
    accent: "sun",
    photo: "img_2539",
    photos: ["dental-health", "img_2553", "fungames", "img_2597"],
    video: "img_2546",
    about: [
      "Potlucks in the park, field games, dental health days and family afternoons that bring parents, grandparents and little ones together.",
      "Everyone brings something, and everyone leaves knowing a few more neighbors.",
    ],
    looksLike: ["Park potlucks with sack races and tug-of-war", "Health checkups with local providers", "Events for every age"],
  },
];

// Programs that are running now. The site shows only these.
YOT.activePrograms = YOT.programs.filter((p) => p.active !== false);
