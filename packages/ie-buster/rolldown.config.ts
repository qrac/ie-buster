import { parse } from "acorn"
import { minify } from "terser"
import { defineConfig, type OutputOptions } from "rolldown"
import pkg from "./package.json" with { type: "json" }

const banner = `/*! IE Buster v${pkg.version} ${pkg.license} by ${pkg.author.name} */\n`

export default defineConfig({
  input: "src/index.ts",
  output: ([
    { file: pkg.cdn, format: "umd", name: "ieBuster" },
    { file: pkg["cdn:min"], format: "umd", name: "ieBuster" },
    { file: pkg.main, format: "cjs" },
    { file: pkg.module, format: "es" },
  ] satisfies OutputOptions[]).map((output) => ({
    ...output,
    exports: "default",
    generatedCode: { preset: "es5" },
  })),
  plugins: [
    {
      name: "ie-buster-distribution",
      async generateBundle(outputOptions, bundle) {
        const minified = outputOptions.file === pkg["cdn:min"]
        for (const chunk of Object.values(bundle)) {
          if (chunk.type !== "chunk") continue
          // Format shorthand properties as ES5, without a legacy compiler API.
          // The source deliberately avoids syntax requiring downlevel transforms.
          const result = await minify(chunk.code, {
            ecma: 5,
            compress: minified,
            mangle: minified,
            format: { ecma: 5, beautify: !minified, comments: false },
          })
          if (outputOptions.format !== "es") {
            parse(result.code!, { ecmaVersion: 5 })
          }
          chunk.code = banner + result.code! + "\n"
        }
        // Keep the original .js distribution paths usable under type: module.
        if (outputOptions.format !== "es") {
          this.emitFile({
            type: "asset",
            fileName: "package.json",
            source: '{"type":"commonjs"}\n',
          })
        }
      },
    },
  ],
})
