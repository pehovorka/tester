var answerText;
var isCorrect = false;
var isSelected = false;


class Answer {
    constructor(answerText, correctAnswer) {
        this.answerText = answerText;
        this.correctAnswer = correctAnswer;
        this.answerText = removeUnwanted(answerText);
    }

    getAnswerText() {
        return answerText;
    }

    setAnswerText(answerText) {
        this.answerText = answerText;
    }

    addAnswer(answer) {
        answers.push(answer);
    }
}


function removeUnwanted(text) {
    var originalText = text;
    var finalText = originalText.substring(1);
    finalText = finalText.trim();
    if (finalText.slice(-1) == ";") {
        finalText = finalText.substring(0, finalText.length - 1);
    }
    text = finalText;
    return text;
}