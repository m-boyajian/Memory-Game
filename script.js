
const cards = document.querySelectorAll('.memory-card');
const startButton = document.getElementById("startButton");
const totalPairs = cards.length / 2;
let matchedPairs = 0;
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add('flip');

  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;
  } else {
    secondCard = this;
    checkForMatch();
  }
}

function checkForMatch() {
  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

  isMatch ? disableCards() : unflipCards();
}

function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);

  matchedPairs++;

  if (matchedPairs === totalPairs) {
    gameCompleted();
  }

  resetBoard();
}

function unflipCards() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');

    resetBoard();
  }, 1000);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

function shuffleCards() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  });
}

function startGame() {
  // Remove card click event listeners
  cards.forEach(card => card.removeEventListener('click', flipCard));

  // Shuffle the cards
  shuffleCards();

  // Reattach the click event listeners to the cards
  cards.forEach(card => card.addEventListener('click', flipCard));

  // Reset the board
  resetBoard();
}

function gameCompleted() {
  cards.forEach(card => card.classList.add('flip'));

  setTimeout(() => {
    shuffleCards();
    cards.forEach(card => card.classList.remove('flip'));
    resetBoard();

    if (matchedPairs === totalPairs) {
      alert("You Win!!!")
    }
  }, 2000); // Adjust the delay (in milliseconds) as needed before reshuffling
}

startButton.addEventListener("click", startGame);
