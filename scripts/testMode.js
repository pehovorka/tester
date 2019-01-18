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
        htmlTestAnswers += "<div class='form-check mb-2'><input type=checkbox id=testAnswer" + j + " class=form-check-input value=" + questionList[currentQuestionTest][1][j].answerText + "><label id=testAnswer" + j + "label class=form-check-label for=testAnswer" + j + ">" + questionList[currentQuestionTest][1][j].answerText + "</label></div>"
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
    else if (answered == true && (currentQuestionTest + 1 == numberOfQuestions)){
        $('#repeatButton').show();
        $('#checkButton').hide();
        $('#nextButton').hide();
        showColorsTest();
    }
    else {
        $('#checkButton').hide();
        $('#nextButton').show();
        $('#repeatButton').hide();
        showColorsTest();
    }
}

function checkResults() {
    answered = true;
    var isCurrentQustionCorrect = true;
    for (var j = 0; j < numberOfAnswers; j++) {
        console.log(questionList[currentQuestionTest][1][j]);
        console.log(($('#testAnswer' + j).prop('checked')));
        if (($('#testAnswer' + j).prop('checked') == true) && (questionList[currentQuestionTest][1][j].correctAnswer == false)) {
            isCurrentQustionCorrect = false;
        }
        else if (($('#testAnswer' + j).prop('checked') == false) && (questionList[currentQuestionTest][1][j].correctAnswer == true)) {
            isCurrentQustionCorrect = false;
        }
        showColorsTest();
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
            title: 'Špatně'
        });
    }
    console.log("Správně: " + correctlyAnswered)

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

function showColorsTest() {
        for (var j = 0; j < numberOfAnswers; j++) {
            if (questionList[currentQuestionTest][1][j].correctAnswer == false) {
                $('#testAnswer' + j + 'label').css('color', 'red');
            }
            else {
                $('#testAnswer' + j + 'label').css('color', 'green');
            }
            $('#testAnswer' + j).prop('disabled', true) == true;
        }
}

