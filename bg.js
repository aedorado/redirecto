var bllist;

if (localStorage['blocklist'] !== undefined) {
	bllist = JSON.parse(localStorage['blocklist']);
} else {
	bllist = [];
	updateLocalStoragebllist(bllist);
}

function updateLocalStoragebllist(bllist){
	localStorage['blocklist'] = JSON.stringify(bllist);	// JSON stringify used to store arrays
}

chrome.webRequest.onBeforeRequest.addListener(function(details) {
	for (var i = bllist.length - 1; i >= 0; i--) {
		var redirect = bllist[i];
		if (details.url.indexOf(redirect[0]) > -1) {
			return {
				redirectUrl : details.url.replace(redirect[0], redirect[1])
			};
		}
	}
}, {
	urls : ["<all_urls>"]
}, ["blocking"]);

chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
	if (request.addSite !== undefined) {
		bllist.push(request.addSite);
		updateLocalStoragebllist(bllist);
		sendResponse({
			urllist: bllist
		});
	} else if (request.removeSiteNum !== undefined) {
		bllist.splice(request.removeSiteNum, 1);
		updateLocalStoragebllist(bllist);
		sendResponse({
			urllist: bllist
		});
	} else if (request.getList !== undefined) {
		sendResponse({
			urllist: bllist
		});
	}
});