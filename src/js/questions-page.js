/**
 * Created by an5ra on 4/13/2016.
 */


var questions = {},
    currentQuestionNumber = 0,
    currentQuestionAnswer,
    correctAnswers = 0,
    currentHint;

$.get({
    url: 'https://mysterious-caverns-36769.herokuapp.com/api/questions?random=true&limit=3',
    success: function (data) {
        console.log(data);
        questions = data.data
        attachQuestion(0);

        //for (i=0;i<3;i++){
        //    console.log(questions[i].questionText);
        //}
        //
        //correctAnswer = data.data[0].correctAnswerText;
        //hint = data.data[0].hintText;
    }
});
function enableOptions() {
    $('.question-option').prop("disabled", false);
    $('.question-option').addClass("bh-icon-smiley");
    $('.question-option').addClass("btn-5a");


}
function disableOptions() {
    $('.question-option').prop("disabled", true);
    $('.question-option').removeClass("bh-icon-smiley");
    $('.question-option').removeClass("btn-5a");


}
function evaluateAnswer(optionLetter) {
    console.log(optionLetter + " vs" + currentQuestionAnswer);
    if (currentQuestionAnswer == optionLetter) {
        correctAnswers++;
        $('#correctAnswers').html(correctAnswers);
        disableOptions();
        $('#option-' + optionLetter.toLowerCase()).addClass("animated");
        $('#option-' + optionLetter.toLowerCase()).addClass("infinite");
        $('#option-' + optionLetter.toLowerCase()).addClass("pulse");
        $('#option-' + optionLetter.toLowerCase()).css("background-color", "#1b7e5a");
        $('#next-question-text').html("Next Question");

        $('#next-question').addClass("animated");
        //$('#next-question').addClass("infinite");
        $('#next-question').addClass("bounce");


        if (currentQuestionNumber == 2) {
            if (correctAnswers < 2)

                swal({
                        title: "Good job but hard luck!",
                        text: "You got that right too! Although you need to get at least 2 to get the cookie! :(",
                        imageUrl: "http://ecx.images-amazon.com/images/I/31tGqn1eA1L._SY300_.jpg",
                        confirmButtonColor: "black",
                        confirmButtonText: "Try again!"
                    },
                    function () {
                        // redirection to future-steps page.
                        window.location = 'questions-page.html';
                    });
            else
                swal({
                        title: "Sweet!",
                        text: "You got that right too! You're now on your way to your cookie!",
                        imageUrl: "http://barkpost-assets.s3.amazonaws.com/wp-content/uploads/2013/11/3dDoge.gif",
                        confirmButtonColor: "green",
                        confirmButtonText: "Yes, give it to me!"
                    },
                    function () {
                        // redirection to future-steps page.
                        window.location = 'print.html';
                    });

        }
        else {
            swal("Good job!", "You got it right!", "success");

        }
    }
    else {
        // wrong answer

        swal("Wrong!", "Try a hint?", "error");
        $('#option-' + optionLetter.toLowerCase()).css("color", "indianred");


    }
}
function nextQuestion() {
    if (currentQuestionNumber < 2) {
        $('.question-option').removeClass("animated");
        $('.question-option').css("color", "beige");

        $('.question-option').css("background-color", "black");
        $('#next-question-text').html("Skip");

        $('#next-question-text').removeClass("animated");
        currentQuestionNumber++;
        attachQuestion(currentQuestionNumber);
    }
}


function attachQuestion(i) {
    enableOptions();
    $('.question-text').html("Question #" + (i+1) + " "+ questions[i].questionText);
    $('#option-1-text').html(questions[i].optionsText.A);
    $('#option-2-text').html(questions[i].optionsText.B);
    $('#option-3-text').html(questions[i].optionsText.C);
    $('#option-4-text').html(questions[i].optionsText.D);
    $('#hint-text').html(questions[i].hintText);
    currentHint = questions[i].hintText;
    currentQuestionAnswer = questions[i].correctAnswerText;
    $('pre').each(function (x, block) {
        hljs.highlightBlock(block);
    });
}