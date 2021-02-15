import babel from "@rollup/plugin-babel"
import { terser } from "rollup-plugin-terser"

import pkg from "./package.json"
import pjt from "./project.json"

const banner = `/*! ${pjt.name} v${pkg.version} ${pkg.license} by ${pkg.author.name} */`

export default {
  input: "src/index.js",
  output: [
    {
      name: pkg.name,
      file: `dist/${pkg.name}.js`,
      format: "iife",
      extend: true,
      banner,
    },
    {
      name: pkg.name,
      file: `dist/${pkg.name}.min.js`,
      format: "iife",
      extend: true,
      banner,
      plugins: [terser()],
    },
  ],
  plugins: [babel({ babelHelpers: "bundled" })],
}
