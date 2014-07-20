//包含gulp  npm install gulp gulp-sass gulp-jade gulp-coffee gulp-connect gulp-minify-css gulp-prettify --save-dev    
var gulp = require('gulp');  

//包含我们的插件   
var sass = require('gulp-sass');
var jade = require('gulp-jade');
var coffee = require('gulp-coffee');
var connect = require('gulp-connect');
var minifyCSS = require('gulp-minify-css');
var prettify = require('gulp-prettify');

//编译sass  
gulp.task('sass',function(){
    gulp.src('./sass/*.scss')
    .pipe(sass())
    .pipe(minifyCSS({keepBreaks:true}))
    .pipe(gulp.dest('./asset/css'))
}); 

//编译jade
gulp.task('jade', function() {
  var YOUR_LOCALS = {};
  gulp.src('./jade/*.jade')
    .pipe(jade({
      locals: YOUR_LOCALS
    }))
    .pipe(prettify({indentSize: 2}))
    .pipe(gulp.dest('./html/'))
});

//编译coffee 
gulp.task('coffee',function(){
    gulp.src('./coffee/*.coffee')
    .pipe(coffee({bare: true}))
    .pipe(gulp.dest('./asset/js'));
}); 

//简历server
gulp.task('connect', function() {
  connect.server();
});

//默认任务   
gulp.task('default',function(){
    gulp.run('coffee','sass','jade','connect');

    //监视我们JS文件的变化   
    gulp.watch('./coffee/*.coffee',function(){
        gulp.run('coffee');
    });    

    //监视scss文件的变化   
    gulp.watch('./sass/*.scss',function(){
        gulp.run('sass');
    });

    gulp.watch('./jade/*.jade',function(){
        gulp.run('jade');
    });

}); 