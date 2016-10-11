// common variables
var iBytesUploaded = 0;
var iBytesTotal = 0;
var iPreviousBytesLoaded = 0;
var iMaxFilesize = 1048576; // 1MB
var oTimer = 0;
var sResultFileSize = '';

function fileSelected() {
    // get selected file element
    var oFile = document.getElementById('image_file').files[0];

    // 过滤非图片文件
    var rFilter = /^(image\/bmp|image\/gif|image\/jpeg|image\/png|image\/tiff)$/i;
    if (! rFilter.test(oFile.type)) {
        //document.getElementById('error').style.display = 'block';
        return;
    }

    // little test for filesize
    if (oFile.size > iMaxFilesize) {
        //文件太大
        return;
    }

    // 预览图片
    var oImage = document.getElementById('preview');

    // prepare HTML5 FileReader
    var oReader = new FileReader();
        oReader.onload = function(e){
        oImage.src = e.target.result;
        oImage.onload = function () { // binding onload event
            sResultFileSize = bytesToSize(oFile.size);
        };
    };

    // read selected file as DataURL
    oReader.readAsDataURL(oFile);

    //使用提交上传
    //选完图片自动上传
    //startUploading();
}

function startUploading() {
	//console.log('start upload 0');
	
    // cleanup all temp states
    iPreviousBytesLoaded = 0;

    var vFD = new FormData(document.getElementById('upload_form')); 

    // create XMLHttpRequest object, adding few event listeners, and POSTing our data
    var oXHR = new XMLHttpRequest();        
    //oXHR.upload.addEventListener('progress', uploadProgress, false);
    oXHR.addEventListener('load', uploadFinish, false);
    oXHR.addEventListener('error', uploadError, false);
    oXHR.addEventListener('abort', uploadAbort, false);
    oXHR.open('POST', apiRootUrl+'upload/');
    oXHR.send(vFD);
    
    console.log('start upload');

    // set inner timer
    oTimer = setInterval(doInnerUpdates, 300);
}

function doInnerUpdates() {
    // 显示上传速度
    var iCB = iBytesUploaded;
    var iDiff = iCB - iPreviousBytesLoaded;

    //console.log(iCB + '@' + iDiff);

    // if nothing new loaded - exit
    if (iDiff == 0)
        return;


    iPreviousBytesLoaded = iCB;
    iDiff = iDiff * 2;
    var iBytesRem = iBytesTotal - iPreviousBytesLoaded;
    var secondsRemaining = iBytesRem / iDiff;

    // update speed info
    var iSpeed = iDiff.toString() + 'B/s';
    if (iDiff > 1024 * 1024) {
        iSpeed = (Math.round(iDiff * 100/(1024*1024))/100).toString() + 'MB/s';
    } else if (iDiff > 1024) {
        iSpeed =  (Math.round(iDiff * 100/1024)/100).toString() + 'KB/s';
    }

    //console.log(iSpeed);
    //显示上传速度
    //document.getElementById('speed').innerHTML = iSpeed;
    //document.getElementById('remaining').innerHTML = '| ' + secondsToTime(secondsRemaining);        
}

function uploadProgress(e) { // upload process in progress
    if (e.lengthComputable) {
        iBytesUploaded = e.loaded;
        iBytesTotal = e.total;
        var iPercentComplete = Math.round(e.loaded * 100 / e.total);
        var iBytesTransfered = bytesToSize(iBytesUploaded);

        document.getElementById('progress_percent').innerHTML = iPercentComplete.toString() + '%';
        document.getElementById('progress').style.width = (iPercentComplete * 4).toString() + 'px';
        document.getElementById('b_transfered').innerHTML = iBytesTransfered;
        if (iPercentComplete == 100) {
            var oUploadResponse = document.getElementById('upload_response');
            oUploadResponse.innerHTML = '<h1>Please wait...processing</h1>';
            oUploadResponse.style.display = 'block';
        }
    } else {
        document.getElementById('progress').innerHTML = 'unable to compute';
    }
}

function uploadFinish(e) {
    // upload successfully finished
    if (e.target.responseText == 'error'){
        document.getElementById('imgpicvalue').value = '';
        alert('文件格式不正确！');
    }  
    else {
        document.getElementById('imgpicvalue').value = e.target.responseText;
    }
    clearInterval(oTimer);
}

function uploadError(e) {
    // upload error
    //alert("上传出错");
}  

function uploadAbort(e) {
    // upload abort
    //alert("上传中断");    
}

function bytesToSize(bytes) {
    var sizes = ['Bytes', 'KB', 'MB'];
    if (bytes == 0) return 'n/a';
    var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
    return (bytes / Math.pow(1024, i)).toFixed(1) + ' ' + sizes[i];
};