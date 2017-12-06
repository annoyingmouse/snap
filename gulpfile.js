const gulp = require("gulp");
const sass = require("gulp-sass");
const babel = require("gulp-babel");

// style paths
const
    sassFiles = "assets/styles/sass/**/*.scss",
    cssDest = "assets/styles/css",
    es6Files = "assets/scripts/es6/**/*.*",
    jsDest = "assets/scripts/js";

gulp.task("styles", () => gulp.src(sassFiles)
    .pipe(sass().on("error", sass.logError))
    .pipe(gulp.dest(cssDest))
);

gulp.task("es6", () => gulp.src(es6Files)
    .pipe(babel())
    .pipe(gulp.dest(jsDest)));


gulp.task("watch", () => {
    gulp.watch(sassFiles, ["styles"]);
    gulp.watch(es6Files, ["es6"]);
});