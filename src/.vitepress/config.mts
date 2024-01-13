import { defineConfig } from "vitepress";

import sidebar from "../utils/vitepress-plugin-auto-sidebar";

export default defineConfig({
  title: "My Study Record",
  description: "这不是什么文档,仅是一个个人学习记录",
  base: "/study-record/",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "主页", link: "/" },
      { text: "基础知识", link: "/docs/README" },
    ],
    sidebar,

    socialLinks: [
      { icon: "github", link: "https://github.com/zhaomy0506/study-record" },
    ],
  },
});
