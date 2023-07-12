let questions = [
  {
    question: "Wie alt ist die Mutter von Cristiano Ronaldo",
    answer_1: 12,
    answer_2: 55,
    answer_3: 68,
    answer_4: "Messi ist besser als Cristiano Ronaldo",
    right_answer: 3,
  },
  {
    question: "War Messi's WM Titel verdient?",
    answer_1: "wallah ja",
    answer_2: "Messi ist der goat",
    answer_3: "WALLAH NEIN",
    answer_4: "Sportakus",
    right_answer: 3,
  },
  {
    question: "Was hat Messi mit 35 Jahren bei PSG gewonnen?",
    answer_1: "Der beste Lattentreffer Uber Eats",
    answer_2: "Ballo D'Or würdig",
    answer_3: "ALLES",
    answer_4: "Mehr als CR7 bei Juventus",
    right_answer: 1,
  },
  {
    question: "Wer ist der beste Fussballspieler aller Zeiten(TheGOAT)",
    answer_1: "Harry Maguire",
    answer_2: "Michael Jackson",
    answer_3: "Lionel Messi",
    answer_4: "Cristiano Ronaldo (Hehehe..Suuiii)",
    right_answer: 4,
  },
  {
    question: "Wähle den besten Verein der Welt aus",
    answer_1: "Manchester United",
    answer_2: "Bayern München",
    answer_3: "HALA Madrid",
    answer_4: "VARcelona",
    right_answer: 3,
  },
];

let rightQuestions = 0;
let currentQuestion = 0;

let AUDIO_SUCCESS = new Audio("audio/suuiii.mp3");
let AUDIO_FAIL = new Audio("audio/mad.mp3");

function render() {
  document.getElementById("questions-length").innerHTML = questions.length;
  showQuestion();
}

function showQuestion() {
  if (gameIsOver()) {
    endScreen();
  } else {
    updateProgressBar()
    answerQuestion();
  }
}

function gameIsOver(){
  return  currentQuestion >= questions.length
}
function updateProgressBar(){
    let percent = (currentQuestion + 1) / questions.length;
  percent = Math.round(percent * 100);
  document.getElementById("progress-bar").innerHTML = `${percent} %`;
  document.getElementById("progress-bar").style.width = `${percent}%`;
}
function answerQuestion() {
  let question = questions[currentQuestion];
  document.getElementById("questions-length-one").innerHTML = currentQuestion + 1;
  document.getElementById("questiontext").innerHTML = question["question"];
  document.getElementById("answer_1").innerHTML = question["answer_1"];
  document.getElementById("answer_2").innerHTML = question["answer_2"];
  document.getElementById("answer_3").innerHTML = question["answer_3"];
  document.getElementById("answer_4").innerHTML = question["answer_4"];
}

function endScreen() {
  document.getElementById("endScreen").style = "";
  document.getElementById("questionBody").style = `display:none`;
  document.getElementById("amountOfQuestions").innerHTML = questions.length;
  document.getElementById("amount-Of-Right-questions").innerHTML =
    rightQuestions;
  document.getElementById("header-img").src = "img/trophy.png";
}

function answer(selection) {
  let question = questions[currentQuestion];

  let selectedQuestionNumber = selection.slice(-1);

  let idOfRightAnswer = `answer_${question["right_answer"]}`;

  if (selectedQuestionNumber == question["right_answer"]) {
    document
      .getElementById(selection)
      .parentElement.classList.add("bg-success");
    rightQuestions++; //plus 1 wenn ergebnis richtig ist
    AUDIO_SUCCESS.play();
  } else {
    document.getElementById(selection).parentElement.classList.add("bg-danger");
    document
      .getElementById(idOfRightAnswer)
      .parentElement.classList.add("bg-success");
    AUDIO_FAIL.play();
  }
  document.getElementById("next-button").disabled = false;
}

function wrongAnswer() {}

function nextQuestion() {
  currentQuestion++; // plus 1 um nächste frage anzuzeigen
  document.getElementById("next-button").disabled = true;
  resetAnswerButtons();
  showQuestion(); //um den inhalt erneut anzuzeigen
}

function resetAnswerButtons() {
  document.getElementById("answer_1").parentNode.classList.remove("bg-danger");
  document.getElementById("answer_1").parentNode.classList.remove("bg-success");
  document.getElementById("answer_2").parentNode.classList.remove("bg-danger");
  document.getElementById("answer_2").parentNode.classList.remove("bg-success");
  document.getElementById("answer_3").parentNode.classList.remove("bg-danger");
  document.getElementById("answer_3").parentNode.classList.remove("bg-success");
  document.getElementById("answer_4").parentNode.classList.remove("bg-danger");
  document.getElementById("answer_4").parentNode.classList.remove("bg-success");
}

function restartButton() {
  document.getElementById("header-img").src = "img/quizimg.png";
  document.getElementById("questionBody").style = "";
  document.getElementById("endScreen").style = "display:none;";
  rightQuestions = 0;
  currentQuestion = 0;
  render();
}
