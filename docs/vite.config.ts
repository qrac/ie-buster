import { readFileSync, mkdirSync, copyFileSync } from "node:fs"
import { resolve } from "node:path"
import { defineConfig, pluginSsg, pluginSvg, pluginImage } from "minista"
import remarkGfm from "remark-gfm"
import rehypePrettyCode from "rehype-pretty-code"

export default defineConfig({
  plugins: [
    pluginSsg({
      mdx: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [
          [
            rehypePrettyCode,
            {
              grid: false,
              theme: "nord",
              keepBackground: false,
            },
          ],
        ],
      },
    }),
    pluginSvg(),
    pluginImage(),
    {
      name: "ie-buster-distribution",
      configureServer(server) {
        server.middlewares.use("/ie-buster/ie-buster.min.js", (_req, res) => {
          res.setHeader("Content-Type", "text/javascript; charset=utf-8")
          res.end(
            readFileSync(
              resolve(
                import.meta.dirname,
                "../packages/ie-buster/dist/ie-buster.min.js",
              ),
            ),
          )
        })
      },
      closeBundle() {
        const output = resolve(import.meta.dirname, "dist/ie-buster")
        mkdirSync(output, { recursive: true })
        copyFileSync(
          resolve(
            import.meta.dirname,
            "../packages/ie-buster/dist/ie-buster.min.js",
          ),
          resolve(output, "ie-buster.min.js"),
        )
      },
    },
  ],
})
