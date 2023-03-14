const gulp = require('gulp')
const babel = require('gulp-babel')
const { watch } = require('gulp')
const sass = require('gulp-sass')(require('sass'))

// style paths
const sassFiles = "assets/styles/sass/**/*.scss",
      cssDest = "assets/styles/css",
      es6Files = "assets/scripts/es6/**/*.*",
      jsDest = "assets/scripts/js";
const buildStyles = cb => {
  gulp.src(sassFiles)
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(gulp.dest(cssDest))
  cb()
}
const es6 = cb => {
  gulp.src(es6Files)
      .pipe(babel({presets: ['@babel/preset-env']}))
      .pipe(gulp.dest(jsDest))
  cb()
}
gulp.task('buildStyles', async () => buildStyles)

gulp.task('es6', async () => es6)

exports.default = function() {
  watch(sassFiles, buildStyles)
  watch(es6Files, es6)
}

