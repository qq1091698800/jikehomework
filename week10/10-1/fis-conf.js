//���ã����Ӱ汾��
fis.match('*', {
    useHash: false
});

//ͼƬ����
fis.match('*.png', {
    useHash: true,
    optimizer: fis.plugin('png-compressor')
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

//css�ϲ�
fis.match('*.css', {
    packTo: 'style.css'
});

//js�ϲ�
fis.match('*.js', {
    packTo: 'app.js'
});

//�ϲ�css��js�ļ�
fis.match('::package', {
    postpackager: fis.plugin('loader', {
        allInOne: true
    })
});

//ѹ��html
fis.match('*.html', {
    optimizer: fis.plugin('html-minifier')
});