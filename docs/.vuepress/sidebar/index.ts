import { sidebar } from "vuepress-theme-hope";

import { appnotes } from "./appnotes.js";

export default sidebar({
  // 应该把更精确的路径放置在前边
  "/appnotes/": [],
  "/": [
    {
      text: "Overview",
      icon: "star",
      link: "README.md",
      // collapsible: true,
      prefix: "manual/",
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
        "pypicoscenes",
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