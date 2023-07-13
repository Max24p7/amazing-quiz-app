const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');

let shuffledQuestions, currentQuestionIndex;

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
}

function setNextQuestion() { //displays the shuffled questions that are arrayed below
    resetState()
    showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
    questionElement.innerText = question.question
    question.answers.forEach(answer => {
        const button = document.createElement('button'); //creates a button that features the answers created below
        button.innerText = answer.text
        button.classList.add('btn')
        if (answer.correct) {
            button.dataset.correct = answer.correct
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
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
    } else {
        startButton.innerText = 'Reset'
        startButton.classList.remove('hide')
    }
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


const questions = [
    {
        question: 'Which of the following answers will create a line break?',
        answers: [
            {text: '<br>', correct: true },
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

]