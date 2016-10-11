<?php
list($s1, $s2) = explode(' ', microtime());
$now = mktime(date("h"),date('i'),date('s'),date("m"),date("d"),date("Y"));
$filename= date("Ymdhis", $now).substr($s2,0,3);

//文件扩展名
$fileext='';
switch($_FILES['image_file']['type']){
	case "image/gif":
		$fileext='.gif';
		break;
	case "image/jpeg":
	case "image/jpg":
	case "image/pjpeg":
		$fileext='.jpg';
		break;
	case "image/png":
	case "image/x-png":
		$fileext='.png';
		break;		
}
if($fileext!='' && $_FILES['image_file']['size']>1){
	//文件必须是图片，才上传文件
	move_uploaded_file(
	$_FILES["image_file"]["tmp_name"],
	"upload/".$filename.$fileext);	
	echo $filename.$fileext;
}
else{
	echo 'error';
}
?>