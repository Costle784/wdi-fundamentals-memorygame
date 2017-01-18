console.log("JS file is connected to HTML! Woo!")
var cardOne = "queen";
var cardTwo = "queen";
var cardThree = "king";
var cardFour = "king";


document.querySelector('.board').setAttribute('id','game-board');

function createCards(){
	for(var i = 1; i <= 4;i++){
	var gameBoard = document.getElementById('game-board');
	var newDiv = document.createElement('div');
	newDiv.className="card";
	gameBoard.appendChild(newDiv);
	}
}

createCards(); 


