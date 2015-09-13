var fs = require('fs');
var gulp = require('gulp');
var del = require('del');
var changed = require('gulp-changed');
var rename = require('gulp-rename');
var browserify = require('gulp-browserify');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var stylus = require('gulp-stylus');
var minifyCSS = require('gulp-minify-css');
var path = require('path');
var runSequence = require('run-sequence');
var server = require('gulp-webserver');
var awspublish = require('gulp-awspublish');

var publisher;
var headers = {'Cache-Control': 'private'};


function swallowError (error) {

    //If you want details of the error in the console
    console.log(error.toString());

    this.emit('end');
}

gulp.task('cleanBuild', function(cb) {
  del(['./build/'], cb);
});

gulp.task('cleanWww', function(cb) {
  del(['./build/www/'], cb);
});


gulp.task('createWww', function () {
  return gulp.src('dist/**/*')
    .pipe(gulp.dest('./build/www'));
});

gulp.task('cleanDist', function(cb) {
  del(['dist/'], cb);
});

gulp.task('compileJsDev', function () {
  return gulp.src('app/index.js')
    .pipe(browserify())
    .on('error', swallowError)
    .pipe(rename('bundle.js'))
    .pipe(gulp.dest('dist/js'));
});

gulp.task('compileJs', function () {
  return gulp.src('app/index.js')
    .pipe(browserify())
    .on('error', swallowError)
    .pipe(uglify())
    .pipe(rename('bundle.js'))
    .pipe(gulp.dest('dist/js'));
});

gulp.task('compileCss', function () {
   return gulp.src('./static/stylus/main.styl')
    .pipe(stylus({
      compress: true
    }))
    .on('error', swallowError)
    .pipe(gulp.dest('./dist/css'));
});

gulp.task('copyHtml', function () {
  return gulp.src(['static/index.html'])
    .pipe(gulp.dest('dist'));
});

gulp.task('copyImages', function () {
  return gulp.src('static/img/**')
    .pipe(gulp.dest('dist/img'));
});

gulp.task('copyFonts', function () {
  return gulp.src('static/font/**')
    .pipe(gulp.dest('dist/font'));
});

gulp.task('copyJsons', function () {
  return gulp.src('static/json/**')
    .pipe(gulp.dest('dist/json'));
});

gulp.task('copyVendorCssLibraries', function () {
  return gulp.src([
      'bower_components/normalize-css/normalize.css',
      'bower_components/mapbox.js/mapbox.css',
    ])
    .pipe(concat('vendor.css'))
    //.pipe(minifyCSS())
    .pipe(gulp.dest('dist/css'));
});

gulp.task('publishTxt', function () {
  return gulp.src('dist/**/*.+(html|css|js|json|svg|json)')
    .pipe(awspublish.gzip())
    .pipe(publisher.publish(headers))
    .pipe(awspublish.reporter());
});

gulp.task('publishBlob', function () {
  return gulp.src('dist/**/*.+(jpg|png|gif|woff)')
    .pipe(publisher.publish(headers))
    .pipe(awspublish.reporter());
});

gulp.task('watch', function() {
  gulp.watch('app/**', ['compileJsDev']);
  gulp.watch('static/stylus/**', ['compileCss']);
  gulp.watch('static/index.html', ['copyHtml']);
  gulp.watch('static/img/**', ['copyImages']);
  gulp.watch('static/font/**', ['copyImages']);
  gulp.watch('static/json/**', ['copyJsons']);
});

gulp.task('server', function () {
  gulp.src('dist')
    .pipe(server({
      fallback: 'index.html',
      host: '0.0.0.0',
      livereload: true
    }));
});

gulp.task('createSite', [
  'compileJs',
  'compileCss',
  'copyHtml',
  'copyImages',
  'copyFonts',
  'copyJsons',
  'copyVendorCssLibraries'
]);

gulp.task('deploy', function () {
  if (process.env.AWS_ACCESS_KEY_ID && process.env.AWS_SECRET_ACCESS_KEY) {
    var bucket = process.env.NODE_ENV == 'production' ? 'plataformabrasil.org.br' : 'testes.plataformabrasil.org.br';
    publisher = awspublish.create({
      key: process.env.AWS_ACCESS_KEY_ID,
      secret: process.env.AWS_SECRET_ACCESS_KEY,
      bucket: bucket,
      region: 'sa-east-1'
    });
    return runSequence('cleanDist', 'createSite', ['publishTxt', 'publishBlob']);
  } else if (!process.env.AWS_ACCESS_KEY_ID && !process.env.AWS_SECRET_ACCESS_KEY) {
    throw('Chaves AWS não definidas');
  }
});

gulp.task('default', function () {
  return runSequence('cleanDist', 'createSite', ['watch', 'server']);
});

