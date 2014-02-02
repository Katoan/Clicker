$(document).ready(function() {
	startGame();
});

function game(gameData) {
	clicks = 0;
	onClick = 1;
	boughtItems = [];
	var shopList = gameData;
	console.log(shopList);
	populateShop(shopList);
	$("#clickMe").click(function() {
		addClicks(onClick);
		$("#clicks").text(getClicks());
	});
	
	function getClicks() {
		return clicks;
	}
	
	function addClicks(c) {
		clicks += c;
	}
}	

function startGame() {
	$.getJSON("shoppables.json", function(data) {
		var items = [];
		$.each(data.shop, function(item) {
			items.push(data.shop[item]);
		});
		new game(items);
	});
}

function populateShop(shopItems) {
	$.each(shopItems, function(i, item) {
		$('<div id="'+item.name+'">').appendTo("#shopMenu");
		$.each(item, function(key, value) {
			$("#"+item.name).append(key+" : "+value+".<br />");
		});
		$("#shopMenu").append("<br />");
	});
}

function buyItem(item) {
}