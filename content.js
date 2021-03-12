document.addEventListener('click', function(){
	if (window.location.href.includes('watch')) {
		document.addEventListener('keydown', function(e) {
			console.log(e.code);
			// chrome.runtime.sendMessage({type:"getTimestamp",word:"money"},function(response){
			// 	console.log(response);
			// 	//Seek to timestamp
			// 	// document.getElementById('movie_player').seekTo(10,true)  
			// })
		})
	}
})