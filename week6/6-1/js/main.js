//当前数字
var numCurrStr = '0';
//上一个数字（2元运算使用）
var numLastStr = '0';
//记录2元运算符
var operator = '';
//切换运算符后第一次按下数字键
var opFlag = false;
//数字11位有效数字
var maxLength = 13;

document.getElementById("box_btn").onclick = function (event) {
    //window.event 适配ie8浏览器
    var e = event || window.event;
    var actualTarget = e.target || e.srcElement;
    //适配firefox
    var btnTxt = actualTarget.innerText || actualTarget.textContent;
    var numResult = 0;
    switch(btnTxt){
        case "←":
            //退格键
            if (numCurrStr.length == 1) {
                numCurrStr = '0';
            }
            else {
                numCurrStr = numCurrStr.substring(0, numCurrStr.length - 1);
            }
            OutResult(numCurrStr);
            break;
        case "C":
            //全清
            Clear();
            OutResult(numCurrStr);
            break;
        
        case "1":
        case "2":
        case "3":
        case "4":
        case "5":
        case "6":
        case "7":
        case "8":
        case "9":
        case "0":
        case ".":
            //数字、小数点
            if (opFlag) {
                numCurrStr = '0';
                opFlag = false;
            }
            if (!((numCurrStr.length >= maxLength) ||   //超出最大数字限制
                (numCurrStr == '0' && btnTxt == '0') ||  //开始数字不能多于1个零
                (numCurrStr.indexOf('.') > 0 && btnTxt == '.') //小数点不能多于1个
                )) {
                if (numCurrStr == '0' && btnTxt != '.')
                    numCurrStr = btnTxt;
                else
                    numCurrStr += btnTxt;
                
                OutResult(numCurrStr);
            }  
            break;

            //1元运算符
        case "sin":
            numResult = (Math.sin(parseFloat(numCurrStr) * Math.PI / 180)).toFixed(maxLength);
            numCurrStr = numResult.toString();
            OutResult(numCurrStr, true);
            break;
        case "cos":
            numResult = (Math.cos(parseFloat(numCurrStr) * Math.PI / 180)).toFixed(maxLength);
            numCurrStr = numResult.toString();
            OutResult(numCurrStr, true);
            break;
        case "tan":
            if (numCurrStr.indexOf('.') < 0) {
                numResult = parseInt(numCurrStr);
                if (numResult % 90 == 0 && numResult % 180 != 0) {
                    //正、负无穷的情况
                    while (numResult < 0)
                        numResult += 360;
                    if(numResult %270==0)
                        OutResult("-" + Infinity);
                    else
                        OutResult(Infinity);
                    Clear();
                    break;
                }
            }
            numResult = (Math.tan(parseFloat(numCurrStr) * Math.PI / 180)).toFixed(maxLength);
            numCurrStr = numResult.toString();
            OutResult(numCurrStr, true);
            break;
        case "cot":
            if (numCurrStr.indexOf('.') < 0) {
                numResult = parseInt(numCurrStr);
                if (numResult % 180 == 0) {
                    //正、负无穷的情况
                    while (numResult < 0)
                        numResult += 360;
                    while (numResult > 360)
                        numResult -= 360;
                    if (numResult == 0)
                        OutResult(Infinity);
                    else
                        OutResult("-"+Infinity);
                    Clear();
                    break;
                }
            }
            numResult = (Math.tan(parseFloat(numCurrStr) * Math.PI / 180)).toFixed(maxLength);
            numCurrStr = numResult.toString();
            OutResult(numCurrStr, true);
            break;
        case "+/-":
            if (numCurrStr != '0' && numCurrStr != '0.') {
                if (numCurrStr[0] == '-')
                    numCurrStr = numCurrStr.substr(1);
                else
                    numCurrStr = '-' + numCurrStr;
            }
            OutResult(numCurrStr);
            break;
        case "1/x":
            //倒数
            if (numCurrStr == '0') {
                Clear();
                OutResult('除数不能为0');
            }
            else {                
                numResult = (div(1, parseFloat(numCurrStr))).toFixed(maxLength);
                numCurrStr = numResult.toString();
                OutResult(numCurrStr, true);
            }
            break;
        case "%":
            //百分数
            if (numCurrStr != 0) {
                numResult = div(parseFloat(numCurrStr), 100);
                numCurrStr = numResult.toString();
                OutResult(numCurrStr, true);
            }
            break;
        case "√":
            //开平方
            numResult = parseFloat(numCurrStr);
            if (numResult < 0) {
                Clear();
                OutResult('负数不能开平方！');
            }
            else {
                numResult = (Math.sqrt(numResult)).toFixed(maxLength);
                numCurrStr = numResult.toString();
                OutResult(numCurrStr, true);
            }
            break;

            //2元运算符：+-x/
        case "+":
        case "-":
        case "÷":
        case "×":
            opFlag = true;
            //连续运算
            if (operator != '') {
                switch (operator) {
                    case "+":
                        numResult = add(parseFloat(numLastStr), parseFloat(numCurrStr));
                        numCurrStr = numResult.toString();
                        OutResult(numCurrStr, true);
                        break;
                    case "-":
                        numResult = sub(parseFloat(numLastStr), parseFloat(numCurrStr));
                        numCurrStr = numResult.toString();
                        OutResult(numCurrStr, true);
                        break;
                    case "×":
                        numResult = (mul(parseFloat(numLastStr), parseFloat(numCurrStr))).toFixed(maxLength);
                        numCurrStr = numResult.toString();
                        OutResult(numCurrStr, true);
                        break;
                    case "÷":
                        if (numCurrStr == '0') {
                            Clear();
                            OutResult('除数不能为0');
                            break;
                        }
                        numResult = (div(parseFloat(numLastStr), parseFloat(numCurrStr))).toFixed(maxLength);
                        numCurrStr = numResult.toString();
                        OutResult(numCurrStr, true);
                        break;
                    default:
                        break;
                }
            }
            operator = btnTxt;
            numLastStr = numCurrStr;
            break;

            //结果运算符
        case "=":
            switch (operator) {
                case "+":
                    numResult = add(parseFloat(numLastStr), parseFloat(numCurrStr));
                    numCurrStr = numResult.toString();
                    OutResult(numCurrStr,true);
                    break;
                case "-":
                    numResult = sub(parseFloat(numLastStr), parseFloat(numCurrStr));
                    numCurrStr = numResult.toString();
                    OutResult(numCurrStr, true);
                    break;
                case "×":
                    numResult = (mul(parseFloat(numLastStr), parseFloat(numCurrStr))).toFixed(maxLength);
                    numCurrStr = numResult.toString();
                    OutResult(numCurrStr, true);
                    //console.log(numResult + '@' + numCurrStr);
                    break;
                case "÷":
                    if (numCurrStr == '0') {
                        Clear();
                        OutResult('除数不能为0');
                        break;
                    }
                    numResult = (div(parseFloat(numLastStr), parseFloat(numCurrStr))).toFixed(maxLength);
                    numCurrStr = numResult.toString();
                    OutResult(numCurrStr, true);
                    break;
                default:
                    break;
            }
            operator = '';
            break;

        default:
            break;
    }
}

function Clear() {
    numCurrStr = '0';
    numLastStr = '0';
    operator = '';
}

function OutResult(str, isValid) {
    //输出结果
    if (isValid && str.indexOf('.') > 0) {
        //去掉末尾连续的0
        while (str[str.length - 1] == '0')
            str = str.substring(0, str.length - 1);
        if(str[str.length-1]=='.')
            str = str.substring(0, str.length - 1);
        numCurrStr = str;
    }
    if (document.getElementById("box_result").innerText)
        document.getElementById("box_result").innerText = str;
    else if (document.getElementById("box_result").textContent)
        document.getElementById("box_result").textContent = str;
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
