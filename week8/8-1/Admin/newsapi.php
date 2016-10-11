<?php
require_once('db.php');
header("Content-type: application/json; charset=utf-8");
$sql='';
switch($_REQUEST['t']){
	case "del":
		//删除新闻
		$sql='DELETE FROM `news` WHERE `NewsId`=' . $_REQUEST['id'];
		DB::ExcuteSql($sql);
		break;
	case "update":
		$NewsTitle=$_REQUEST['NewsTitle'];
		$CategoryId=$_REQUEST['CategoryId'];
		$NewsImg=$_REQUEST['NewsImg'];
		$NewsContent=$_REQUEST['NewsContent'];
		$NewsTitle = mysql_escape_string($NewsTitle);
		$NewsContent = mysql_escape_string($NewsContent);
		if($_REQUEST['NewsId']=='0')
			//添加新闻
			$sql="INSERT INTO `news`(`CategoryId`,`NewsTitle`,`NewsImg`,`NewsContent`,`AddTime`)VALUES({$CategoryId},'{$NewsTitle}','{$NewsImg}','{$NewsContent}',now())";
		else
			//更新新闻 
			$sql="UPDATE `news` SET `CategoryId`={$CategoryId},`NewsTitle`='{$NewsTitle}',`NewsImg`='{$NewsImg}',NewsContent='{$NewsContent}' WHERE `NewsId`=".$_REQUEST['NewsId'];
		DB::ExcuteSql($sql);
		break;
	case "cats":
		//返回新闻分类
		$sql='SELECT `CategoryId`,`CategoryName` FROM `newscategory`';
		DB::GetSqlList($sql, array("CategoryId","CategoryName"));
		break;
	case "news":
		//返回1条新闻
		$sql='SELECT `NewsId`,`CategoryId`,`NewsTitle`,`NewsImg`,`AddTime`,`NewsContent` FROM `news` WHERE `NewsId`=' . $_REQUEST['id'];
		DB::GetSqlList($sql, array("NewsId","CategoryId","NewsTitle","NewsImg","AddTime","NewsContent"));
		break;
	case "newslstbycatid":
		//返回新闻列表(按栏目id)
		$sql='SELECT `NewsId`,`CategoryId`,`NewsTitle`,`NewsImg`,`AddTime` FROM `news` WHERE `CategoryId`=' . $_REQUEST['CategoryId'] . ' ORDER BY `NewsId` DESC';
		DB::GetSqlList($sql, array("NewsId","CategoryId","NewsTitle","NewsImg","AddTime"));
		break;
	case "newslst":
		//返回新闻列表
		$sql='SELECT `NewsId`,`CategoryId`,`NewsTitle`,`NewsImg`,`AddTime` FROM `news` ORDER BY `NewsId` DESC';
		DB::GetSqlList($sql, array("NewsId","CategoryId","NewsTitle","NewsImg","AddTime"));
		break;
	default:
		break;
}?>