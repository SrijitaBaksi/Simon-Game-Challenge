

// Declaring array of button colours
var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var keyPressed = 1;

// Creating a sequence function
function nextSequence(){
    start = true;
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    playSound(randomChosenColour);
    animatePress(randomChosenColour);
    $("h1").html("level " + level);
    level++;
    userClickedPattern = [];
}

$(document).on("keydown",function(){
    if(keyPressed === 1){
        setTimeout(function(){
            nextSequence();
        },100)
    }
    keyPressed = 0;
});

// Which buttons are clicked

$(".btn").on('click', function(event){
    var userChosenColour = event.target.id;
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
});

// Function to play the sound
function playSound(name){
    var audio = new Audio("./sounds/"+name+".mp3");
    audio.play();
}

// Function to animate the buttons on click
function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColour).removeClass("pressed");
    },100);
}

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel] == userClickedPattern[currentLevel]){
        if (userClickedPattern.length === gamePattern.length){
            setTimeout(function () {
              nextSequence();
            }, 1000);
        }
    }
    else {
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        playSound("wrong");
        $("h1").text("Game Over, Press Any Key to Restart");
        setTimeout(function(){
            startOver();
        },200);
    }
}

function startOver(){
    level = 0;
    gamePattern = [];
    keyPressed = 1;
}
