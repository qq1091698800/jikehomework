//服务器接口路径前缀
var apiRootUrl = '../admin/';

$(document).ready(function () {
    //获取栏目
    getcats();
    //获取新闻
    getnews();
});

//根据栏目id获取新闻，不传栏目id返回所有
function getnews(categoryid) {
    $('.newslist').empty();
    var url = '';
    if (categoryid)
        url = apiRootUrl + "newsapi.php?t=newslstbycatid&CategoryId=" + categoryid;
    else
        url = apiRootUrl + "newsapi.php?t=newslst";
    $.get(url, function (data) {
        $.each(data, function (i, item) {
            $('<li><a href="' + item.NewsId + '#"><img src="' + apiRootUrl +'upload/'+ item.NewsImg + '"/><h3>' + item.NewsTitle + '</h3><span>' + item.AddTime + '</span></a><div class="clearfx"></div></li>')
                .appendTo($('.newslist'));
        });
    });
}

//返回新闻栏目
function getcats() {
    $('.nav').empty();
    $.get(apiRootUrl + "newsapi.php?t=cats", function (data) {
        $.each(data, function (i, item) {
            $('<li onclick="getnews(' + item.CategoryId + ')"><a>' + item.CategoryName + '</a></li>')
                .appendTo($('.nav'));
        });
    });
}