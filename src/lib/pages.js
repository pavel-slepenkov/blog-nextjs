import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import remark from 'remark'
import html from 'remark-html'
import prism from 'remark-prism'

const pagesDirectory = path.join(process.cwd(), 'pages-content');

export async function getPageByName(id) {
    const fullPath = path.join(pagesDirectory, `${id}.md`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents)
    // Use remark to convert markdown into HTML string
    const processedContent = await remark()
        .use(html,  { sanitize: false })
        .use(prism)
        .process(matterResult.content)

    const contentHtml = processedContent.toString()

    // Combine the data with the id and contentHtml
    return {
        id,
        contentHtml,
        ...matterResult.data
    }
}