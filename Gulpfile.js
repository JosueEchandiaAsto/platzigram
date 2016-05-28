var gulp = require('gulp'),
    sass = require('gulp-sass'),
    rename = require('gulp-rename'),
    babel = require('babelify'),
    browserify = require('browserify'),
    source = require('vinyl-source-stream'),
    watchify= require('watchify');

gulp.task('styles', function() {
  gulp
      .src('index.scss')
      .pipe(sass())
      .pipe(rename('app.css'))
      .pipe(gulp.dest('public'));

})
gulp.task('assets', function() {
  gulp
      .src('assets/*')
      .pipe(gulp.dest('public'))
})
function compile(watch) {
  var bundle = browserify('./src/index.js', {debug: true})
  if (watch) {
    bundle = watchify(bundle)
    bundle.on('update', function() {
      rebundle();
      console.log("Watch")
    })
  }
  function rebundle() {
    bundle
      .transform(babel, {presets: ['es2015'], plugins: ['syntax-async-functions','transform-regenerator']})
      .bundle()
      .on('error',function(err) {
        console.log(err);
        this.emit('end')
      })
      .pipe(source('index.js'))
      .pipe(rename('app.js'))
      .pipe(gulp.dest('public'))
  }
  rebundle();
}
gulp.task('build',function() {
  return compile()
})
gulp.task('watch',function() {
  return compile(true)
})
gulp.task('default', ['styles', 'assets', 'build'])
