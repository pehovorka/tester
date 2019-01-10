var currentQuestionTest = 0;

function buildTest() {
    var htmlResult = "";
    var numberOfQuestions = questionList.length;
    if (currentQuestionTest <= numberOfQuestions){
        var currentQuestionText = questionList[currentQuestionTest][0].questionText;
        htmlResult += "<h2>"+currentQuestionText+"</h2>"
        questionList[currentQuestionTest][1] = questionList[currentQuestionTest][1].sort(randomize);
        var numberOfAnswers = questionList[currentQuestionTest][1].length;
        for (var j = 0; j < numberOfAnswers; j++) {
            if (questionList[currentQuestionTest][1][j].correctAnswer) {
                htmlResult += "<p style=color:green>" + questionList[currentQuestionTest][1][j].answerText; + "</p>"
            }
            else {
                htmlResult += "<p style=color:red>" + questionList[currentQuestionTest][1][j].answerText; + "</p>"
            }
        }
    }
    $('#testArea').html(htmlResult);
    
}

function checkResults(){}
function nextTestQuestion(){
    if (currentQuestionTest+1 < numberOfQuestions){
        currentQuestionTest ++;
        buildTest();
       }
}
