//----------------------------------------------------
// gulp: Setting
//----------------------------------------------------

const gulp = require("gulp")
const notify = require("gulp-notify")
const plumber = require("gulp-plumber")
const rename = require("gulp-rename")
const header = require("gulp-header")
const gulpif = require("gulp-if")
const concat = require("gulp-concat")
const uglify = require("gulp-uglify")

// Require File
const package = require("./package.json")

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
    js: package.project.src + "/"
  },
  dist: {
    dir: package.project.dist + "/",
    js: package.project.dist + "/"
  }
}

// Uglify Options
const uglifyOption = {
  output: { comments: /^!/ }
}

//----------------------------------------------------
// gulp: Task
//----------------------------------------------------

// Concat
gulp.task("concat", () => {
  return gulp
    .src(paths.src.js + "**/*.js")
    .pipe(
      plumber({ errorHandler: notify.onError("Error: <%= error.message %>") })
    )
    .pipe(concat("ie-buster.js"))
    .pipe(gulpif(banner.visible, header(banner.basic, { package: package })))
    .pipe(gulp.dest(paths.dist.js))
})

// Uglify
gulp.task("uglify", () => {
  return gulp
    .src([paths.dist.js + "**/*.js", "!" + paths.dist.js + "**/*.min.js"])
    .pipe(
      plumber({ errorHandler: notify.onError("Error: <%= error.message %>") })
    )
    .pipe(uglify(uglifyOption))
    .pipe(rename({ suffix: ".min" }))
    .pipe(gulp.dest(paths.dist.js))
})

gulp.task("default", gulp.parallel("concat", "uglify"))

//----------------------------------------------------
// gulp: Build
//----------------------------------------------------

gulp.task("build", gulp.parallel(gulp.series("concat", "uglify")))
