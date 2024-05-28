import { defineConfig } from "vitepress";
import viteConfig from "./vite.config";
import {
  example_functions,
  core_functions,
  article_functions,
  example_packages,
  core_packages,
  article_packages
} from "../metadata/metadata";
import { CoreFunction } from "../metadata/type";

const Core = getFunctionsSideBar(core_functions, core_packages.name);
const Article = getFunctionsSideBar(article_functions, article_packages.name);
const Example = getFunctionsSideBar(example_functions, example_packages.name);

console.log(Core[1].items);
const sidebar = {
  "/core/": Core,
  "/article/": Article,
  "/example/": Example
};

const nav = [
  { text: "Home", link: "/" },
  { text: "Core", link: Core[0]?.link ?? "/404" },
  { text: "Atricle", link: Article[0]?.link ?? "/404" },
  { text: "Example", link: Example[0]?.link ?? "/404" }
];

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "科",
  description: "vue3, vue3封装组件",
  // base: "/blog/",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav,

    sidebar
  },
  vite: viteConfig
});

function getFunctionsSideBar(fns: CoreFunction[], dir: string) {
  return fns.map(item => {
    return {
      text: item.name,
      link: item.children
        ? `${item.children[0].package}/${item.children[0].name}/index.md`
        : `${item.package}/${item.name}/index.md`,
      items: item.children ? getFunctionsSideBar(item.children, dir) : []
    };
  });
}
