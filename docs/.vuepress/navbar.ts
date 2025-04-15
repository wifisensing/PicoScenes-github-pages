import { navbar } from "vuepress-theme-hope";

export default navbar([
  { text: "User Manual", icon: "java", link: "/home.md" },
  { text: "Application Notes", icon: "book", link: "/appnotes/appnotes.md" },
  { text: "GitHub", icon: "github", link: "https://github.com/wifisensing" },
  {
    text: "Issue Tracker",
    icon: "article",
    link: "https://github.com/wifisensing/PicoScenes-Issue-Tracker/issues",
  },
]);
