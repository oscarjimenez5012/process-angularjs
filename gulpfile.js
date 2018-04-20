'use strict';

var gulp = require('gulp');
var rename = require('gulp-rename');
var clean = require('gulp-clean');
var htmlreplace = require('gulp-html-replace');
var htmlmin = require('gulp-htmlmin');
var concat = require('gulp-concat');
var minify = require('gulp-minify');
var uglify = require('gulp-uglify');


gulp.task('default', ['css', 'app'], function(){
    return gulp.src('src/index.html')
        .pipe(htmlreplace({
            'css': 'assets/css/main.min.css',
            'js': 'assets/js/bundle.min.js',
            'app': 'assets/js/app.min.js'
        }))
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest('dist/'));
});


gulp.task('clean', function () {
    gulp.src('./dist', {read: false})
        .pipe(clean());
});


gulp.task('scripts', function() {
    return gulp.src(['./bower_components/jquery/dist/jquery.min.js',
        './bower_components/jquery-ui/jquery-ui.min.js',
        './bower_components/bootstrap/dist/js/bootstrap.min.js',
        './bower_components/blueimp-file-upload/js/jquery.fileupload.js',
        './bower_components/blueimp-file-upload/js/jquery.fileupload-ui.js',
        './node_modules/angular/angular.js'])
        .pipe(concat('bundle.js'))
        .pipe(gulp.dest('./dist/assets/js/'))
        .pipe(rename({suffix: '.min'}))
        .pipe(minify())
        .pipe(gulp.dest('./dist/assets/js/'));
});

gulp.task('app', ['scripts'], function() {
    return gulp.src(['./src/app/app.js','./src/app/app.constants.js'])
        .pipe(concat('app.js'))
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest('./dist/assets/js/'));
});

gulp.task('html', function () {
    return gulp.src('src/index.html')
        .pipe(htmlreplace({
            'css': 'assets/css/main.min.css',
            'js': 'assets/js/bundle.min.js',
            'app': 'assets/js/app.min.js'
        }))
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest('dist/'));
});


gulp.task('css', function () {
    gulp.src(['./bower_components/bootstrap/dist/css/bootstrap.css', './bower_components/blueimp-file-upload/css/jquery.fileupload-ui.css', './src/assets/css/styles.css'])
        .pipe(concat('main.css'))
        .pipe(rename({suffix: '.min'}))
        .pipe(minify())
        .pipe(gulp.dest('./dist/assets/css'));
});


