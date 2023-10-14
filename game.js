// Define game variables and arrays
var gamePattern = [];
var userClickedPattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var level = 0;
var gameStarted = false; // Flag to track if the game has started

// Function to generate a random color
function randomChosenColour() {
  var randomNumber = Math.floor(Math.random() * 4);
  return buttonColours[randomNumber];
}

// Function to play an audio file
function playSound(color) {
  var audio = new Audio("./sounds/" + color + ".mp3");
  audio.play();
}

// Function to handle a user click
function handleButtonClick() {
  if (gameStarted) {
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    checkAnswer(userClickedPattern.length - 1); // Pass the index of the last clicked color
  }
}

$(".btn").click(handleButtonClick);

// Event listener for key press
$(document).keydown(function (event) {
  if (!gameStarted && (event.key === 'A' || event.key === 'a')) {
    gameStarted = true; // Set the game as started
    startGame();
  }
});

// Function to start the game
function startGame() {
  gamePattern = [];
  userClickedPattern = [];
  level = 0;
  gameStarted = true; // Set the game as started
  nextSequence();
}

// Function to generate the next sequence
function nextSequence() {
  level++;
  $("#level-title").html("Level: " + level);
  var randomChosen = randomChosenColour();
  gamePattern.push(randomChosen);
  $("#" + randomChosen).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosen);
}

// Function to check the user's answer
function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        userClickedPattern = [];
        nextSequence();
      }, 1000);
    }
  } else {
    gameOver();
  }
}

// Function to handle game over
function gameOver() {
  playSound("wrong");
  $("body").addClass("game-over");
  setTimeout(function () {
    $("body").removeClass("game-over");
  }, 200);
  $("#level-title").html("Game Over, Press 'A' to Restart");
  startOver(); // Function to restart the game
}

// Function to restart the game
function startOver() {
  gamePattern = [];
  userClickedPattern = [];
  level = 0;
  gameStarted = false;
}
