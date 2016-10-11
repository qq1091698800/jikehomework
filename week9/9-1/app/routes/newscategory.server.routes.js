var NewsController = require('../controllers/newscategory.server.controller');

module.exports = function (app) {
    app.route('/newscats')
        .get(NewsController.listNewsCats);
}