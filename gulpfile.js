//note for themeboxr dev: each time you change this file copy the new file in project folder

/*
 to start with gulp
 $ npm install --global gulp
 npm install gulp --save-dev
 npm install gulp-less
 npm install gulp-rename
 npm install gulp-minify-css
 npm install gulp-watch
 npm install browser-sync
 * */


//set dir path as you need
var templatedir = "./public/";
//var templatedir = "D:/xampp/htdocs/htmlthemes/musicz/";
//var node_mod_dir = 'F:/xampp/htdocs/node_modules/'; //for internal development, or set path as you need
//var node_mod_dir = 'F:/xampp/htdocs/node_modules/'; //for internal development, or set path as you need

//var node_mod_dir = 'D:/gulp/node_modules/'; //for internal development, or set path as you need





var gulp = require('gulp'),// we just install gulp in project dir and try to use other modules from a centralized node modules dir, but if you need you can install in root of your project
    less = require('gulp-less'),
    rename = require('gulp-rename'),
    minifyCss = require('gulp-minify-css'),
    browserSync = require('browser-sync').create(),
    watch = require('gulp-watch');

//define your project path , use linux style forward slash as dir seperator

var appConfig = {
    "proxy": 'http://localhost/htmlthemes/music'
    //"proxy": 'http://192.168.2.6/wpthemes/wpshopz'
};

/*
 var gulp = require('gulp'),
 less = require('gulp-less'),
 rename = require('gulp-rename'),
 minifyCss = require('gulp-minify-css'),
 browserSync = require('browser-sync').create(),
 watch = require('gulp-watch');
 */

//define your project path , use linux style forward slash as dir seperator



//var templatedir = "./"; //if the gulp file is in same dir of the theme project


/* Task to compile less */
gulp.task('compile-less', function() {

    //color variation
    var variation = ["blue", "navy", "olive", "orange", "pink", "red", "violet"];
    var less_tasks = [];


   // var default_less2 = '';
    var default_less = gulp.src(templatedir+'assets/less/style-default.less')
        .pipe(less())
        //.pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(templatedir+'assets/css/')).on('end', function() {

            var default_less2 = gulp.src(templatedir+'assets/css/style-default.css')
                .pipe(minifyCss().on('error', function(err) {
                    console.log(err);
                }))
                .pipe(rename({suffix: '.min'}))
                .pipe(gulp.dest(templatedir+'assets/css/'));
            less_tasks.push(default_less2);
        });

    //now compile the rest variation

    variation.forEach(function(entry) {
        var temp = gulp.src(templatedir+'assets/less/variation/style-'+entry+'.less')
            .pipe(less())
            .pipe(gulp.dest(templatedir+'assets/css/'))
            .pipe(gulp.dest(templatedir+'assets/css/')).on('end', function() {
                var temp2 = gulp.src(templatedir+'assets/css/style-'+entry+'.css')
                    .pipe(minifyCss().on('error', function(err) {
                        console.log(err);
                    }))
                    .pipe(rename({suffix: '.min'}))
                    .pipe(gulp.dest(templatedir+'assets/css/'));
                less_tasks.push(temp2);
            });
    });

    //browserSync.reload

    return less_tasks;
});

/* Task to watch less changes */
gulp.task('watch-less',['compile-less'], function() {

    /*browserSync.init({
        //server: templatedir,
        proxy: appConfig['proxy']
    });*/

    gulp.watch(templatedir+'assets/less/*.less' , ['compile-less']);
    //gulp.watch(templatedir+'less/mixins/*.less' , ['compile-less']);
    //gulp.watch(templatedir+'less/variation/*.less' , ['compile-less']);
    //gulp.watch(templatedir+'assets/css/*.css').on('change', browserSync.reload);
});

/* Task when running `gulp` from terminal */
gulp.task('default', ['watch-less']);
