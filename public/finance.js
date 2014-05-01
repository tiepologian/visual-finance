// JavaScript Document
var wW;
var wH;

$(document).ready(function () {
    wW = $(window).width();
    wH = $(window).height();
    $('#search-form').on('submit', function(e) {
        e.preventDefault();
	$.ajax({
	    type: 'GET',
	    url:"http://54.72.213.154:8000/symbol/"+ $('#search').val(),
	}).done(function (res) {
	    $('#search').val(res.symbol + " - " + res.name + " (" + res.exchDisp + ")");
	    $('#search').blur();
	    createChart(res.symbol);
	}).fail(function (err) {
  	    console.log(err.responseText);
	});
    });
});

function createChart(symbol) {
    var name = symbol + "chart";
    $('#notes-ul').append('<li class="note" id='+name+' data-noteid=2 data-xpos=800 data-ypos=700><a style="width:512px;height:288px;padding:0;background-image:url(http://chart.finance.yahoo.com/c/1m/g/' + symbol +')"></a></li>');
    $("#"+name).draggable();
    var numberW = Math.floor((Math.random() * (wW - 400)) + 1);
    var numberH = Math.floor((Math.random() * (wH - 400)) + 1);
    $("#"+name).animate({
        left: "+=" + numberW,
        top: "+=" + numberH
    }, 1000);
}

$(window).load(function () {
    client = new Faye.Client('/messages');
    var subscription = client.subscribe('/messages', function (message) {
	var name = "stock";
	$('#notes-ul').append("<li class='note' id="+name+" data-noteid=2 data-xpos=800 data-ypos=700><a class='wrap' style='width:200px;height:200px;padding:0;'><p class='notetext' style='text-align:center;'>STOCK<br />"+message.text+"</p></a></li>");
	$("#"+name).draggable();
	var numberW = Math.floor((Math.random() * (wW - 400)) + 1);
    	var numberH = Math.floor((Math.random() * (wH - 400)) + 1);
    	$("#"+name).animate({
            left: "+=" + numberW,
            top: "+=" + numberH
    	}, 1000);
    });
});
