
let buttonColors = ["red", "blue", "green", "yellow"];

let gamePattern = [];

let userClickedPattern = [];

let level = 0;

let started = false;


$(document).keydown(function() {
  // this means the boolean opposite of variable started
  //  ⬇️
  if (!started) {     // this forces the expression to say started is false w/o changing the started variable
    $("#level-title").text("Level " + level); // changes the h1 text
    nextSequence(); // initiates the nextSequence function
    started = true; // sets the variable of started to true
  }
})

$(".btn").click(function() {    // this is you! when you click on a button
    let userChosenColor = $(this).attr("id"); // gets the attribute of the button class in html
    userClickedPattern.push(userChosenColor); // pushes the userChosenColor value to userClickedPattern array
    playSound(userChosenColor); // passes the value of userChosenColor to name variable of playSound function
    animatePress(userChosenColor);  // passes the value of userChosenColor to currentColor variable of animatePress function
    checkAnswer(userClickedPattern.length-1);    // you have to get the latest index of userClickedPattern which is 1 less than length of the array, because a length starts from 1 while an array starts from 0
});

function playSound(name) {  // from randomChosenColor parameter to name parameter
  let audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function nextSequence() {   // this is the AI
  userClickedPattern = [];  // this restarts the var array to 0 again everytime nextSequence is initiated

  level++;  // iterate the var lavel everytime nextSequence starts
  $("#level-title").text("Level " + level); // changes the txt of h1 if the nextSequence function starts

  let randomNumber = Math.floor(Math.random() * 4); // creates random rounded-off number
  let randomChosenColor = buttonColors[randomNumber]; // targets the index of arr buttonColors
  gamePattern.push(randomChosenColor);  // adds an element to arr gamePattern

  let sameColorId = "#" + randomChosenColor;  // creates a cncatenated string
  $(sameColorId).fadeOut(100).fadeIn(100);  // animates the targeted element
  // $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChosenColor)  // passes the value of randomChosenColor thru this function

}



function animatePress(currentColor) { // a function that gets the parameter from userChosenColor
  $("#" + currentColor).addClass("pressed");  // adds pressed class to the targeted selector
  setTimeout(function() { // sets a delayed response
    $("#" + currentColor).removeClass("pressed")  // removes the pressed class selector from the targeted selector
  }, 100); // miliseconds
};

function startOver() {
  started = false;  // sets the var started to false when game over
  gamePattern = []; // sets the gamePattern arr to 0 again because of game over
  level = 0;  // sets the var level to 0 because of game over
}

function checkAnswer(currentLevel) {  // a function that gets the parameter from userClickedPattern -1

  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) { // checks if gamePattern[] and userClickedPattern[] are complete equal
    console.log("sucess");
    if (userClickedPattern.length === gamePattern.length) { // checks if userClickedPattern and gamePattern have both the same length
      setTimeout(function (){
        nextSequence(); // initializes the nextSequence again
      }, 1000);
    }
  }
  else {
    console.log("wrong");
    playSound("wrong"); // shorthand code for playing sounds with mp3 extensions
    $("body").addClass("game-over");  // adds a class game-over to the body
    setTimeout(function(){
      $("body").removeClass("game-over"); // removes a the class game-over from the body
    }, 200);
    $("#level-title").text("GAME OVER, Press Any Key to Restart");  // changes the text of the h1
    startOver();  // calls the function startOver to.. start over again
  }
}
