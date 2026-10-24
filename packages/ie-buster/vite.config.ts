import { fileURLToPath } from "node:url"
import ts from "typescript"
import { minify } from "terser"
import { defineConfig } from "vite"
import pkg from "./package.json" with { type: "json" }

// Vite's normal target stops at ES2015. TypeScript lowers the final chunks to
// ES5 so CDN scripts still parse in IE11, without Babel or runtime polyfills.
export default defineConfig(({ mode }) => {
  const minified = mode === "minified"
  return {
    build: {
      outDir: "dist",
      emptyOutDir: !minified,
      target: "esnext",
      minify: false,
      lib: {
        entry: fileURLToPath(new URL("./src/index.ts", import.meta.url)),
        name: "ieBuster",
        formats: minified ? ["umd"] : ["umd", "es", "cjs"],
        fileName: (format) =>
          format === "umd"
            ? `ie-buster${minified ? ".min" : ""}.js`
            : `index.${format === "cjs" ? "cjs" : "js"}`,
      },
      rolldownOptions: {
        output: {
          exports: "default",
          generatedCode: { preset: "es5" },
        },
      },
    },
    plugins: [
      {
        name: "ie-buster-es5",
        async generateBundle(_options, bundle) {
          for (const chunk of Object.values(bundle)) {
            if (chunk.type !== "chunk") continue
            const code = chunk.code
            const result = ts.transpileModule(code, {
              compilerOptions: {
                target: ts.ScriptTarget.ES5,
                module: ts.ModuleKind.ESNext,
              },
            })
            const output = minified
              ? (
                  await minify(result.outputText, {
                    ecma: 5,
                    format: { comments: false },
                  })
                ).code!
              : result.outputText
            chunk.code =
              `/*! IE Buster v${pkg.version} ${pkg.license} by ${pkg.author.name} */\n` +
              output
          }
        },
      },
    ],
  }
})
