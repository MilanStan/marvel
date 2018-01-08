var gulp = require('gulp');
var responsive = require('gulp-responsive-images');

//Resize images for various screen
gulp.task("resize", function () {
  gulp.src("app/img/*")
    .pipe(responsive({
      "*.jpg": [{
        width: 1200,   
        suffix: "-lg",
        quality: 80
      }, {
        width: 800,
        height: 800,
        crop: true,
        gravity: "SouthEast",
        suffix: '-md',
        quality:80
      },{
        width: 800,
        height: 800,
        crop: true,
        gravity: "SouthEast",
        suffix: '-sm',
        quality: 70
      }]
    }))
    .pipe(gulp.dest("app/img"));
});


//  npm install gulp-responsive-images --save-dev