const gulp = require('gulp')
const sass = require('gulp-sass'); //引入sass编译插件 
const watch = require('gulp-watch');

const sourcemaps = require('gulp-sourcemaps'); //引入生成.map文件模块
const plugins = require('gulp-load-plugins')(); //生成.map文件 返回的是一个函数体。需要再次执行。
// const script = require('gulp-uglify'); //压缩js的插件
gulp.task('compilesass', () => {
    return gulp.src('src/sass/*.scss')
        .pipe(plugins.sourcemaps.init()) //初始化gulp-sourcemaps插件
        .pipe(plugins.sass({
            outputStyle: 'compressed' //压缩
        }))
        .pipe(plugins.sourcemaps.write('.')) //通过sourcemaps,生成.map文件
        .pipe(gulp.dest('src/css/'));
});
gulp.task('default', () => {
    watch(['src/sass/*.scss'], gulp.parallel('compilesass'));
});