//重置，不加版本戳
fis.match('*', {
    useHash: false
});

//图片处理
fis.match('*.png', {
    useHash: true,
    optimizer: fis.plugin('png-compressor')
});


// 压缩css
fis.match('*.css', {
    //版本戳
    useHash: true,     
    optimizer: fis.plugin('clean-css', {
    })
});

//压缩js
fis.match('*.js', {
    //版本戳
    useHash: true,
    optimizer: fis.plugin('uglify-js')
});

//css合并
fis.match('*.css', {
    packTo: 'style.css'
});

//js合并
fis.match('*.js', {
    packTo: 'app.js'
});

//合并css、js文件
fis.match('::package', {
    postpackager: fis.plugin('loader', {
        allInOne: true
    })
});

//压缩html
fis.match('*.html', {
    optimizer: fis.plugin('html-minifier')
});