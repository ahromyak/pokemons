/**
 * Created by deepwest83 on 9/3/2016.
 */
var gulp = require('gulp'),
    watch = require('gulp-watch'),
    prefixer = require('gulp-autoprefixer'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    sass = require('gulp-sass'),
    cssmin = require('gulp-minify-css'),
    imagemin = require('gulp-imagemin'),
    annotate = require('gulp-ng-annotate'),
    newer = require('gulp-newer'),
    jsmin = require('gulp-jsmin'),
    rename = require('gulp-rename'),
    templateCache = require('gulp-angular-templatecache');

var source = {
    css:[
        'app/**/scss/*.scss'
    ],
    js:[
        'main.js',
        'app/components/routes.app.js',
        'app/components/typeFilter.js',
        'app/**/js/*.js',
        'app/**/directives/*.js'
    ],
    sourceCss:[
            'node_modules/bootstrap/dist/css/bootstrap.min.css',
            'node_modules/bootstrap/dist/css/bootstrap-theme.css',
            'node_modules/angular-ui-bootstrap/dist/ui-bootstrap-csp.css'
    ],
    sourceJs:[
        'node_modules/jquery/dist/jquery.min.js',
        'node_modules/angular/angular.min.js',
        'node_modules/bootstrap/dist/js/bootstrap.min.js',
        'node_modules/angular-ui-bootstrap/dist/ui-bootstrap.js',
        'node_modules/angular-ui-bootstrap/dist/ui-bootstrap-tpls.js',
        'node_modules/angular-animate/angular-animate.min.js',
        'node_modules/angular-aria/angular-aria.min.js',
        'node_modules/angular-ui-router/release/angular-ui-router.min.js',
    ]
};

var cssDest = 'assets/css/app.css';
var sourceCssDest = 'assets/css/source.css';
var jsDest = 'assets/js/app.js';
var sourceJsDest = 'assets/js/lib.js';

gulp.task('source-concat', function () {
    return gulp.src(source.sourceJs)
        .pipe(newer(sourceJsDest))
        .pipe(concat('lib.js'))
        .pipe(jsmin())
        .pipe(gulp.dest('assets/js/'));
});

gulp.task('make-js', function () {
    gulp.src(source.js)
        .pipe(newer(jsDest))
        .pipe(concat('app.js'))
        .pipe(annotate())
        .pipe(jsmin())
        .pipe(gulp.dest('assets/js/'));
});

gulp.task('make-sourcecss', function () {
    gulp.src(source.sourceCss)
        .pipe(newer(sourceCssDest))
        .pipe(sass().on('error', sass.logError))
        .pipe(cssmin())
        .pipe(concat('source.css'))
        .pipe(gulp.dest('assets/css'));
});

gulp.task('make-css', function () {
    gulp.src(source.css)
        .pipe(newer(cssDest))
        .pipe(sass().on('error', sass.logError))
        .pipe(cssmin())
        .pipe(concat('app.css'))
        .pipe(gulp.dest('assets/css'));
});

// Rerun the task when a file changes
gulp.task('watch', function() {
    gulp.watch(source.css, ['make-css']);
    gulp.watch(source.js, ['make-js']);
    gulp.watch('app/**/*.html', ['concatTemplate']);
});

gulp.task('concatTemplate', function () {
    return gulp.src('app/**/*.html')
        .pipe(templateCache({root: "app",module: 'myApp', standalone: false}))
        .pipe(concat('template.min.js'))
        .pipe(annotate())
        .pipe(gulp.dest('assets/js'));
});

gulp.task('default', function() {
    gulp.run('make-css', 'make-sourcecss', 'make-js', 'source-concat', 'concatTemplate');
});


