const path = require("path")

module.exports = {
  mode: "development",
  entry: "./src/js/app.js",
  output: {
    filename: "ie-buster.js",
    path: path.join(__dirname, "dist")
  }
}
