var questions = [

    question1 = {
        image: "assets/images/Kappa.jpg",
        options: ["4Head", "YouDontSay", "Kappa", "FrankerZ"],
        answer: 2
    },

    question2 = {
        image: "assets/images/PogChamp.jpg",
        options: ["PogChamp", "BegWan", "cmonBruh", "EleGiggle"],
        answer: 0
    },

    question3 = {
        image: "assets/images/monkaS.jpg",
        options: ["BrainSlug", "GreenTeam", "SSSsss", "monkaS"],
        answer: 3
    },

    question4 = {
        image: "assets/images/BlessRNG.jpg",
        options: ["BlessRNG", "PraiseIt", "SeemsGood", "ThankEgg"],
        answer: 0
    },

    question5 = {
        image: "assets/images/SMOrc.jpg",
        options: ["BloodTrail", "SMOrc", "GivePLZ", "GreenTeam"],
        answer: 1
    },

    question6 = {
        image: "assets/images/LUL.jpg",
        options: ["CarlSmile", "LUL", "EleGiggle", "TPFufun"],
        answer: 1
    },

    question7 = {
        image: "assets/images/Kreygasm.jpg",
        options: ["Kreygasm", "OSSmooth", "PJSugar", "OneHand"],
        answer: 0
    },

    question8 = {
        image: "assets/images/FailFish.jpg",
        options: ["BabyRage", "NotLikeThis", "FailFish", "UnSane"],
        answer: 2
    },

    question9 = {
        image: "assets/images/BibleThump.jpg",
        options: ["BabyRage", "TakeNRG", "BibleThump", "BigBrother"],
        answer: 2
    },

    question10 = {
        image: "assets/images/Wutface.jpg",
        options: ["SwiftRage", "DansGame", "Jebaited", "Wutface"],
        answer: 3
    },

];

var correctAnswers = 0;
var wrongAnswers = 0;
var questionsFinished = 0;
var quizHTML;
var timeClock;
var timeCounter = 20
var imageSource;
var correctIndex;

function clearGameArea() {
    $("#gameScreen").empty();
};

function setTimeLimit() {
    timeClock = setInterval(countSeconds, 1000);
    function countSeconds() {
        if (timeCounter > 0) {
            timeCounter--;
        }
        if (timeCounter === 0) {
            clearInterval(timeClock);
            tookTooLong();
        }
        $(".timer").html(timeCounter);
    }
}

//question generator
function whatsInTheBox() {
    imageSource = questions[questionsFinished].image;
    correctIndex = questions[questionsFinished].answer;
    quizHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>20</span> </p> <p class='text-center'> Which of the following corresponds to this Twitch.tv emote? <img class = 'emotes' src = '" + imageSource + "'> </p> <p class='answer' data-value = '0'>A. " + questions[questionsFinished].options[0] + "</p> <p class='answer' data-value = '1'>B. " + questions[questionsFinished].options[1] + "</p> <p class='answer' data-value = '2'>C. " + questions[questionsFinished].options[2] + "</p> <p class='answer' data-value = '3'>D. " + questions[questionsFinished].options[3] + "</p>";
    $(".gameScreen").html(quizHTML);
}

//win screen
function theMoreYouKnow() {
    quizHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + timeCounter + "</span> </p>" + "<p class='text-center'>Correct! The answer is: " + questions[questionsFinished].options[correctIndex] + "</p>";
    $(".gameScreen").html(quizHTML);
    correctAnswers++;
    setTimeout(wait, 1000 * 3);
}

//lose screen
function brainNoWork() {
    quizHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + timeCounter + "</span> </p>" + "<p class='text-center'>Wrong! The correct answer is: " + questions[questionsFinished].options[correctIndex] + "</p>";
    $(".gameScreen").html(quizHTML);
    wrongAnswers++;
    setTimeout(wait, 1000 * 3);
}

//time out screen
function tookTooLong() {
    quizHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + timeCounter + "</span> </p>" + "<p class='text-center'>You ran out of time!  The correct answer was: " + questions[questionsFinished].options[correctIndex] + "</p>";
    $(".gameScreen").html(quizHTML);
    setTimeout(wait, 1000 * 3);
    wrongAnswers++;
}

//end game score screen
function scoreScreen() {
    quizHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + timeCounter + "</span> </p>" + "<p class='text-center'>All done, here's how you did!" + "</p>" + "<p class='summary-correct'>Correct Answers: " + correctAnswers + "</p>" + "<p>Wrong Answers: " + wrongAnswers + "</p>" + "<p class='text-center'> <button class='btn btn-primary btn-lg btn-block' id = 'resetButton' >Retake the quiz </button> </p>";
    $(".gameScreen").html(quizHTML);
}

//post question pause to show result
function wait() {
    if (questionsFinished < 9) {
        questionsFinished++;
        timeCounter = 20;
        clearGameArea();
        setTimeLimit();
        whatsInTheBox();
    }
    else {
        scoreScreen();
    }
}

//reset
function reset() {
    questionsFinished = 0;
    correctAnswers = 0;
    wrongAnswers = 0;
    timeCounter = 20;
    clearGameArea();
    whatsInTheBox();
    setTimeLimit();
}

$(document).ready(function () {

    //"fun" audio
    <audio id="myAudio" src="assets/sound/TrollSong.mp4" loop="loop"></audio>
    $("#my_audio").get(0).play();

    //start button
    $("#gamestart").on("click", function () {
        whatsInTheBox();
        setTimeLimit();
    });

    //answer selection
    $(".gameScreen").on("click", ".answer", function () {
        selectedAnswer = $(this).data("value");
        if (selectedAnswer === questions[questionsFinished].answer) {
            clearInterval(timeClock);
            theMoreYouKnow();
        }
        else {
            clearInterval(timeClock);
            brainNoWork();
        }
    });
    
    $(".gameScreen").on("click", "#resetButton", function () {
        reset();
    });
});