const emojiSets = {
  fruit: ['🍎', '🍌', '🍇', '🍓', '🍒', '🥝', '🍍', '🍑'],
  emoji: ['😂', '😍', '😎', '🤩', '😜', '😱', '😴', '🤯'],
  animal: ['🐶', '🐱', '🐰', '🦊', '🐼', '🐨', '🐯', '🦁']
};

let gameGrid = [];
let firstCard = null;
let secondCard = null;
let lockBoard = false;
let matchedPairs = 0;

const gameBoard = document.getElementById('gameBoard');
const restartBtn = document.getElementById('restart');
const congratsMessage = document.getElementById('congratsMessage');

function shuffle(array) {
  return array.sort(() => 0.5 - Math.random());
}

function createCard(value) {
  const card = document.createElement('div');
  card.classList.add('card');
  card.dataset.value = value;

  const inner = document.createElement('div');
  inner.classList.add('card-inner');

  const front = document.createElement('div');
  front.classList.add('card-front');
  front.textContent = '?';

  const back = document.createElement('div');
  back.classList.add('card-back');
  back.textContent = value;

  inner.appendChild(front);
  inner.appendChild(back);
  card.appendChild(inner);

  card.addEventListener('click', flipCard);
  return card;
}

function setupBoard() {
  const set = emojiSets[gameType] || emojiSets.fruit;
  gameGrid = [...set, ...set];
  shuffle(gameGrid);

  gameBoard.innerHTML = '';
  matchedPairs = 0;
  congratsMessage.classList.remove('show');

  gameGrid.forEach(value => {
    const card = createCard(value);
    gameBoard.appendChild(card);
  });
}

function flipCard() {
  if (lockBoard || this.classList.contains('flipped')) return;

  this.classList.add('flipped');
  if (!firstCard) {
    firstCard = this;
  } else {
    secondCard = this;
    checkMatch();
  }
}

function checkMatch() {
  const isMatch = firstCard.dataset.value === secondCard.dataset.value;
  if (isMatch) {
    disableCards();
    matchedPairs += 1;
    if (matchedPairs === gameGrid.length / 2) {
      congratsMessage.classList.add('show');
    }
  } else {
    unflipCards();
  }
}

function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);
  resetSelection();
}

function unflipCards() {
  lockBoard = true;
  setTimeout(() => {
    firstCard.classList.remove('flipped');
    secondCard.classList.remove('flipped');
    resetSelection();
  }, 1000);
}

function resetSelection() {
  [firstCard, secondCard, lockBoard] = [null, null, false];
}

restartBtn.addEventListener('click', setupBoard);
window.addEventListener('DOMContentLoaded', setupBoard);
