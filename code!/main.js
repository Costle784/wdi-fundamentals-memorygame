console.log("JS file is connected to HTML! Woo!")


document.querySelector('.board').setAttribute('id','game-board'); //set id (game-board) for wrapper (div) to hold new cardElements. 
var gameBoard = document.getElementById('game-board');			//set this to variable gameBoard.

var cardsInPlay = []; 
var cards = [];


function createCardArray(cardNum){		//loop to create new cardElents (divs), append them as children to gameBoard.
						//assign each cardElement a class of 'card' as a selector for css. 
										//push cardElements into an array, var cards. 		
	for(var i = 0; i < cardNum; i++){
		var cardElement = document.createElement('div');
		cardElement.className='card';
		gameBoard.appendChild(cardElement);
		cards.push(cardElement); 
	}
}
createCardArray(8);

var valueArray = ["queen","queen","king","king","queen","queen","king","king"]

function shuffle(array) {
  var m = array.length, t, i;
  
  	while(m){
	    i = Math.floor(Math.random() * m--);
	    t = array[m];
	    array[m] = array[i];
	    array[i] = t;
	}
  	console.log(valueArray);
}

shuffle(valueArray);

function setAttributes(array){
	
	for(var i = 0; i < cards.length; i++){	
		cards[i].addEventListener('click', flipOver)  // add 'click' event listener to each card and have it trigger flipOver function
		cards[i].setAttribute('data-card', valueArray[i]); // add 'data-card' attribute and a random 'king' or 'queen' value to 'data-card'
	}	
}
setAttributes(valueArray);

function flipOver(){
	if(this.getAttribute('data-card') === "queen"){
		this.innerHTML = '<img src="images/Queen.jpg">';
		cardsInPlay.push(this.getAttribute('data-card'));
		if(cardsInPlay.length === 2){
			isMatch();
		}
	}
	else{
		this.innerHTML = '<img src="images/King.jpg">';
		cardsInPlay.push(this.getAttribute('data-card'));
		if(cardsInPlay.length === 2){
			isMatch();
		}
	}
}


 function isMatch() {
 	if(cardsInPlay[0] === cardsInPlay[1]){   
	var popup = document.querySelector('.popuptext');
	    popup.classList.toggle('show');
 	} 
 }


// var popup = document.getElementById('myPopup');
//     popup.classList.toggle('show');



		

















