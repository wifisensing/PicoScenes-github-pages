import { navbar } from "vuepress-theme-hope";

export default navbar([
  { text: "Manual", icon: "about", link: "/README.md" },
  { text: "Application Notes", icon: "book", link: "/appnotes/appnotes.md" },
  { text: "API Docs", icon: "article", link: "/api_docs/index.html", target: "_blank"},
  { text: "GitHub", icon: "github", link: "https://github.com/wifisensing" },
  {
    text: "Issue Tracker",
    icon: "article",
    link: "https://github.com/wifisensing/PicoScenes-Issue-Tracker/issues",
  },
]);
