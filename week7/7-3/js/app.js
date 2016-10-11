$(document).ready(function () {
    //window加载事件
    $(window).on("load", function () {
        ImgPlace();
    });
    //window 窗口大小改变事件
    $(window).on("resize", function () {
        ImgPlace();
    });
    window.onscroll = function () {
        if (IsScollBottom()) {
            //模拟加载的数据
            var picdata = [{ "pic": "1.jpg" }, { "pic": "2.jpg" }, { "pic": "3.jpg" }, { "pic": "4.jpg" }, { "pic": "5.jpg" }, { "pic": "6.jpg" }, { "pic": "7.jpg" }, { "pic": "8.jpg" }, { "pic": "9.jpg" }, { "pic": "10.jpg" }];
            //到底，加载图片列表
            $.each(picdata, function (i, v) {
                var box = $('<div>').addClass('box').appendTo($('#wrapper'));
                var cntbox = $('<div>').addClass('content').appendTo(box);
                $('<img>').attr('src', 'images/' + v.pic).appendTo(cntbox);
            });
            //重新摆放图片
            ImgPlace();
        }
    }
});

//重新摆放图片
function ImgPlace() {
    var box = $(".box");
    var boxWidth = box.eq(0).width();
    var num = Math.floor($(window).width() / boxWidth);
    //console.log(num);
    var boxArr = [];
    box.each(
        function (index, value) {
            var boxHeight = box.eq(index).height();
            if (index < num) {
                //保存每列高度
                boxArr[index] = boxHeight;
                //首行位置
                $(value).css({
                    "position": "absolute",
                    "top": 0,
                    "left": index * boxWidth
                });
            }
            else {
                //后续图片位置
                var minboxHeight = Math.min.apply(null, boxArr);
                var minHeightIndex = $.inArray(minboxHeight, boxArr);
                $(value).css({
                    "position": "absolute",
                    "top": minboxHeight,
                    "left": box.eq(minHeightIndex).position().left
                });
                //增加每列高度
                boxArr[minHeightIndex] += box.eq(index).height();
            }
        }
        );
}

//是否移动到最小面
function IsScollBottom() {
    var boxes = $('.box');
    var lastBoxY = boxes.last()[0].offsetTop + Math.floor(boxes.last().height() * 0.8);
    var windowY = $(window).height() + $(window).scrollTop();
    return lastBoxY < windowY;
}
