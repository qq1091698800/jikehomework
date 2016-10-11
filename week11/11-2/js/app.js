var allstates = ['青年路小区', '青年路小区南站', '天鹅湾小区', '甘露园中街南口', '康家沟', '兴隆家园', '兴隆中街', '高碑店桥北', '四惠东站', '陈家林', '四惠站', '四惠桥', '百子湾桥东', '百子湾', '水南庄', '水南庄东站', '百子湾家园西站', '百子湾家园', '百子湾家园南站', '百子湾东里', '水南庄南站', '唐家村', '东石门', '大郊亭桥东'];
function GetPinyin(state) {
    switch(state){
        case "青年路小区": return "QINGNIANLUXIAOQU";
        case "大郊亭桥东": return "DAJIAOTINGQIAODONG";
    }
}
$(document).ready(function () {
    allstates = allstates.reverse();
    //起点
    $('.curr dl').eq(0).find('dt').text(allstates[0]);
    $('.curr dl').eq(0).find('dd').text(GetPinyin(allstates[0]));
    //终点
    $('.curr dl').eq(2).find('dt').text(allstates[allstates.length - 1]);
    $('.curr dl').eq(2).find('dd').text(GetPinyin(allstates[allstates.length-1]));
    //当前站
    var currindex = Math.floor(Math.random() * allstates.length);
    $('.curr h2').text(allstates[currindex]);
    //各个站牌
    $.each(allstates, function (i, v) {
        //<span>站</span><span>牌</span><span>1</span>
        var str = '';
        for (var z = 0; z < allstates[i].length; z++)
            str += '<span>' + allstates[i][z] + '</span>';
        $('<li data="' + i + '"></li>').append($(str)).appendTo($('ul.stationNames'));
        $('<li data="'+i+'"></li>').append($('<span>' + (i + 1) + '</span>')).appendTo($('ul.stationIndexs'));
        $('ul.stationNames li').eq(currindex).addClass('sel');
    });
    //切换当前车站
    $('ul li').on("click", function () {
        $('ul.stationNames li').removeClass('sel');
        $('ul.stationNames li').eq($(this).attr('data')).addClass('sel');
        $('.curr h2').text(allstates[$(this).attr('data')]);
    });

});