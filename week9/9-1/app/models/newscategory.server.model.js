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
            var NewsCategory = db.define("newscategory", {
                CategoryId: { type: 'serial', key: true },
                CategoryName: String
            });
            callback(NewsCategory);
        });
    }
}