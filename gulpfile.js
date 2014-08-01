var gulp = require('gulp');

var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var jade = require('gulp-jade');
var del = require('del');
var buildBranch = require('buildbranch');

var paths = {
  scripts: 'src/**/*.js',
  jade: 'src/**/*.jade',
  components: 'bower_components/**/*'
};

gulp.task('clean', function(cb) {
  del(['build'], cb);
});

gulp.task('scripts', ['clean'], function() {
  gulp.src(paths.scripts)
    .pipe(uglify())
    .pipe(concat('app.min.js'))
    .pipe(gulp.dest('build/js'));
});

gulp.task('templates', ['clean'], function() {
  gulp.src(paths.jade)
    .pipe(jade())
    .pipe(gulp.dest('build'));
});

gulp.task('components', ['clean'], function(){
  gulp.src(paths.components)
    .pipe(gulp.dest('build/bower_components'));
})

// Rerun the task when a file changes
gulp.task('watch', function() {
  gulp.watch(paths.scripts, ['scripts']);
  gulp.watch(paths.jade, ['templates']);
});

gulp.task('deploy', function(){
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

// The default task (called when you run `gulp` from cli)
gulp.task('default', ['watch', 'scripts', 'templates', 'components']);
