//为皮肤按钮附上颜色
document.getElementById("aTheme1").style.backgroundColor = '#0aa770';
document.getElementById("aTheme2").style.backgroundColor = '#f50';
document.getElementById("aTheme3").style.backgroundColor = '#aaa';
document.getElementById("aTheme4").style.backgroundColor = '#0ff';
var c = document.cookie;
if (c.indexOf('theme=') >= 0) {
    //读取cookie
    var index1 = c.indexOf('theme=') + 6;
    var index2 = c.indexOf(')');
    //console.log(c.substring(index1, index2 + 1));
    ChangeColor(c.substring(index1, index2 + 1));
}
document.getElementsByClassName("theme-box")[0].onclick = function (event) {
    //window.event 适配ie8浏览器
    var e = event || window.event;
    var actualTarget = e.target || e.srcElement;
    var color = actualTarget.style.backgroundColor;
    ChangeColor(color);
}

function ChangeColor(color) {
    //顶部主导航颜色
    var nav_top = document.getElementsByClassName("nav-top")[0];
    nav_top.style.borderColor = color;
    for (var i = 0; i < nav_top.firstElementChild.childNodes.length; i++) {
        var c = nav_top.firstElementChild.childNodes[i];
        if (c.className == "sel") {
            c.style.backgroundColor = color;
        }
    }
    //顶部次导航颜色
    var nav_second = document.getElementsByClassName("nav-second")[0];
    nav_second.style.borderColor = color;
    nav_second.firstElementChild.firstElementChild.firstElementChild.style.color = color;
    //边栏导航颜色
    document.getElementsByClassName("nav-column")[0].style.borderColor = color;
    //主body导航颜色
    document.getElementsByClassName("main-links")[0].style.borderColor = color;
    //主game导航颜色
    var main_gamelinks = document.getElementsByClassName("main-gamelinks")[0];
    main_gamelinks.style.borderColor = color;
    main_gamelinks.firstElementChild.style.backgroundColor = color;
    for (var i = 0; i < main_gamelinks.childNodes.length; i++) {
        if (main_gamelinks.childNodes[i].tagName == "DL" || main_gamelinks.childNodes[i].tagName == "dl") {
            main_gamelinks.childNodes[i].firstChild.firstChild.style.color = color;
        }
    }
    //保存cookie
    document.cookie = 'theme=' + color;

    //nav-top
    //nav-second
    //nav-column
    //main-links
    //main-gamelinks

    //document.getElementById("").style.borderColor
    //document.getElementById("").style.color
    //document.getElementById("").style.backgroundColor
}