import { resolve } from "node:path";
import { defineConfig } from "vite";
import Inspect from "vite-plugin-inspect";
import UnoCSS from "unocss/vite";

import { MarkdownTransform } from "./plugins/markdownTransform";

export default defineConfig({
  server: {
    // fs: {
    //   allow: [resolve(__dirname, "..")]
    // },
    proxy: {
      "/blogImg": {
        target: "http://zhongxk.com",
        changeOrigin: true
      }
    }
  },
  plugins: [MarkdownTransform(), Inspect()],
  resolve: {
    alias: {
      "@ys/components": resolve(__dirname, "../core/components/")
    }
  }
});
