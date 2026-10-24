import { readFileSync } from "node:fs"
import { resolve } from "node:path"
import { defineConfig } from "vite"

export default defineConfig({
  root: resolve(import.meta.dirname),
  server: { open: "/_default/" },
  plugins: [
    {
      name: "ie-buster-distribution",
      configureServer(server) {
        server.middlewares.use("/ie-buster/ie-buster.js", (_req, res) => {
          res.setHeader("Content-Type", "text/javascript; charset=utf-8")
          res.end(
            readFileSync(
              resolve(
                import.meta.dirname,
                "../packages/ie-buster/dist/ie-buster.js",
              ),
            ),
          )
        })
      },
    },
  ],
})
