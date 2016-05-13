var gulp       = require('gulp'),
    browserify = require('gulp-browserify'),
    concat     = require('gulp-concat'),
    imagemin   = require('gulp-imagemin'),
    sass       = require('gulp-sass'),
    watch      = require('gulp-watch'),
    connect    = require('gulp-connect'),
    minify = require('gulp-minify'),
    server = require( 'gulp-develop-server' ),
    clean      = require('gulp-clean');

var ROOT = __dirname + '/build'

gulp.task('clean', function () {
 return gulp.src('build/', {read: false})
        .pipe(clean({force:true}));

});

gulp.task('styles', function () {
  gulp.src(['css/*.css'])
    .pipe(sass())
    .pipe(gulp.dest('build/css/'));
});
gulp.task('images', function () {
  gulp.src(['./img/*.jpg','./img/*.png', './img/*.jpg', './img/*.gif'])
      .pipe(gulp.dest('build/img/'));
});

gulp.task('compress', function () {
  gulp.src('js/*.js')
      .pipe(minify({ ext:{
            src:'.js',
            min:'.js'
        },
         ignoreFiles: ['-min.js'] }
        ))
      .pipe(gulp.dest('build/js/'));
});

/*gulp.task('copyJS', function(){
  gulp.src('js/*.js')
    .pipe(gulp.dest('build/js/'));
});*/


gulp.task('scripts', function () {
  gulp.src(['app/app.js'])
      .pipe(browserify({
          debug: true,
          transform: [ 'reactify' ]
      }))
      .pipe(gulp.dest('build/app/'));
});

gulp.task('copyHTML', function(){
  gulp.src('./*.html')
    .pipe(gulp.dest('build/'));
});
gulp.task('serverStart', function() {
    server.listen( { path: './server.js' } );
});


gulp.task('watch', function() {
  gulp.watch('./app/**/*.js', [ 'scripts' ]);
  gulp.watch('./js/**/*.js', [ 'compress' ]);
  gulp.watch('./css/**/*.css', [ 'styles' ]);
  gulp.watch('./img/**/*', [ 'images' ]);
  gulp.watch('./*.html', [ 'copyHTML' ]);
});

// gulp.task('livereload', function() {
//   gulp.src(['build/css/*.css', 'build/js/*.js', 'build/img/*', 'build/index.html'])
//     .pipe(watch())
//     .pipe(connect.reload());
// });

gulp.task('webserver', function() {
  connect.server({
    livereload: false,
    port: 3000,
    root: ['build']
  });


});

gulp.task('build', [  'styles', 'images','compress','scripts','copyHTML','serverStart' ]);
gulp.task('default', ['build', 'webserver', 'watch']);

// Live reload has an issue of loading react.js routes
// gulp.task('default', ['build', 'webserver', 'livereload', 'watch']);
