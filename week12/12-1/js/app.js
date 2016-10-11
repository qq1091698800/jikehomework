/**
使用了单例模式
好处：
入口明确：唯一对象indexPage
流程清晰：从init方法即可看出主要流程
分工明确：render负责页面元素绘制、bind负责页面元素事件处理绑定；以及由绘制、绑定扩充出来的其他方法
充分体现了面向对象封装的优势、并可以限制在乱绑定事件（在render里定义需要绑定的元素，有哪些一路了然）
加强了使用jquery链式调用
**/

indexPage = {
    timeoutid:0,//记录延时函数id，用于清除setTimeout
    skintypeid:1,//皮肤分类id
    skinCurrGroupIndex : 0,//分类下的皮肤分组id
    lastSkinId : '',//从cookie中读取
    lastBgImgUrl: '',//记录上次选中的皮肤背景图
    skins://8个分类，每组分类4~5组图片，每组12张，每张图片可能对应一组样式
        [{ typeid: 1, typename: "热门", groups: [1, 2, 3, 4, 5] },
        { typeid: 2, typename: "游戏", groups: [6, 7, 8, 9, 10] },
        { typeid: 3, typename: "卡通", groups: [11, 12, 13, 14] },
        { typeid: 4, typename: "女神降临", groups: [15, 16, 17, 18] },
        { typeid: 5, typename: "明星", groups: [19, 20, 21, 22] },
        { typeid: 6, typename: "风景", groups: [23, 24, 25, 26] },
        { typeid: 7, typename: "简约", groups: [27, 28, 29, 30] },
        { typeid: 8, typename: "小清新", groups: [31, 32, 33, 34] }],

    init: function () {
        var me = this;
        //从cook获取皮肤
        me.getSkinFromCookie();
        //绘制
        me.render();
        //绑定
        me.bind();
    },
    render: function () {
        var me = this;
        //绘制背景皮肤
        me.renderBG();
        //绘制皮肤面板
        me.PlaceSkinImgs(me.skintypeid, me.skinCurrGroupIndex, true);

        //绘制皮肤分组tabs
        for (var i = 0; i < me.skins.length; i++)
            $('<li id="skintype' + me.skins[i].typeid + '"><a>' + me.skins[i].typename + '</a></li>').insertBefore($('#skinsplit'));

        //内容tabs
        me.cnttabs = $('.cntMenu > li');
        //内容
        me.cnt = $('.cntbox > div');

        //皮肤分组
        me.skintypes = $('#skintypes li');
        me.skintypesA = $('#skinbox a');
        //皮肤面板关闭、打开
        me.boxOpenSkin = $('#openskinbox');
        me.boxCloseSkin = $('#closeSkinBox');
        me.skinbox = $('#skinbox');
        me.noskin = $('#noSkin');

        me.skinimgs = $('.picsul img');
        me.skinpre = $('#skinprev');
        me.skinprevtop = $('#skinprevtop');
    },
    bind: function () {
        var me = this;
        //绑定“展开皮肤分组”事件
        me.skintypes.on("click", function (index) {
            if (this.id.indexOf('skintype') >= 0) {
                me.skintypeid = parseInt(this.id.replace('skintype', ''));
                me.PlaceSkinImgs(me.skintypeid, 0, true);
            }
        });

        //鼠标移到皮肤分类效果
        me.skintypesA.on("mouseenter", function () { $(this).addClass('sel'); }).on("mouseleave", function () { $(this).removeClass('sel'); });

        //关闭打开换肤面板
        me.boxOpenSkin.on("click", function () { me.skinbox.animate({ opacity: 1, top: 0 }, 300); });
        me.boxCloseSkin.on("click", function () { me.skinbox.animate({ opacity: 0, top: -288 }, 300); });
        me.noskin.on("click", function () {
            //不使用皮肤
            me.skintypeid = 1;
            me.skinCurrGroupIndex = 0;
            me.lastSkinId = '';
            me.lastBgImgUrl = '';
            me.renderBG();
        });

        //切换内容部分5个tab
        me.cnttabs.on("click", function () {
            if (this.id.indexOf('box') >= 0) {
                $(this).addClass('sel').siblings().removeClass('sel');
                me.cnt.hide();
                $('#cnt' + this.id).show();
            }
        });

        me.skinimgs.each(function (index) {
            var aNode = $(this);
            $(this).mouseover(
                function () {
                    //延迟展示预览图片
                    me.timeoutid = setTimeout(function () {
                        me.skinpre.attr('src', aNode.attr('src'));
                        me.skinprevtop.show();
                    }, 200);
                }).mouseout(function () {
                    //关闭预览
                    clearTimeout(me.timeoutid);
                    me.skinpre.attr('src', me.lastBgImgUrl);
                    if (me.lastSkinId == '')
                        me.skinprevtop.hide();
                    else
                        me.skinprevtop.show();
                }).click(function () {
                    //应用皮肤样式
                    me.lastSkinId = aNode.attr('src');
                    me.lastSkinId = me.lastSkinId.substr(me.lastSkinId.lastIndexOf('/') + 1);
                    me.lastSkinId = me.lastSkinId.substr(0, me.lastSkinId.indexOf('.'));
                    me.lastBgImgUrl = aNode.attr('src');
                    me.renderBG();
                });
        });
    },

    //从cookie里读取自定义背景
    getSkinFromCookie: function () {
        var me = this;
        //从cookie里读取
        //document.cookie = 'theme=(' + skintypeid + '@' + skinCurrGroupIndex + '@' + lastSkinId+')';
        var c = document.cookie;
        if (c.indexOf('theme=(') >= 0) {
            //读取cookie，换肤
            var index1 = c.indexOf('theme=(') + 7;
            var index2 = c.indexOf(')');
            c = c.substring(index1, index2);

            if (c.split('@')[0] == '' || isNaN(c.split('@')[0]))
                me.skintypeid = 1;
            else
                me.skintypeid = parseInt(c.split('@')[0]);

            if (c.split('@')[1] == '' || isNaN(c.split('@')[1]))
                me.skinCurrGroupIndex = 0;
            else
                me.skinCurrGroupIndex = parseInt(c.split('@')[1]);
            me.lastSkinId = c.split('@')[2];

            if (me.lastSkinId != '')
                me.lastBgImgUrl = 'images/skin/' + me.lastSkinId + '.jpg';
        }
    },

    //绘制自定义背景
    renderBG: function () {
        var me = this;
        if (me.lastSkinId == '') {
            //不使用皮肤
            $('.header-wrapper a').css({ color: '#000' });
            $('.header-wrapper').css({ color: '#000' });
            $('#wdbtn').addClass('wds').removeClass('wds-new');
            $('#mainlogo').attr('src', 'images/bd_logo1.jpg');
            $('body').css({ 'background': 'none' });
            $('#skinprevtop').hide();
            me.lastBgImgUrl = 'images/skin-prev-0.jpg';
            $('#skinprev').attr('src', me.lastBgImgUrl);
            $('a.navStart').css({ color: '#fff' });
            document.cookie = 'theme=(@@)';
        }
        else {
            //使用皮肤
            $('.header-wrapper a').css({ color: '#fff' });
            $('.header-wrapper').css({ color: '#fff' });
            $('#wdbtn').addClass('wds-new').removeClass('wds');
            $('#mainlogo').attr('src', 'images/bd_logo2.jpg');
            $('body').css({ 'background': 'url(' + me.lastBgImgUrl + ')', 'background-size': 'cover' });
            $('#skinprevtop').show();
            document.cookie = 'theme=(' + me.skintypeid + '@' + me.skinCurrGroupIndex + '@' + me.lastSkinId + ')';
        }
        $('.box-weather li.weaimg .weabox .weatips a').css({ color: '#0079f4' });
    },

    //展示皮肤指定分组下的12张图片
    PlaceSkinImgs: function (skintype, skingroupindex, isini) {
        var me = this;
        //展示皮肤分组下的12张图片
        if (skintype < 0)
            skintype = me.skintypeid;
        if (skingroupindex < 0)
            skingroupindex = me.skinCurrGroupIndex;
        me.skintypeid = skintype;
        me.skinCurrGroupIndex = skingroupindex;
        for (var i = 1; i <= 12; i++) {
            $('.picsul>li').eq(i - 1).find('img').attr('src', 'images/skin/' + (me.skins[skintype - 1].groups[skingroupindex] % 10 + 1) + '-' + i + '.jpg');
        }
        $('ul.picnav li.i').removeClass('sel');
        $('ul.picnav li.i').eq(me.skinCurrGroupIndex).addClass('sel');
        if (isini) {
            //初始化 切换12张图片按钮
            var str = '<li class="prev" onclick="indexPage.PlaceSkinImgsPre()"></li>';
            for (var i = 0; i < me.skins[skintype - 1].groups.length; i++)
                str += '<li' + (i == 0 ? ' class="sel i"' : ' class=" i"') + ' onclick="indexPage.PlaceSkinImgs(-1,' + i + ')"></li>';
            str += '<li class="next" onclick="indexPage.PlaceSkinImgsNext()"></li>';
            $('#skingroupnav').empty().append($(str));
        }
    },

    //上12张皮肤图片
    PlaceSkinImgsPre: function () {
        
        var me = this;
        if (me.skinCurrGroupIndex > 0)
            me.PlaceSkinImgs(me.skintypeid, me.skinCurrGroupIndex - 1);
    },

    //下12张皮肤图片
    PlaceSkinImgsNext: function () {        
        var me = this;
        if (me.skinCurrGroupIndex < me.skins[me.skintypeid - 1].groups.length - 1)
            me.PlaceSkinImgs(me.skintypeid, me.skinCurrGroupIndex + 1);
    },
};


$(document).ready(function () {
    indexPage.init();
});
