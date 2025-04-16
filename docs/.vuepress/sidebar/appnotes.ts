import { arraySidebar } from "vuepress-theme-hope";

export const appnotes = arraySidebar([
    {
      text: "Overview",
      icon: "star",
      link: "appnotes",
      children: [
        "connect-usrp",
        "x410-setup",
      ],
    },
  ]);
  