$(document).ready(function() {
	startGame();
});

function game(gameData) {
	clicks = 0;
	onClick = 1;
	clicksPerSecond = 0;
	boughtItems = {};
	var shopList = gameData;
	populateBoughtItems(shopList);
	populateShop(shopList);
	setInterval(function() {
		addClicks(clicksPerSecond/10);
	}, 100);
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
		$("#clicks").text(getClicks().toFixed(1));
	}

	function populateShop(shopItems) {
		$.each(shopItems, function(i, item) {
			$('<div id="'+item.name+'"></div>').appendTo("#shopMenu");
			$('<div id="owned'+item.name+'"></div>').appendTo("#owned");
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
	
	function populateBoughtItems(shopItems) {
		$.each(shopItems, function(i, item) {
			boughtItems[item.name] = 0;
		});
	}

	function buyItem(item) {
		if (clicks >= item.prize) {
		updateBoughtItems(item.name);
		addClicks(-item.prize);
		addClicksPerSecond(item.cps);
		item.prize = Math.floor(item.prize*1.3);
		populateShop(shopList);
		}
	}
	
	function updateBoughtItems(itemName) {
		if (boughtItems[itemName] != 'undefined') {
			boughtItems[itemName] += 1;
		} else {
			boughtItems[itemName] = 1;
		}
		$("#owned"+itemName).text(""+itemName+": "+boughtItems[itemName]+"");
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
