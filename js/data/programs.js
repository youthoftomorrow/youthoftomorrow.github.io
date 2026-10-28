// Current programs. This list feeds the Programs page and its buttons, the footer,
// the home page and the sign-up form. To add a program, add an entry here.
//   id      → used in links, e.g. programs.html#chess
//   photo   → file name in assets/thumb + assets/img (no extension)
//   photos  → extra photos shown on the Programs page
//   video   → optional file name in assets/video (no extension)
window.YOT = window.YOT || {};

YOT.programs = [
  {
    id: "game-nights",
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
    looksLike: ["A group outing about once a month", "Rides arranged for kids who need them", "Snacks, team games and plenty of trash talk"],
  },
  {
    id: "chess",
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
