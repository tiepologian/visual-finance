var controller = module.exports;
var request = require('request');
var Gearman = require("node-gearman");

controller.getSymbol = function(req, res, socket) {
    request("http://autoc.finance.yahoo.com/autoc?query="+req.params.id+"&callback=YAHOO.Finance.SymbolSuggest.ssCallback", function (error, response, body) {
	if (!error && response.statusCode == 200) {
            var jsonData = JSON.parse(body.match('{.*}')[0]);
            res.json(jsonData.ResultSet.Result[0]);
	    // start gearman jobs
	    var jobdata = new Object();
	    jobdata.symbol = jsonData.ResultSet.Result[0].symbol;
	    var gearman = new Gearman('localhost', 4730);
	    var job = gearman.submitJob("stock", JSON.stringify(jobdata));
	    job.on("end", function() {
	        gearman.close();
	    });
	    job.on("data", function(data) {
                stock = data.toString();
		socket.getClient().publish('/messages', {
		    text: stock
		});
            });
	    job.on("error", function (error) {
        	gearman.close();
    	    });
        }
    });
}
