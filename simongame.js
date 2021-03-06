var gamePattern = [];

var userClickedPattern = [];

var buttonColors = ["red", "blue", "green", "yellow"];
var level =0;
var started = false;

function nextSequence() {
    userClickedPattern = [];
    level++;
    $("#level-title").html("Level " + level);

    var randomNumber = Math.floor((Math.random() * 4));

    var randomChosenColor = buttonColors[randomNumber];

    gamePattern.push(randomChosenColor);

    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);

}

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed")
    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
    }, 100);

};

$(".btn").on("click", function (i) {
    var userChosenColor = i.target.id;
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    console.log(userClickedPattern);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length-1);

});

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

$(".btn2").on("click", function(){
    if(!started) {
        $("h1").html("Level " + level);
        nextSequence();
        started = true;
        $(".btn2").fadeOut(10);
    }
});

$(document).keypress(function() {
    if(!started) {
        $("h1").html("Level " + level);
        nextSequence();
        started = true;
    }
});

function checkAnswer(currentLevel){
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

        console.log("success");

        if (userClickedPattern.length === gamePattern.length){
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }

    } else {

        console.log("wrong");
        $("body").addClass("game-over")
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 1000);
        $("#level-title").html("Game Over, Press Any Key to Restart");
        playSound("wrong");
        startOver();
        $(".btn2").fadeIn(10);

    }};

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}
