import { getDirname, path } from "vuepress/utils";
import { hopeTheme } from "vuepress-theme-hope";

import navbar from "./navbar.js";
import sidebar from "./sidebar/index.js";

const __dirname = getDirname(import.meta.url);

export default hopeTheme({
  hostname: "https://ps.zpj.io",
  logo: "/logo.png",
  favicon: "/favicon.ico",

  author: {
    name: "Zhiping Jiang",
    url: "https://faculty.xidian.edu.cn/zpj/zh_CN/index.htm",
  },

  repo: "https://github.com/",
  docsDir: "docs",
  pure: true,
  focus: false,
  breadcrumb: false,
  navbar,
  sidebar,
  displayFooter: true,

  pageInfo: ["Author", "Category", "Tag", "Original", "Word", "ReadingTime"],

  markdown: {
    align: true,
    codeTabs: true,
    gfm: true,
    include: {
      resolvePath: (file, cwd) => {
        if (file.startsWith("@"))
          return path.resolve(
            __dirname,
            "../snippets",
            file.replace("@", "./"),
          );

        return path.resolve(cwd, file);
      },
    },
    tasklist: true,
    math: true,
  },

  plugins: {
    blog: true,

    copyright: {
      author: "Zhiping Jiang",
      license: "MIT",
      triggerLength: 100,
      maxLength: 700,
      canonical: "https://ps.zpj.io/",
      global: true,
    },

    feed: {
      atom: true,
      json: true,
      rss: true,
    },

    icon: {
      assets: "//at.alicdn.com/t/c/font_2922463_o9q9dxmps9.css",
    },

    search: {
      isSearchable: (page) => page.path !== "/",
      maxSuggestions: 10,
    },
  },
});
