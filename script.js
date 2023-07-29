document.addEventListener('DOMContentLoaded', function () {
  const startButton = document.getElementById('start-btn');
  const nextButton = document.getElementById('next-btn');
  const questionContainerElement = document.getElementById('question-container');
  const questionElement = document.getElementById('question');
  const answerButtonsElement = document.getElementById('answer-buttons');
  const studentNameInput = document.getElementById('student-name');

  let shuffledQuestions, currentQuestionIndex;
  let quizScore = 0;
  let totalQuestions = 0;
  let studentName = ''; // Store the student's name

  startButton.addEventListener('click', startGame);
  nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    setNextQuestion();
  });

  function startGame() {
    studentName = studentNameInput.value.trim(); // Store the student's name on start
    if (studentName === '') {
      alert('Please enter your name before starting the quiz.');
      return;
    }

    studentNameInput.value = ''; // Reset the input field
    studentNameInput.disabled = false; // Enable the input field
    startButton.classList.add('hide');
    shuffledQuestions = questions.sort(() => Math.random() - 0.5);
    currentQuestionIndex = 0;
    quizScore = 0;
    totalQuestions = questions.length;
    setNextQuestion();
  }

  function setNextQuestion() {
    resetState();
    showQuestion(shuffledQuestions[currentQuestionIndex]);
  }

  function showQuestion(question) {
    questionElement.innerText = question.question;
    question.answers.forEach((answer) => {
      const button = document.createElement('button');
      button.classList.add('btn');
      if (answer.correct) {
        button.dataset.correct = answer.correct;
      }
      button.innerText = answer.text;
      button.addEventListener('click', selectAnswer);
      answerButtonsElement.appendChild(button);
    });
    questionContainerElement.classList.remove('hide');
  }

  function resetState() {
    clearStatusClass(document.body);
    nextButton.classList.add('hide');
    while (answerButtonsElement.firstChild) {
      answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
  }

  function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct;

    setStatusClass(document.body, correct);
    Array.from(answerButtonsElement.children).forEach((button) => {
      setStatusClass(button, button.dataset.correct);
    });

    if (correct === 'true') {
      quizScore++;
    }

    const resultText = correct === 'true' ? 'Correct!' : 'Wrong!';
    showResult(resultText);

    if (shuffledQuestions.length > currentQuestionIndex + 1) {
      nextButton.classList.remove('hide');
    } else {
      showFinalScore();
    }
  }

  function showResult(resultText) {
    const resultElement = document.createElement('div');
    resultElement.classList.add('result');
    resultElement.innerText = resultText;
    questionContainerElement.appendChild(resultElement);
    setTimeout(() => {
      resultElement.remove();
    }, 1000);
  }

  function showFinalScore() {
    const percentage = (quizScore / totalQuestions) * 100;
    const scoreElement = document.createElement('div');
    scoreElement.classList.add('final-score');
    scoreElement.innerText = `You scored ${quizScore} out of ${totalQuestions}.`;
    questionContainerElement.appendChild(scoreElement);

    const messageElement = document.createElement('div');
    messageElement.classList.add('message');
    if (percentage > 66) {
      messageElement.innerText = `Congratulations, ${studentName}! You passed the quiz!`;
    } else {
      messageElement.innerText = `Better luck next time, ${studentName}.`;
    }
    questionContainerElement.appendChild(messageElement);

    nextButton.classList.add('hide');
    startButton.innerText = 'Restart';
    startButton.classList.remove('hide');
  }

  function setStatusClass(element, correct) {
    clearStatusClass(element);
    if (correct) {
      element.classList.add('correct');
    } else {
      element.classList.add('wrong');
    }
  }

  function clearStatusClass(element) {
    element.classList.remove('correct');
    element.classList.remove('wrong');
  }

  const questions = [
    // Your quiz questions here
    {
      question: 'Which one of these is a JavaScript framework?',
      answers: [
        { text: 'Python', correct: false },
        { text: 'Django', correct: false },
        { text: 'React', correct: true },
        { text: 'SQL', correct: false },
      ],
    },
    {
      question: 'Who is the Prime Minister of India?',
      answers: [
        { text: 'Modi', correct: true },
        { text: 'Kejriwal', correct: false },
        { text: 'Amit Shah', correct: false },
        { text: 'Yogi', correct: false },
      ],
    },
    {
      question: 'What is 3 × 4?',
      answers: [
        { text: '12', correct: true },
        { text: '6', correct: false },
        { text: '15', correct: false },
        { text: '8', correct: false },
      ],
    },
  ];
});
