const {src, dest, series, watch } = require('gulp')
const concat = require('gulp-concat')
const htmlMin = require('gulp-htmlmin')
const autoprefixes = require('gulp-autoprefixer')
const cleanCSS = require('gulp-clean-css')
const sass = require('gulp-sass')(require('sass'));
const image = require('gulp-image')
const babel = require('gulp-babel')
const uglify = require('gulp-uglify-es').default
const notify = require('gulp-notify')
const del = require('del')
const sourcemaps = require('gulp-sourcemaps')
const browserSync = require('browser-sync').create()

const clean = () => {
  return del(["build-version", "dev-version"])
}
const buildClean = () => {
  return del(["build-version"])
}
const devClean = () => {
  return del(["dev-version"])
}

const buildResources = () => {
  return src("src/fonts/**")
    .pipe(dest("build-version/fonts"))
}
const devResources = () => {
  return src("src/fonts/**")
    .pipe(dest("dev-version/fonts"))
}

const devCssFiles = () => {
  return src('src/css/*.css')
    .pipe(dest("dev-version/css"))
}

const buildCssFiles = () => {
  return src('src/css/*.css')
    .pipe(dest("dev-version/css"))
}

const devStyles = () => {
  return src('src/css/style.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(cleanCSS({
      level: 2
    }))
    .pipe(sourcemaps.write())
    .pipe(dest("dev-version/css"))
    .pipe(browserSync.stream())
}
const buildStyles = () => {
  return src('src/css/style.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixes({
      cascade: false
    }))
    .pipe(cleanCSS({
      level: 2
    }))
    .pipe(sourcemaps.write())
    .pipe(dest("build-version/css"))
}

const devHtmlMinify = () => {
  return src("src/**/*.html")
    .pipe(dest("dev-version"))
    .pipe(browserSync.stream())
}
const buildHtmlMinify = () => {
  return src("src/**/*.html")
    .pipe(htmlMin({
      collapseWhitespace: true,
    }))
    .pipe(dest("build-version"))
}

const devScripts = () => {
  return src([
    "src/script.js"
  ])
  .pipe(concat("app.js"))
  .pipe(dest("dev-version"))
  .pipe(browserSync.stream())
}
const buildScripts = () => {
  return src([
    "src/script.js"
  ])
  .pipe(babel({
    presets: ["@babel/env"]
  }))
  .pipe(concat("app.js"))
  .pipe(uglify({
    toplevel: true
  }).on("error", notify.onError()))
  .pipe(dest("build-version"))
}

const devImages = () => {
  return src([
    "src/images/**/*.jpg",
    "src/images/**/*.png",
    "src/images/**/*.jpeg",
    "src/images/**/*.svg",
  ])
  .pipe(image())
  .pipe(dest("dev-version/images"))
}
const buildImages = () => {
  return src([
    "src/images/**/*.jpg",
    "src/images/**/*.png",
    "src/images/**/*.jpeg",
    "src/images/**/*.svg",
  ])
  .pipe(image())
  .pipe(dest("build-version/images"))
}

const watchFiles = () => {
  browserSync.init({
    server: {
      baseDir: "dev-version"
    }
  })
}

watch("src/**/*.html", devHtmlMinify)
watch("src/**/*.html", buildHtmlMinify)
watch("src/css/*.scss", devStyles)
watch("src/css/*.scss", buildStyles)
watch("src/*.js", devScripts)
watch("src/*.js", buildScripts)
watch("src/fonts/**", devResources)
watch("src/fonts/**", buildResources)

exports.clean = clean
exports.devClean = devClean
exports.buildClean = buildClean
exports.styles = devStyles
exports.dev = series(devClean, devResources, devHtmlMinify, devStyles, devCssFiles, devScripts,  devImages, watchFiles)
exports.build = series(buildClean, buildResources, buildHtmlMinify, buildStyles, buildCssFiles, buildScripts, buildImages)
exports.default = series(clean, devResources, buildResources, devHtmlMinify, buildHtmlMinify, devStyles, buildStyles, devCssFiles, buildCssFiles, devScripts, buildScripts,  devImages, buildImages, watchFiles)
