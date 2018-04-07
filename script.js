// script.js

// Card VAriables
let suits = ["Hearts", "Clubs", "Diamonds", "Spades"];
let values = [
  "Ace",
  "Two",
  "Three",
  "Four",
  "Five",
  "Six",
  "Seven",
  "Eight",
  "Nine",
  "Ten",
  "Jack",
  "Queen",
  "King"
];

// DOM Variables
let textArea = document.getElementById("text-area");
let newGameButton = document.getElementById("new-game-btn");
let hitButton = document.getElementById("hit-btn");
let stayButton = document.getElementById("stay-btn");

// Game Variables
let gameStarted = false;
let gameOver = false;
let playerWon = false;
let dealerCards = [];
let playerCards = [];
let dealerScore = 0;
let playerScore = 0;
let deck = [];

hitButton.style.display = "none";
stayButton.style.display = "none";
showStatus();

newGameButton.addEventListener("click", function() {
  gameStarted = true;
  gameOver = false;
  playerWon = false;

  deck = createDeck();
  shuffleDeck(deck);

  dealerCards = [getNextCard(), getNextCard()];
  playerCards = [getNextCard(), getNextCard()];

  newGameButton.style.display = "none";
  hitButton.style.display = "inline";
  stayButton.style.display = "inline";
  showStatus();
});

hitButton.addEventListener("click", function() {
  playerCards.push(getNextCard());
  checkForEndOfGame();
  showStatus();
});

stayButton.addEventListener("click", function() {
  gameOver = true;
  checkForEndOfGame();
  showStatus();
});

function createDeck() {
  let deck = [];
  for (let suitIndex = 0; suitIndex < suits.length; suitIndex++) {
    for (let valueIndex = 0; valueIndex < values.length; valueIndex++) {
      let card = {
        suit: suits[suitIndex],
        value: values[valueIndex]
      };
      deck.push(card);
    }
  }
  return deck;
}

function shuffleDeck(deck) {
  deck.forEach(element => {
    let swapIndex = Math.trunc(Math.random() * deck.length);
    let temp = deck[swapIndex];
    deck[swapIndex] = element;
    element = temp;
  });
}

function getNextCard() {
  return deck.shift();
}

function getCardString(card) {
  return card.value + " of " + card.suit;
}

function getCardNumericValue(card) {
  switch (card.value) {
    case "Ace":
      return 1;
    case "Two":
      return 2;
    case "Three":
      return 3;
    case "Four":
      return 4;
    case "Five":
      return 5;
    case "Six":
      return 6;
    case "Seven":
      return 7;
    case "Eight":
      return 8;
    case "Nine":
      return 9;
    default:
      return 10;
  }
}

function getScore(cardArray) {
  let score = 0;
  let hasAce = false;
  cardArray.forEach(cardArrayItem => {
    score += getCardNumericValue(cardArrayItem);
    if (cardArrayItem.value === "Ace") hasAce = true;
  });
  if (hasAce && score + 10 <= 21) return score + 10;
  return score;
}

function updateScores() {
  dealerScore = getScore(dealerCards);
  playerScore = getScore(playerCards);
}

function checkForEndOfGame() {
  updateScores();
  if (gameOver) {
    // Let dealer take cards.
    while (
      dealerScore < playerScore &&
      playerScore <= 21 &&
      dealerScore <= 21
    ) {
      dealerCards.push(getNextCard());
      updateScores();
    }
  }
  if (playerScore > 21) {
    playerWon = false;
    gameOver = true;
  } else if (dealerScore > 21) {
    playerWon = true;
    gameOver = true;
  } else if (gameOver) {
    if (playerScore > dealerScore) playerWon = true;
    else playerWon = false;
  }
}

function showStatus() {
  if (!gameStarted) {
    textArea.innerText = "Welcome to BlackJack!";
    return;
  }
  let dealerCardString = "";
  dealerCards.forEach(
    dealerCard => (dealerCardString += getCardString(dealerCard) + "\n")
  );
  let playerCardString = "";
  playerCards.forEach(
    playerCard => (playerCardString += getCardString(playerCard) + "\n")
  );
  updateScores();
  textArea.innerText = `
    Dealer has:\n ${dealerCardString} (score: ${dealerScore})\n\n
    Player has:\n ${playerCardString} (score: ${playerScore})\n\n
  `;
  if (gameOver) {
    if (playerWon) textArea.innerText += "YOU WIN!";
    else if (playerScore === dealerScore) textArea.innerText += "It's a TIE";
    else textArea.innerText += "DEALER WINS";
    newGameButton.style.display = "inline";
    hitButton.style.display = "none";
    stayButton.style.display = "none";
  }
}
