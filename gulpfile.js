var gulp = require('gulp');
var plumber = require('gulp-plumber');
// @TODO switch to gulp-sass when libsass is fixed
var sass = require('gulp-ruby-sass');
var browserSync = require('browser-sync');
var reload = browserSync.reload;

// Configurations for plugins
var config = {
  sass: {
    loadPath: [
      './bower_components/bourbon/app/assets/stylesheets' // Bourbon
    ]
  }
};

// Paths for source and destinations
var paths = {
  src: {
    sass: './scss/**/*.scss',
    views: './*.html'
  },

  dest: {
    css: './css/'
  }
};

/**
 * Compile Sass files (*.scss) to CSS, output to css folder and
 * reload the browser.
 * @task sass
 */
gulp.task('sass', function () {
  return gulp.src(paths.src.sass)
    .pipe(plumber())
    .pipe(sass(config.sass))
    .pipe(plumber.stop())
    .pipe(gulp.dest(paths.dest.css))
    .pipe(reload({ stream: true }));
});

/**
 * Reload the browser for views (*.html)
 * @task views
 */
gulp.task('views', function () {
  return gulp.src(paths.src.views)
    .pipe(reload({ stream: true }));
});

/**
 * Initialize BrowserSync
 * @task browser-sync
 */
gulp.task('browser-sync', function () {
  browserSync({
    server: {
      baseDir: './'
    }
  });
});

/**
 * Watch for changes and run tasks on change.
 * @task default
 */
gulp.task('default', ['views', 'sass', 'browser-sync'], function () {
  gulp.watch(paths.src.sass, ['sass']);
  gulp.watch(paths.src.views, ['views']);
});
