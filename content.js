
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
    var searchBarContainer = document.createElement('div')
    searchBarContainer.style = 'display:flex;background:white;border: 1px solid #ccc;width:50%;justify-content: space-between;height:50px';
	var searchBarInput = document.createElement('input');
	searchBarInput.style = 'border:none;height:50px;font-size:16px;width:240px';
    searchBarInput.setAttribute('name','query');
	searchBarInput.setAttribute('type','text');
	searchBarInput.addEventListener('input',handleInput);
	var counter = document.createElement('p')
	counter.setAttribute('id','wordCounter');
    counter.innerHTML = `0 of 0`
    var verticalLine = document.createElement('div')
    verticalLine.style = 'border-left: 1px solid black;'
    var jump = document.createElement('div')
    jump.style = 'display:flex';
    jumpStyle = 'padding-left:5px;padding-right:5px;'
    var jumpAnd = document.createElement('p')
    jumpAnd.innerHTML = '&and;'
    jumpAnd.style = jumpStyle;
    var jumpOr = document.createElement('p')
    jumpOr.innerHTML = '&or;'
    jumpOr.style = jumpStyle;
    var close = document.createElement('p')
    close.style = 'margin-top:10px;'
    close.innerHTML = '&#x274c'
    searchBarContainer.appendChild(searchBarInput)
    searchBarContainer.appendChild(counter)
    searchBarContainer.appendChild(verticalLine)
    searchBarContainer.appendChild(jump);
    jump.appendChild(jumpAnd);
    jump.appendChild(jumpOr);
    searchBarContainer.appendChild(close);
    
    console.log('hmm');
    var list = document.getElementById('primary')
	list.insertBefore(searchBarContainer,list.childNodes[0]);
	
}

document.addEventListener('keydown',openSearchBar);
// document.addEventListener('click',createSearchBar);


  

