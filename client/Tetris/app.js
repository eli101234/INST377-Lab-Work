document.addEventListener('DOMContentLoaded', () => {
  const grid = document.querySelector('.grid');
  let squares = Array.from(document.querySelectorAll('.grid div'));
  const scoreDisplay = document.querySelector('#score');
  const startBtn = document.querySelector('#start-button');
  const width = 10;
  let nextRandom = 0;
  let timerID;
  let score = 0;
  // lTetrominoes
  const lTetrominoes = [
    [1, width + 1, width * 2 + 1, 2],
    [width, width + 1, width + 2, width * 2 + 2],
    [1, width + 1, width * 2 + 1, width * 2],
    [width, width * 2, width * 2 + 1, width * 2 + 2]
  ];
  // zTetrominoes
  const zTetrominoes = [
    [0, width, width + 1, width * 2 + 1],
    [width + 1, width + 2, width * 2, width * 2 + 1],
    [0, width, width + 1, width * 2 + 1],
    [width + 1, width + 2, width * 2, width * 2 + 1]
  ];
  // tSpin
  const tTetrominoes = [
    [1, width, width + 1, width + 2],
    [1, width + 1, width + 2, width * 2 + 1],
    [width, width + 1, width + 2, width * 2 + 1],
    [1, width, width + 1, width * 2 + 1]
  ];
  // O
  const oTetrominoes = [
    [0, width, 1, width + 1],
    [0, width, 1, width + 1],
    [0, width, 1, width + 1],
    [0, width, 1, width + 1]
  ];
  // i of the gods
  const iTetrominoes = [
    [1, width + 1, width * 2 + 1, width * 3 + 1],
    [width, width + 1, width + 2, width + 3],
    [1, width + 1, width * 2 + 1, width * 3 + 1],
    [width, width + 1, width + 2, width + 3]
  ];
  const theTetrominoes = [lTetrominoes, zTetrominoes, tTetrominoes, oTetrominoes, iTetrominoes];
  let currentPosition = 4;
  let currentRotation = 0;
  // randomly select
  let random = Math.floor(Math.random() * theTetrominoes.length);
  let current = theTetrominoes[random][currentRotation];
  // draw the first rotation in the first tetromino
  function draw() {
    current.forEach((index) => {
      squares[currentPosition + index].classList.add('tetromino');
    });
  }

  // undraw the Tetra
  function undraw() {
    current.forEach((index) => {
      squares[currentPosition + index].classList.remove('tetromino');
    });
  }
  // Move down
  // timerID = setInterval(moveDown, 1000);
  // Assign functions to keycodes

  function control(e) {
    if (e.keyCode === 37) {
      moveLeft();
    }
    if (e.keyCode === 38) {
      rotate();
    }
    if (e.keyCode === 39) {
      moveRight();
    }
    if (e.keyCode === 40) {
      moveDown();
    }
  }
  document.addEventListener('keyup', control);
  // l
  // move down and redraw piece.
  function moveDown() {
    undraw();
    currentPosition += width;
    draw();
    freeze();
  }
  // freeze
  function freeze() {
    if (current.some((index) => squares[currentPosition + index + width].classList.contains('taken'))) {
      current.forEach((index) => squares[currentPosition + index].classList.add('taken'));
      // start a new tetra
      random = nextRandom
      nextRandom = Math.floor(Math.random() * theTetrominoes.length);
      current = theTetrominoes[random][currentRotation];
      currentPosition = 4;
      draw();
      displayShape();
      addScore();
    }
  }
  // move tetra left, unless at edge
  function moveLeft() {
    undraw();
    const isAtLeftEdge = current.some((index) => (currentPosition + index) % width === 0);
    if (!isAtLeftEdge) currentPosition -= 1;
    if (current.some((index) => squares[currentPosition + index].classList.contains('taken'))) {
      currentPosition += 1;
    }
    draw();
  }
  // move tetra left, unless at edge
  function moveRight() {
    undraw();
    const isAtRightEdge = current.some((index) => (currentPosition + index) % width === width - 1);
    if (!isAtRightEdge) currentPosition += 1;
    if (current.some((index) => squares[currentPosition + index].classList.contains('taken'))) {
      currentPosition -= 1;
    }
    draw();
  }
  // rotate
  function rotate() {
    undraw();
    currentRotation ++;
    if (currentRotation === current.length) {
      currentRotation = 0;
    }
    current = theTetrominoes[random][currentRotation];
    draw();
  }
  // show up-next peice in display
  const displaySquares = document.querySelectorAll('.mini-grid div');
  const displayWidth = 4;
  let displyIndex = 0;
  // the peice without rotations
  const upNextTetrominoes = [
    [1, displayWidth + 1, displayWidth * 2 + 1, 2], // lshape
    [0, displayWidth, displayWidth + 1, displayWidth * 2 + 1], // z shape
    [1, displayWidth, displayWidth + 1, displayWidth + 2], // t shape
    [0, 1, displayWidth, displayWidth + 1], // o shape
    [1, displayWidth + 1, displayWidth * 2 + 1, displayWidth * 3 + 1] // i shape
  ];
  // display the shape in the min-grid
  function displayShape() {
    displaySquares.forEach((square) => {
      square.classList.remove('tetromino');
    });
    upNextTetrominoes[nextRandom].forEach( (index) => {
      displaySquares[displyIndex + index].classList.add('tetromino');
    });
  }
  // Functionality to button
  startBtn.addEventListener('click', () => {
    if (timerID) {
      clearInterval(timerID)
      timerID = null;
    } else {
      draw()
      timerID = setInterval(moveDown, 1000)
      nextRandom = Math.floor(Math.random() * theTetrominoes.length);
      displayShape();
    }
  });
  // add score
  function addScore() {
    for (let i = 0; i < 199; i += width) {
      const row = [i, i + 1, i + 2, i + 3, i + 4, i + 5, i + 6, i + 7, i + 8, i + 9];
      if (row.every((index) => squares[index].classList.contains('taken'))) {
        score += 10;
        scoreDisplay.innerHTML = score;
        row.forEach((index) => {
          squares[index].classList.remove('taken');
          squares[index].classList.remove('tetromino');
        });
        const squaresRemoved = square.splice(i, width);
        squares = squaresRemoved.concat(squares);
        squares.forEach((cell) => grid.appendChild(cell));
      }
    }
  }
});