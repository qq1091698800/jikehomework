<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- 上述3个meta标签*必须*放在最前面，任何其他内容都*必须*跟随其后！ -->
    <title>新闻管理系统 - 登录</title>
    <!-- Bootstrap -->
    <link href="css/bootstrap.min.css" rel="stylesheet">
    <link href="css/main.css" rel="stylesheet">
    <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
      <script src="//cdn.bootcss.com/html5shiv/3.7.2/html5shiv.min.js"></script>
      <script src="//cdn.bootcss.com/respond.js/1.4.2/respond.min.js"></script>
    <![endif]-->
</head>
<body>

    <div class="container">
        <div class="row">
            <div class="col-md-4 col-md-offset-4">
                <div class="login-panel panel panel-default">
                    <div class="panel-heading">
                        <h3 class="panel-title">新闻管理系统 - 登录</h3>
                    </div>
                    <div class="panel-body">
                        <form role="form" action="login.php" method="post">
                            <fieldset>
                                <div class="form-group">
                                    <input class="form-control" placeholder="用户名" name="username" type="text" value="admin" autofocus>
                                </div>
                                <div class="form-group">
                                    <input class="form-control" placeholder="123456" name="password" type="password" value="123456">
                                </div>
<?php
//用户登录
SESSION_START();
if (!empty($_REQUEST['username'])){
	if($_REQUEST['username']== 'admin' && $_REQUEST['password']=='123456'){
		//登录成功，保存session
		$_SESSION['username']='admin';
		Header("Location: index.php");
	}
	else {
		echo '<div class="form-group"><span class="errortxt">密码错误！</span></div>';
	}
}           
?>
                                <input type="submit" class="btn btn-lg btn-success btn-block" value="登录" />
                            </fieldset>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
    <script src="js/jquery-1.11.2.min.js"></script>
    <!-- Include all compiled plugins (below), or include individual files as needed -->
    <script src="js/bootstrap.min.js"></script>
</body>
</html>