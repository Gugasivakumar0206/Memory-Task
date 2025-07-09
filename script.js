const board = document.getElementById('game-board');
const restartBtn = document.getElementById('restart');

const cardsArray = ['🍎','🍌','🍒','🍇','🍋','🍉','🍑','🍓'];
let cards = [...cardsArray, ...cardsArray]; // duplicate for pairs

let flippedCards = [];
let lockBoard = false;

function shuffle(array) {
  for (let i = array.length -1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i+1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function createBoard() {
  board.innerHTML = '';
  shuffled = shuffle(cards);

  shuffled.forEach(symbol => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = `
      <div class="front">${symbol}</div>
      <div class="back">?</div>
    `;
    card.addEventListener('click', flipCard);
    board.appendChild(card);
  });
}

function flipCard() {
  if (lockBoard || this.classList.contains('flip')) return;

  this.classList.add('flip');
  flippedCards.push(this);

  if (flippedCards.length === 2) {
    lockBoard = true;
    checkMatch();
  }
}

function checkMatch() {
  const [card1, card2] = flippedCards;
  const symbol1 = card1.querySelector('.front').textContent;
  const symbol2 = card2.querySelector('.front').textContent;

  if (symbol1 === symbol2) {
    flippedCards = [];
    lockBoard = false;
  } else {
    setTimeout(() => {
      card1.classList.remove('flip');
      card2.classList.remove('flip');
      flippedCards = [];
      lockBoard = false;
    }, 1000);
  }
}

restartBtn.addEventListener('click', () => {
  flippedCards = [];
  lockBoard = false;
  createBoard();
});

createBoard();
