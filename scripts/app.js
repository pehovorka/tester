var questionsFile;


$(document).ready(function () {
    hashChange();
    window.onhashchange = hashChange;
    function hashChange() {
        var page = location.hash.slice(1);
        console.log(page);
        $("nav li a").removeClass('active');
        $("a[href$='#" + page + "']").addClass('active');

        $.ajax({
            url: page + '.html',
            success: function (html) {
                $("#content").empty().append(html);
            }
        });
    }
});



function checkFileExtension() {
    var file = document.getElementById("fileInput");
    var extension = $(file).val().split('.').pop().toLowerCase();
    console.log(extension);
    if (extension != "txt") {
        $("#fileInput").val('');
        alert("Jsou povoleny pouze soubory s příponou txt!");
    }
    else {
        $('#submitFile').attr('disabled', false);
        $('#randomButton').attr('disabled', false);
    }
}

function loadFileAsText() {
    var fileToLoad = document.getElementById("fileInput").files[0];
    var fileReader = new FileReader();

    fileReader.onload = function (fileLoadedEvent) {
        questionsFile = fileLoadedEvent.target.result;
        parseText();
    };
    questionList = [];
    fileReader.readAsText(fileToLoad, "UTF-8");
    console.log("Soubor byl nahrán!");
}

function parseText() {
    var lines = new Array();
    //questionsFile.replace(/(^[ \t]*\n)/gm, "");
    lines = questionsFile.split('\n');
    var arrayLength = lines.length;
    for (var i = 0; i < arrayLength; i++) {
        /*         if ((lines[i]).substring(0, 1) != "+" && (lines[i]).substring(0, 1) != "-" && (lines[i]).trim() != "") {
                    onlyQuestions.push((lines[i]));
                }; */
        if (lines[i].trim().length != 0) {

            if ((!lines[i].startsWith("+")) && (!lines[i].startsWith("-"))) {
                question = new Question(lines[i]);
            }
            else if (lines[i].startsWith("+")) {
                question.addAnswer(new Answer(lines[i], true));
            }
            else if (lines[i].startsWith("-"))
                question.addAnswer(new Answer(lines[i], false));
        }
    }
    console.log(questionList);
    console.log("Otazky" + questionList.getAnswers);
    showQuestions();

}

function showQuestions() {
    var htmlResult = "";
    var numberOfQuestions = questionList.length;
    for (var i = 0; i < numberOfQuestions; i++) {
        htmlResult += "<div class=questionBlock><p class=questionHeader>" + questionList[i][0].questionText; + "</p>"
        questionList[i][1] = questionList[i][1].sort(randomize);
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
    $('#results').html(htmlResult);
}


function randomizeQuestions() {
    questionList = questionList.sort(randomize);
    showQuestions();
}

function randomize(a, b) {
    return 0.5 - Math.random();
}