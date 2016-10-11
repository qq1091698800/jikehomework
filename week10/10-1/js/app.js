var timeoutid;
var skintypeid = 1;
var skinCurrGroupIndex = 0;
var lastSkinId = '';//从cookie中读取
var lastBgImgUrl = '';
var skins = [
    //8个分类，每组分类4~5组图片，每组12张，每张图片可能对应一组样式
    { typeid: 1, typename: "热门", groups: [1, 2, 3, 4, 5] },
    { typeid: 2, typename: "游戏", groups: [6, 7, 8, 9, 10] },
    { typeid: 3, typename: "卡通", groups: [11, 12, 13, 14] },
    { typeid: 4, typename: "女神降临", groups: [15, 16, 17, 18] },
    { typeid: 5, typename: "明星", groups: [19, 20, 21, 22] },
    { typeid: 6, typename: "风景", groups: [23, 24, 25, 26] },
    { typeid: 7, typename: "简约", groups: [27, 28, 29, 30] },
    { typeid: 8, typename: "小清新", groups: [31, 32, 33, 34] }
];

$(document).ready(function () {
    //从cookie里读取
    //document.cookie = 'theme=(' + skintypeid + '@' + skinCurrGroupIndex + '@' + lastSkinId+')';
    var c = document.cookie;
    if (c.indexOf('theme=(') >= 0) {
        //读取cookie，换肤
        var index1 = c.indexOf('theme=(') + 7;
        var index2 = c.indexOf(')');
        c = c.substring(index1, index2);

        if (c.split('@')[0]=='' || isNaN(c.split('@')[0]))
            skintypeid = 1;
        else
            skintypeid = parseInt(c.split('@')[0]);

        if (c.split('@')[1] == '' || isNaN(c.split('@')[1]))
            skinCurrGroupIndex = 0;
        else
            skinCurrGroupIndex = parseInt(c.split('@')[1]);
        lastSkinId = c.split('@')[2];
        
        if (lastSkinId != '')
            lastBgImgUrl = 'images/skin/' + lastSkinId + '.jpg';
        ChangeBG();
    }

    //动态加入皮肤分组
    for (var i = 0; i < skins.length; i++)        
        $('<li id="skintype' + skins[i].typeid + '"><a>' + skins[i].typename + '</a></li>').insertBefore($('#skinsplit'));
    //展开皮肤分组
    $('#skintypes li').on("click", function (index) {
        if (this.id.indexOf('skintype') >= 0) {
            skintypeid = parseInt(this.id.replace('skintype', ''));
            PlaceSkinImgs(skintypeid, 0, true);
        }
    });
    PlaceSkinImgs(skintypeid, skinCurrGroupIndex, true);
    
    //鼠标移到皮肤分类效果
    $('#skinbox a').on("mouseenter", function () { $(this).addClass('sel'); });
    $('#skinbox a').on("mouseleave", function () { $(this).removeClass('sel'); });
    //关闭打开换肤面板
    $('#openskinbox').on("click", function () { $('#skinbox').animate({ opacity: 1, top: 0 }, 300); });
    $('#closeSkinBox').on("click", function () {$('#skinbox').animate({ opacity: 0, top: -288 }, 300);});
    $('#noSkin').on("click", function () {
        //不使用皮肤
        skintypeid = 1;
        skinCurrGroupIndex = 0;
        lastSkinId = '';
        lastBgImgUrl = '';
        ChangeBG();
    });

    $('.picsul img').each(function (index) {
        var aNode = $(this);
        $(this).mouseover(
            function () {
                //延迟展示预览图片
                timeoutid = setTimeout(function () {
                    $('#skinprev').attr('src', aNode.attr('src'));
                    $('#skinprevtop').show();
                }, 200);
            }).mouseout(function () {
                //关闭预览
                clearTimeout(timeoutid);
                $('#skinprev').attr('src', lastBgImgUrl);
                if (lastSkinId == '')
                    $('#skinprevtop').hide();
                else
                    $('#skinprevtop').show();
            }).click(function () {
                //应用皮肤样式
                lastSkinId = aNode.attr('src');
                lastSkinId = lastSkinId.substr(lastSkinId.lastIndexOf('/') + 1);
                lastSkinId = lastSkinId.substr(0, lastSkinId.indexOf('.'));
                lastBgImgUrl = aNode.attr('src');
                ChangeBG();
            });
    });

    //切换内容部分5个tab
    $('.cntMenu > li').on("click", function () {
        if (this.id.indexOf('box') >= 0) {
            $(this).addClass('sel').siblings().removeClass('sel');
            $('.cntbox > div').hide();
            $('#cnt' + this.id).show();
        }
    });
});

function ChangeBG() {
    if (lastSkinId == '') {
        //不使用皮肤
        $('.header-wrapper a').css({ color: '#000' });
        $('.header-wrapper').css({ color: '#000' });
        $('#wdbtn').addClass('wds').removeClass('wds-new');
        $('#mainlogo').attr('src', 'images/bd_logo1.jpg');
        $('body').css({ 'background': 'none' });
        $('#skinprevtop').hide();
        lastBgImgUrl='images/skin-prev-0.jpg';
        $('#skinprev').attr('src',lastBgImgUrl);
        $('a.navStart').css({ color: '#fff' });        
        document.cookie = 'theme=(@@)';
    }
    else {
        //使用皮肤
        $('.header-wrapper a').css({ color: '#fff' });
        $('.header-wrapper').css({ color: '#fff' });
        $('#wdbtn').addClass('wds-new').removeClass('wds');
        $('#mainlogo').attr('src', 'images/bd_logo2.jpg');
        $('body').css({ 'background': 'url(' + lastBgImgUrl + ')', 'background-size': 'cover' });
        $('#skinprevtop').show();
        document.cookie = 'theme=(' + skintypeid + '@' + skinCurrGroupIndex + '@' + lastSkinId+')';
    }
    $('.box-weather li.weaimg .weabox .weatips a').css({ color: '#0079f4' });
}
function PlaceSkinImgs(skintype, skingroupindex, isini) {
    //展示皮肤分组下的12张图片
    if (skintype < 0)
        skintype = skintypeid;
    if (skingroupindex < 0)
        skingroupindex = skinCurrGroupIndex;
    skintypeid = skintype;
    skinCurrGroupIndex = skingroupindex;
    for (var i = 1; i <= 12; i++) {
        $('.picsul>li').eq(i - 1).find('img').attr('src', 'images/skin/'+(skins[skintype-1].groups[skingroupindex]%10+1)+'-'+i+'.jpg');
    }
    $('ul.picnav li.i').removeClass('sel');
    $('ul.picnav li.i').eq(skinCurrGroupIndex).addClass('sel');
    if (isini) {
        //初始化 切换12张图片按钮
        var str = '<li class="prev" onclick="PlaceSkinImgsPre()"></li>';
        for (var i = 0; i < skins[skintype - 1].groups.length; i++)
            str += '<li' + (i == 0 ? ' class="sel i"' : ' class=" i"') + ' onclick="PlaceSkinImgs(-1,' + i + ')"></li>';
        str += '<li class="next" onclick="PlaceSkinImgsNext()"></li>';
        $('#skingroupnav').empty().append($(str));
    }
}
//上12张皮肤图片
function PlaceSkinImgsPre() {
    if (skinCurrGroupIndex > 0)
        PlaceSkinImgs(skintypeid, skinCurrGroupIndex - 1);
}
//下12张皮肤图片
function PlaceSkinImgsNext() {
    if (skinCurrGroupIndex < skins[skintypeid - 1].groups.length-1)
        PlaceSkinImgs(skintypeid, skinCurrGroupIndex + 1);
}