<?php
class DB{
	private static $servername = "192.168.0.248";
	private static $username = "libin";
	private static $password = "564bd808c5";
	private static $dbname = "jike_news_160831";	
	
	//获取列表数据，以json返回
	public static function GetSqlList($sql, $colNames){
		$conn = new mysqli(self::$servername, self::$username, self::$password, self::$dbname);
		if ($conn->connect_error) {
			die("Connection failed: " . $conn->connect_error);
		}
	
		$conn->query("set names 'utf8'");
		$result = $conn->query($sql);
	
		$seq=0;
		$arrGlobal=array();
	
		if ($result->num_rows > 0) {
			while($row = $result->fetch_assoc()) {
				$arr=array();
				for($i=0;$i<count($colNames);$i++){
					$arr[$colNames[$i]]=$row[$colNames[$i]];
				}
				$arrGlobal[$seq++]=$arr;
			}
			echo json_encode($arrGlobal);
		} else {
			echo "[]";
		}
	
		$conn->close();
	}


	//执行sql语句
	public static function ExcuteSql($sql){
		// 连接
		$conn = new mysqli(self::$servername, self::$username, self::$password, self::$dbname);
		// 
		if ($conn->connect_error) {
			die("Connection failed: " . $conn->connect_error);
		}
		
		try{
			$conn->query("set names 'utf8'");
			if($conn->query($sql)===TRUE){
				echo '{"result":0,"msg":"成功"}';
			}
			else{
				echo '{"result":-1,"msg":"失败"}';
			}
			$conn->close();
			
		}
		catch (Exception $ex){
			echo '{"result":-1,"msg":"失败"}';
		}
	}


} 
?>
