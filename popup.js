var sitelist = [];

$(document).ready(function() {
	chrome.extension.sendMessage({
		getList : true
	}, function(response) {
		sitelist = response.urllist;
		updateDisplay();
	});
});

function updateDisplay() {
	var bsList = $("#bs-list");
	bsList.html('');
	$.each(sitelist, function(i, item) {
		var listItem = $("<li id=" + i + "><span abbr='" + item[0] + "' class='item-left'>" + item[0].substring(0, 18) + ((item[0].length > 18) ? "...":"") + "</span> <span class='item-mid'>|<span> <span abbr='" + item[1] + "' class='item-right'>" + item[1].substring(0, 18) + ((item[1].length > 18) ? "...":"") + "</span><button class='remove-item' id='" + i + "'>REMOVE</button></li>");
		bsList.append(listItem[0]);
	});
}

$('#add').click(function() {
	console.log($('#sitetoblock').val(), $('#redirect-to').val());
	if ($('#sitetoblock').val() === "" || $('#redirect-to').val() == "") {
		return ;
	}
	chrome.extension.sendMessage({
		addSite : [$('#sitetoblock').val().trim(), $('#redirect-to').val().trim()]
	}, function(response) {
		sitelist = response.urllist;
		updateDisplay();
	});
});

$('ul').on('click', '.remove-item', function() {
	chrome.extension.sendMessage({
		removeSiteNum : this.id
	}, function(response) {
		sitelist = response.urllist;
		updateDisplay();
	});
});