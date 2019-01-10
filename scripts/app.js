var questionsFile;

$(document).ready(function () {
    hashChange();
    window.onhashchange = hashChange;
    function hashChange() {
        var page = location.hash.slice(1);
        $("nav ul li a").removeClass('active');
        $("a[href$='#" + page + "']").addClass('active');

        $.ajax({
            url: page + '.html',
            success: function (html) {
                $("#content").empty().append(html);
                showContent();
            }
        });
    }
});



function checkFileExtension() {
    var file = document.getElementById("fileInput");
    var extension = $(file).val().split('.').pop().toLowerCase();
    if (extension != "txt") {
        $("#fileInput").val('');
        alert("Jsou povoleny pouze soubory s příponou txt!");
        return false;
    }
    else {
        $('#submitFile').attr('disabled', false);
        $('#randomButton').attr('disabled', false);
        return true;
    }
}

function loadFileAsText() {
    if (checkFileExtension()) {
        var fileName = document.getElementById("fileInput").files[0].name;
        var fileToLoad = document.getElementById("fileInput").files[0];
        var fileReader = new FileReader();

        fileReader.onload = function (fileLoadedEvent) {
            questionsFile = fileLoadedEvent.target.result;
            parseText();
        };
        questionList = [];
        fileReader.readAsText(fileToLoad, "UTF-8");
        $('#fileNameText').text(fileName);
    }
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
    resetCounters();
    showContent();
}

function areAnyQuestions() {
    if (questionList.length == 0) {
        return false;
    }
    else {
        return true;
    }
}

function resetCounters() {
    currentQuestionLearn = 0;
    currentQuestionTest = 0;
}

function showContent() {
    if (areAnyQuestions()) {
        showQuestions();
        buildTest();
        buildLearn();
    }
    else {

    }
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
    $('#viewMode').html(htmlResult);
}


function randomizeQuestions() {
    questionList = questionList.sort(randomize);
    showQuestions();
}

function randomize(a, b) {
    return 0.5 - Math.random();
}

