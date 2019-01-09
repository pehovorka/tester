var questionText;
var answers = [];
var correct = 0;
var mistakes = 0;
var numberOfQuestions = 0;
var numberOfAnswers = 0;
var questionList = [];

class Question {

    constructor(questionText) {
        this.questionText = questionText;
        answers = new Array();
        questionList.push([this, answers]);
        numberOfQuestions += 1;
    }

    getQuestionText() {
        return questionText;
    }

    getAnswers() {
        return answers;
    }

    addAnswer(answer) {
        answers.push(answer);
    }
}