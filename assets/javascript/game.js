// Dom Manipulation
var $underScore = document.getElementById("under-score");
var $wrongLetters = document.getElementById("wrong-letters");
var $guessesLeft = document.getElementById("guesses-left");
var $wins = document.getElementById("wins");
var $losses = document.getElementById("losses");
var $body = document.getElementById("body");

// Variables
var colors = ["red", "orange", "yellow", "green", "blue", "indigo", "violet"];
var index = Math.floor(Math.random() * colors.length);
var chosenWord = colors[index];
var underScore = [];
var guessedLetters = [];
var wrongLetters = [];
var guessesLeft = 7;
var wins = 0;
var losses = 0;
var gameFinished = false;
var audio = new Audio("./assets/audio/readingRainbow.mp3");

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
    changeColor();
    resetWord();
    audio.play();
  } else if (guessesLeft == 0) {
    losses++;
    resetWord();
  };
  updateDomElements();
}
// Updates colors and background based off answer
function changeColor() {
  switch (underScore.join("")) {
    case "red":
      $body.style.background = '#FF0000';
      $body.style.color = '#00FF00';
      $body.style.transition = "all 1s";
      break;
    case "orange":
      $body.style.background = '#FF7F00';
      $body.style.color = '#0000FF';
      $body.style.transition = "all 1s";
      break;
    case "yellow":
      $body.style.background = '#FFFF00';
      $body.style.color = '#9400D3';
      $body.style.transition = "all 1s";
      break;
    case "green":
      $body.style.background = '#00FF00';
      $body.style.color = '#FF0000';
      $body.style.transition = "all 1s";
      break;
    case "blue":
      $body.style.background = '#0000FF';
      $body.style.color = '#FF7F00';
      $body.style.transition = "all 1s";
      break;
    case "indigo":
      $body.style.background = '#4B0082';
      $body.style.color = '#FF7F00';
      $body.style.transition = "all 1s";
      break;
    case "violet":
      $body.style.background = '#9400D3';
      $body.style.color = '#FFFF00';
      $body.style.transition = "all 1s";
      break;
  }
}

// Reset game if user wins or losses
function resetWord() {
  index = Math.floor(Math.random() * colors.length);
  chosenWord = colors[index];
  underScore = [];
  guessesLeft = 5;
  guessedLetters = [];
  wrongLetters = [];
  console.log(chosenWord);
  updateDomElements();
  generateUnderScore();
  audio.play();
}

// Capture key event
document.onkeyup = function(event) {
  if (event.keyCode >= 65 && event.keyCode <= 90) {
    letterGuessed(event.key.toLowerCase());
  }
}
