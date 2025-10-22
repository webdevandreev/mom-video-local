const gulp = require("gulp");
const rev = require("gulp-rev");
const revRewrite = require("gulp-rev-rewrite");
const { rm } = require("fs/promises");
const fs = require("fs");

gulp.task("clean", async function () {
  try {
    await rm("dist", { recursive: true, force: true });
  } catch (error) {}
});

// Создаем пустой manifest если его нет
gulp.task("init-manifest", function (done) {
  if (!fs.existsSync("dist")) fs.mkdirSync("dist");
  if (!fs.existsSync("dist/rev-manifest.json")) {
    fs.writeFileSync("dist/rev-manifest.json", "{}");
  }
  done();
});

gulp.task("styles", function () {
  return gulp
    .src("css/*.css")
    .pipe(rev())
    .pipe(gulp.dest("dist/"))
    .pipe(
      rev.manifest("dist/rev-manifest.json", {
        base: "dist",
        merge: true,
      })
    )
    .pipe(gulp.dest("dist/"));
});

gulp.task("scripts", function () {
  return gulp
    .src("js/*.js")
    .pipe(rev())
    .pipe(gulp.dest("dist/"))
    .pipe(
      rev.manifest("dist/rev-manifest.json", {
        base: "dist",
        merge: true,
      })
    )
    .pipe(gulp.dest("dist/"));
});

gulp.task("html", function () {
  // Проверяем существует ли manifest
  if (!fs.existsSync("dist/rev-manifest.json")) {
    console.log("Manifest not found, creating empty");
    fs.writeFileSync("dist/rev-manifest.json", "{}");
  }

  const manifest = gulp.src("dist/rev-manifest.json");

  return gulp
    .src("index.html")
    .pipe(revRewrite({ manifest }))
    .pipe(gulp.dest("dist/"));
});

gulp.task(
  "build",
  gulp.series(
    "clean",
    "init-manifest",
    gulp.parallel("styles", "scripts"),
    "html"
  )
);

gulp.task("default", gulp.series("build"));
