var currentQuestionLearn = 0;
var numberOfQuestions = questionList.length;
var numberOfAnswers = 0;
var htmlLearnAnswers = "";

function buildLearn() {
    var htmlLearnQuestion = "";
    var htmlLearnAnswers = "";
        var currentQuestionText = questionList[currentQuestionLearn][0].questionText;
        htmlLearnQuestion += "<h2>"+currentQuestionText+"</h2>"
        //questionList[currentQuestionLearn][1] = questionList[currentQuestionLearn][1].sort(randomize);
        numberOfAnswers = questionList[currentQuestionLearn][1].length;
        for (var j = 0; j < numberOfAnswers; j++) {
            htmlLearnAnswers += "<p>"+questionList[currentQuestionLearn][1][j].answerText+"</p>"
        }
    $('#learnQuestion').html(htmlLearnQuestion);
    $('#learnAnswers').html(htmlLearnAnswers);
    
}

function showAnswers(){
    htmlLearnAnswers = "";
    for (var j = 0; j < numberOfAnswers; j++) {
    if (questionList[currentQuestionLearn][1][j].correctAnswer) {
        htmlLearnAnswers += "<p style=color:green>" + questionList[currentQuestionLearn][1][j].answerText; + "</p>"
    }
    else {
        htmlLearnAnswers += "<p style=color:red>" + questionList[currentQuestionLearn][1][j].answerText; + "</p>"
    }
}
    $('#learnAnswers').html(htmlLearnAnswers);
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
