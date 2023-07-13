const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const saveButton = document.getElementById('save-btn')
const questionContainerElement = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const inputElement = document.getElementById('input');
const timerElement = document.getElementById('timer');
const messageElement = document.getElementById('message')

let shuffledQuestions, currentQuestionIndex;

let timer = 60; //set timer to 60 seconds

function updateTimer(){ // lower timer by 1 each second
    timer--
    timerElement.textContent = timer;
    if (timer === 0) {
        clearInterval(timerInterval); endGame(); //if timer reaches 0, run endGame function
    }
}

let timerInterval;

startButton.addEventListener('click', startGame) //creates clickable start button function
nextButton.addEventListener('click', () => {
    currentQuestionIndex++
    setNextQuestion()
})

function startGame() {
    
    startButton.classList.add('hide') //hides start button after it is pressed
    shuffledQuestions = questions.sort(() => Math.random() - .5) //shuffles questions
    currentQuestionIndex = 0  
    questionContainerElement.classList.remove('hide')
    setNextQuestion()
    timer = 60;
    timerElement.textContent = timer;
    timerInterval = setInterval(updateTimer, 1000);
}

function setNextQuestion() { //displays the shuffled questions that are arrayed below
    resetState()
    showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
    questionElement.innerText = question.question
    question.answers.forEach(answer => {
        const button = document.createElement('button'); //creates a button that features the answers created below
        button.innerText = answer.text  //adds 'answer' arrays into the buttons
        button.classList.add('btn')
        if (answer.correct) {
            button.dataset.correct = answer.correct //if answer is correct, adds correct styling. otherwise adds wrong styling
        }
        button.addEventListener('click', selectAnswer)
        answerButtonsElement.appendChild(button)
    })
}

function resetState() {
    nextButton.classList.add('hide')
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild)
    }
}

function selectAnswer(e) {
    const selectedButton = e.target
    const correct = selectedButton.dataset.correct
    setStatusClass(document.body, correct)
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
    if (shuffledQuestions.length > currentQuestionIndex + 1) {  //if user has gone through all of the questions available, the 'start' button will appear as a 'reset' button, allowing the user to restart the game.
    nextButton.classList.remove('hide')
    } else {
        clearInterval(timerInterval); //end the game and stop the timer if the user runs out of questions
        endGame();
        startButton.innerText = 'Reset'
        startButton.classList.remove('hide')
    }
    if (!correct) {
        timer -= 10; //If question is incorrect, remove 10 seconds from timer.
        if (timer < 0) { //If timer goes below zero, set timer to zero, ending the game.
            timer = 0;
        }
        timerElement.textContent = timer;
    }
}

function endGame() { //function that ends game and displays final score
    questionContainerElement.classList.add('hide')
    messageElement.textContent = `Final Score: ${timer}` //displays the final score at the top
    messageElement.classList.remove('hide')
    inputElement.classList.remove('hide')
    saveButton.classList.remove('hide')
    saveButton.addEventListener('click', saveScore); //makes the initial input and save button appear
    startButton.innerText = "Reset"; //makes the reset button appear when the timer reaches zero
    startButton.classList.remove('hide');
}

function saveScore() { //function that saves scores to local storage (sometimes?)
    const initials = inputElement.value 
    let scores = localStorage.getItem('scores')//retrieve the value of the final score
    if (scores) {
        scores = JSON.parse(scores)
    } else {
        scores = [];
    }
    const score = {
        initials: initials,
        score: timer,
    }
    scores.push(score);
    localStorage.setItem('scores', JSON.stringify(scores));
    inputElement.classList.add('hide'); //Hides the initials input and save button after saving the score
    saveButton.classList.add('hide');
    console.log(`Initials: ${score.initials}`); //final scores will be logged to the console
    console.log(`Final score: ${score.score}`);
}

function setStatusClass(element, correct) { 
    clearStatusClass(element)
    if (correct) {
        element.classList.add('correct')
    } else {
        element.classList.add('wrong')
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct')
    element.classList.remove('wrong')
}


const questions = [ //Arrays of questions and answers to be pulled for the shuffler
    {
        question: 'Which of the following answers will create a line break?',
        answers: [
            {text: '<br>', correct: true }, //'correct: true' indicates that that is the correct answer
            {text: '<gap>', correct: false },
            {text: '<div>', correct: false },
            {text: '<h1>', correct: false },
        ]
    },
    {
        question: 'Which of these hexcodes will generate the color Red?',
        answers: [
            {text: '#0000FF', correct: false },
            {text: '#FFFF00', correct: false },
            {text: '#121212', correct: false },
            {text: '#FF0000', correct: true },
        ]
    },
    {
        question: 'Which of the following target attributes will open a link in a new window?',
        answers: [
            {text: '_self', correct: false },
            {text: '_parent', correct: false },
            {text: '_child', correct: false },
            {text: '_blank', correct: true },
        ]
    },
    {
        question: 'Which of the following is a commonly used CSS Framework?',
        answers: [
            {text: 'HeadWind', correct: false },
            {text: 'Bootstrap', correct: true },
            {text: 'Diablo IV', correct: false },
            {text: 'tacoStop', correct: false },
        ]
    },
    {
        question: 'Which food is the best?',
        answers: [
            {text: 'Tacos', correct: false },
            {text: 'Hot Dogs', correct: false },
            {text: 'Ice Cream', correct: false },
            {text: 'Hawaiian Pizza', correct: true },
        ]
    },
    {
        question: 'Which of the following is not a Primitive data type?',
        answers: [
            {text: 'string', correct: false },
            {text: 'boolean', correct: false },
            {text: 'planet', correct: true },
            {text: 'null', correct: false },
        ]
    },
    {
        question: 'Which of the following is not a font sizing option?',
        answers: [
            {text: 'px', correct: true },
            {text: 'fraction', correct: false },
            {text: 'rem', correct: false },
            {text: '%', correct: false },
        ]
    },
    {
        question: 'How should you declare a variable that can be changed later?',
        answers: [
            {text: 'const', correct: false },
            {text: 'move', correct: false },
            {text: 'turn', correct: false },
            {text: 'let', correct: true },
        ]
    },
    {
        question: 'How much time does this quiz start with?',
        answers: [
            {text: '60 seconds', correct: true },
            {text: '20 seconds', correct: false },
            {text: '40 seconds', correct: false },
            {text: '120 seconds', correct: false },
        ]
    },

]