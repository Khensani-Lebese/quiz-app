import { createInterface } from 'readline';

const questions = [
  { question: "Is React a Framework or a library?", answer: "Library" },
  { question: "Name and surname of the person who developed JavaScript?", answer: "Brendan Eich" },
  { question: "What is another name for an app (It starts with a P)?", answer: "Program" },
  { question: "What is the technical name of the mouse pointer?", answer: "Cursor" },
];

const readL = createInterface({
  input: process.stdin,
  output: process.stdout
});

// Quiz settings
let totalTimeForQuiz = 45; // Total time for the quiz in seconds
const timePerQuestion = 10;  // Time allowed per question in seconds
let currentQuestionIndex = 0;
let score = 0;
let quizTimer;

// Start Quiz
function startQuiz() {
  console.log("Welcome to the Quiz App!");

  // Start the quiz timer
  quizTimer = setInterval(() => {
    if (totalTimeForQuiz > 0) {
     
      totalTimeForQuiz--;
    } else {
      clearInterval(quizTimer);
      console.log("\n\nTime's up for the quiz!");
      endQuiz();
    }
  }, 1000);

  // Start asking questions
  askQuestion();
}

// Ask question
function askQuestion() {
  if (currentQuestionIndex < questions.length) {
    const questionObj = questions[currentQuestionIndex];
    console.log(`\nQuestion ${currentQuestionIndex + 1}: ${questionObj.question}`);

    let answered = false;
    let timeLeft = timePerQuestion;

    // Display time left per second for the current question
    const questionTimer = setInterval(() => {
      if (timeLeft > 0) {
        process.stdout.write(`\rTime left to answer: ${timeLeft}s   `);
        timeLeft--;
      } else {
        clearInterval(questionTimer);
        if (!answered) {
          console.log("\n\nTime's up for this question!");
          moveToNextQuestion();
        }
      }
    }, 1000);

    // Prompt for user answer
    console.log("\nPlease type your answer below:\n"); // Add an extra newline for separation
    readL.question('Your answer: ', (userAnswer) => {
      answered = true;
      clearInterval(questionTimer);
    
      if (userAnswer.trim().toLowerCase() === questionObj.answer.toLowerCase()) {
        console.log("Correct!");
        score++;
      } else {
        console.log(`Wrong! The correct answer was: ${questionObj.answer}`);
      }
    
      // Move to the next question after a short delay
      setTimeout(() => {
        moveToNextQuestion();
      }, 1000);
    });
  } else {
    endQuiz();
  }
}

// Move to the next question or end the quiz if done
function moveToNextQuestion() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    console.log('\n'); // Add space before the next question
    askQuestion();
  } else {
    endQuiz();
  }
}

// End the quiz and display the final score
function endQuiz() {
  clearInterval(quizTimer);
  console.log("\nThe quiz has ended!");
  console.log(`Your final score is: ${score}/${questions.length}`);
  readL.close();
  process.exit(0);
}

// Start the quiz
startQuiz();
