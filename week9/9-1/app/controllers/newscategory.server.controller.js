var mysql = require('mysql');
var orm = require("orm");

var NewsCategory = require('../models/newscategory.server.model.js');

module.exports = {
    //返回所有栏目
    listNewsCats:function(req,res,next){
        NewsCategory.getModel(function (dbmodel) {
            dbmodel.find({}, function (err, news) {
                res.json(news);
            });
        });
    }
};