//服务器接口路径前缀
var apiRootUrl = 'http://localhost:3000/';

$(document).ready(function () {
    $('.more').click(function () {
        page++;
        getnews(0);
    });

    //获取栏目
    getcats();
    //获取新闻
    getnews();
    
    
});

var page = 0;
//根据栏目id获取新闻，不传栏目id返回所有
function getnews(categoryid) {
    if (page == 0 || categoryid != 0)
        $('.newslist').empty();
    var url = '';
    if (categoryid && categoryid != 0) {
        $('.more').hide();
        url = apiRootUrl + "newslst/" + categoryid;
    }  
    else
        url = apiRootUrl + "newslstpage/"+page;
    $.get(url, function (data) {
        $.each(data, function (i, item) {
            $('<li><a href="#' + item.NewsId + '"><img src="' + apiRootUrl +'upload/'+ item.NewsImg + '"/><h3>' + item.NewsTitle + '</h3><span>' + item.AddTime.substr(0,10) + '</span></a><div class="clearfx"></div></li>')
                .appendTo($('.newslist'));
        });
        if (data.length == 0)
            $('.more').text('没有了');
    });
}

//返回新闻栏目
function getcats() {
    $('.nav').empty();
    $.get(apiRootUrl + "newscats", function (data) {
        $.each(data, function (i, item) {
            $('<li onclick="getnews(' + item.CategoryId + ')"><a>' + item.CategoryName + '</a></li>')
                .appendTo($('.nav'));
        });
    });
}