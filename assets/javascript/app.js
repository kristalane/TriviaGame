
$(document).ready(function(){



// TODO: define variables
var correct = 0;
var incorrect = 0;
var unanswered = 0;
var time = 30;

// TODO: write question array, correct answer array, and additional option array

// var questions = ["Which country has the most UNESCO World Heritage sites?", "Which country produced the most wine in 2016?", "Which country has hosted the Olympics the most times?", "Which is the world’s largest continental lake?", "How many ossuaries (ancient and medieval 'bone churches') still stand around the world?"];
//
// var answers = ["Italy", "France", "USA", "Baikal", "40"];

var triviaArray = [
  ["Which country has the most UNESCO World Heritage sites?", ["Italy", "China", "Spain", "France"]],
  ["Which country produced the most wine in 2016?", ["France", "Italy", "USA", "Spain"]],
  ["Which country has hosted the Olympics the most times?", ["USA", "United Kingdom", "Japan", "France"]],
  ["Which is the world's largest continental lake?", ["Baikal", "Superior", "Tanganyika", "Michigan"]],
  ["How many ossuaries (ancient and medieval 'bone churches') still stand around the world?", ["40", "27", "34", "13"]]
];

var imageArr = ["https://media.giphy.com/media/zNo55r09LvANW/giphy.gif", "https://vinepair.com/wp-content/uploads/2015/02/waynesworld.gif", "https://s.aolcdn.com/hss/storage/midas/e1aa225dbaac5829b5c08cc5ff2dbd9b/204164905/olympics.gif", "https://68.media.tumblr.com/8c44930bfced029ab6b902d77a4431c1/tumblr_o7luihXCqm1tchrkco1_500.gif", "http://i.imgur.com/gahBI58.gif"]

var currentQuestionIndex = 0;

// snippet
var currentQuestionArr = triviaArray[currentQuestionIndex];
var questionText = currentQuestionArr[0];
var allAnswers = currentQuestionArr[1];
var correctAnswer = allAnswers[0];

var questionInterval;

// var otherOptions1 = ["China", "Spain", "France"];
// var otherOptions2 = ["Italy", "USA", "Spain"];
// var otherOptions3 = ["United Kingdom", "Japan", "France"];
// var otherOptions4 = ["Superior", "Tanganyika", "Michigan"]
// var otherOptions5 = ["27", "34", "13"];


// Game has a start button that disappears when clicked.
// TODO: create on-click event targeting the button to hide and initiate game
  $("#start").on('click', function(){
    startGame();
    $("#start").hide();
  })

// Immediately after start button is pressed, the first question and timer displays.
  function startGame() {
    time = 30;
    questionInterval = setInterval(count, 1000);
    $(".questions").text(questionText);
    $("#answers").on('click', function(){
      clearInterval(questionInterval);
      checkStatus();
      displayAnswer();
    });
  }


  // counting function for timer
  function count() {
    time--;
    $(".timer").text(time);
    if (time === 0) {
      clearInterval(questionInterval);
      displayAnswer();
    }
  }

  // display the answer and image for a short period of time.
  function displayAnswer(){
    setTimeout(nextQuestion, 5000);
    $(".main-container").text(whichPic);
  }

  // loop through image arrays
  // function whichPic() {
  //   for (i=0; i < imageArr.length, i++){
  //     console.log(i);
  //   }
  // }
  //
  // function nextQuestion() {
  //   for (i=0; i < triviaArray.length, i++) {
  //     console.log(i)
  //   }
  // }

// function to check and record the answer to a question
  function checkStatus() {
    var selection;
    if ($('input[Radio]:checked').length > 0) {
      checkAnswer(selection);
    }
    else {
      unanswered++;
      $(".unanswered").text(unanswered);
    }

    function checkAnswer() {
      // if (selection) is not in the answers array, add one to "incorrect". Else, add one to correct. (the inArray utility function returns the index when there is a match, or -1 when there is no match)
      if ($.inArray(selection, answers) === -1) {
        incorrect++;
        $(".incorrect").text(incorrect);
      }
      else{
        correct++;
        $(".correct").text(correct);

      }
    }
  };


// When timer ends, correct answer and image is displayed for 5 seconds.
// TODO: write image array to match each question

// the next question and a new timer displays. repeat through the length of the questions array.
// TODO: write for loop to address each question.

// display a correct/incorrect/unanswered answer counter. Div should contain "here's how you did" or similar, and a startover option set to a timer for resetting the game.


});
