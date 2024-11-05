import type { ContentDir, Options } from "./type";

import fs, { link } from 'fs'
import path from 'path'
import frontMatter from 'front-matter'

// function getSidebarItems(dir: (string | ContentDir)[], currentRoot: string | undefined, root: string | undefined, options: Options): object[] {
//     return dir
//         .filter(e => {
//             const itemPath = typeof e === 'string' ? e : e.path
//             return (itemPath.endsWith('.md')) || fs.statSync(path.resolve(currentRoot ?? '/', itemPath)).isDirectory()
//         })
//         .map((entry: string | ContentDir) => {
//             const e = typeof entry === 'string' ? entry : entry.path
//             const childDir = path.resolve(currentRoot ?? '/', e)

//             if (fs.statSync(childDir).isDirectory()) {
//                 const d = fs.readdirSync(childDir)
//                 const items = getSidebarItems(d, childDir, root, options)
//                 const fileName = e.split('/').pop() ?? ""

//                 let title: string;
//                 if (typeof entry !== 'string' && entry.title) {
//                     title = entry.title
//                 } else {
//                     title = ((fileName.charAt(0).toUpperCase() + fileName.slice(1))).replaceAll('-', ' ')
//                 }

//                 return items.length ? {
//                     text: title,
//                     items
//                 } : null
//             } else if (e.endsWith('.md') && e[0] !== '_') {
//                 let title: string | undefined

//                 if (options.useFrontmatter) {

//                 }
//                 return {
//                     text: title || ((e.charAt(0).toUpperCase() + e.slice(1)).slice(0, -3)).replaceAll('-', ' '),
//                     link: childDir.replace(root ?? '', '')
//                 }
//             }
//             return null
//         })
//         .filter(i => !!i)
// }

function getSidebarItems(dir: string[], root?: string) {
    return dir.filter(d => !d.startsWith('.')).map(d => {
        const link = path.resolve(root ?? '', d)
        const _child = fs.readdirSync(link)
        if (_child.some(c => c.endsWith('.md'))) {
            return {
                text: d,
                link: link.replace(process.cwd(), '') + '/'
            }
        } else {
            return {
                text: d,
                items: getSidebarItems(fs.readdirSync(link), link)
            }
        }
    })
}
function getMenuSidebar(options: Options = {}) {
    const _originRoot = options.contentRoot ?? '/'
    options.contentDirs = options?.contentDirs?.length ? options.contentDirs : ['/'];
    options.collapsible = options?.collapsible ?? true
    options.collapsed = options?.collapsed ?? true
    options.useFrontmatter = options?.useFrontmatter ?? false;

    options.contentRoot = path.join(process.cwd(), _originRoot)

    const pagesDir = fs.readdirSync(options.contentRoot)
    return pagesDir.filter(p => !p.startsWith('.')).map(name => {
        const menuPath = path.resolve(options.contentRoot as string, name)
        const childDir = fs.readdirSync(menuPath)

        return {
            name,
            content: getSidebarItems(childDir, menuPath)
        }
    })

}

export const menuSidebar = getMenuSidebar({
    contentRoot: './pages'
})