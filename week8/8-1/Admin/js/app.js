//删除某条新闻
function delnews(newsid) {
    if (confirm('确认删除吗？')) {
        $.get("newsapi.php?t=del&id=" + newsid, function (data) {
            if (data.result == 0) {
                alert('删除成功！');
                getNewsList();
            }
        });
    }
}

//加载新闻列表页
function getNewsList(isfirst) {
    $('#dataTables-example tbody').empty();
    $.get("newsapi.php?t=newslst", function (data) {
        $.each(data, function (i, item) {
            $('<tr><td>' + item.NewsId + '</td><td>' + item.NewsTitle + '</td><td><img src="upload/' + item.NewsImg + '"></td><td>' + item.AddTime + '</td><td><a href="news.php?id=' + item.NewsId + '">编辑</a>&nbsp;<a href="javascript:void(0)" onclick="delnews(' + item.NewsId + ')">删除</a></td></tr>')
                .appendTo($('#dataTables-example tbody'));
        });
        if (isfirst)
            $('#dataTables-example').DataTable({
                responsive: true
            });
    });
}

//加载新闻详情页
function getnews(id) {
    $.get("newsapi.php?t=news&id=" + id, function (data) {
        var newsCatId = 0;
        if (data.length > 0) {
            var item = data[0];
            var NewsTitle = item.NewsTitle;
            //改回转义符
            while (NewsTitle.indexOf('&lt;') >= 0)
                NewsTitle = NewsTitle.replace('&lt;', '<');
            while (NewsTitle.indexOf('&gt;') >= 0)
                NewsTitle = NewsTitle.replace('&gt;', '>');
            $('#txttitle').val(NewsTitle);
            //改回转义符 - 内容
            var NewsContent = item.NewsContent;
            while (NewsContent.indexOf('&lt;') >= 0)
                NewsContent = NewsContent.replace('&lt;', '<');
            while (NewsContent.indexOf('&gt;') >= 0)
                NewsContent = NewsContent.replace('&gt;', '>');
            $('#txtcnt').val(NewsContent);

            $('#preview').attr('src', 'upload/' + item.NewsImg);
            $('#imgpicvalue').val(item.NewsImg);
            newsCatId = item.CategoryId;
        }
        //加载新闻栏目
        $.get("newsapi.php?t=cats", function (cats) {
            $('#selcats').empty();
            $.each(cats, function (i, cat) {
                $('<option ' + (cat.CategoryId == newsCatId ? 'selected="selected"' : '') + ' value="' + cat.CategoryId + '">' + cat.CategoryName + '</option>')
                    .appendTo($('#selcats'));
            });
        });
    });
}

//更新或添加新闻
function addOrUpdateNews() {
    var CategoryId = $('#selcats').val();
    var NewsTitle = $('#txttitle').val();
    var NewsImg = $('#imgpicvalue').val();
    var NewsContent = $('#txtcnt').val();
    if (NewsTitle.trim() == '') {
        alert('请填写新闻标题');
        return;
    }
    //清除标签转义符
    while (NewsTitle.indexOf('<') >= 0)
        NewsTitle = NewsTitle.replace('<', '&lt;');
    while (NewsTitle.indexOf('>') >= 0)
        NewsTitle = NewsTitle.replace('>', '&gt;');

    while (NewsContent.indexOf('<') >= 0)
        NewsContent = NewsContent.replace('<', '&lt;');
    while (NewsContent.indexOf('>') >= 0)
        NewsContent = NewsContent.replace('>', '&gt;');

    if (NewsImg == undefined || NewsImg == '') {
        alert('请上传新闻图片');
        return;
    }

    $.post("newsapi.php", { "t": "update", "NewsId": newsid, "CategoryId": CategoryId, "NewsTitle": NewsTitle, "NewsImg": NewsImg, "NewsContent": NewsContent },
    function (data) {
        alert((newsid == 0 ? '添加' : '更新') + data.msg);
        if (data.result == 0) {
            window.location.href = 'index.php';
        }
        console.log(data);
    });
}

//获取get参数
function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return "";
}


