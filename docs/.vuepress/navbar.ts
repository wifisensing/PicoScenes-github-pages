import { navbar } from "vuepress-theme-hope";

export default navbar([
  { text: "User Manual", icon: "about", link: "/README.md" },
  { text: "Application Notes", icon: "book", link: "/appnotes/appnotes.md" },
  { text: "API Docs", icon: "book", link: "http://ps.zpj.io/doxygen/index.html", target: "_blank"},
  { text: "GitHub", icon: "github", link: "https://github.com/wifisensing" },
  {
    text: "Issue Tracker",
    icon: "article",
    link: "https://github.com/wifisensing/PicoScenes-Issue-Tracker/issues",
  },
]);
