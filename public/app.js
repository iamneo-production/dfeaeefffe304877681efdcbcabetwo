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
function ticTacToe(element, index) {
  if (cells[index] === "" && !gameOver) {
    // Update the game state with the current player's move
    cells[index] = currentPlayer;
    element.textContent = currentPlayer;

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
  btns.forEach((btn) => {
    btn.addEventListener("click", handleButtonClick);
    btn.textContent = "";
    gameOver = false;
  });
}

// Function to handle button click
function handleButtonClick(event) {
  const index = Array.from(btns).indexOf(event.target);
  ticTacToe(event.target, index);
}

// Wait for the DOM to load
document.addEventListener("DOMContentLoaded", () => {
  // Add click event listeners to the buttons
  btns.forEach((btn) => {
    btn.addEventListener("click", handleButtonClick);
  });

  // Explicitly add the click event listener to the reset button
  const resetButton = document.querySelector("#reset");
  resetButton.addEventListener("click", resetGame);
});
