/*
start the game when the document is loaded
*/
$(document).ready(function() {
	startGame();
});

/*
the game,

game data is a list of items that are in the game
the game data (JSON) items have to have name (string), cps (number), price (number) and description (string) with those exact names
later more item properties will be added
*/

function game(gameData) {
	// initialize all the variables of the game
	clicks = 0;
	onClick = 1;
	clicksPerSecond = 0;
	boughtItems = {};
	var shopPopulated = 0;
	var shopList = gameData;
	// populate the bought items list with 0 of all in the game data
	populateBoughtItems(shopList);
	// populate the shop in the UI
	populateShop(shopList);
	// start the autoclicker interval
	setInterval(function() {
		addClicks(clicksPerSecond/10);
	}, 100);
	// give the clicker functionality
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
		$("#clicks").text('Influence: '+getClicks().toFixed(1));
	}

	function populateShop(shopItems) {
		$.each(shopItems, function(i, item) {
			if(!shopPopulated) {
				$('<div id="kauppa'+item.name+'"></div>').appendTo("#shopMenu");
				$('<div id="owned'+item.name+'"></div>').appendTo("#owned");
			}
			$("#kauppa"+item.name).text('');
			// generate item property divs inside the general div to populate the shop list
			$('<div id="kauppa'+item.name+'Name"></div>').appendTo("#kauppa"+item.name);
			$('<div id="kauppa'+item.name+'Cps"></div>').appendTo("#kauppa"+item.name);
			$('<div id="kauppa'+item.name+'Price"></div>').appendTo("#kauppa"+item.name);
			$("#kauppa"+item.name+"Name").text("Name : "+item.name);
			$("#kauppa"+item.name+"Cps").text("Clicks per Second : "+item.cps);
			$("#kauppa"+item.name+"Price").text("Value : "+item.price);
			
			/*
			$.each(item, function(key, value) {
				$("#kauppa"+item.name).append(key+" : "+value+"<br />");
			});
			*/
			// give the shop items update functionality on click
			$("#kauppa"+item.name).click(function() {
				buyItem(item);
				});
		});
		shopPopulated = 1;
	}
	
	// initialize the item inventory
	function populateBoughtItems(shopItems) {
		$.each(shopItems, function(i, item) {
			boughtItems[item.name] = 0;
		});
	}

	// buy the item, if enough money when you click
	function buyItem(item) {
		if (clicks >= item.price) {
		updateBoughtItems(item);
		addClicks(-item.price);
		addClicksPerSecond(item.cps);
		// I'll use a standard multiplier for this for now
		item.price = Math.floor(item.price*1.3);
		//update the new price to the item
		$("#kauppa"+item.name+"Price").text("Value : "+item.price);
		//populateShop(shopList);
		}
	}
	
	// update bought item list, when you buy an item
	function updateBoughtItems(item) {
		if (boughtItems[item.name] != 'undefined') {
			boughtItems[item.name] += 1;
		}
		$("#owned"+item.name).text(""+item.name+": "+boughtItems[item.name]+"");
		// if the item was bought for the first time, add the description text to the top of the description stream
		if (boughtItems[item.name] == 1) {
			$("#descriptionStream").prepend('<div class="description">'+item.description+'</div>');
		}
	}
}	

/*
Load the game data and start the game passing the game data as an argument
*/
function startGame() {
	$.getJSON("shoppables.json", function(data) {
		var items = [];
		$.each(data.shop, function(item) {
			items.push(data.shop[item]);
		});
		new game(items);
	});
}
