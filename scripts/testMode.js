var currentQuestionTest = 0;
var htmlTestAnswers = "";
var correctlyAnswered = 0;
var mistakes = 0;
var answered = false;

function buildTest() {
    var htmlTestQuestion = "";
    var htmlTestAnswers = "";
    var currentQuestionText = questionList[currentQuestionTest][0].questionText;
    htmlTestQuestion += "<h2>" + currentQuestionText + "</h2>"
    //questionList[currentQuestionTest][1] = questionList[currentQuestionTest][1].sort(randomize);
    numberOfAnswers = questionList[currentQuestionTest][1].length;
    for (var j = 0; j < numberOfAnswers; j++) {
        htmlTestAnswers += "<div class='form-check mb-2'><input type=checkbox id=answer" + j + " class=form-check-input value=" + questionList[currentQuestionTest][1][j].answerText + "><label id=answer" + j + "label class=form-check-label for=answer" + j + ">" + questionList[currentQuestionTest][1][j].answerText + "</label></div>"
    }
    $('#testQuestion').html(htmlTestQuestion);
    $('#testAnswers').html(htmlTestAnswers);
    $('#testQuestionsCounter').text(currentQuestionTest + 1 + "/" + numberOfQuestions);
    $('#correctlyAnswered').text(correctlyAnswered);
    $('#correctlyAnswered').attr("style", "width:" + correctlyAnswered / numberOfQuestions * 100 + "%");
    $('#mistakes').text(mistakes);
    $('#mistakes').attr("style", "width:" + mistakes / numberOfQuestions * 100 + "%");
    if (answered == false) {
        $('#checkButton').show();
        $('#nextButton').hide();
        $('#repeatButton').hide();
    }
    else {
        $('#checkButton').hide();
        $('#nextButton').show();
        $('#repeatButton').hide();
    }


}

function checkResults() {
    answered = true;
    var isCurrentQustionCorrect = true;
    for (var j = 0; j < numberOfAnswers; j++) {
        console.log(questionList[currentQuestionTest][1][j]);
        console.log(($('#answer' + j).prop('checked')));
        if (($('#answer' + j).prop('checked') == true) && (questionList[currentQuestionTest][1][j].correctAnswer == false)) {
            isCurrentQustionCorrect = false;
        }
        else if (($('#answer' + j).prop('checked') == false) && (questionList[currentQuestionTest][1][j].correctAnswer == true)) {
            isCurrentQustionCorrect = false;
        }

        if (questionList[currentQuestionTest][1][j].correctAnswer == false) {
            $('#answer' + j + 'label').css('color', 'red');
        }
        else {
            $('#answer' + j + 'label').css('color', 'green');
        }
        $('#answer' + j).prop('disabled', true) == true;
    }
    if (isCurrentQustionCorrect == true) {
        correctlyAnswered++;
        Swal({
            toast: true,
            position: 'center',
            showConfirmButton: false,
            timer: 2000,
            type: 'success',
            title: 'Správně!'
        });
    }
    else {
        mistakes++;
        Swal({
            toast: true,
            position: 'center',
            showConfirmButton: false,
            timer: 2000,
            type: 'error',
            title: 'Špatně :('
        });
    }
    console.log("Správně: " + correctlyAnswered)


    /*    htmlTestAnswers = "";
       for (var j = 0; j < numberOfAnswers; j++) {
           if (questionList[currentQuestionTest][1][j].correctAnswer) {
               htmlTestAnswers += "<p style=color:green><label><input type=checkbox value=" + questionList[currentQuestionTest][1][j].answerText + ">" + questionList[currentQuestionTest][1][j].answerText + "</label></p>"
           }
           else {
               htmlTestAnswers += "<p style=color:red><label><input type=checkbox value=" + questionList[currentQuestionTest][1][j].answerText + ">" + questionList[currentQuestionTest][1][j].answerText + "</label></p>"
           }
       }
       $('#testAnswers').html(htmlTestAnswers); */
    $('#checkButton').hide();
    $('#correctlyAnswered').text(correctlyAnswered);
    $('#correctlyAnswered').attr("style", "width:" + correctlyAnswered / numberOfQuestions * 100 + "%");
    $('#mistakes').text(mistakes);
    $('#mistakes').attr("style", "width:" + mistakes / numberOfQuestions * 100 + "%");

    if (currentQuestionTest + 1 < numberOfQuestions) {
        $('#nextButton').show();
        $('#repeatButton').hide();
    }
    else {
        Swal({
            title: '<strong>Konec testu!</strong>',
            html:
                '<h3 style="color: green">Správně: ' + correctlyAnswered + ' </h3> ' +
                '<h3 style="color: red">Špatně: ' + mistakes + ' </h3> ' +
                'Celková úspěšnost: ' + Math.round(correctlyAnswered / numberOfQuestions * 100 * 100) / 100 + '%',
            showCloseButton: true,
            showCancelButton: true,
            focusConfirm: false,
            confirmButtonText:
                'Zkusit znovu!',
            cancelButtonText:
                'Ok',
        }).then((result) => {
            if (result.value) {
                repeatTest();
            }
        })


        $('#repeatButton').show();
    }





}
function nextTestQuestion() {
    $('#nextButton').hide();
    answered = false;
    if (currentQuestionTest + 1 < numberOfQuestions) {
        currentQuestionTest++;
        $('#checkButton').show();
        buildTest();
    }
}

function repeatTest() {
    currentQuestionTest = 0;
    correctlyAnswered = 0;
    mistakes = 0;
    answered = false;
    $('#checkButton').show();
    $('#nextButton').hide();
    $('#repeatButton').hide();
    buildTest();
}

