//----------------------------------------------------
// gulp: Setting
//----------------------------------------------------

const gulp = require('gulp')
const fs = require('fs')
const notify = require('gulp-notify')
const plumber = require('gulp-plumber')
const rename = require('gulp-rename')
const header = require('gulp-header')
const gulpif = require('gulp-if')
const concat = require('gulp-concat')
const uglify = require('gulp-uglify')

// Read File
const pkg = JSON.parse(fs.readFileSync('./package.json'))
const pjt = JSON.parse(fs.readFileSync('./project.json'))

// Banner
const banner = {
  basic: [
    '/*! <%= pjt.setting.name %> v<%= pkg.version %> <%= pkg.license %> by <%= pkg.author.name %> */',
    '',
    ''
  ].join('\n'),
  visible: pjt.setting.banner
}

// Paths
const paths = {
  src: {
    dir: pjt.setting.src + '/',
    app: pjt.setting.src + '/app/'
  },
  dist: {
    dir: pjt.setting.dist + '/',
    app: pjt.setting.dist + '/'
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
gulp.task('app', () => {
  return gulp
    .src(paths.src.app + '**/*.js')
    .pipe(
      plumber({ errorHandler: notify.onError('Error: <%= error.message %>') })
    )
    .pipe(concat(pkg.name + '.js'))
    .pipe(gulpif(banner.visible, header(banner.basic, { pkg, pjt })))
    .pipe(gulp.dest(paths.dist.app))
    .pipe(uglify(uglifyOptions))
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest(paths.dist.app))
})

//----------------------------------------------------
// gulp: Build
//----------------------------------------------------

gulp.task('build', gulp.parallel(gulp.series('app')))
