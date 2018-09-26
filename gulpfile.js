//----------------------------------------------------
// gulp: Setting
//----------------------------------------------------

const gulp = require("gulp")
const fs = require("fs")
const notify = require("gulp-notify")
const plumber = require("gulp-plumber")
const rename = require("gulp-rename")
const header = require("gulp-header")
const gulpif = require("gulp-if")
const browserSync = require("browser-sync")
const htmlbeautify = require("gulp-html-beautify")
const ejs = require("gulp-ejs")
const data = require("gulp-data")
const yaml = require("js-yaml")
const sass = require("gulp-sass")
const sassGlob = require("gulp-sass-glob")
const postcss = require("gulp-postcss")
const autoprefixer = require("autoprefixer")
const flexBugsFixes = require("postcss-flexbugs-fixes")
const gcmq = require("gulp-group-css-media-queries")
const cleanCSS = require("gulp-clean-css")
const packageImporter = require("node-sass-package-importer")
const concat = require("gulp-concat")
const uglify = require("gulp-uglify")
const svgSprite = require("gulp-svg-sprite")

// Read File
const package = JSON.parse(fs.readFileSync("./package.json"))

// Banner
const banner = {
  basic: [
    "/*! <%= package.project.name %> v<%= package.version %> <%= package.license %> by <%= package.author.name %> */",
    "",
    ""
  ].join("\n"),
  visible: package.project.banner
}

// Paths
const paths = {
  src: {
    dir: package.project.src + "/",
    app: package.project.src + "/app/"
  },
  dist: {
    dir: package.project.dist + "/",
    app: package.project.dist + "/"
  }
}

// Uglify Options
const uglifyOptions = {
  output: { comments: /^!/ }
}

//----------------------------------------------------
// gulp: Task
//----------------------------------------------------

// Application Wrapping
gulp.task("app", () => {
  return gulp
    .src(paths.src.app + "**/*.js")
    .pipe(
      plumber({ errorHandler: notify.onError("Error: <%= error.message %>") })
    )
    .pipe(concat(package.name + ".js"))
    .pipe(gulpif(banner.visible, header(banner.basic, { package: package })))
    .pipe(gulp.dest(paths.dist.app))
    .pipe(uglify(uglifyOptions))
    .pipe(rename({ suffix: ".min" }))
    .pipe(gulp.dest(paths.dist.app))
})

//----------------------------------------------------
// gulp: Build
//----------------------------------------------------

gulp.task("build", gulp.parallel(gulp.series("app")))
