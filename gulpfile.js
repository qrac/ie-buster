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
const files = {
  package: "./package.json",
  config: "./config.yml"
}
const package = JSON.parse(fs.readFileSync(files.package))
const config = yaml.safeLoad(fs.readFileSync(files.config))

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
    app: package.project.src + "/app/",
    ejs: package.project.src + "/ejs/",
    scss: package.project.src + "/scss/",
    js: package.project.src + "/js/",
    icon: package.project.src + "/icon/"
  },
  dist: {
    dir: package.project.dist + "/",
    app: package.project.dist + "/",
    html: package.project.dist + "/",
    css: package.project.dist + "/assets/css/",
    js: package.project.dist + "/assets/js/",
    img: package.project.dist + "/assets/img/"
  }
}

// HTML Beauty Option
const htmlbeautifyOption = {
  indent_size: 2,
  max_preserve_newlines: 0,
  indent_inner_html: true,
  extra_liners: []
}

// Sass Option
const sassOption = {
  outputStyle: "expanded",
  importer: packageImporter({
    extensions: [".scss", ".css"]
  })
}

// Autoprefixer Option
const autoprefixerOption = {
  grid: true
}

// PostCSS Option
const postcssOption = [flexBugsFixes, autoprefixer(autoprefixerOption)]

// Uglify Option
const uglifyOption = {
  output: { comments: /^!/ }
}

// BrowserSync Option
const browserSyncOption = {
  server: {
    baseDir: paths.dist.html
  },
  startPath: "index.html",
  open: false,
  notify: false
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
    .pipe(uglify(uglifyOption))
    .pipe(rename({ suffix: ".min" }))
    .pipe(gulp.dest(paths.dist.app))
})

// EJS > HTML
gulp.task("ejs", function(done) {
  for (const key in config.pages) {
    const page = config.pages[key]
    page.path = key
    const layout = page.layout
    gulp
      .src(paths.src.ejs + layout + ".ejs")
      .pipe(
        plumber({ errorHandler: notify.onError("Error: <%= error.message %>") })
      )
      .pipe(
        data(function() {
          return JSON.parse(fs.readFileSync(files.package))
        })
      )
      .pipe(
        data(function() {
          return yaml.safeLoad(fs.readFileSync(files.config))
        })
      )
      .pipe(ejs(page))
      .pipe(rename(key + ".html"))
      .pipe(htmlbeautify(htmlbeautifyOption))
      .pipe(gulp.dest(paths.dist.html))
    done()
  }
})

// SCSS > CSS
gulp.task("scss", () => {
  return gulp
    .src(paths.src.scss + "**/*.scss")
    .pipe(sassGlob())
    .pipe(
      plumber({ errorHandler: notify.onError("Error: <%= error.message %>") })
    )
    .pipe(sass(sassOption))
    .pipe(postcss(postcssOption))
    .pipe(gcmq())
    .pipe(gulpif(banner.visible, header(banner.basic, { package: package })))
    .pipe(gulp.dest(paths.dist.css))
})

// CSS Minify
gulp.task("cssmin", () => {
  return gulp
    .src([paths.dist.css + "**/*.css", "!" + paths.dist.css + "**/*.min.css"])
    .pipe(
      plumber({ errorHandler: notify.onError("Error: <%= error.message %>") })
    )
    .pipe(cleanCSS())
    .pipe(rename({ suffix: ".min" }))
    .pipe(gulp.dest(paths.dist.css))
})

// SVG Sprite Icon
gulp.task("sprite", function() {
  return gulp
    .src(paths.src.icon + "**/*.svg")
    .pipe(
      plumber({ errorHandler: notify.onError("Error: <%= error.message %>") })
    )
    .pipe(
      svgSprite({
        mode: {
          symbol: {
            dest: "./",
            sprite: "sprite.svg"
          }
        },
        shape: {
          transform: [
            {
              svgo: {
                plugins: [
                  { removeTitle: true },
                  { removeStyleElement: true },
                  { removeAttrs: { attrs: "fill" } }
                ]
              }
            }
          ]
        },
        svg: {
          xmlDeclaration: true,
          doctypeDeclaration: true
        }
      })
    )
    .pipe(gulp.dest(paths.dist.img))
})

// Browser Sync
gulp.task("browser-sync", function(done) {
  browserSync.init(browserSyncOption)
  done()
})

gulp.task("reload", function(done) {
  browserSync.reload()
  done()
})

// Watch
gulp.task("watch", () => {
  gulp.watch(
    [paths.src.ejs + "**/*.ejs", "!" + paths.src.ejs + "**/_*.ejs"],
    gulp.series("ejs", "reload")
  )
  gulp.watch(
    paths.src.scss + "**/*.scss",
    gulp.series("scss", "cssmin", "reload")
  )
  gulp.watch(paths.src.app + "**/*.js", gulp.series("app", "reload"))
  gulp.watch(paths.src.icon + "**/*.svg", gulp.series("sprite", "reload"))
})

gulp.task("default", gulp.parallel("browser-sync", "watch"))

//----------------------------------------------------
// gulp: Build
//----------------------------------------------------

gulp.task(
  "build",
  gulp.parallel(
    gulp.series("app"),
    gulp.series("ejs"),
    gulp.series("scss", "cssmin")
  )
)
