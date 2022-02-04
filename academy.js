// Make your changes to store and update game state in this file
let board = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

let player1 = true;
let player2 = false;

function takeTurn(row, column) {
  if (board[row][column] === null) {
    if (player1) {
      board[row][column] = "nought";
      player2 = true;
      player1 = false;
    } else {
      board[row][column] = "cross";
      player1 = true;
      player2 = false;
    }
  } else {
    console.log("invalid choice!");
  }
  console.log("takeTurn was called with row: " + row + ", column:" + column);
}

function checkWinner() {
  const winCombos = [
    [0, 1, 2], // top row
    [3, 4, 5], // middle row
    [6, 7, 8], // bottom row
    [0, 3, 6], // left column
    [1, 4, 7], // middle column
    [2, 5, 8], // right column
    [0, 4, 8], // left diag
    [2, 4, 6], // right diag
  ];
  let testGrid = board.flat(); // Flatten 2d array, 1st element is board [0][0], second is [0][1]...
  for (let i = 0; i < winCombos.length; i++) {
    const [a, b, c] = winCombos[i]; // Annotate this line
    if (
      // Logic:
      // If testGrid[a] checks if there is a null value, in which case there can't be a winner because a whole row needs to match
      // And if there is a value, then if [a] is equal to [b] and [a] is also equal to [c] then a winCombo matches
      testGrid[a] &&
      testGrid[a] === testGrid[b] &&
      testGrid[a] === testGrid[c]
    ) {
      console.log(testGrid[a], testGrid[b], testGrid[c]);
      if (testGrid[a] == "nought") {
        resetGame();
        return "noughts";
      } else if (testGrid[a] == "cross") {
        resetGame();
        return "crosses";
      }
      // If there is no winner returned and the board is full, it is clear the winner is nobody
    } else if (!testGrid.includes(null)) {
      resetGame();
      return "nobody";
    }
  }
  console.log("checkWinner was called");
}

// Set the game state back to its original state to play another game.
//In implementing resetGame, students should reset all relevant state variables to their initial values (e.g., grid full of nulls, player reset etc)
function resetGame() {
  board = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ];
  clearBoard();
  player1 = true;
  player2 = false;
  console.log("resetGame was called");
}

// Return the current board state with either a "nought" or a "cross" in
// each position. Put a null in a position that hasn't been played yet.
function getBoard() {
  console.log("getBoard was called");
  //return [
  //[null, null, null],
  //[null, null, null],
  //[null, null, null],
  //];
  return board;
}

if (typeof exports === "object") {
  console.log("Running in Node");
  // Node. Does not work with strict CommonJS, but only CommonJS-like
  // environments that support module.exports, like Node.
  module.exports = {
    takeTurn,
    checkWinner,
    resetGame,
    getBoard,
  };
} else {
  console.log("Running in Browser");
}
