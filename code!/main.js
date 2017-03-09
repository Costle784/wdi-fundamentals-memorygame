console.log("JS file is connected to HTML! Woo!");

var cardInput; 

setTimeout(getValue,400);

function showPrompt() {
	return window.prompt("Welcome to Forget Me Not!\nPlease enter a number 1-5\n1 - simple\n2 - easy\n3 - just right\n4 - hard\n5 - INSANE","3")
}	

function getValue() {
	switch (Number(showPrompt())) {
		case 5:
			cardInput = 24;
			break;
		case 4:
			cardInput = 18;
			break;	
		case 3:
			cardInput = 12;
			break;	
		case 2:
			cardInput = 8;
			break;
		case 1:
			cardInput = 4;
			break;
		default:	
			cardInput = 12;
			break;	
	}		
	makeCards(cardInput);
}

var cards = [];
var gameBoard = document.getElementById('game-board');

function makeCards(num){		
	for(var i = 0; i < cardInput; i++){
		var cardElement = document.createElement('div');
		cardElement.className ='card'; 
		gameBoard.appendChild(cardElement);
		cards.push(cardElement); 
	}
	makeValueArray(cardInput);
	createStartButton();
}

var valueArray = [];

function makeValueArray(num) {
	for (var i = 0; i < num; i++) {
		if (i % 2) {
			valueArray.push("queen");
		}
		else {
			valueArray.push("king")
		}
	}

shuffle(valueArray);
} 

function shuffle(arr) {
 	var m = arr.length, t, i;
  
  	while(m){
	    i = Math.floor(Math.random() * m--);
	    t = arr[m];
	    arr[m] = arr[i];
	    arr[i] = t;
	}
setAttributes(valueArray);
}

function setAttributes(arr) {
	for(var i = 0; i < cards.length; i++) {	
		cards[i].addEventListener('click', flipOver)  // add 'click' event listener to each card and have it trigger flipOver function
		cards[i].setAttribute('data-card', valueArray[i]); // add 'data-card' attribute and a random 'king' or 'queen' value to 'data-card'
	}	
}

var cardsInPlay = []; 

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


// function quickDisplay(arr){
//  	for(i = 0; i < arr.length; i++){
//  		if(arr[i] === "queen"){
//  			setTimeout(showCard, 3000);
// 		}
//  	}
// }

function createStartButton(){
	var startButton = document.createElement('button');
	var startContainer = document.getElementById('startContainer');
	startContainer.appendChild(startButton);
	startButton.innerHTML = 'Start';
	startButton.classname = "startbutt";
	startButton.addEventListener('click', showCards)
}


function showCards(arr){
	for(i = 0; i < cards.length; i++){
		
		if(cards[i].getAttribute('data-card') === "queen"){
			cards[i].innerHTML = '<img src="images/Queen.jpg">';
		}
		else{
			cards[i].innerHTML = '<img src="images/King.jpg">';
		}
	}
	window.setTimeout(flipBackOver, 2000);
}	

function flipBackOver(){
	var playingCards = document.getElementsByClassName('card');
	
	for(i = 0; i < playingCards.length; i++){
		playingCards[i].innerHTML = "";

	}
}

function isMatch(){
	if(cardsInPlay[0] === cardsInPlay[1]){
		var popup = document.getElementById('myPopup');
		popup.classList.toggle('show');
	}
}




















