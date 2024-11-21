import { defineConfig } from 'vitepress'
import { menuSidebar } from '../plugins/vitepress-plugin-auto-sidebar'
import { MarkdownTransform } from '../plugins/markdownTransform'
import path from 'path'

export const otherNav = menuSidebar.map(item => {
  const [first] = item.content
  const link = first?.link ?? first.items[0]?.link
  return { text: item.name, link }

})

const sidebar = menuSidebar.reduce((prev, cur) => {
  prev[`/pages/${cur.name}`] = cur.content
  return prev
}, {})

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "啊科的前端",
  description: "blog,前端博客,Vue",
  base: "/blog/",
  cleanUrls: true,
  head: [
    ['script', { src: 'https://pixijs.download/release/pixi.js' }]
  ],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      ...otherNav
    ],

    sidebar,
    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  },
  vite: {
    resolve: {
      alias: {
        "@/components": path.resolve(__dirname, "/core/components/")
      }
    },
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
    plugins: [MarkdownTransform()]
  }
})
