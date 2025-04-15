import { sidebar } from "vuepress-theme-hope";

import { appnotes } from "./appnotes.js";

export default sidebar({
  // 应该把更精确的路径放置在前边
  "/appnotes/": appnotes,
  "/": [
    {
      text: "User Manual",
      icon: "star",
      link: "home.md",
      // collapsible: true,
      prefix: "userManual/",
      children: [
        "gallery", 
        "users",
        "hardware",
        "features_pricing",
        "installation",
        "scenarios",
        "parameters",
        "matlab",
        "utilities",
        "plugin",
        "status",
        "resources",
        "troubleshooting",
        "eula",
        "credits",
        "ni",
      ],
    },
  ],
});