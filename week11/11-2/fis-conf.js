//重置，不加版本戳
fis.match('*', {
    useHash: false
});

//less处理
fis.match('*.less', {
    //版本戳
    useHash: true,
    parser: fis.plugin('less'),
    optimizer: fis.plugin('clean-css', {
    }),
    rExt: '.css'
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

//压缩html
fis.match('*.html', {
    optimizer: fis.plugin('html-minifier')
});