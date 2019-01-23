var currentQuestionLearn = 0;
var numberOfQuestions = questionList.length;
var numberOfAnswers = 0;
var htmlLearnAnswers = "";

function buildLearn() {
    var htmlLearnQuestion = "";
    var htmlLearnAnswers = "";
        var currentQuestionText = questionList[currentQuestionLearn][0].questionText;
        htmlLearnQuestion += "<h2>"+currentQuestionText+"</h2>"
        numberOfAnswers = questionList[currentQuestionLearn][1].length;
        for (var j = 0; j < numberOfAnswers; j++) {
            htmlLearnAnswers += "<div class=mb-2 id=learnAnswer" + j + "Text>" + questionList[currentQuestionLearn][1][j].answerText + "</div>"
        }
    $('#learnQuestion').html(htmlLearnQuestion);
    $('#learnAnswers').html(htmlLearnAnswers);
    $('#learnQuestionsCounter').text(currentQuestionLearn + 1 + "/" + numberOfQuestions);
    $('#learnProgressBar').text(currentQuestionLearn + 1);
    $('#learnProgressBar').attr("style", "width:" + ((currentQuestionLearn+1)/(numberOfQuestions)*100) + "%");
    
}

function showAnswers(){
    showColorsLearn();
}
function nextLearnQuestion(){
    if (currentQuestionLearn+1 < numberOfQuestions){
    currentQuestionLearn ++;
    buildLearn();
   }
}
function previousLearnQuestion(){
    if (currentQuestionLearn > 0){
    currentQuestionLearn --;
    buildLearn();
    }
}

function showColorsLearn() {
    for (var j = 0; j < numberOfAnswers; j++) {
        if (questionList[currentQuestionLearn][1][j].correctAnswer == false) {
            $('#learnAnswer' + j + 'Text').css('color', 'red');
        }
        else {
            $('#learnAnswer' + j + 'Text').css('color', 'green');
        }
    }
}