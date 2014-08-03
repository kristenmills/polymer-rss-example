var gulp = require('gulp');

var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var jade = require('gulp-jade');
var del = require('del');
var deploy = require('gulp-gh-pages');
var webserver= require('gulp-webserver');

var paths = {
  scripts: 'src/**/*.js',
  jade: 'src/**/*.jade',
  components: 'bower_components/**/*',
  css: 'src/**/*.css',
  build: 'build/**/*'
};

gulp.task('clean', function(cb) {
  del(['build'], cb);
});

gulp.task('scripts', function() {
  gulp.src(paths.scripts)
    .pipe(uglify())
    .pipe(gulp.dest('build/js'));
});

gulp.task('templates', function() {
  gulp.src(paths.jade)
    .pipe(jade())
    .pipe(gulp.dest('build'));
});

gulp.task('components', function(){
  gulp.src(paths.components)
    .pipe(gulp.dest('build/bower_components'));
});

gulp.task('css', function(){
  gulp.src(paths.css)
    .pipe(gulp.dest('build/css'));
});

// Rerun the task when a file changes
gulp.task('watch', function() {
  gulp.watch(paths.scripts, ['scripts']);
  gulp.watch(paths.jade, ['templates']);
  gulp.watch(paths.css, ['css']);
});

gulp.task('webserver', function() {
  gulp.src('build')
    .pipe(webserver({
      livereload: true
    }));
});

gulp.task('ghPages', function(){
  gulp.src(paths.build)
    .pipe(deploy({}));
});

gulp.task('build', ['scripts', 'templates', 'components', 'css']);
gulp.task('default', ['build', 'webserver', 'watch']);
gulp.task('deploy', ['build', 'ghPages']);
