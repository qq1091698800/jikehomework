var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

var mysql = require('mysql');
var orm = require("orm");
var config = require('./config/config');

module.exports = function () {
    console.log('ini express..');
    var app = express();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
    //静态目录
    app.use(express.static(__dirname));
    //路由
    require('./app/routes/news.server.routes')(app);
    require('./app/routes/newscategory.server.routes')(app);
    //404处理
    app.use(function (req, res, next) {
        res.status(404);
        try {
            return res.json('not found');
        }
        catch (e) {
            console.log('404 set header after sent');
        }
    });
    //500处理
    app.use(function (err, req, res, next) {
        if (!err) {
            return next();
        }
        res.status(500);
        try {
            return res.json(err.message || 'server error');
        }
        catch (e) {
            console.log(e);
            console.log('500 set header after sent');
        }
    });
    return app;
};