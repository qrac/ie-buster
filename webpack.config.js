const path = require("path")
const webpack = require("webpack")
const pjson = require("./package.json")
const MODE = "development"
const enabledSourceMap = MODE === "development"

module.exports = {
  mode: MODE,
  entry: "./src/app.js",
  output: {
    filename: "ie-buster.js",
    path: path.join(__dirname, "dist")
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: [["env", { modules: false }]]
            }
          }
        ]
      },
      {
        test: /\.scss/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              url: false,
              sourceMap: true,
              minimize: true,
              importLoaders: 2
            }
          },
          {
            loader: "postcss-loader",
            options: {
              sourceMap: true,
              plugins: [
                require("autoprefixer")({
                  browsers: [
                    "> 3% in JP",
                    "ie 11",
                    "android 4.4",
                    "last 1 versions"
                  ],
                  grid: true
                })
              ]
            }
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: true
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.BannerPlugin({
      banner: `${pjson.name} v${pjson.version} ${pjson.license} by ${
        pjson.author
      }`
    })
  ]
}
