//检查输入 & 计算
function DoCalculate() {
    //检查输入
    var txtnum1 = document.getElementById('txtNum1').value;
    var txtnum2 = document.getElementById('txtNum2').value;
    if (txtnum1.trim() == '') {
        OutError('数字1不能为空！');
    }
    else if (txtnum2.trim() == '') {
        OutError('数字2不能为空！');
    }
    else if (isNaN(txtnum1)) {
        OutError('数字1输入不正确！');
    }
    else if (isNaN(txtnum2)) {
        OutError('数字2输入不正确！');
    }
    else {
        //计算
        var num1 = parseFloat(txtnum1);
        var num2 = parseFloat(txtnum2);
        Calculate(num1, num2, document.getElementById('selOperation').value);
    }
}

//输出结果
function OutResult(txt) {
    document.getElementById('txtError').innerText = '';
    document.getElementById('txtResult').innerText = txt;
}
//输出错误
function OutError(txt) {
    document.getElementById('txtResult').innerText = '';
    document.getElementById('txtError').innerText = txt;
}
//计算器
function Calculate(x, y, operation) {
    var e;
    switch (operation) {
        case '+':
            OutResult(add(x,y));
            break;
        case '-':
            OutResult(sub(x , y));
            break;
        case '*':
            OutResult(mul(x , y));
            break;
        case '/':
            if (y == 0)
                OutError('0不能是被除数');
            else
                OutResult(div(x , y));
            break;
        default:
            OutError('计算错误！');
            break;
    }
}

/*修正浮点的加法*/
function add(a, b) {
    var c, d, e;
    try {
        c = a.toString().split(".")[1].length;
    } catch (f) {
        c = 0;
    }
    try {
        d = b.toString().split(".")[1].length;
    } catch (f) {
        d = 0;
    }
    return e = Math.pow(10, Math.max(c, d)), (mul(a, e) + mul(b, e)) / e;
}
/*修正浮点的减法*/
function sub(a, b) {
    var c, d, e;
    try {
        c = a.toString().split(".")[1].length;
    } catch (f) {
        c = 0;
    }
    try {
        d = b.toString().split(".")[1].length;
    } catch (f) {
        d = 0;
    }
    return e = Math.pow(10, Math.max(c, d)), (mul(a, e) - mul(b, e)) / e;
}
/*修正浮点的乘法*/
function mul(a, b) {
    var c = 0,
        d = a.toString(),
        e = b.toString();
    try {
        c += d.split(".")[1].length;
    } catch (f) { }
    try {
        c += e.split(".")[1].length;
    } catch (f) { }
    return Number(d.replace(".", "")) * Number(e.replace(".", "")) / Math.pow(10, c);
}
/*修正浮点的除分*/
function div(a, b) {
    var c, d, e = 0,
        f = 0;
    try {
        e = a.toString().split(".")[1].length;
    } catch (g) { }
    try {
        f = b.toString().split(".")[1].length;
    } catch (g) { }
    return c = Number(a.toString().replace(".", "")), d = Number(b.toString().replace(".", "")), mul(c / d, Math.pow(10, f - e));
}