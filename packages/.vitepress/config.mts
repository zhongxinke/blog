import { defineConfig } from "vitepress";
import viteConfig from "./vite.config";
import {
  interview_functions,
  example_functions,
  core_functions,
  article_functions,
  interview_packages,
  example_packages,
  core_packages,
  article_packages,
  record_functions,
  record_packages
} from "../metadata/metadata";
import { CoreFunction } from "../metadata/type";

const Core = getFunctionsSideBar(core_functions, core_packages.name);
const Article = getFunctionsSideBar(article_functions, article_packages.name);
const Example = getFunctionsSideBar(example_functions, example_packages.name);
const Record = getFunctionsSideBar(record_functions, record_packages.name);
const Interview = getFunctionsSideBar(
  interview_functions,
  interview_packages.name
);

const sidebar = {
  "/core/": Core,
  "/article/": Article,
  "/example/": Example,
  "/interview/": Interview,
  '/record/': Record
};

export const nav = [
  { text: "首页", link: "/" },
  { text: "文章", link: Article[0]?.link ?? "/404" },
  { text: "工具", link: Core[0]?.link ?? "/404" },
  { text: "案例", link: Example[0]?.link ?? "/404" },
  { text: "编程题", link: Interview[0]?.link ?? "/404" },
  { text: "文章收录", link: Record[0]?.link ?? "/404" },
];

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "科",
  description: "vue3, vue3封装组件",
  base: "/blog/",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav,
    sidebar
  },
  vite: viteConfig
});

function getFunctionsSideBar(fns: CoreFunction[], dir: string) {
  return fns.map(item => {
    const { children, name } = item;
    const firstChildren = children?.[0];

    const options = {
      text: name,
      link: firstChildren
        ? `/${firstChildren.package}/${firstChildren.name}/index.md`
        : `/${item.package}/${item.name}/index.md`
    };

    if (children) {
      options["items"] = getFunctionsSideBar(children, dir);
    }

    return options;
  });
}
