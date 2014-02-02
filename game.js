$(document).ready(function() {
	var peli = new game();

	$("#clickMe").click(function() {
		peli.addClicks(1);
		$("#clicks").text(peli.getClicks());
	});
});

function game() {
	this.clicks = 0;
	populateShop();
	
	this.getClicks = getClicks;
	function getClicks() {
		return this.clicks;
	}
	
	this.addClicks = addClicks;
	function addClicks(c) {
		this.clicks += c;
	}
}

	// populate shoppables
function populateShop() {
	$.getJSON("http://127.0.0.1/clicker2/shoppables.json", function(data) {
		$.each(data.shop, function(i, item) {
			$.each(item, function(key, value) {
				$("#shopMenu").append(key + " "+ value + "<br>");
			});
		});
	});
}	
