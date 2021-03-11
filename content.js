document.addEventListener('click', function(){
	if (window.location.href.includes('watch')) {
		chrome.runtime.sendMessage({type:"getTimestamp",word:"money"},function(response){
			console.log(response);
			//Seek to timestamp
		})
	}
})