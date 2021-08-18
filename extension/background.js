let currVideoID;
let mapping;
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
	if ( tab.url && tab.url.includes('watch?v') ) {
		if(currVideoID != tab.url.split('?v=')[1].slice(0,11)) {
			//New video
			if (changeInfo.url) {
				chrome.tabs.sendMessage( tabId, {
				  type: 'closeSearch',
				  url: changeInfo.url
				})
			  }
			currVideoID = tab.url.split('?v=')[1].slice(0,11);
			let endpoint = `https://youtubedl.moizservers.tech:5000/get-mapping?videoid=${currVideoID}`;
			var xhr = new XMLHttpRequest();
			xhr.open("GET", endpoint, true);
			xhr.onreadystatechange = function () {
				let resp = ''
				try {
					resp = JSON.parse(xhr.responseText);
					if (resp.mapping) {
						mapping = resp.mapping;
					}
				} catch(error) {
					console.log('Couldnt parse');
				}
				chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) { 
					if (request.type == "getTimestamp") {
						if (mapping) {
							sendResponse(mapping[request.word]);
						}
					}
				});
			}
			xhr.send();
		}
	}
});





//Words to search
	//Elon 1470: Neural
	//Blaine JRE: breath
	//Mike Tyson Impaulsive: Boxing