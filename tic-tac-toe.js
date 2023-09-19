let moveArray = [['', '', ''], ['', '', ''], ['', '', '']];
let isPlayerTurn = true;
let hasWon = false;

const scoreObject = {
  player: 0,
  ties: 0,
  computer: 0
}


// Button makes X in table

function playerMove(gridButton, row, column) {
  if (!isPlayerTurn) {
    return;
  }
  if (!moveArray[row][column]) {
    document.querySelector(gridButton).innerHTML = 'X';
    moveArray[row][column] = 'X';
    isPlayerTurn = false;
    winCheck('X');
    if (hasWon) {
      return;
    }

    setTimeout(computerMove, 700);
  }
}

// Generates random number

function ranRowCol() {
  const ranNum = Math.random();
  if (ranNum < 1 / 3) {
    return 0;
  } else if (ranNum >= 1 / 3 && ranNum < 2/3) {
    return 1;
  } else {
    return 2;
  }
}

// Computer's move

function computerMove() {
  let ranRow;
  let ranCol;
  let spacesLeft = false;

  // check spaces left
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (!moveArray[i][j]) {
        spacesLeft = true;
        break;
      }
    }
  }
  if (!spacesLeft) {
    console.log('Game Over');
    scoreObject.ties++;
    renderScore();
    return;
  }
  while (!isPlayerTurn) {
    ranRow = ranRowCol();
    ranCol = ranRowCol();
    if (moveArray[ranRow][ranCol]) {
      continue;
    } else {
      moveArray[ranRow][ranCol] = 'O';
      renderBoard();
      winCheck('O');
      if (hasWon) {
        return;
      }
    }
    isPlayerTurn = true;
    return;
  }
}

function renderBoard() {
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      let cellNum = (3 * i) + j + 1;
      document.querySelector(`.js-grid-button-${cellNum}`)
        .innerHTML = moveArray[i][j];
    }
  }
}

function renderScore() {
  document.querySelector('.js-player-wins')
    .innerHTML = scoreObject.player;
  document.querySelector('.js-ties')
    .innerHTML = scoreObject.ties;
  document.querySelector('.js-computer-wins')
    .innerHTML = scoreObject.computer;
}

function winCheck(mark) {
  // Rows
  for (let i = 0; i < 3; i++) {
    if (moveArray[i][0] === mark && moveArray[i][1] === mark && moveArray[i][2] === mark) {
      hasWon = true;
      whoWon(mark);
      return;
    }
  }
  // Columns
  for (let i = 0; i < 3; i++) {
    if (moveArray[0][i] === mark && moveArray[1][i] === mark && moveArray[2][i] === mark) {
      hasWon = true;
      whoWon(mark);
      return;
    }
  }
  // Diagonals
  if (moveArray[0][0] === mark && moveArray[1][1] === mark && moveArray[2][2] === mark) {
    hasWon = true;
    whoWon(mark);
    return
  }

  if (moveArray[0][2] === mark && moveArray[1][1] === mark && moveArray[2][0] === mark) {
    hasWon = true;
    whoWon(mark);
    return;
  }
}

function whoWon(mark) {
  if (mark === 'X') {
    scoreObject.player++;
    renderScore();
  } else if (mark === 'O') {
    scoreObject.computer++;
    renderScore();
  }
}


// Event Listeners

document.querySelector('.js-grid-button-1')
.addEventListener('click', () => {
  playerMove('.js-grid-button-1', 0, 0);
});

document.querySelector('.js-grid-button-2')
.addEventListener('click', () => {
  playerMove('.js-grid-button-2', 0, 1);
});

document.querySelector('.js-grid-button-3')
.addEventListener('click', () => {
  playerMove('.js-grid-button-3', 0, 2);
});

document.querySelector('.js-grid-button-4')
.addEventListener('click', () => {
  playerMove('.js-grid-button-4', 1, 0);
});

document.querySelector('.js-grid-button-5')
.addEventListener('click', () => {
  playerMove('.js-grid-button-5', 1, 1);
});

document.querySelector('.js-grid-button-6')
.addEventListener('click', () => {
  playerMove('.js-grid-button-6', 1, 2);
});

document.querySelector('.js-grid-button-7')
.addEventListener('click', () => {
  playerMove('.js-grid-button-7', 2, 0);
});

document.querySelector('.js-grid-button-8')
.addEventListener('click', () => {
  playerMove('.js-grid-button-8', 2, 1);
});

document.querySelector('.js-grid-button-9')
.addEventListener('click', () => {
  playerMove('.js-grid-button-9', 2, 2);
});

document.querySelector('.js-reset-board-button')
  .addEventListener('click', () => {
    moveArray = [["", "", ""], ["", "", ""], ["", "", ""]];
    renderBoard();
    isPlayerTurn = true;
    hasWon = false;
  });

document.querySelector('.js-reset-score-button')
  .addEventListener('click', () => {
    scoreObject.player = 0;
    scoreObject.ties = 0;
    scoreObject.computer = 0;
    renderScore();
  });