var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = []; 

var userClickedPattern = [];

// Create a new variable called level and start at level 0.
var level = 0;

// You'll need a way to keep track of whether if the game has started or not, so you only call nextSequence() on the first keypress.
var started = false;

// Use jQuery to detect when a keyboard key has been pressed, when that happens for the first time, call nextSequence().
$(document).keydown(function() {

    if (!started) {

        // The h1 title starts out saying "Press A Key to Start", when the game has started, change this to say "Level 0".
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});

// Use jQuery to detect when any of the buttons are clicked and trigger a handler function.
$(".btn").click(function() {
    
    // store the id of the button that got clicked
    var userChosenColour = $(this).attr("id");

    // Add the contents of the variable userChosenColour to the end of this new userClickedPattern
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour); // play the sound of the button that got clicked
    
    animatePress(userChosenColour); // animate the button that got clicked

    // Call checkAnswer() after a user has clicked and chosen their answer, passing in the index of the last answer in the user's sequence.
    checkAnswer(userClickedPattern.length-1);

});

function checkAnswer(currentLevel) {

    // Write an if statement inside checkAnswer() to check if the most recent user answer is the same as the game pattern. If so then log "success", otherwise log "wrong".
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

        console.log("success");
  
        // If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
        if (userClickedPattern.length === gamePattern.length){
  
          // Call nextSequence() after a 1000 millisecond delay.
          setTimeout(function () {
            nextSequence();
          }, 1000);
  
        }
  
      } else {
  
        console.log("wrong");
        
        // In the sounds folder, there is a sound called wrong.mp3, play this sound if the user got one of the answers wrong.
        playSound("wrong");

        // In the styles.css file, there is a class called "game-over", apply this class to the body of the website when the user gets one of the answers wrong and then remove it after 200 milliseconds.
        $("body").addClass("game-over");
        setTimeout(function () {
          $("body").removeClass("game-over");
        }, 200);

        // Change the h1 title to say "Game Over, Press Any Key to Restart" if the user got the answer wrong.
        $("#level-title").text("Game Over, Press Any Key to Restart");

        // Call startOver() if the user gets the sequence wrong.
        startOver();

     }

}

// nextSequence() returns a random number between 0 and 3
function nextSequence() {

    userClickedPattern = [];
    // Inside nextSequence(), increase the level by 1 every time nextSequence() is called.
    level++;
    $("#level-title").text("Level " + level);
    
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber]; // randomChosenColour = buttonColours[0] or buttonColours[1] or buttonColours[2] or buttonColours[3]
    gamePattern.push(randomChosenColour); // gamePattern = ["red"] or gamePattern = ["blue"] or gamePattern = ["green"] or gamePattern = ["yellow"]
    
    
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100); // flash the button

    // playSound(randomChosenColour);
    playSound(randomChosenColour);  
    
}


function playSound(name) {
    
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
    
}

function animatePress(currentColour) {

    // add this pressed class to the button that gets clicked inside animatePress().
    $("#" + currentColour).addClass("pressed");

    // remove the pressed class after a 100 milliseconds.
    setTimeout(function() {
        $("#" + currentColour).removeClass("pressed");
    }, 100);

}

// Create a new function called startOver().
function startOver() {

    // Inside this function, you'll need to reset the values of level, gamePattern and started variables.
    level = 0;
    gamePattern = [];
    started = false;
  }
  

