var controller = module.exports;
var request = require('request');
var Gearman = require("node-gearman");
var gearman = new Gearman('localhost', 4730);
var exec = require('child_process').exec;

controller.getSymbol = function(req, res, socket) {
    request("http://autoc.finance.yahoo.com/autoc?query="+req.params.id+"&callback=YAHOO.Finance.SymbolSuggest.ssCallback", function (error, response, body) {
	if (!error && response.statusCode == 200) {
            var jsonData = JSON.parse(body.match('{.*}')[0]);
            res.json(jsonData.ResultSet.Result[0]);
	    if(jsonData.ResultSet.Result.length < 1) return;
	    var symbol = jsonData.ResultSet.Result[0].symbol;
	    // start gearman jobs
	    var jobdata = new Object();
	    jobdata.symbol = jsonData.ResultSet.Result[0].symbol;
	    var job = gearman.submitJob("stock", JSON.stringify(jobdata));
	    job.on("end", function() {
		//
	    });
	    job.on("data", function(data) {
                stock = data.toString();
		socket.getClient().publish('/stock', {
		    text: stock
		});
            });
	    job.on("error", function (error) {
		console.log("Job1 Error");
    	    });
	    // exec python scrapy
	    exec("python /home/ubuntu/visual-finance/jobs/finance/launch.py "+symbol, function(error, stdout, stderr){
		socket.getClient().publish('/description', {
                    text: stdout
                });
	    });
        }
    });
}
