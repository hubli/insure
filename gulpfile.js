var gulp = require('gulp'),
	imagemin = require('gulp-imagemin'),     // 压缩图片
	uglify = require('gulp-uglify'),		 // 压缩js
	concat = require('gulp-concat'),		 // 合并文件 
	rename = require('gulp-rename'),         // 重命名
	less = require('gulp-less'),			 // less 2 css
	minifycsss = require('gulp-minify-css'); // 压缩css

//资源目录
var paths = {
	scripts: 'src/scripts/**/*.js', 
	lesses:'src/less/**/*', 
	images: 'src/images/**/*' 
};

// 图片压缩
gulp.task('imagemin', function() {
	return gulp.src(paths.images)
		.pipe(imagemin({optimiazationLevel: 5}))
		.pipe(gulp.dest('dist/images'));
});

// js合并压缩
gulp.task('js', function() {
	gulp.src(paths.scripts)
		.pipe(concat('insure.js'))
		.pipe(gulp.dest('dist/js'))
		.pipe(rename({suffix: '.min'}))
		.pipe(uglify())
		.pipe(gulp.dest('dist/js'));
});

// Less 2 CSS
gulp.task('less2css', function(){
	return gulp.src(paths.lesses)
		.pipe(less())
		.pipe(gulp.dest('dist/css'))
		.pipe(rename({suffix: '.min'}))				
		.pipe(minifycsss())
		.pipe(gulp.dest('dist/css'));
});

gulp.task('watch', function() {	
	gulp.watch(paths.scripts, ['js']);
	gulp.watch(paths.lesses, ['less2css']);
	gulp.watch(paths.images, ['imagemin']);
});

//默认任务
gulp.task('default', ['watch', 'imagemin', 'js', 'less2css']);