
$(document).ready(function(){


// var questions = ["Which country has the most UNESCO World Heritage sites?", "Which country produced the most wine in 2016?", "Which country has hosted the Olympics the most times?", "Which is the world’s largest continental lake?", "How many ossuaries (ancient and medieval 'bone churches') still stand around the world?"];
//
// var answers = ["Italy", "France", "USA", "Baikal", "40"];

// var otherOptions1 = ["China", "Spain", "France"];
// var otherOptions2 = ["Italy", "USA", "Spain"];
// var otherOptions3 = ["United Kingdom", "Japan", "France"];
// var otherOptions4 = ["Superior", "Tanganyika", "Michigan"]
// var otherOptions5 = ["27", "34", "13"];


var triviaArr = [
  {
    question: "Which country has the most UNESCO World Heritage sites?",
    correctAnswer: 3,
    otherAnswers: ["China", "Spain", "Italy", "France"],
    answerImage: "https://media.giphy.com/media/zNo55r09LvANW/giphy.gif",
  },
  {
    question: "Which country produced the most wine in 2016?",
    correctAnswer: 2,
    otherAnswers: ["Italy", "France", "USA", "Spain"],
    answerImage: "https://vinepair.com/wp-content/uploads/2015/02/waynesworld.gif",
  },
  {
    question: "Which country has hosted the Olympics the most times?",
    correctAnswer: 1,
    otherAnswers: ["USA", "United Kingdom", "Japan", "France"],
    answerImage: "https://s.aolcdn.com/hss/storage/midas/e1aa225dbaac5829b5c08cc5ff2dbd9b/204164905/olympics.gif",
  },
  {
    question: "Which is the world's largest continental lake?",
    correctAnswer: 4,
    otherAnswers: ["Superior", "Tanganyika", "Michigan", "Baikal"],
    answerImage: "https://68.media.tumblr.com/8c44930bfced029ab6b902d77a4431c1/tumblr_o7luihXCqm1tchrkco1_500.gif",
  },
  {
    question: "How many ossuaries (ancient and medieval 'bone churches') still stand around the world?",
    correctAnswer: 1,
    otherAnswers: ["40", "27", "34", "13"],
    answerImage: "http://i.imgur.com/gahBI58.gif",
  },
];

triviaArr.forEach(function(data){
  data.answer = data.otherAnswers[data.correctAnswer - 1];
});

var questionInterval;
var currentQuestionIndex = 0;
var currentQuestionData;
var correct = 0;
var incorrect = 0;
var unanswered = 0;
var time = 30;

// initial state of game
  function resetGame(){
    $(".timer").hide();
    $(".game-container").hide();
    $(".answer-container").hide();
    $(".endGame").hide();
    $("#start").show();
    correct = 0;
    incorrect = 0;
    unanswered = 0;
    time = 30;
    currentQuestionIndex = 0;
  };
  resetGame();

// on-click event targeting the start button to hide and initiate game
  $("#start").on('click', function(){
    startGame();
    $("#start").hide();
  });

// after start button is pressed, the first question and timer displays.
  function startGame() {
    $(".timer").show();
    $(".game-container").show();
    time = 30;
    questionInterval = setInterval(count, 1000);
    currentQuestionData = triviaArr[currentQuestionIndex];
    displayQuestion();
    $(".answer-1").on('click', function(){buttonClicked(1)});
    $(".answer-2").on('click', function(){buttonClicked(2)});
    $(".answer-3").on('click', function(){buttonClicked(3)});
    $(".answer-4").on('click', function(){buttonClicked(4)});
  };

// shows the current question
  function displayQuestion() {
    $(".questions").text(currentQuestionData.question);
    $(".answer-1").text(currentQuestionData.otherAnswers[0]);
    $(".answer-2").text(currentQuestionData.otherAnswers[1]);
    $(".answer-3").text(currentQuestionData.otherAnswers[2]);
    $(".answer-4").text(currentQuestionData.otherAnswers[3]);
  };

// checks the button clicked against the correct answer, clears the interval to stop the timer, and calls for displaying the answer page.
  function buttonClicked(buttonNumber) {
    clearInterval(questionInterval);
    if (currentQuestionData.correctAnswer === buttonNumber) {
      $(".user-correct").show();
      $(".user-incorrect").hide();
      $(".unanswered").hide();
      correct++;

    }
    else if (buttonNumber === 0){
      $(".unanswered").show();
      $(".user-incorrect").hide();
      $(".user-correct").hide();
      unanswered++;

    }
    else {
      $(".user-incorrect").show();
      $(".unanswered").hide();
      $(".user-correct").hide();
      incorrect++;
      
    }
    displayAnswer();
  };

  // counting function for timer
  function count() {
    time--;
    $(".timer").text(time);
    if (time <= 0) {
      clearInterval(questionInterval);
      buttonClicked(0);
      // calling the buttonClicked function as if unanswered = wrong.
    }
  }

  // display the answer and image for a short period of time.
  function displayAnswer(){
    setTimeout(nextQuestion, 5000);
    $(".game-container").hide();
    $(".timer").hide();
    $(".correct-answer").text(currentQuestionData.answer);
    $(".image").show().html("<img src=" + currentQuestionData.answerImage + ">");
    $(".answer-container").show();
  };

  //function to go to the next question
  function nextQuestion() {
      $(".answer-container").hide();
      $(".game-container").show();
      currentQuestionIndex++;
      if (currentQuestionIndex >= triviaArr.length) {
        endGame();
      }
      else {
        $(".timer").show();
        time = 10;
        questionInterval = setInterval(count, 1000);
        currentQuestionData = triviaArr[currentQuestionIndex];
        displayQuestion();
      }

  };

  function endGame() {
    $(".endGame").show();
    $(".game-container").hide();
    $(".right").append(correct);
    $(".wrong").append(incorrect);
    $(".blank").append(unanswered);
    $("#restart").on('click', resetGame);
  };

});


// function to check and record the answer to a question
  // function checkStatus() {
  //   var selection;
  //   if ($('input[Radio]:checked').length > 0) {
  //     checkAnswer(selection);
  //   }
  //   else {
  //     unanswered++;
  //     $(".unanswered").text(unanswered);
  //   }
  //
  //   function checkAnswer() {
  //     // if (selection) is not in the answers array, add one to "incorrect". Else, add one to correct. (the inArray utility function returns the index when there is a match, or -1 when there is no match)
  //     if ($.inArray(selection, answers) === -1) {
  //       incorrect++;
  //       $(".incorrect").text(incorrect);
  //     }
  //     else{
  //       correct++;
  //       $(".correct").text(correct);
  //
  //     }
  //   }
  // };
