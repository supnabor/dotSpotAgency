const gulp = require('gulp');
const sass = require('gulp-sass');
const babel = require('gulp-babel');
const sourcemaps = require('gulp-sourcemaps');
const concat = require('gulp-concat');
const terser = require('gulp-terser');
const rename = require('gulp-rename');
const del = require('del');
const browserSync = require('browser-sync').create();
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const replace = require('gulp-replace');
const imagemin = require('gulp-imagemin');
const plumber = require('gulp-plumber');

const paths = {
  html: {
    src: './index.html',
    dest: './dist'
  },
  styles: {
    src: './scss/**/*.scss',
    dest: './dist/css'
  },
  scripts: {
    src: './js/**/*.js',
    dest: './dist/js'
  },
  vendors: {
    src: './js/vendors/**/*.js',
    dest: './dist/js'
  },
  images: {
    src: './images/**/*',
    dest: './dist/images'
  },
  favicon: {
    src: './favicon.ico',
    dest: './dist'
  },
  fonts: {
    src: './fonts/**/*.{ttf,woff,eot,svg}',
    dest: './dist/fonts'
  }
};

const clean = () => del(['./dist']);

// Cache busting to prevent browser caching issues
const curTime = new Date().getTime();
const cacheBust = () =>
  gulp
    .src(paths.html.src)
    .pipe(plumber())
    .pipe(replace(/cb=\d+/g, 'cb=' + curTime))
    .pipe(gulp.dest(paths.html.dest));


// Copies all html files
const html =() =>
  gulp
    .src(paths.html.src)
    .pipe(plumber())
    .pipe(gulp.dest(paths.html.dest));

// Convert scss to css, auto-prefix and rename into styles.min.css
const styles = () =>
  gulp
    .src(paths.styles.src)
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(
      rename({
        basename: 'styles',
        suffix: '.min'
      })
    )
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(paths.styles.dest))
    .pipe(browserSync.stream());

// Minify all javascript files and concat them into a single app.min.js
const scripts = () =>
  gulp
    .src(paths.scripts.src)
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(
      babel({
        presets: ['@babel/preset-env']
      })
    )
    .pipe(terser())
    .pipe(concat('app.min.js'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(paths.scripts.dest));

// Minify all javascript vendors/libs and concat them into a single vendors.min.js
const vendors = () =>
  gulp
    .src(paths.vendors.src)
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(
      babel({
        presets: ['@babel/preset-env']
      })
    )
    .pipe(terser())
    .pipe(concat('vendors.min.js'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(paths.vendors.dest));

// Copy and minify images
const images = () =>
  gulp
    .src(paths.images.src)
    .pipe(plumber())
    .pipe(imagemin())
    .pipe(gulp.dest(paths.images.dest));

// Copy the favicon
const favicon = () =>
  gulp
    .src(paths.favicon.src, { allowEmpty: true })
    .pipe(plumber())
    .pipe(gulp.dest(paths.favicon.dest));

// Copies all fonts
const fonts = () =>
  gulp
    .src(paths.fonts.src)
    .pipe(gulp.dest(paths.fonts.dest));

// Watches all .scss, .js and .html changes and executes the corresponding task
function watchFiles() {
  browserSync.init({
    server: {
      baseDir: './dist/'
    },
    notify: false
  });

  gulp.watch(paths.html.src, html).on('change', browserSync.reload);
  gulp.watch(paths.styles.src, styles).on('change', browserSync.reload);
  gulp.watch(paths.scripts.src, scripts).on('change', browserSync.reload);
  gulp.watch(paths.images.src, images).on('change', browserSync.reload);

}

const build = gulp.series(
  clean,
  gulp.parallel(
    styles,
    vendors,
    scripts,
    images,
    fonts,
    favicon
  ),
  cacheBust
);

const watch = gulp.series(build, watchFiles);

exports.clean = clean;
exports.styles = styles;
exports.scripts = scripts;
exports.vendors = vendors;
exports.images = images;
exports.fonts = fonts;
exports.favicon = favicon;
exports.watch = watch;
exports.build = build;
exports.default = build;