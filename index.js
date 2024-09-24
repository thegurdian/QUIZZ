const questions = [
    {
        question: "What is the capital city of Japan?",
        answers: [
            { text: "Seoul", correct: false },
            { text: "Tokyo", correct: true },
            { text: "Beijing", correct: false },
            { text: "Bangkok", correct: false }
        ]
    },
    {
        question: "Which is the longest river in the world?",
        answers: [
            { text: "Amazon", correct: false },
            { text: "Nile", correct: true },
            { text: "Yangtze", correct: false },
            { text: "Mississippi", correct: false }
        ]
    },
    {
        question: "Which animal is known as the 'King of the Jungle'?",
        answers: [
            { text: "Tiger", correct: false },
            { text: "Elephant", correct: false },
            { text: "Lion", correct: true },
            { text: "Cheetah", correct: false }
        ]
    },
    {
        question: "Which gas do plants absorb from the atmosphere?",
        answers: [
            { text: "Oxygen", correct: false },
            { text: "Carbon Dioxide", correct: true },
            { text: "Nitrogen", correct: false },
            { text: "Hydrogen", correct: false }
        ]
    },
    {
        question: "Who was the first person to walk on the moon?",
        answers: [
            { text: "Yuri Gagarin", correct: false },
            { text: "Neil Armstrong", correct: true },
            { text: "Buzz Aldrin", correct: false },
            { text: "John Glenn", correct: false }
        ]
    },
    {
        question: "Which planet is the hottest in the Solar System?",
        answers: [
            { text: "Mars", correct: false },
            { text: "Mercury", correct: false },
            { text: "Venus", correct: true },
            { text: "Jupiter", correct: false }
        ]
    },
    {
        question: "What is the smallest prime number?",
        answers: [
            { text: "1", correct: false },
            { text: "2", correct: true },
            { text: "3", correct: false },
            { text: "5", correct: false }
        ]
    },
    {
        question: "In which country would you find the Great Barrier Reef?",
        answers: [
            { text: "New Zealand", correct: false },
            { text: "Australia", correct: true },
            { text: "Fiji", correct: false },
            { text: "Indonesia", correct: false }
        ]
    },
    {
        question: "What is the square root of 64?",
        answers: [
            { text: "6", correct: false },
            { text: "8", correct: true },
            { text: "7", correct: false },
            { text: "9", correct: false }
        ]
    },
    {
        question: "Who painted the Mona Lisa?",
        answers: [
            { text: "Vincent van Gogh", correct: false },
            { text: "Michelangelo", correct: false },
            { text: "Leonardo da Vinci", correct: true },
            { text: "Pablo Picasso", correct: false }
        ]
    }
];


const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-button");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex=0;
let score=0;


function startQuiz()
{
    currentQuestionIndex=0;
    score=0;
    nextButton.innerHTML="Next";
    showQuestion();
}

function showQuestion()
{
    resetState();
    let currentQuestion=questions[currentQuestionIndex];
    let questionNo=currentQuestionIndex+1;
    questionElement.innerHTML=questionNo +". "+currentQuestion.question;

    currentQuestion.answers.forEach(answer=>{
         const button=document.createElement("button");
         button.innerHTML=answer.text;
         button.classList.add("btn");
         answerButtons.appendChild(button);
         if(answer.correct)
         {
            button.dataset.correct=answer.correct;
         }
         button.addEventListener("click",selectAnswer);
    });

}
function resetState()
{
    nextButton.style.display="none";
    while(answerButtons.firstChild)
    {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}
function selectAnswer(e)
{
    const selectedButton=e.target;
    const isCorrect=selectedButton.dataset.correct=="true";
    if(isCorrect)
    {
        selectedButton.classList.add("correct");
        score++;
    }
    else{
        selectedButton.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button =>
    {
        if(button.dataset.correct==="true")
        {
            button.classList.add("correct");
        }
        button.disabled=true;
    });
    nextButton.style.display="block";
}
function showScore()
{
    resetState();
    questionElement.innerHTML=`you scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML="Play Again";
    nextButton.style.display="block";
}

function handleNextButton()
{
    currentQuestionIndex++;
    if(currentQuestionIndex<questions.length)
    {
        showQuestion();
    }
    else{
        showScore();
    }
}

nextButton.addEventListener("click",()=>{
    if(currentQuestionIndex<questions.length)
    {
        handleNextButton();
    }
    else{
        startQuiz();
    }
});

startQuiz();