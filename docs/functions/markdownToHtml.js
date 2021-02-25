import remark from "remark"
import html from "remark-html"
import gfm from "remark-gfm"
import highlight from "remark-highlight.js"
import removeComments from "remark-remove-comments"

export default async function markdownToHtml(markdown) {
  const result = await remark()
    .use(gfm)
    .use(highlight)
    .use(removeComments)
    .use(html)
    .process(markdown)
  return result.toString()
}
