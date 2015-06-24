var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var browserify = require('gulp-browserify');
var browserSync = require('browser-sync');

gulp.task('browserSync', function() {
	browserSync({
		server: {
			baseDir: "app/"
		},
		options: {
			reloadDelay: 250
		},
		notify: true
	});
});

gulp.task('scripts', function() {
    gulp.src('app/js/app.js')
        .pipe(browserify({
            insertGlobals: true,
            debug: true
        }))
        .pipe(concat('bundle.js'))
        // .pipe(uglify()) // reduce filesize
        .pipe(gulp.dest('app/'))
        .pipe(browserSync.reload({stream: true}));
});

gulp.task('default', ['browserSync', 'scripts'], function() {
	gulp.watch('app/js/**', ['scripts']);
});
