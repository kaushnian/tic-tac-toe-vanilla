const winStates = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const cells = document.querySelectorAll('.cell');
const winnerMessageEl = document.querySelector('.message strong');
const messageOverlayEl = document.querySelector('.message');
const buttonRestartEl = document.querySelector('.button-restart');
const boardEl = document.querySelector('.board');

const players = { x: 'x', o: 'o' };
let currentPlayer = players.x;

buttonRestartEl.addEventListener('click', startGame);

startGame();

function startGame() {
  for (const cell of cells) {
    cell.addEventListener('click', cellClick, { once: true });
    cell.classList.remove(players.x);
    cell.classList.remove(players.o);
  }

  messageOverlayEl.classList.remove('show');
  boardEl.classList.remove(currentPlayer);
  currentPlayer = players.x;
  boardEl.classList.add(currentPlayer);
}

function cellClick(event) {
  // place mark
  const cell = event.target;

  placeMark(cell);

  // check for win
  if (isWin()) {
    showMessage(`${currentPlayer}'s win!`);
  }

  if (isDraw()) {
    showMessage('Draw!');
  }
  // check for draw
  // switch turns
  switchTurns();
}

function isWin() {
  for (const state of winStates) {
    const isWin =
      state.every((cellIndex) =>
        cells[cellIndex].classList.contains(players.x)
      ) ||
      state.every((cellIndex) =>
        cells[cellIndex].classList.contains(players.o)
      );

    if (isWin) {
      return true;
    }
  }

  return false;
}

function isDraw() {
  return [...cells].every(
    (cell) =>
      cell.classList.contains(players.x) || cell.classList.contains(players.o)
  );
}

function showMessage(message) {
  winnerMessageEl.innerHTML = message;
  messageOverlayEl.classList.add('show');
}

function placeMark(cell) {
  cell.classList.add(currentPlayer);
}

function switchTurns() {
  boardEl.classList.remove(currentPlayer);
  currentPlayer = currentPlayer === players.x ? players.o : players.x;
  boardEl.classList.add(currentPlayer);
}
