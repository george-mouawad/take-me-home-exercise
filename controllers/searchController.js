
var mongoose = require('mongoose');
var log4js = require('log4js');
var logger = log4js.getLogger();

/*Search by keyword
    Accepts DB model, search field, keyword as query strings
    Returns JSON Objects + count if found else returns not found message with count = 0*/
exports.searchByKeyword = function (req, res) {

    var entity = req.query.model;
    var model = mongoose.model(entity);
    var searchField = req.query.searchField;
    var words = req.query.keywords.split(" ");
    var queryParam = {};
    queryParam[searchField] = words
    var query = model.find(queryParam);

    query.exec(function (err, object) {
        if (err) {
            res.send(500, err);
        } else {
            var count = object.length;
            res.format({
                //JSON response will show all object in JSON format
                json: function () {
                    if (object != null) {
                        res.json({
                            item: object,
                            total: count
                        });
                    }
                    else {
                        res.json({
                            message: 'Keyword Not Found',
                            total: 0
                        });
                    }
                }
            });
        }
    });

};