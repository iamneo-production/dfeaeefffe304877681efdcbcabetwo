// Initial game state
let cells = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let result = document.querySelector(".result");
let btns = document.querySelectorAll(".btn");
let gameOver = false;

// Winning combinations
const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// Function to handle player moves
function makeMove(index) {
  if (cells[index] === "" && !gameOver) {
    // Update the game state with the current player's move
    cells[index] = currentPlayer;
    btns[index].value = currentPlayer;

    // Check for winning conditions
    for (const [a, b, c] of winningCombinations) {
      if (
        cells[a] === currentPlayer &&
        cells[b] === currentPlayer &&
        cells[c] === currentPlayer
      ) {
        result.textContent = `${currentPlayer} wins!`;
        gameOver = true;
        return;
      }
    }

    // Check for a draw
    if (!cells.includes("")) {
      result.textContent = "It's a draw!";
      gameOver = true;
      return;
    }

    // Switch to the next player
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    result.textContent = `Player ${currentPlayer}'s turn`;
  }
}

// Function to reset the game
function resetGame() {
  cells = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  result.textContent = "Player X's turn";
  btns.forEach((button, index) => {
    button.value = ""; // Clear the button value
    gameOver = false;
  });
}

// Wait for the DOM to load
document.addEventListener("DOMContentLoaded", () => {
  // Add click event listeners to the buttons
  btns.forEach((button, index) => {
    button.addEventListener("click", () => makeMove(index));
  });

  // Add click event listener to the reset button
  document.querySelector("#reset").addEventListener("click", resetGame);
});
