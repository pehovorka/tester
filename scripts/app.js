var questionsFile;

$(document).ready(function () {
    $(location).attr('href','#welcome');
    hashChange();
    window.onhashchange = hashChange;
    function hashChange() {
        if (areAnyQuestions()){
        var page = location.hash.slice(1);
        $("nav ul li a").show();
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
    else{
        $.ajax({
            url: 'welcome.html',
            success: function (html) {
                $("#content").empty().append(html);
                showContent();
            }
        });
        $("nav ul li a").hide();
    }
}
});


function checkFileExtension(fileElement) {
    var file = fileElement;
    var extension = $(file).val().split('.').pop().toLowerCase();
    if (extension != "txt") {
        $("#fileInput").val('');
        Swal({
            type: 'error',
            title: 'Chyba',
            text: 'Soubor musí mít příponu txt!'
          })
        return false;
    }
    else {
        $('#submitFile').attr('disabled', false);
        $('#randomButton').attr('disabled', false);
        return true;
    }
}

function loadFileAsText(fileElement) {
    if (checkFileExtension(fileElement)) {
        var fileName = fileElement.files[0].name;
        var fileToLoad = fileElement.files[0];
        var fileReader = new FileReader();

        fileReader.onload = function (fileLoadedEvent) {
            questionsFile = fileLoadedEvent.target.result;
            parseText();
        };
        questionList = [];
        resetCounters();
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
    $(location).attr('href','#test');
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
    correctlyAnswered = 0;
    mistakes = 0;
    numberOfQuestions = 0;
}

function showContent() {
    if (areAnyQuestions()) {
        buildView();
        buildTest();
        buildLearn();
        
    }
}

function randomizeQuestions() {
    questionList = questionList.sort(randomize);
    showContent();
}

function randomize(a, b) {
    return 0.5 - Math.random();
}

