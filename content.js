
let searchBarExists = false;
function openSearchBar(e) {
	//Open search bar on option+f
	if (window.location.href.includes('watch') && e.code=="KeyF" && e.altKey) {
		document.removeEventListener('click',function(e){
			console.log('removed listener');
		})
		alert('Open search bar');
		// document.addEventListener('keydown',seekToTimeStamp);
		document.getElementById('searchBar___container').classList.add("activeSearch");
	}
} 

function seekToTimeStamp(e) {
	console.log('Seeking time stamp my nigga')
}

function createSearchBar(e){
	if(!(window.location.href.includes('watch'))) {
		return false;
	}
	console.log('Creating search bar');
	//Divs
	var searchBarContainer = document.createElement('div'); 
	searchBarContainer.setAttribute('class','centered')
	searchBarContainer.setAttribute('id','searchBar___container');

	var searchBarInputContainer = document.createElement('div');
	searchBarInputContainer.setAttribute('class','searchBar___inputContainer centered');

	var searchBarJump = document.createElement('div');
	searchBarJump.setAttribute('class','searchBar__jump');

	//Inputs
	var searchBarInput = document.createElement('input');
	searchBarInput.setAttribute('class','searchBar__input');
	searchBarInput.setAttribute('name','query');
	searchBarInput.setAttribute('type','text');

	//Spans
	var searchBarCounter = document.createElement('span');
	searchBarCounter.innerHTML = '0 of 0';
	searchBarCounter.setAttribute('class','searchBar__counter');

	var searchBarJumpAnd = document.createElement('span');
	searchBarJumpAnd.innerHTML = '&and;'

	var searchBarJumpOr = document.createElement('span');
	searchBarJumpOr.innerHTML = '&or;'

	var searchBarClose = document.createElement('span');
	searchBarClose.innerHTML = '&#x274c';
	searchBarClose.setAttribute('id','closeSearchBar')
	searchBarClose.setAttribute('class','searchBar___close centered')

	//Link elements
	searchBarContainer.appendChild(searchBarInputContainer);
	searchBarContainer.appendChild(searchBarClose);
	searchBarInputContainer.appendChild(searchBarInput);
	searchBarInputContainer.appendChild(searchBarCounter);
	searchBarInputContainer.appendChild(searchBarJump);
	searchBarJump.appendChild(searchBarJumpAnd);
	searchBarJump.appendChild(searchBarJumpOr);

	document.body.appendChild(searchBarContainer);
}

document.addEventListener('keydown',openSearchBar);
document.addEventListener('click',createSearchBar);


  

