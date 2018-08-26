const path = require("path")
const webpack = require("webpack")
const package = require("./package.json")
const MODE = "development"

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
      banner: `${package.project.name} v${package.version} ${
        package.license
      } by ${package.author.name}`
    })
  ]
}
