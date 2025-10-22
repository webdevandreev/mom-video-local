const gulp = require("gulp");
const { rm } = require("fs/promises");

gulp.task("clean", async function () {
  try {
    await rm("dist", { recursive: true, force: true });
  } catch (error) {}
});

gulp.task("build", function () {
  return gulp
    .src(["css/*.css", "js/*.js", "index.html"], { base: "." })
    .pipe(gulp.dest("dist/"));
});

gulp.task("default", gulp.series("clean", "build"));
