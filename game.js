$(document).ready(function() {
	startGame();
});

function game(gameData) {
	clicks = 0;
	onClick = 1;
	clicksPerSecond = 0;
	boughtItems = [];
	var shopList = gameData;
	console.log(shopList);
	populateShop(shopList);
	setInterval(function() {
		addClicks(clicksPerSecond);
	}, 1000);
	$("#clickMe").click(function() {
		addClicks(onClick);
	});
	
	function getClicksPerSecond() {
		return clicksPerSecond;
	}
	
	function addClicksPerSecond(c) {
		clicksPerSecond += c;
	}
	
	function getOnClick() {
		return onClick;
	}
	
	function changeOnClick(c) {
		onClick += c;
	}
	
	function getClicks() {
		return clicks;
	}
	
	function addClicks(c) {
		clicks += c;
		$("#clicks").text(getClicks());
	}

	function populateShop(shopItems) {
		$.each(shopItems, function(i, item) {
			$('<div id="'+item.name+'"></div>').appendTo("#shopMenu");
			$("#"+item.name).text('');
			$.each(item, function(key, value) {
				$("#"+item.name).append(key+" : "+value+".<br />");
			});
			$("#"+item.name).click(function() {
				buyItem(item);
				});
			$("#shopMenu").append("<br />");
		});
	}

	function buyItem(item) {
		if (clicks >= item.prize) {
		console.log(item.name);
		boughtItems.push(item.name);
		$("#owned").append("<p>"+item.name+"</p>");
		addClicks(-item.prize);
		addClicksPerSecond(item.cps);
		item.prize = Math.floor(item.prize*1.3);
		populateShop(shopList);
		}
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
