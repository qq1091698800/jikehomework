var mysql = require('mysql');
var orm = require("orm");
var fs = require('fs');
var News = require('../models/news.server.model.js');

module.exports = {
    //获取1条新闻
    getById: function (req, res, next, id) {
        News.getModel(function (dbmodel) {
            dbmodel.find({ NewsId: id }, function (err, news) {
                res.json(news);
            });
        });
    },

    //删除
    delById: function (req, res, next, id) {
        News.getModel(function (dbmodel) {
            dbmodel.find({NewsId: id}).remove(function (err) {
                if (err)
                    throw err;
                res.send({ "result": 0 });
            });
        });
    },

    //返回所有-分页
    listpage: function (req, res, next, page) {
        News.getModel(function (dbmodel) {
            dbmodel.find({}).limit(5).offset(page * 5).order('-NewsId').run(function (err, news) {
                res.json(news);
            });
        });
    },

    //根据栏目id返回
    listByCatid: function (req, res, next, catid) {
        News.getModel(function (dbmodel) {
            dbmodel.find({CategoryId:catid}, function (err, news) {
                res.json(news);
            });
        });
    },


    //返回all
    list: function (req, res, next) {
        News.getModel(function (dbmodel) {
            dbmodel.find({}).order('-NewsId').run(function (err, news) {
                res.json(news);
            });
        });
    },

    //添加&更新 新闻
    create: function (mid, req, res, next) {

        var filename = '';
        if (req.files && req.files.image_file && req.files.image_file.size > 0) {
            var filetype = req.files.image_file.type;
            if (filetype.length > 5 && filetype.substr(0, 5) == 'image') {
                var ext = req.files.image_file.path.substr(req.files.image_file.path.lastIndexOf('.'));
                filename = '' + Date.parse(new Date()) + ext;

                //不是一个盘符会报错
                //fs.rename(req.files.image_file.path, './upload/' + filename);

                //通过文件读取复制的方法
                var readStream = fs.createReadStream(req.files.image_file.path);
                var writeStream = fs.createWriteStream("./upload/" + filename);
                readStream.pipe(writeStream);
                readStream.on('end', function () {
                    fs.unlinkSync(req.files.image_file.path);
                });

            }
            else {
                fs.unlink(req.files.image_file.path);
            }
        }

        var txtimageurl = req.body.txtimageurl;
        if (filename == '')
            filename = txtimageurl;
        var NewsTitle = req.body.NewsTitle;
        while (NewsTitle.indexOf('<') >= 0)
            NewsTitle = NewsTitle.replace('<', '&lt;');
        while (NewsTitle.indexOf('>') >= 0)
            NewsTitle = NewsTitle.replace('>', '&gt;');
        while (NewsTitle.indexOf('"') >= 0)
            NewsTitle = NewsTitle.replace('"', '&quot;');

        News.getModel(function (dbmodel) {
            if (req.body.NewsId != "0") {
                //更新
                dbmodel.find({ NewsId: req.body.NewsId }, function (err, rows) {
                    if (err) throw err;
                    if (rows.length > 0) {
                        rows[0].NewsTitle = NewsTitle;
                        rows[0].CategoryId = req.body.CategoryId;
                        rows[0].NewsContent = req.body.NewsContent;
                        rows[0].NewsImg = filename;
                        rows[0].save(function (errFinal) {
                            if (errFinal) throw errFinal;
                            res.type("html");
                            res.send("<script>window.location.href = 'http://localhost:3000/admin/';</script>");
                        })
                    }
                });

            }
            else {
                //创建
                dbmodel.create({ NewsTitle: req.body.NewsTitle, CategoryId: req.body.CategoryId, NewsContent: req.body.NewsContent, NewsImg: filename, AddTime: (new Date().getFullYear()) + '-' + ((new Date().getMonth() + 1)) + '-' + (new Date().getDate()) }, function (err) {
                    if (err)
                        throw err;
                    res.type("html");
                    res.send("<script>window.location.href = 'http://localhost:3000/admin/';</script>");
                });
            }
        });
    }


};