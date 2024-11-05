import fs from "fs-extra";
import type { Plugin } from "vite";
import { join, resolve } from "node:path";

const DIR_SRC = resolve(__dirname, "../..");
const PACKAGES = "packages";

function isPackagesName(name: string) {
  return name === PACKAGES;
}

export function MarkdownTransform(): Plugin {
  return {
    name: "vueuse-md-transform",
    enforce: "pre",
    async transform(code, id) {
      if (!id.match(/\.md\b/)) return null;

      const frontmatterEnds = code.indexOf("---\n\n");
      const firstHeader = code.search(/\n#{2,6}\s.+/);

      const sliceIndex =
        firstHeader < 0
          ? frontmatterEnds < 0
            ? 0
            : frontmatterEnds + 4
          : firstHeader;

      const [pkg, category, _name] = id.split("/").slice(-4);

      // code.replace(/\n```ts( [^\n]+)?\n(.+?)\n```\n/gs, (...args) => {
      //   console.log({ args });
      //   return "";
      // });

      const demoSection = await getFunctionMarkdown(pkg, category, _name);

      code = code.slice(0, sliceIndex) + demoSection + code.slice(sliceIndex);

      return code;
    }
  };
}

async function getFunctionMarkdown(
  pkg: string,
  category: string,
  name: string
) {
  const dirname = join(DIR_SRC, isPackagesName(pkg) ? "" : pkg, category, name);

  const demoPath = ["demo.vue", "demo.client.vue"].find(i =>
    fs.existsSync(join(dirname, i))
  );

  if (!demoPath) {
    return "";
  }

  const demoSection = `
  <script setup>
  import Demo from \'./${demoPath}\'
  </script>
  ## Demo
  <Demo/>
  \n\n
  `;
  return demoSection;
}
