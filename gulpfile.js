// Sass configuration
var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('sass', function() { // create new task called 'sass'
    gulp.src('./src/App.scss') //
        .pipe(sass())
        .on('error', (e) => { console.log(e); this.emit('end')})
        .pipe(gulp.dest(function(f) {
            return f.base;
        }))
});

gulp.task('main', function() {
    gulp.watch(['./src/App.scss'], ['sass']) // watch all scss files in all directories, run 'sass' task on change
})
