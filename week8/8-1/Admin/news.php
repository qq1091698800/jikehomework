<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>添加/编辑新闻</title>
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
    <?php
    //未登录跳转到登录页
    SESSION_START();
    if ($_SESSION['username']!='admin'){
    Header("Location: login.php");
    }
    ?>
    <div id="wrapper">
        <div id="page-wrapper">
            <div class="row">
                <div class="col-lg-12">
                    <h1 class="page-header">添加/编辑新闻</h1>
                </div>
            </div>
            <div class="row">
                <div class="col-lg-12">
                    <div class="panel panel-default">
                        <div class="panel-heading">
                            &nbsp;
                        </div>
                        <div class="panel-body">
                            <div class="row">
                                <div class="col-lg-6">
                                    <!--提交form-->
                                    <form role="form" id="upload_form" enctype="multipart/form-data" method="post" action="upload.php">
                                        <div class="form-group">
                                            <label>新闻标题</label>
                                            <input class="form-control" id="txttitle" placeholder="填写新闻标题">
                                        </div>
                                        <div class="form-group">
                                            <label>新闻分类</label>
                                            <select class="form-control" id="selcats"></select>
                                        </div>
                                        <div class="form-group">
                                            <label>新闻图片</label>
                                            <img id="preview" style="width:200px;" />
                                        </div>
                                        <div class="form-group">
                                            <label>更换图片</label>
                                            <!--保存图片文件名称，提交服务器-->
                                            <input id="imgpicvalue" type="hidden" />
                                            <input type="file" name="image_file" id="image_file" onchange="fileSelected();" />
                                        </div>
                                        <div class="form-group">
                                            <label>新闻内容</label>
                                            <textarea class="form-control" rows="3" id="txtcnt"></textarea>
                                        </div>
                                        <button type="button" id="btnsub" class="btn btn-default">提交</button>
                                        <button type="reset" class="btn btn-default">重置</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
    <!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
    <script src="js/jquery-1.11.2.min.js"></script>
    <script src="js/bootstrap.min.js"></script>
    <script src="js/upload.js"></script>
    <script src="js/app.js"></script>
    <script>
    var newsid = 0;
    $(document).ready(function () {
        if (GetQueryString("id") != "" && !isNaN(GetQueryString("id")))
            newsid = parseInt(GetQueryString("id"));
        getnews(newsid);
        $('#btnsub').on("click", function () { addOrUpdateNews(); });
    });
    </script>
</body>
</html>