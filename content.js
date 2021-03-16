
let word = '';
let idx = 0;
let numWords = 0;
let timestamps = [];

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) { 
	if (request.type == "closeSearch") {
		closeSearch(true);
		sendResponse(true);
	}
	return true;
});

function openSearchBar(e) {
	//Open search bar on option+f
	if (window.location.href.includes('watch') && e.code=="KeyF" && e.altKey) {
		if (!document.getElementById('searchBarOuter')) {
			createSearchBar();
			document.addEventListener('keydown',seekToTimeStamp);
		} else if (document.getElementById('searchBarOuter').style.display == 'none') {
			word = '';
			idx = 0;
			numWords = 0;
			timestamps = [];
			document.getElementById('searchBarInput').value = '';
			document.getElementById('wordCounter').innerHTML = `${idx} of ${numWords}`;
			document.getElementById('searchBarOuter').style.display = "flex";
		} else {
			closeSearch();
		}
	} 
} 

function nextTimeStamp(increment='up') {
	if ( increment == 'up' ) {
		idx += 1;
	} else {
		idx -= 1;
	}
	let timestamp = timestamps[idx-1];
	video = document.getElementsByTagName('video')[0];
	video.pause();
	video.currentTime = timestamp;
	video.play();
	document.getElementById('wordCounter').innerHTML = `${idx} of ${numWords}`;
}


function seekToTimeStamp(e) {
	if (e.key == "Enter" && (idx < numWords)) { 
		try {
			nextTimeStamp();
		} catch(error) {
			console.log(error);
		}
	} 
}

function incrementUp(e) {
	if (idx < numWords) {
		nextTimeStamp();
	}
}

function incrementDown(e) {
	if (idx > 1) {
		nextTimeStamp('down');
	}	
}

function closeSearch(e) {
	document.getElementById('searchBarOuter').style.display = 'none';
}

function handleInput(e) {
	word = e.target.value;
	chrome.runtime.sendMessage({type:"getTimestamp",word:word}, function(response){
		if (response) {
			numWords = response.length;
			timestamps = response;
		} else {
			idx = 0;
			numWords = 0;
			timestamps = [];
		}
		document.getElementById('wordCounter').innerHTML = `${idx} of ${numWords}`;
	})
}


function createSearchBar(){
	var searchBarOuter = document.createElement('div');
	searchBarOuter.setAttribute('id','searchBarOuter');

	var searchBarContainer = document.createElement('div')
	searchBarContainer.setAttribute('class','searchBarContainer');
	
	var searchBarInput = document.createElement('input');
	searchBarInput.setAttribute('id','searchBarInput');
    searchBarInput.setAttribute('name','query');
	searchBarInput.setAttribute('type','text');
	searchBarInput.setAttribute('placeholder','Search for a word');
	searchBarInput.addEventListener('input',handleInput);

	var counter = document.createElement('p');
	counter.setAttribute('id','wordCounter');
	counter.innerHTML = `0 of 0`

	var verticalLine = document.createElement('div');
	verticalLine.setAttribute('class','verticalLine');
	
	var jump = document.createElement('div')
	jump.style = 'display:flex';
	
	jumpStyle = 'padding-left: 5px; padding-right: 5px;margin:0;line-height:40px;color:#2c2c2c;'
	
	var jumpAnd = document.createElement('p')
	jumpAnd.setAttribute('id','jumpAnd');
    jumpAnd.innerHTML = '&and;'
	jumpAnd.style = jumpStyle;
	jumpAnd.addEventListener('click',incrementUp);
	
	var jumpOr = document.createElement('p')
	jumpOr.setAttribute('id','jumpOr');
    jumpOr.innerHTML = '&or;'
	jumpOr.style = jumpStyle;
	jumpOr.addEventListener('click',incrementDown);
	
	var close = document.createElement('p')
	close.setAttribute('id','closeIcon');
    close.style = 'margin:0;line-height: 40px;padding-right:5px;font-size:1.5em;color:#2c2c2c;'
	close.innerHTML = '&#215'
	close.addEventListener('click',closeSearch);

	//Link Elements
	searchBarOuter.appendChild(searchBarContainer)
    searchBarContainer.appendChild(searchBarInput)
    searchBarContainer.appendChild(counter)
    searchBarContainer.appendChild(verticalLine)
    searchBarContainer.appendChild(jump);
    jump.appendChild(jumpAnd);
    jump.appendChild(jumpOr);
    searchBarContainer.appendChild(close);
    
	var list = document.getElementById('primary-inner');
	list.insertBefore(searchBarOuter,list.childNodes[0]);
	
}

document.addEventListener('keydown',openSearchBar);


