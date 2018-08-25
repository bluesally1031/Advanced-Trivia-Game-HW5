//Start Game//

//Click start button to make disappear/begin game
$("#start").on("click", function () {
    $("#start").remove();
    game.loadQuestion();
})

$(document).on("click","#reset",function(){
    game.reset();
})

var triviaGame = {
    questions: questions, 
    currentQuestion: 0, 
    
    //Counters
    countDown: 30,
    correct: 0, 
    incorrect: 0, 
    timedOut: 0,

    //Methods
        //Countdown timer
        countdown: function (){
            game.countDown--;
            $("#countDown").html(game.countDown);
            if(game.countDown<=0){
                console.log("Time up!");
                game.timesUp();
            }
        },

        //Timed out (question not answered)
        timesUp: function (){
            clearInterval(timer);
            game.timedOut++;
            $("#game-container").html("<h2>Time's Up!</h2>");
            $("#game-container").append("<h3>Correct Answer: " + questions[game.currentQuestion].correctAnswer + "</h3>");
            if(game.currentQuestion === questions.length-1){
                signalTimesUp(game.results,4000);
            }
            else {
                signalTimesUp(game.goToNextQuestion,4000);
            }
        },

        //Click on answer
        clickedAnswer: function (){
            clearInterval(timer);
            
            if(questions[game.currentQuestion].correctAnswer){
                game.answerCorrect();
                console.log("correct");
            } 
            else {
                game.answerIncorrect();
                console.log("wrong");
            }
        },

        //Answer is correct
        answerCorrect: function (){
            clearInterval(timer);
            game.correct++;
            $("#game-container").html("<h2>Correct!</h2>");
            $("#game-container").append("<h3>Correct Answer: " + questions[game.currentQuestion].correctAnswer + "</h3>");
            if(game.currentQuestion === questions.length-1){
                signalTimesUp(game.results,4000);
            }
            else {
                signalTimesUp(game.goToNextQuestion,4000);
            }
        },

        //Answer is incorrect
        answerIncorrect: function (){
            clearInterval(timer);
            game.incorrect++;
            $("#game-container").html("<h2>Wrong Answer!</h2>");
            $("#game-container").append("<h3>Correct Answer: " + questions[game.currentQuestion].correctAnswer + "</h3>");
            if(game.currentQuestion === questions.length-1){
                signalTimesUp(game.results,4000);
            }
            else {
                signalTimesUp(game.goToNextQuestion,4000);
            }
        },
        
        //!!!!!!!!!Current question loads
        loadQuestion: function (){
            //Tick timer down by 1 second and display on page
            $("#game-container").html("<h2>Time Remaining: <span id='countDown'>30</span> sec</h2>");
            timer = setInterval(game.countDown,1000);

            //Show current question on page
            $("#game-container").html("<h2>" + questions[game.currentQuestion].question + "</h2>");

            //Show possible answers (from individual question arrays) on page as buttons
            for(var i=0; i<questions[game.currentQuestion].answers.length; i++){
                //Makes buttons with 4 possible answers
                $("game-container").append("<button></button>");
            }
        },


        //Move on to next question (without prompt from user)
        goToNextQuestion: function () {
            game.countDown = 30;
            $("#countDown").html(game.countDown);
            game.currentQuestion++;
            game.loadQuestion();
        },

        //Game results show on the page
        results: function (){
            clearInterval(timer);
            $("#game-container").html("<h2>You made it to the end!</h2>");
            $("#game-container").append("<h3>Correct: " + game.correct + "</h3>");
            $("#game-container").append("<h3>Wrong: " + game.incorrect + "</h3>");
            $("#game-container").append("<h3>Unanswered: " + game.timedOut + "</h3>");
            $("#game-container").append("<button id='reset'>Take It Again!</button>");
        },

        //Game reset without page refresh
        reset: function (){
            clearInterval(timer);
            $("#game-container").html(game.)
        } 
}

//Questions bank
var questions = [{
    question: "Rick and Morty is based on what 80s sci-fi movie classic?",
    answers: ["Blade Runner", "Aliens", "Tron", "Back to the Future"],
    correctAnswer: "Back to the Future",
    image: "assets/images/backtothefuture.jpg"
}, {
    question: "Justin Roiland was in what method-acting condition for his voice work on Episode 304, 'Vindicators 3: Return of the Walrdender'?",
    answers: ["sick", "drunk", "sleep deprived", "highly caffinated"],
    correctAnswer: "drunk",
    image: "assets/images/drunk-rick-method-acting.jpg"
}, {
    question: "One of the series most popular episodes, 'Total Rickall,' which contains the fan-favorite Tiny Rick, was based upon what 90s sci-fi cult TV show?",
    answers: ["Star Trek: The Next Generation", "The X-Files", "Buffy the Vampire Slayer", "Quantum Leap"],
    correctAnswer: "Buffy the Vampire Slayer",
    image: "assets/images/buffy.gif"
}, {
    question: "There is a resemblance between Rick and Morty's theme song and what British sci-fi TV series?",
    answers: ["Doctor Who", "Black Mirror", "Battlestar Galactica", "Torchwood"],
    correctAnswer: "Doctor Who",
    image: "assets/images/doc-who.jpg"
}, {
    question: "What is the one safety measure that Rick Earth C-137 (the serie's main Rick character) almost never wears?",
    answers: ["welding gloves", "inferred goggles", "space helmet", "seatbelt"],
    correctAnswer: "seatbelt",
    image: "assets/images/no-seatbelt-rick.png"
}, {
    question: "How many characters does Justin Roiland voice on Rick and Morty?",
    answers: ["one", "two", "three", "four"],
    correctAnswer: "two",
    image: "assets/images/roiland.jpg"
}, {
    question: "What is the name of the rock band that Rick, Bird Person, and Squanchy were in?",
    answers: ["The Orange Towels", "Mr. Harmon's Opius", "The Squanchy Squanch Squanches", "The Flesh Curtains"],
    correctAnswer: "The Flesh Curtains",
    image: "assets/images/flesh-curtains.gif"
}, {
    question: "What is Rick's last name?",
    answers: ["Sanchez", "Gonzalez", "Martinez", "Smith"],
    correctAnswer: "Sanchez",
    image: "assets/images/sanchez.gif"
}]
