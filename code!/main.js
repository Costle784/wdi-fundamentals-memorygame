console.log("JS file is connected to HTML! Woo!");

setTimeout(getValue,400);  

function showPrompt() {
	return window.prompt("Kings and Queens!\nPlease enter a number 1-5\n1 - simple\n2 - easy\n3 - just right\n4 - hard\n5 - INSANE","3")
}	

var cardInput;

function getValue() {
	switch ((showPrompt())) {
		case '5':
			cardInput = 24;
			break;
		case '4':
			cardInput = 16;
			break;	
		case '3':
			cardInput = 12;
			break;	
		case '2':
			cardInput = 8;
			break;
		case '1':
			cardInput = 4;
			break;
		default:	
			cardInput = 12;
			break;	
	}		
	makeCardsAndBoard(cardInput); // Make board with cards according to user's input
}

var gameBoard = document.getElementById('game-board'), cards = [];

function makeCardsAndBoard(num) {		
	for (var i = 0; i < cardInput; i++) {
		var cardElement = document.createElement('div');
		cardElement.className = 'card'; 
		gameBoard.appendChild(cardElement);
		cards.push(cardElement); 
	}
	drawStartButton();
	drawScoreCounter();
	makeValueArray(cardInput);
}

var startButton = document.createElement('button'), startContainer = document.getElementById('startContainer');

function drawStartButton() {
	startContainer.appendChild(startButton);
	startButton.innerHTML = 'Start';
	startButton.addEventListener('click', showCards);
}

var scoreHolder = document.createElement('div'), scoreText = document.createElement('div'), 
scoreNumber = document.createElement('div');

function drawScoreCounter() {
	startContainer.appendChild(scoreHolder);
	
	scoreHolder.appendChild(scoreText);
	scoreHolder.appendChild(scoreNumber);  
    scoreHolder.className = 'scoreholder';
	
	scoreText.className = 'scoretext';
	scoreText.innerHTML = 'Score:'
	
	scoreNumber.className = 'scorenum';
	scoreNumber.innerHTML = '0';
}

var valueArray = [];

function makeValueArray(num) {
	valueArray = [];
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
		cards[i].setAttribute('data-card', valueArray[i]); // set 'data-card' to random 'king' or 'queen' value from valueArray
	}	
}

var cardsInPlay = []; 

function showCards(arr) {
	
	for (var i = 0; i < cards.length; i++) {
		if (cards[i].getAttribute('data-card') === "queen"){
			cards[i].innerHTML = '<img src="images/Queen.jpg">';
			cards[i].addEventListener('click', flipOver)
		}
		else{
			cards[i].innerHTML = '<img src="images/King.jpg">';
			cards[i].addEventListener('click', flipOver)
		}
	}
	setTimeout(function() {
    	flipBackOver(cards)
    }, 2000);
	drawResetButton();
}	

function flipOver() {
	if (this.getAttribute('data-card') === "queen") {
		this.innerHTML = '<img src="images/Queen.jpg">';
		this.removeEventListener('click', flipOver);
		cardsInPlay.push(this);
		console.log(cardsInPlay);
		}
	else if (this.getAttribute('data-card') === "king") {
		this.innerHTML = '<img src="images/King.jpg">';
		this.removeEventListener('click', flipOver);
		cardsInPlay.push(this);
		console.log(cardsInPlay);
		}
	if (cardsInPlay.length === 2) {
		isMatch();
	}
}

function flipBackOver(arr) {
	arr.map(function(element) {
		element.innerHTML = null;
	});
}

var card1;
var card2;

function isMatch() {
	card1 = cardsInPlay[0].getAttribute('data-card');
	card2 = cardsInPlay[1].getAttribute('data-card');
	console.log(card1,card2);

	if (popup.classList.contains('notamatch')) {
		popup.classList.remove('notamatch');
	}
	if (checkPerfect()) {
		popup.textContent ='PERFECT!'
		toggleMatchButton();
		scoreAddTen();
		setTimeout(toggleMatchButton,3500);
	}
	else if (card1 === card2) {
		cardsInPlay = [];
		popup.textContent = 'Match!'
		toggleMatchButton();
		scoreAddTen();
		setTimeout(toggleMatchButton,1500);
	}	
	else {
		setTimeout(function() {
			flipBackOver(cardsInPlay);
		},2000);
		cardsInPlay[0].addEventListener('click',flipOver);	
		cardsInPlay[1].addEventListener('click',flipOver);	
		popup.textContent = 'the king is not impressed';
		popup.classList.toggle('notamatch');
		toggleMatchButton();
		setTimeout(toggleMatchButton,2000);
		setTimeout(function() {
			cardsInPlay = [];
		},2000);	
		scoreMinusTen();
		}	
}

function checkPerfect() {
	if (card1 === card2 && cards.length === 12 && scoreNumber.textContent === '50' ||  
		card1 === card2 && cards.length === 4 && scoreNumber.textContent === '10' ||
		card1 === card2 && cards.length === 8 && scoreNumber.textContent === '30' ||
		card1 === card2 && cards.length === 16 && scoreNumber.textContent === '70' ||
		card1 === card2 && cards.length === 24 && scoreNumber.textContent === '130') {
			return true;
	}
}

var popup = document.getElementById('myPopup');
	
function toggleMatchButton() {
	popup.classList.toggle('show');
}

function scoreAddTen() {
	scoreNumber.innerHTML = Number(scoreNumber.innerHTML) + 10;  
}

function scoreMinusTen() {
	scoreNumber.innerHTML = Number(scoreNumber.innerHTML) - 10;
}

function drawResetButton() {
	startButton.textContent = "Reset";
	startButton.addEventListener('click', reset);
}

function reset() {
	resetCards();
	resetStartButton();
	scoreNumber.innerHTML = 0; // reset score
	makeValueArray(valueArray.length); // make new shuffled array of values assigned to cards
}

function resetStartButton() {
	startButton.textContent = "Start";
	startButton.removeEventListener('click', reset);
	startButton.addEventListener('click', showCards);
}

function resetCards() {
	cards.forEach(function(card) {
		card.removeEventListener('click', flipOver);
		card.innerHTML = null;
	});
}


















