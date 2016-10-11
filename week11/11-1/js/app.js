$(document).ready(function () {
    //打开/关闭搜索框
    $('#btnopensearch').on("click", function () {
        $("#searchbox").addClass('scale');
    });
    $('#close-btn').on("click", function () {
        $("#searchbox").removeClass('scale');
    });

    //滑动顶部
    $("#gototop").click(function () {
        //滑动的速度:500ms滑到顶部
        $('body,html').animate({ scrollTop: 0 }, 500);
        return false;
    });
});
