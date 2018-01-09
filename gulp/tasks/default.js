var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync');
var wait = require('gulp-wait');
var runSequence = require('run-sequence');
var notify = require('gulp-notify');
var webpack= require('webpack');

// Development Tasks 

// Start browserSync server
gulp.task('browserSync', function() {
  browserSync.init({
    proxy   : "http://localhost:8080/marvel"
  })
})
//Sass, autoprefixer, browsersync
gulp.task('sass', function() {
  return gulp.src('app/scss/*.scss') // Gets all files ending with .scss in app/scss and children dirs
    .pipe(wait(500))
    .pipe(sass().on('error', function(err) {
        notify().write(err);
        this.emit('end');
    })) // Passes it through a gulp-sass, log errors to console sass.logError*/
    .pipe(autoprefixer())  //{ browsers: ['last 3 versions'] }
    .pipe(gulp.dest('app/css')) // Outputs it in the css folder
    .pipe(browserSync.reload({ // Reloading with Browser Sync
      stream: true
    }));
})
//Webpack
gulp.task('scripts',function(callback){
    webpack(require('../../webpack.config.js'),function(err,stats){
        if(err){
            notify().write(err.toString());
            console.log(err.toString());
        }
        console.log(stats.toString());
        callback();
    });
});
gulp.task('scriptsRefresh', function(){
    browserSync.reload();
});

// Watchers
gulp.task('watch', function() {
  gulp.watch('app/scss/**/*.scss', ['sass']);
  gulp.watch('app/*.html', browserSync.reload);
  gulp.watch('app/js/app.bundled.js', ['scriptsRefresh']);
  gulp.watch('app/js/modules/*.js',['scripts']);
  gulp.watch('app/js/app.js',['scripts']);
})
//Default task
gulp.task('default', function(callback) {
  runSequence(['sass', 'scriptsRefresh', 'browserSync'], 'watch',
    callback
  )
})


