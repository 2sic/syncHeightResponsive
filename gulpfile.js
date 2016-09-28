var gulp = require('gulp');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');

gulp.task('default', function () {
  return gulp.src('./src/jquery.syncHeightResponsive.js')
    .pipe(uglify())
	.pipe(concat('jquery.syncHeightResponsive.min.js'))
    .pipe(gulp.dest('./dist'));
});