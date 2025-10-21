const gulp = require('gulp');
const rev = require('gulp-rev');
const revRewrite = require('gulp-rev-rewrite');
const revDelete = require('gulp-rev-delete-original');

// Основная задача сборки
gulp.task('build', function() {
    return gulp.src(['css/*.css', 'js/*.js'])
        .pipe(rev()) // Добавляем хеш к именам
        .pipe(revDelete()) // Удаляем оригинальные файлы
        .pipe(gulp.dest('dist/')) // Сохраняем в dist
        .pipe(rev.manifest()) // Создаем manifest.json
        .pipe(gulp.dest('dist/'));
});

// Задача для обновления HTML
gulp.task('html', function() {
    const manifest = gulp.src('dist/rev-manifest.json');
    
    return gulp.src('index.html')
        .pipe(revRewrite({ manifest })) // Обновляем ссылки в HTML
        .pipe(gulp.dest('dist/'));
});

// Задача по умолчанию
gulp.task('default', gulp.series('build', 'html'));