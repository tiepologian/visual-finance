var controller = require('../controllers/finance');

module.exports = function (app) {
    app.get('/', function (req, res) {
	res.render('index');
    });

    app.get('/symbol/:id', function(req, res) {
	controller.getSymbol(req, res, app.get("faye"));
    });
};
