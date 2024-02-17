import path from "node:path/posix";
import fs from "node:fs";
import type { DefaultTheme } from "vitepress";

interface generateSidebarParams {
  sidebar: DefaultTheme.SidebarItem[];
  targetPath: string;
  whiteList?: string[];
}

/**
 * 根据提供的选项生成侧边栏。
 *
 * @param {generateSidebarParams} options - 生成侧边栏的选项。
 * @param {Array} options.sidebar - 侧边栏数组。
 * @param {string} options.targetPath - 从中读取文件的目标路径。
 * @param {string[]} options.whiteList - 可选，文件名白名单。
 */
const generateSidebar = (options: generateSidebarParams) => {
  // 读取 目标路径下的文件
  const files = fs.readdirSync(options.targetPath);

  // 过滤 目标路径文件
  let filterFiles = files.filter((item) => !options.whiteList?.includes(item));

  filterFiles.forEach((item) => {
    // 是否是文件夹
    let isDirectory = fs
      .statSync(path.join(options.targetPath, item))
      .isDirectory();

    if (isDirectory) {
      // 文件夹 当前路径是文件夹

      const sidebarItem: DefaultTheme.Sidebar = [];

      generateSidebar({
        sidebar: sidebarItem,
        targetPath: path.join(options.targetPath, item),
        whiteList: options.whiteList,
      });

      options.sidebar.push({
        text: item,
        // collapsed: true,
        items: sidebarItem,
      });
    } else {
      // 不是文件夹

      options.sidebar.push({
        text: item,
        link:
          "/" +
          path.relative(
            path.join(path.resolve(), "./src"),
            path.join(options.targetPath, item)
          ),
      });
    }
  });
};

const sidebar: DefaultTheme.Sidebar = [];

generateSidebar({
  sidebar,
  targetPath: path.join(path.resolve(), "./src/docs"),
  whiteList: [".vitepress", ".image", ".vscode", ".git", "images"],
});

export default sidebar;
