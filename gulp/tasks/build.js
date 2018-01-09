var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var useref = require('gulp-useref');
var uglify = require('gulp-uglify');
var gulpIf = require('gulp-if');
var cssnano = require('gulp-cssnano');
var imagemin = require('gulp-imagemin');
var cache = require('gulp-cache');
var del = require('del');
var runSequence = require('run-sequence');

// Optimization Tasks 
// ------------------

// Optimizing CSS and JavaScript 
gulp.task('useref', function() {

  return gulp.src('app/*.html')
    .pipe(useref())
    .pipe(gulpIf('*.js', uglify()))
    .pipe(gulpIf('*.css', cssnano()))
    .pipe(gulp.dest('docs'));
});

// Optimizing Images 
gulp.task('images', function() {
  return gulp.src('app/img/**/*.+(png|jpg|jpeg|gif|svg)')
    // Caching images that ran through imagemin
    .pipe(cache(imagemin({
      interlaced: true
    })))
    .pipe(gulp.dest('docs/img'))
});

// Copying fonts 
gulp.task('fonts', function() {
  return gulp.src('app/fonts/**/*')
    .pipe(gulp.dest('docs/fonts'))
})

// Cleaning 
gulp.task('clean', function() {
  return del.sync('docs').then(function(cb) {
    return cache.clearAll(cb);
  });
})
gulp.task('clean:docs', function() {
  return del.sync(['docs/**/*', '!docs/img', '!docs/img/**/*']);
});

// Build Sequences
gulp.task('build', function(callback) {
  runSequence(
    'clean:docs',
    'sass',
    ['useref', 'images', 'fonts'],
    callback
  )
})

