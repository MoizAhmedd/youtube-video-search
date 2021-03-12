let currVideoID;
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
	if ( tab.url && tab.url.includes('watch?v') ) {
		if(currVideoID != tab.url.split('?v=')[1].slice(0,11)) {
			currVideoID = tab.url.split('?v=')[1].slice(0,11);
			let endpoint = `http://localhost:5000/get-mapping?videoid=${currVideoID}`;
			var xhr = new XMLHttpRequest();
			xhr.open("GET", endpoint, true);
			xhr.onreadystatechange = function () {
				var resp;
				if(xhr.responseText) {
					resp = JSON.parse(xhr.responseText);
				}
				chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
					if (request.type == "getTimestamp") {
						sendResponse(resp.mapping[request.word]);
					}
				});
			}
			xhr.send();
		}
	}
});


