
let word = '';
let idx = 0;
let numWords = 0;
let timestamps = [];
function openSearchBar(e) {
	//Open search bar on option+f
	if (window.location.href.includes('watch') && e.code=="KeyF" && e.altKey) {
		createSearchBar();
		document.addEventListener('keydown',seekToTimeStamp);
		// document.getElementById('searchBar___container').classList.add("activeSearch");
	}
} 

function seekToTimeStamp(e) {
	if (e.key == "Enter" && (idx < numWords)) { 
		try {
			let timestamp = timestamps[idx];
			console.log(timestamp);
			video = document.getElementsByTagName('video')[0];
			video.pause();
			video.currentTime = timestamp;
			video.play();
			idx += 1;
			document.getElementById('wordCounter').innerHTML = `${idx} of ${numWords}`;
		} catch(error) {
			console.log(error);
		}
	} 
}

function handleInput(e) {
	word = e.target.value;
	chrome.runtime.sendMessage({type:"getTimestamp",word:word}, function(response){
		if (response) {
			numWords = response.length;
			document.getElementById('wordCounter').innerHTML = `${idx} of ${numWords}`;
			timestamps = response;
		}
	})
}


function createSearchBar(){
	var searchBarOuter = document.createElement('div')
	searchBarOuter.style = 'display:flex;flex-direction:row-reverse;'
    var searchBarContainer = document.createElement('div')
    searchBarContainer.style = 'margin-bottom:10px;width: 300px;height: 40px;background: #DADADA;border-radius: 5px;display:flex;justify-content: space-between;';
	var searchBarInput = document.createElement('input');
	searchBarInput.style = 'margin:1%;height:30px;border:none;background: #DADADA;';
    searchBarInput.setAttribute('name','query');
	searchBarInput.setAttribute('type','text');
	searchBarInput.setAttribute('placeholder','Search for a word');
	searchBarInput.addEventListener('input',handleInput);
	var counter = document.createElement('p')
	counter.setAttribute('id','wordCounter');
	counter.innerHTML = `0 of 0`
	counter.style = 'margin:0;line-height:40px;color:#2c2c2c;';
    var verticalLine = document.createElement('div')
    verticalLine.style = 'border-left: 1px solid #2c2c2c;'
    var jump = document.createElement('div')
    jump.style = 'display:flex';
    jumpStyle = 'padding-left: 5px; padding-right: 5px;margin:0;line-height:40px;color:#2c2c2c;'
    var jumpAnd = document.createElement('p')
    jumpAnd.innerHTML = '&and;'
    jumpAnd.style = jumpStyle;
    var jumpOr = document.createElement('p')
    jumpOr.innerHTML = '&or;'
    jumpOr.style = jumpStyle;
    var close = document.createElement('p')
    close.style = 'margin:0;line-height: 40px;padding-right:5px;font-size:1.5em;color:#2c2c2c;'
	close.innerHTML = '&#215'
	searchBarOuter.appendChild(searchBarContainer)
    searchBarContainer.appendChild(searchBarInput)
    searchBarContainer.appendChild(counter)
    searchBarContainer.appendChild(verticalLine)
    searchBarContainer.appendChild(jump);
    jump.appendChild(jumpAnd);
    jump.appendChild(jumpOr);
    searchBarContainer.appendChild(close);
    
	var list = document.getElementById('primary');
	console.log(list.childNodes[0]);
	list.insertBefore(searchBarOuter,list.childNodes[0]);
	
}

document.addEventListener('keydown',openSearchBar);
// document.addEventListener('click',createSearchBar);


  

