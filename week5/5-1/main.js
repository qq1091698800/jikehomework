//计算学生分数
function CalculateMark() {
    var txtMark = document.getElementById('txtMark').value;
    if (txtMark.trim() == '') {
        document.getElementById('txtResult').innerText = '分数不能为空';
    }
    else if(isNaN(txtMark)){
        //输入的分数不正确
        document.getElementById('txtResult').innerText = '输入的分数不正确，请输入学生分数0~100';
    }
    else {
        var mark = parseInt(txtMark);
        if (mark < 0 || mark > 100) {
            //输入的分数不正确
            document.getElementById('txtResult').innerText = '请输入正确分值范围，0~100';
        }
        else {
            //0分是个例外
            var result = 10;
            if (mark != 0)
                result = Math.floor((100 - mark) / 10 + 1);
            //输出学生等级
            document.getElementById('txtResult').innerText = '该学生为' + result + '等生';
        }
    }
}