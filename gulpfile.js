var gulp = require('gulp');

var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var jade = require('gulp-jade');
var del = require('del');
var buildBranch = require('buildbranch');

var paths = {
  scripts: 'src/**/*.js',
  jade: 'src/**/*.jade',
  components: 'bower_components/**/*',
  material: 'material/**/*'
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

gulp.task('material', function(){
  gulp.src(paths.material)
    .pipe(gulp.dest('build/material'));
});

// Rerun the task when a file changes
gulp.task('watch', function() {
  gulp.watch(paths.scripts, ['scripts']);
  gulp.watch(paths.jade, ['templates']);
});

gulp.task('ghPages', function(){
  buildBranch({
    branch: 'gh-pages',
    folder: 'build',
  }, function(err) {
    if(err) {
      throw err;
    }
    console.log('Published!');
  });
});

gulp.task('build', ['scripts', 'templates', 'components', 'material']);
gulp.task('default', ['build', 'watch']);
gulp.task('deploy', ['build', 'ghPages']);
