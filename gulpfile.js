const gulp = require('gulp');
const rev = require('gulp-rev');
const revRewrite = require('gulp-rev-rewrite');
const { rm } = require('fs/promises');

// Очистка папки dist
gulp.task('clean', async function() {
    try {
        await rm('dist', { recursive: true, force: true });
    } catch (error) {
        // Папки может не существовать - это ок
    }
});

// Основная задача сборки
gulp.task('build', function() {
    return gulp.src(['css/*.css', 'js/*.js'])
        .pipe(rev())
        .pipe(gulp.dest('dist/'))
        .pipe(rev.manifest())
        .pipe(gulp.dest('dist/'));
});

// Задача для обновления HTML
gulp.task('html', function() {
    const manifest = gulp.src('dist/rev-manifest.json');
    
    return gulp.src('index.html')
        .pipe(revRewrite({ manifest }))
        .pipe(gulp.dest('dist/'));
});

// Задача по умолчанию
gulp.task('default', gulp.series('clean', 'build', 'html'));