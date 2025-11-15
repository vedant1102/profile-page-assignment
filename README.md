# 🌐 Personal Profile Website – Day 5 Assignment

This is my personal **Profile Page Website** built as part of a web development assignment.  
It showcases my skills, experience, projects, and contact information in a responsive and modern design.

🔗 **Live Demo:** [Click Here](https://vedant1102.github.io/day-5-profile-page-assignment/)

---

## 🧠 About the Project

This website represents my personal developer portfolio.  
It highlights who I am, the technologies I work with, and the projects I’ve built.

The main goals of this project were:

- To practice **HTML5, CSS3, and JavaScript** fundamentals.
- To create a **responsive and interactive** personal portfolio page.
- To understand **page structure, navigation, and styling principles**.
- To design a web presence that reflects my professional identity.

---

## 🛠️ Technologies Used

- **HTML5** – for the structure and content
- **CSS3** – for layout, colors, and styling
- **JavaScript (Vanilla JS)** – for interactivity
- **GitHub Pages** – for hosting the live version

---

## 📂 Folder Structure

```
day-5-profile-page-assignment/
│
├── index.html          # The main HTML file
├── styles.css          # The main CSS file
├── script.js          # The main JavaScript file
├── assets/             # Folder for project assets
│   ├── images/         # Project images
│   └── icons/          # Icon files
└── README.md           # This README file
```

---

## ✨ Interactivity & Animations (recent updates)

This project was enhanced with several JavaScript and CSS improvements to make the page more interactive and polished:

- Externalized JavaScript:

  - All interactivity moved to script.js (located at the project root). This file manages menu behavior, smooth scrolling, modal previews, form handling, and UI effects.

- Navigation & Scrolling:

  - Accessible mobile menu with aria-expanded support and automatic close on link click.
  - Smooth scrolling that accounts for the fixed header height.
  - Active navigation link highlighting while scrolling.

- Projects:

  - "View Project" buttons open a lightweight modal populated from data attributes (title, image, description).

- Contact form:

  - Client-side validation with a user-friendly success message (simulated submit).

- Utilities:

  - Back-to-top button that appears after scrolling.
  - IntersectionObserver-based reveal-on-scroll for hero, projects, timeline, contact and footer sections.

- Visual polish & accessibility:
  - New CSS transitions/animation variables, card hover/tilt effect for project cards (tilt disabled when the user prefers reduced motion).
  - Focus-visible outlines for keyboard users.
  - All animations respect the user's prefers-reduced-motion setting.

For details, see:

- script.js — interactivity and observers
- styles.css — animation variables, reveal helpers and modal/back-to-top styling
