//���ã����Ӱ汾��
fis.match('*', {
    useHash: false
});

//less����
fis.match('*.less', {
    //�汾��
    useHash: true,
    parser: fis.plugin('less'),
    optimizer: fis.plugin('clean-css', {
    }),
    rExt: '.css'
});

// ѹ��css
fis.match('*.css', {
    //�汾��
    useHash: true,
    optimizer: fis.plugin('clean-css', {
    })
});

//ѹ��js
fis.match('*.js', {
    //�汾��
    useHash: true,
    optimizer: fis.plugin('uglify-js')
});

//ѹ��html
fis.match('*.html', {
    optimizer: fis.plugin('html-minifier')
});