console.log("JS file is connected to HTML! Woo!");

setTimeout(getValue,400);  

function showPrompt() {
	return window.prompt("Welcome to Forget Me Not!\nPlease enter a number 1-5\n1 - simple\n2 - easy\n3 - just right\n4 - hard\n5 - INSANE","3")
}	

var cardInput;

function getValue() {
	switch ((showPrompt())) {
		case '5':
			cardInput = 24;
			break;
		case '4':
			cardInput = 18;
			break;	
		case '3':
			cardInput = 12;
			break;	
		case '2':
			cardInput = 8;
			break;
		case '1':
			cardInput = 6;
			break;
		default:	
			cardInput = 12;
			break;	
	}		
	makeCards(cardInput);
}

var gameBoard = document.getElementById('game-board'), cards = [];

function makeCards(num) {		
	for (var i = 0; i < cardInput; i++){
		var cardElement = document.createElement('div');
		cardElement.className = 'card'; 
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
  	while(m) {
	    i = Math.floor(Math.random() * m--);
	    t = arr[m];
	    arr[m] = arr[i];
	    arr[i] = t;
	}
setAttributes(valueArray);
}

function setAttributes(arr) {
	for (var i = 0; i < cards.length; i++) {	
		// if (!(cards[i].getAttribute('data-card'))) {
			cards[i].addEventListener('click', flipOver)  // add 'click' event listener to each card and have it trigger flipOver function
			cards[i].setAttribute('data-card', valueArray[i]); // add 'data-card' attribute and a random 'king' or 'queen' value to 'data-card'
		// }
	}	
}

var cardsInPlay = []; 
console.log(cardsInPlay);
function flipOver() {
	if (this.getAttribute('data-card') === "queen") {
		this.innerHTML = '<img src="images/Queen.jpg">';
		cardsInPlay.push(this.getAttribute('data-card'));
		this.setAttribute('data-card', null);
		(console.log(cardsInPlay))
	}
	else if (this.getAttribute('data-card') === "king") {
			this.innerHTML = '<img src="images/King.jpg">';
			cardsInPlay.push(this.getAttribute('data-card'));
			this.setAttribute('data-card', null);
			(console.log(cardsInPlay))
	}
	if (cardsInPlay.length === 2) {
		isMatch();
	}
}

function toggleMatchButton() {
	var popup = document.getElementById('myPopup');
		popup.classList.toggle('show');
}

function isMatch(){
	if (cardsInPlay[0] === cardsInPlay[1]) {
		var popup = document.getElementById('myPopup');
		cardsInPlay = [];
		toggleMatchButton();
		setTimeout(toggleMatchButton,800);
	}	
	else {
		window.setTimeout(flipBackOver, 2000);
		cardsInPlay = [];
	}	
}

function createStartButton() {
	var startButton = document.createElement('button');
	var startContainer = document.getElementById('startContainer');
	startContainer.appendChild(startButton);
	startButton.innerHTML = 'Start';
	startButton.addEventListener('click', showCards)
}


function showCards(arr) {
	for (i = 0; i < cards.length; i++) {
		
		if(cards[i].getAttribute('data-card') === "queen"){
			cards[i].innerHTML = '<img src="images/Queen.jpg">';
		}
		else{
			cards[i].innerHTML = '<img src="images/King.jpg">';
		}
	}
	setTimeout(flipBackOver, 2000);
}	

function flipBackOver() {
	var playingCards = document.getElementsByClassName('card');
	for (i = 0; i < playingCards.length; i++) {
		playingCards[i].innerHTML = "";
	}
}

var scoreHolder = document.createElement('div');
var scoreText = document.createElement('div');
var scoreNumber = document.createElement('div');

function scoreCounter() {
	startContainer.appendChild(scoreHolder);
	scoreHolder.appendChild(scoreText);
	scoreHolder.appendChild(scoreNumber);  
	scoreHolder.className = 'scoreholder';
}

scoreCounter();




















