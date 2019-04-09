const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();
const jsMinify = require('gulp-js-minify');
const uglify = require('gulp-uglify-es').default;
const cleanCss = require('gulp-clean-css');
const clean = require('gulp-clean');
const concat = require('gulp-concat');
const img = require('gulp-imagemin');
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require("gulp-sourcemaps");
const gulpSequence = require('gulp-sequence');
const rename = require('gulp-rename');
// const pngquant = require('imagemin-pngquant');



gulp.task('scss', function () {
  return gulp
    .src("./src/scss/**/*.scss")
    .pipe(sourcemaps.init())
    .pipe(sass().on("error", sass.logError))
    .pipe(autoprefixer())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest("./src"));
});

gulp.task('clean', ['tempCss', 'tempJs'], function () {
  return gulp.src('./build/', {
      read: false
    })
    .pipe(clean());
});

gulp.task('tempCss', function () {
  return gulp.src('./src/*.css', {
      read: false
    })
    .pipe(clean());
});

gulp.task('tempJs', function () {
  return gulp.src('./src/*.js', {
      read: false
    })
    .pipe(clean());
})


gulp.task('cleanCss', ['scss'], function () {
  return gulp.src('./src/*.css')
    .pipe(cleanCss())
    .pipe(rename('styles.min.css'))
    .pipe(gulp.dest('./build/css'));
});

gulp.task('img', function () {
  return gulp.src('./src/img/**/*')
    .pipe(img({
      interlaced: true,
      progressive: true,
      svgoPlugins: [{
        removeViewBox: false
      }]
      // use: [pngquant()]
    }))
    .pipe(gulp.dest('./build/img'));
});

/*
gulp.task('img', function () {
  return gulp.src('./src/img/** /*')
    .pipe(img([
      img.gifsicle({
        interlaced: true
      }),
      img.jpegtran({
        progressive: true
      }),
      img.optipng({
        optimizationLevel: 5
      }),
      img.svgo({
        plugins: [{
            removeViewBox: true
          },
          {
            cleanupIDs: false
          }
        ]
      })
    ]))
    .pipe(gulp.dest('./build/img'));
});
*/

gulp.task("concat", function () {
  return gulp.src('./src/js/*.js')
    .pipe(concat('build.js'))
    .pipe(gulp.dest('./src'));
});

gulp.task("uglify", ['concat'], function () {
  return gulp.src("./src/*.js")
    .pipe(uglify())
    .pipe(rename('script.min.js'))
    .pipe(gulp.dest("./build/js"));
});


gulp.task('watch', function () {
  browserSync.init({
    server: "./"
  });
  gulp.watch('./src/scss/**/*.scss', ['scss']).on("change", browserSync.reload);
  gulp.watch('./src/scss/**/*.scss', ['cleanCss']).on("change", browserSync.reload);
  gulp.watch("./src/js/*.*", ["uglify"]).on("change", browserSync.reload);
  gulp.watch("./index.html").on("change", browserSync.reload);
});


gulp.task('dev', gulpSequence('watch'));

gulp.task('build', gulpSequence('clean', 'cleanCss', ["uglify", 'img']));

gulp.task("default", ["dev"]);