var questionsFile;
var onlyQuestions = new Array();

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
    }
}

function loadFileAsText() {
    var fileToLoad = document.getElementById("fileInput").files[0];
    var fileReader = new FileReader();
    onlyQuestions = [];
    fileReader.onload = function (fileLoadedEvent) {
        questionsFile = fileLoadedEvent.target.result;
        parseText();
    };

    fileReader.readAsText(fileToLoad, "UTF-8");
    console.log("Soubor byl nahrán!");

}

function parseText() {
    var lines = new Array();
    //questionsFile.replace(/(^[ \t]*\n)/gm, "");
    lines = questionsFile.split('\n');
    var arrayLength = lines.length;
    for (var i = 0; i < arrayLength; i++) {
        if ((lines[i]).substring(0, 1) != "+" && (lines[i]).substring(0, 1) != "-" && (lines[i]).trim() != "") {
            onlyQuestions.push((lines[i]));
        };
    }
    console.log(onlyQuestions);
    showQuestions();
}

function showQuestions() {
    //$('#results').html(onlyQuestions);
    var htmlResult = "";
    var arrayLength = onlyQuestions.length;
    for (var i = 0; i < arrayLength; i++) {
        htmlResult += "<p>" + onlyQuestions[i] + "</p>"
    }
    $('#results').html(htmlResult);
}






