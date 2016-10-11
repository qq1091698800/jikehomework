var mysql = require('mysql');
var orm = require("orm");
var config = require('../../config/config');

module.exports ={
    getModel: function (callback) {
        orm.connect("mysql://" + config.user + ":" + config.password + "@" + config.dbhost + "/" + config.database + "", function (err, db) {
            if (err) {
                console.log(err);
                throw err;
            }
            var News = db.define("news", {
                NewsId: { type: 'serial', key: true },
                CategoryId: Number,
                NewsTitle: String,
                NewsImg: String,
                NewsContent: String,
                AddTime: Date
            });
            callback(News);
        });
    }
}