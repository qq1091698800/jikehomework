var NewsController = require('../controllers/news.server.controller');
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();

module.exports = function (app) {
    
    app.route('/newslst')
        .get(NewsController.list);

    app.route('/newslstpage/:page')
        .get(NewsController.listpage);
    app.param('page', NewsController.listpage);

    app.route('/newslst/:catid')
        .get(NewsController.listByCatid);
    app.param('catid', NewsController.listByCatid);

    app.route('/news/:nid')
        .get(NewsController.getById);
    app.param('nid', NewsController.getById);

    app.route('/news/del/:delid')
        .get(NewsController.delById);
    app.param('delid', NewsController.delById);

    app.post('/news', multipartMiddleware, function (req, res) { NewsController.create(multipartMiddleware, req, res); });
}