/*eslint-env node */

const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const uglify = require('gulp-uglify-es').default;
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const livereload = require('gulp-livereload');


/*
-- Top Level Gulp Functions --

gulp.task - Define Tasks
gulp.src - Points to Files to Use
gulp.dest - Points to Folder to Output
gulp.watch - Watch Files and Folders for Changes

*/




// Copy ALL HTML files
gulp.task('copyHTML', function() {
	gulp.src('src/*.html')
		.pipe(gulp.dest('dist'));
});

// Optimize Images
gulp.task('imageMin', function() {
	gulp.src('src/images/*')
		.pipe(imagemin())
		.pipe(gulp.dest('dist/images'));
});


gulp.task('minify', function(){
	gulp.src('src/js/*.js')
		.pipe(uglify().on('error', function(e){
			console.log(e);
		}))
		.pipe(gulp.dest('dist/js'));
});

// Compile sass
gulp.task('sass', function() {
	gulp.src('src/sass/*.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest('dist/css'));
});

// Scripts
gulp.task('scripts', function() {
	gulp.src('src/js/*.js')
		.pipe(concat('main.js'))
		.pipe(uglify())
		.pipe(gulp.dest('dist/js'));
});

gulp.task('watch', function() {
	livereload.listen();
	gulp.watch('src/*.html', ['copyHTML']);
	gulp.watch('src/images/*', ['imageMin']);
	gulp.watch('src/sass/*.scss', ['sass']);
	gulp.watch('src/js/*.js', ['scripts']);

});

gulp.task('default', ['copyHTML', 'imageMin', 'sass', 'scripts']);
