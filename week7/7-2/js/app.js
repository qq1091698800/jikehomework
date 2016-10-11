$(document).ready(function () {
    //代码实现克隆24个课程
    var i = 2;
    while (i <= 24) {
        var tmp=$('.classLst li').eq(0).clone();
        tmp.find('.imgbox img').attr('src','images/l'+(i<10?'0'+i:i)+'.jpg');
        tmp.appendTo('.classLst');
        i++;
    }
    //切换课程显示形式：列表显示/块状显示
    $('.viewClass .block-icon').on("click", function () { if ($('#classLst').hasClass('classLst2')) $('#classLst').removeClass('classLst2').addClass('classLst'); });
    $('.viewClass .list-icon').on("click", function () { if ($('#classLst').hasClass('classLst')) $('#classLst').removeClass('classLst').addClass('classLst2'); });
    //打开/关闭搜索框
    $('#btnopensearch').on("click", function () { $("#searchbox").addClass('scale'); });
    $('#close-btn').on("click", function () { $("#searchbox").removeClass('scale'); });
    //鼠标进入课程块，显示动画
    $('#classLst li').on("mouseenter", function () { $(this).find('.shade').animate({ opacity: 1 }, 300); });
    $('ul.classLst li').on("mouseenter", function () { $(this).find('.infobox').animate({ height: 175 }, 100); });
    //鼠标移出课程块，显示动画
    $('#classLst li').on("mouseleave", function () { $(this).find('.shade').animate({ opacity: 0 }, 100); });
    $('ul.classLst li').on("mouseleave", function () { $(this).find('.infobox').animate({ height: 88 }, 100); });
});
