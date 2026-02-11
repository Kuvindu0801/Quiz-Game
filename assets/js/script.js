
const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const startButton = document.getElementById("start-btn");
const questionText = document.getElementById("question-text");
const answersContainer = document.getElementById("answers-container");
const currentQuestionSpan = document.getElementById("current-question");
const totalQuestionsSpan = document.getElementById("total-questions");
const scoreSpan = document.getElementById("score");
const finalScoreSpan = document.getElementById("final-score");
const maxScoreSpan = document.getElementById("max-score");
const resultMessage = document.getElementById("result-message");
const restartButton = document.getElementById("restart-btn");
const progressBar = document.getElementById("progress");

const quizQuestions = [

    {
        question: "Which planet is known as the Red Planet?",
        answers: [
            { text: "Venus", correct: false },
            { text: "Mars", correct: true },
            { text: "Jupiter", correct: false },
            { text: "Saturn", correct: false },
        ],
    },
    {
        question: "Which country has Canberra as its capital city?",
        answers: [
            { text: "Australia", correct: true },
            { text: "CAnada", correct: false },
            { text: "South Africa", correct: false },
            { text: "New Zeeland", correct: false },
        ],
    },
    {
        question: "Which planet is known as the Red Planet?",
        answers: [
            { text: "Venus", correct: false },
            { text: "Mars", correct: true },
            { text: "Jupiter", correct: false },
            { text: "Saturn", correct: false },
        ],
    },
    {
        question: "What is the capital city of Japan?",
        answers: [
            { text: "Beijin", correct: false },
            { text: "Tokyo", correct: true },
            { text: "Kyoto", correct: false },
            { text: "Seoul", correct: false },
        ],
    },
    {
        question: "Which capital city is located at the highest elevation above sea level?",
        answers: [
            { text: "Quito,Ecuador", correct: false },
            { text: "Kathmandu,Nepal", correct: false },
            { text: "Mexico City,Mexico", correct: false },
            { text: "La Paz,Bolivia", correct: true },
        ],
    },
    {
        question: "What is the capital of Canada?",
        answers: [
            { text: "Toronto", correct: false },
            { text: "Ottawa", correct: true },
            { text: "Vancouver", correct: false },
            { text: "Montreal", correct: false },
        ],
    },
    {
        question: "Which capital city lies on two continents, Europe and Asia?",
        answers: [
            { text: "Athens", correct: false },
            { text: "Moscow", correct: false },
            { text: "Istanbul", correct: true },
            { text: "Cairo", correct: false },
        ],
    },
    {
        question: "Which capital city is known as the City of Canals and is built on a lagoon?",
        answers: [
            { text: "StockHolm", correct: false },
            { text: "Venice", correct: false },
            { text: "Amsterdam", correct: false },
            { text: "Copenhagen", correct: true },
        ],
    },
    {
        question: "What is the largest ocean on Earth?",
        answers: [
            { text: "Atlantic Ocean", correct: false },
            { text: "Indian Ocean", correct: false },
            { text: "Arctic Ocean", correct: false },
            { text: "Pacific Ocean", correct: true },
        ],
    },
    {
        question: "Which of these is NOT a programming language?",
        answers: [
            { text: "Java", correct: false },
            { text: "Python", correct: false },
            { text: "Banana", correct: true },
            { text: "JavaScript", correct: false },
        ],
    }
];

let currentQuestionIndex = 0;
let score = 0;
let answersDisabled = false;
totalQuestionsSpan.textContent=quizQuestions.length;

startButton.addEventListener("click", startQuiz);
restartButton.addEventListener("click", restartQuiz);

//startQuiz function
function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    scoreSpan.textContent = score;

    startScreen.classList.remove("active");
    quizScreen.classList.add("active");

    showQuestion();
}
//restartQuiz function
function restartQuiz() {
    resultScreen.classList.remove("active");
    startQuiz();
}
//showQuiz function
function showQuestion() {
    answersDisabled = false;    
    const currentQuestion = quizQuestions[currentQuestionIndex];

    currentQuestionSpan.textContent = currentQuestionIndex + 1;

    const progressPercent = (currentQuestionIndex / quizQuestions.length) * 100;
    progressBar.style.width = progressPercent + "%";

    questionText.textContent = currentQuestion.question;

    answersContainer.innerHTML = "";

    currentQuestion.answers.forEach((answer) => {
        const button = document.createElement("button");
        button.textContent = answer.text;
        button.classList.add("answer-btn");


        button.dataset.correct = answer.correct;

        button.addEventListener("click", selectAnswer);

        answersContainer.appendChild(button);
    });
}
function selectAnswer(event) {
    if (answersDisabled) return
    answersDisabled = true;

    const selectedButton = event.target;
    const isCorrect = selectedButton.dataset.correct === "true";

    Array.from(answersContainer.children).forEach((button) => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        } else if (button === selectedButton) {
            button.classList.add("incorrect");
        }

    });
    if (isCorrect) {
        score++;
        scoreSpan.textContent = score;
    }

    setTimeout(() => {
        currentQuestionIndex++;

        if (currentQuestionIndex < quizQuestions.length) {
            showQuestion();
        } else {
            showResults();
        }
    }, 1000);
}

function showResults() {
    quizScreen.classList.remove("active");
    resultScreen.classList.add("active");

    finalScoreSpan.textContent = score;

    const percentage = (score / quizQuestions.length) * 100;

    if (percentage === 100) {
        resultMessage.textContent = "Perfect! You are genius";
    } else if (percentage >= 80) {
        resultMessage.textContent = "Good job! You know some stuff ";
    } else if (percentage >= 60) {
        resultMessage.textContent = "Good try! Keep Learning";
    } else if (percentage >= 40) {
        resultMessage.textContent = "Pretty Good!";
    } else {
        resultMessage.textContent = "Keep it up! Study Hard ";
    }

}

