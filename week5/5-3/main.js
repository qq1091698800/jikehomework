var charArr = [];//字母对象数组，保存每个字母名称、字母出现位置列表
var maxCharCount = 1;//字母出现最多的次数

//为字母对象数组，添加出现位置
function AddCharPosition(char, position) {
    var isFind = false;
    //在字母对象数组中查找，是否有现有字母名称的对象
    for (var i = 0; i < charArr.length; i++) {
        if (charArr[i].char == char) {
            charArr[i].charPositions.push(position);
            if (charArr[i].charPositions.length > maxCharCount)
                //记录出现最多次数
                maxCharCount = charArr[i].charPositions.length;
            isFind = true;
            break;
        }
    }
    if (!isFind) {
        //不在字母数组，添加到字母对象数组
        var charObj = { char: char/*字母名称*/, charPositions: []/*字母出现位置*/ };
        charObj.char = char;
        charObj.charPositions.push(position);
        charArr.push(charObj);
    }
}

function DoCalculate() {
    charArr = [];
    var charsList = document.getElementById('txtChars').value;
    var chars = charsList.split(',');
    if (charsList.trim() == '') {
        OutResult('输入不能为空！');
        return;
    }

    var rightCount = 0;
    for (var i = 0; i < chars.length; i++) {
        if (chars[i].length == 1) {
            //排除输入错误，只计算单个字母出现的次数
            rightCount++;
            AddCharPosition(chars[i], i);
            console.log('$$ ' + charArr[0].char);
        }
        else
            console.log('err: ' + charArr[i]);
    }
    if (rightCount == 0) {
        OutResult('请输入多个字母，每个字母以逗号分开！');
        return;
    }

    var indexMax = 0;
    var txt = '';
    for (var i = 0; i < charArr.length; i++) {
        
        if (charArr[i].charPositions.length == maxCharCount) {
            //出现最多次数的字母
            txt += '\r\n出现最多次数的字母：' + charArr[i].char;
            txt += '\r\n出现次数：' + charArr[i].charPositions.length;
            txt += '\r\n出现位置：';
            for (var k = 0; k < charArr[i].charPositions.length; k++) {
                txt += charArr[i].charPositions[k];
                if (k != charArr[i].charPositions.length - 1)
                    txt += ',';
            }
            txt += "\r\n";
            OutResult(txt);
        }
    }
}

function OutResult(txt) {
    //显示结果
    document.getElementById('txtResult').innerText = txt;
}
