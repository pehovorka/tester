function buildView() {
    var htmlResult = "";
    var numberOfQuestions = questionList.length;
    for (var i = 0; i < numberOfQuestions; i++) {
        questionList[i][1] = questionList[i][1].sort(randomize);
        htmlResult += "<div class=questionBlock><p class=questionHeader>" + questionList[i][0].questionText; + "</p>"
        var numberOfAnswers = questionList[i][1].length;
        for (var j = 0; j < numberOfAnswers; j++) {
            if (questionList[i][1][j].correctAnswer) {
                htmlResult += "<p style=color:green>" + questionList[i][1][j].answerText; + "</p>"
            }
            else {
                htmlResult += "<p style=color:red>" + questionList[i][1][j].answerText; + "</p>"
            }
        }
        htmlResult += "</div>"
    }
    htmlResult += "<div class=questionBlock>"
    $('#viewMode').html(htmlResult);
}