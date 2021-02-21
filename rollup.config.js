import babel from "@rollup/plugin-babel"
import { terser } from "rollup-plugin-terser"

import pkg from "./package.json"
import pjt from "./project.json"

const banner = `/*! ${pjt.name} v${pkg.version} ${pkg.license} by ${pkg.author.name} */\n`

export default {
  input: "src/index.js",
  output: [
    {
      name: pjt.variable.name,
      file: pkg.cdn,
      format: "umd",
      banner,
    },
    {
      name: pjt.variable.name,
      file: pkg["cdn:min"],
      format: "umd",
      banner,
      plugins: [terser()],
    },
    {
      file: pkg.main,
      format: "cjs",
      exports: "default",
      banner,
    },
    {
      file: pkg.module,
      format: "es",
      banner,
    },
  ],
  plugins: [babel({ babelHelpers: "bundled" })],
}
