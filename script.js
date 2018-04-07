// script.js

let suits = [ 'Hearts', 'Clubs', 'Diamonds', 'Spades'];
let values = [ 'Ace', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Jack', 'Queen', 'King' ];

let textArea = document.getElementById('text-area');
let newGameButton = document.getElementById('new-game-btn');
let hitButton = document.getElementById('hit-btn');
let stayButton = document.getElementById('stay-btn');

hitButton.style.display = 'none';
stayButton.style.display = 'none';

function createDeck() {
    let deck = [];
    for( let suitIndex = 0; suitIndex < suits.length; suitIndex++) {
        for( let valueIndex = 0; valueIndex < values.length; valueIndex++) {
            let card = {
                suit: suits[suitIndex],
                value: values[valueIndex] 
            }
            deck.push( card );
        }
    }
    return deck;
}
function getNextCard() {
    return deck.shift();
}
function getCardString(card) {
    return card.value + ' of ' + card.suit;
}

let deck = createDeck();
let playerCards = [ getNextCard(), getNextCard() ];

console.log('Welcome to BlackJack!');
console.log('You are dealt:');

playerCards.forEach(element => {
    console.log('   ' + getCardString(element));
});
