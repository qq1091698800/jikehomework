var gulp = require('gulp');
var uglify = require('gulp-uglify');
var browserify = require('gulp-browserify');
var less = require('gulp-less');
var concat = require('gulp-concat');                            //- 多个文件合并为一个；
var minifyCss = require('gulp-minify-css');                     //- 压缩CSS为一行；
var rev = require('gulp-rev');                                  //- 对文件名加MD5后缀
var revCollector = require('gulp-rev-collector');               //- 路径替换
var del = require('del');

//清除文件夹
gulp.task('clean', function (cb) {
    return del(['./tmp', './output', './rev'], cb);
});

gulp.task('finishClean',['rev'], function (cb) {
    return del(['./tmp', './output', './rev'], cb);
});

//less处理
gulp.task('less', ['clean'], function () {
    return gulp.src('./css/*.less')
    .pipe(less())
    .pipe(gulp.dest('./tmp'));
});

//视频处理
gulp.task('videos', ['clean'], function () {
    return gulp.src('./video/*')
        .pipe(gulp.dest('./output/video/'));
});

//图片处理
gulp.task('pics', ['clean'], function () {
    return gulp.src('./images/*')
        .pipe(rev())                                            //- 文件名加MD5后缀
        .pipe(gulp.dest('./output/images/'))
        .pipe(rev.manifest())                                   //- 生成一个rev-manifest.json
        .pipe(gulp.dest('./rev/pic'));                              //- 将 rev-manifest.json 保存到 rev 目录内
});

//js压缩处理
gulp.task('uglify', ['clean'], function () {
    return gulp.src('./js/*.js')
        .pipe(browserify())
        .pipe(uglify())
        .pipe(rev())                                            //- 文件名加MD5后缀
        .pipe(gulp.dest('./output/js'))
        .pipe(rev.manifest())                                   //- 生成一个rev-manifest.json
        .pipe(gulp.dest('./rev/js'));                              //- 将 rev-manifest.json 保存到 rev 目录内
});

//css压缩处理
gulp.task('concat',['less'], function () {                                //- 创建一个名为 concat 的 task
    return gulp.src('./tmp/*.css')    //- 需要处理的css文件，放到一个字符串数组里
        .pipe(concat('all.min.css'))                            //- 合并后的文件名
        .pipe(minifyCss())                                      //- 压缩处理成一行
        .pipe(gulp.dest('./tmp'));                               //- 输出文件本地        
});



//css路径替换
gulp.task('revcss', ['concat', 'pics'], function () {
    return gulp.src(['./rev/*/*.json', './tmp/all.min.css'])   //- 读取 rev-manifest.json 文件以及需要进行css名替换的文件
        .pipe(revCollector())                                   //- 执行文件内css名的替换
        .pipe(rev())
        .pipe(gulp.dest('./output/css/'))
        .pipe(rev.manifest())                                   //- 生成一个rev-manifest.json
        .pipe(gulp.dest('./rev/css'));                              //- 将 rev-manifest.json 保存到 rev 目录内
});


//html路径替换
gulp.task('rev', ['revcss', 'uglify'], function () {
    return gulp.src(['./rev/*/*.json', './index.html'])   //- 读取 rev-manifest.json 文件以及需要进行css名替换的文件
        .pipe(revCollector())                                   //- 执行文件内css名的替换
        .pipe(gulp.dest('./output'));
});


gulp.task('default', ['clean', 'videos', 'uglify', 'pics', 'concat', 'revcss', 'rev', 'finishClean'], function () {
    console.log('任务完成！');
});