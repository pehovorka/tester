var questionsFile;
var testFileName = "";

$(document).ready(function () {
    $(location).attr('href', '#welcome');
    hashChange();
    window.onhashchange = hashChange;
    function hashChange() {
        if (areAnyQuestions()) {
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
        else {
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

$(document).ajaxSend(function (event, request, settings) {
    $('#content').jmspinner();
});

$(document).ajaxComplete(function (event, request, settings) {
    $('#content').jmspinner(false);
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
        testFileName = fileName;
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
    lines = questionsFile.split('\n');
    var arrayLength = lines.length;
    for (var i = 0; i < arrayLength; i++) {
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
    $(location).attr('href', '#test');
    showContent();
    saveToLocalStorage();
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
    getKeysFromLocalStorage();
    showLocalStorageItems();
}

function saveToLocalStorage() {
    var sklonovaniOtazky = "";
    if (numberOfQuestions == 1) { sklonovaniOtazky = "otázka" }
    else if (numberOfQuestions >= 2 && numberOfQuestions <= 4) { sklonovaniOtazky = "otázky" }
    else { sklonovaniOtazky = "otázek" }
    localStorage.setItem(testFileName + " (" + numberOfQuestions + " " + sklonovaniOtazky + ")", JSON.stringify(questionList));
}

function getKeysFromLocalStorage() {
    var localStorageKeys = [];
    for (var i = 0, len = localStorage.length; i < len; ++i) {
        localStorageKeys.push(localStorage.key(i));
    }
    return localStorageKeys;
}


function showLocalStorageItems() {
    var html = "";
    if (getKeysFromLocalStorage().length != 0) {
        html = '<h3>Vaše soubory</h3><table class="table table-hover table-striped"><thead><tr><th scope="col">#</th><th scope="col">Název</th><th scope="col">Akce</th></tr><tbody></thead>';
        for (var i = 0; i < getKeysFromLocalStorage().length; i++) {
            html += '<tr><th scope="row">' + (i + 1) + '</th><th><a href=javascript:void(0); onclick="loadFileFromLocalStorage(' + i + ')";>' + getKeysFromLocalStorage()[i] + '</a></th><th><a href=javascript:void(0); onclick="deleteLocalStorageItem(' + i + ')";>Odstranit</th></tr>'
        }
        html += '</tbody></table>'
    }
    else {
        html = '<h3 class="text-center">Připraveni?</h3><div class="text-center"><input type="button" class="btn btn-secondary btn-lg mt-5" value="Nahrát první test!" onclick=document.getElementById("fileInput").click();></div>'
    }
    $('#localStorageFiles').html(html);
}


function loadFileFromLocalStorage(index) {
    var data = localStorage.getItem(getKeysFromLocalStorage()[index]);
    questionList = JSON.parse(data);
    resetCounters();
    numberOfQuestions = questionList.length;
    showContent();
    $(location).attr('href', '#test');
    $('#fileNameText').text(getKeysFromLocalStorage()[index]);
}

function deleteLocalStorageItem(index) {
    localStorage.removeItem(getKeysFromLocalStorage()[index]);
    showLocalStorageItems();
}

function randomizeQuestions() {
    questionList = questionList.sort(randomize);
    showContent();
}

function randomize(a, b) {
    return 0.5 - Math.random();
}

