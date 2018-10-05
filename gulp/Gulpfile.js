var gulp = require('gulp');
var ts = require('gulp-typescript');
var tsProject = ts.createProject('../tsconfig.json');

gulp.task('compile:core', function() {
  var tsResult = gulp.src("../index.ts")
    .pipe(tsProject());
  return tsResult.js.pipe(gulp.dest('../dist'));
});

gulp.task('copy:cli', function () {
  return gulp.src('../cli/.setup-folder/**/*')
    .pipe(gulp.dest('../bin'));
})

gulp.task('compile:cli', function() {
  var tsResult = gulp.src('../cli/index.ts')
    .pipe(tsProject());
  return tsResult.js
    .pipe(gulp.dest('../bin'));
});

function watchDetails(watcher)  {
  watcher.on('change', function(path) {
    console.log('File ' + path + ' was changed');
  });
  watcher.on('unlink', function(path) {
    console.log('File ' + path + ' was removed');
  });
  watcher.on('add', function(path) {
    console.log('File ' + path + ' was added');
  });
}

gulp.task('watch:cli', function () {
  watchDetails(gulp.watch('../cli/**/*', gulp.series('compile:cli', 'copy:cli')));
});

gulp.task('watch:core', function () {
  watchDetails(gulp.watch('../core/**/*.ts', gulp.series('compile:core')));
})

gulp.task('watch:all', gulp.series('compile:cli', 'copy:cli', 'compile:core', gulp.parallel('watch:cli', 'watch:core')))

gulp.task('default', gulp.series('watch:all'));
