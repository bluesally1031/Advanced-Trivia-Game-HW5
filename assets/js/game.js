//Peter's black magic JS
function signalTimesUp (nextFn){
    nextFn.call(triviaGame);
}

//Start Game//

//Click start button to make disappear/begin game
$("#start").on("click", function(){
    $("#start").remove();
    triviaGame.loadQuestion();
})

$(document).on("click","#reset",function(){
    triviaGame.reset();
})

$("#game-container").on("click", ".choice", function(){
    var userChoice = $(this).text()
    triviaGame.clickedAnswer(userChoice);
})

var triviaGame = {
    questionsArray: 0, 
    currentQuestion: 0, 
    
    //Counters
    countDown: 30,
    correct: 0, 
    incorrect: 0, 
    timedOut: 0,

    //Methods

        //Countdown timer
        countIt: function(){
            console.log(triviaGame.countDown)
            triviaGame.countDown--;
            $("#countDown").html(triviaGame.countDown);

            if(triviaGame.countDown<=0){
                console.log("Time's up!");
                triviaGame.timesUp();
            }
        },

        //Timed out (question not answered)
        timesUp: function(){
            clearInterval(timer);
            this.timedOut++;
            $("#game-container").html("<h2>Time's Up!</h2>");
            $("#game-container").append("<h3>Correct Answer: " + questionsArray[this.currentQuestion].correctAnswer + "</h3>");
            if(this.currentQuestion === questionsArray.length){
                signalTimesUp(this.results,4000);
            }
            else {
                signalTimesUp(triviaGame.goToNextQuestion,4000);
            }
        },

        //Click on answer
        clickedAnswer: function(userChoice){
            clearInterval(timer);
            
            if(questionsArray[this.currentQuestion].correctAnswer === userChoice){
                this.answerCorrect();
                console.log("correct");
            } 
            else {
                this.answerIncorrect();
                console.log("wrong");
            }
        },

        //Answer is correct
        answerCorrect: function(){
            clearInterval(timer);
            this.correct++;
            $("#game-container").html("<h2>Correct!</h2>");
            $("#game-container").append("<h3>Correct Answer: " + questionsArray[this.currentQuestion].correctAnswer + "</h3>");
            if(this.currentQuestion === questionsArray.length){
                signalTimesUp(this.results,4000);
            }
            else {
                signalTimesUp(this.goToNextQuestion,4000);
            }
        },

        //Answer is incorrect
        answerIncorrect: function(){
            clearInterval(timer);
            this.incorrect++;
            $("#game-container").html("<h2>Wrong Answer!</h2>");
            $("#game-container").append("<h3>Correct Answer: " + questionsArray[this.currentQuestion].correctAnswer + "</h3>");
            if(this.currentQuestion === questionsArray.length){
                signalTimesUp(this.results,4000);
            }
            else {
                signalTimesUp(this.goToNextQuestion,4000);
            }
        },
        
        //Current question loads
        loadQuestion: function(){
            //Tick timer down by 1 second and display on page
            timer = setInterval(this.countIt, 1000);

            var questionHTML = $("<div>")

            //Show current question on page
            questionHTML.append("<h2>" + questionsArray[this.currentQuestion].question + "</h2>");

            //Show possible answers (from individual question arrays) on page as buttons
            var answers = questionsArray[this.currentQuestion].answers;
            for(var i=0; i<answers.length; i++){
                //Makes buttons with 4 possible answers
                questionHTML.append("<button class='choice'>" + answers[i] + "</button>");
            }

            $("#game-container").append(questionHTML);
            $("#loadQuestion").append("<div class='nextQuestion'>" + questionsArray[i] + "</div>");
        },


        //Move on to next question (without prompt from user)
        goToNextQuestion: function(){
            triviaGame.countDown = 30;
            $("#countDown").html(triviaGame.countDown);
            triviaGame.currentQuestion++;
            this.loadQuestion();
        },

        //Game results show on the page
        results: function(){
            clearInterval(timer);
            //Results page message
            $("#results-container").html("<h2>You made it to the end!</h2>");
            //Correct answers counter
            $("#results-container").html("<h3>Correct: " + this.correct + "</h3>");
            //Incorrect answers counter
            $("#results-container").html("<h3>Wrong: " + this.incorrect + "</h3>");
            //Unanswered counter
            $("#results-container").html("<h3>Unanswered: " + this.timedOut + "</h3>");
            //Reset game button
            $("#results-container").html("<button id='reset'>Take It Again!</button>");
        },

        //Game reset without page refresh
        reset: function(){
            clearInterval(timer);
        }, 
}

//Questions bank
var questionsArray = [{
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
