var gulp=require('gulp');
var uglify=require('gulp-uglify');
var concat=require('gulp-concat');
var cssnano=require('gulp-cssnano');
var gulpsass = require('gulp-sass');


gulp.task('scsscompile', function() {
        return gulp.src('scss/*.scss') // all scss files
        .pipe(concat('main.css')) // combines multiple scss files
        .pipe(gulpsass()) // compile task running now
        .pipe(gulp.dest('dev/css/')); // stores compiled css file in Folder
});

gulp.task('minifycss', function() {
    return gulp.src('dev/css/*.css')
        .pipe(concat('mainstyle.min.css'))
        .pipe(cssnano())
        .pipe(gulp.dest('prod'));
});

gulp.task('uglify', function() {
        return gulp.src('js/*.js')
        .pipe(concat('mainjs.min.js'))
        .pipe(uglify({mangle:false}))
        .pipe(gulp.dest('prod'));
});

gulp.task('monitor', function() {
  gulp.watch('scss/*.scss', ['scsscompile']); // running scss compiler on changes to scss 
  gulp.watch('dev/css/*.css', ['minifycss']); // changes to css will then minify into this file
  gulp.watch('js/*.js', ['uglify']); // changes to JS files will also get compressed 

 
});

gulp.task('default', ['monitor']);
