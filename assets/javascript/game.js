// Dom Manipulation
var $underScore = document.getElementById("under-score");
var $wrongLetters = document.getElementById("wrong-letters");
var $guessesLeft = document.getElementById("guesses-left");
var $wins = document.getElementById("wins");
var $losses = document.getElementById("losses");

// Variables
var colors = ["red", "orange", "yellow", "green", "blue", "indigo", "violet"];
var index = Math.floor(Math.random() * colors.length);
var chosenWord = colors[index];
var underScore = [];
var guessedLetters = [];
var wrongLetters = [];
var guessesLeft = 5;
var wins = 0;
var losses = 0;
var gameFinished = false;

// Testing
console.log(chosenWord);

// Add blank lines based on word length
function generateUnderScore() {
  for (var i=0; i < chosenWord.length; i++) {
    underScore.push('_');
    $underScore.textContent = underScore.join(' ');
  };
}
generateUnderScore();

// Update Dom elements each time user presses key
function updateDomElements() {
  $underScore.textContent = underScore.join(' ');
  $guessesLeft.textContent = guessesLeft;
  $wrongLetters.textContent = wrongLetters.join(' ');
  $wins.textContent = wins;
  $losses.textContent = losses;
}

// Check if letter has been guessed already
function letterGuessed(letter) {
  // If user has already guessed letter, push to guessedLetters array
  if (guessedLetters.indexOf(letter) === -1) {
    guessedLetters.push(letter);
    checkGuess(letter);
  } else {
    console.log("you pressed this already");
  }
}

// Checks if letter is right or wrong
function checkGuess(letter) {
  // If letter is correct, replace blank space with corresponding letter
  if (chosenWord.indexOf(letter) > -1) {
    for (var j=0; j < chosenWord.length; j++) {
      if (chosenWord[j] == letter) {
        underScore[j] = chosenWord[j];
      }
    }
    // If letter is wrong, guesses left decreases
  } else {
    wrongLetters.push(letter);
    guessesLeft--;
  }
  updateDomElements();
  checkAnswer();
}

// Check if user has won the game and add wins, if user loses then add loss
function checkAnswer() {
  if (underScore.join("") == chosenWord) {
    wins++;
    resetWord();
  } else if (guessesLeft == 0) {
    losses++;
    resetWord();
  };
  updateDomElements();
}

// Reset game if user wins or losses
function resetWord() {
  index = Math.floor(Math.random() * colors.length);
  chosenWord = colors[index];
  underScore = [];
  generateUnderScore();
  guessesLeft = 5;
  guessedLetters = [];
  wrongLetters = [];
  updateDomElements();
  console.log(chosenWord);
}

// Capture key event
document.onkeyup = function(event) {
  if (event.keyCode >= 65 && event.keyCode <= 90) {
    letterGuessed(event.key.toLowerCase());
  }
}
