const questionsArr = [
  {
    question:
      "In JavaScript, how can a datatype be declared to be a constant type?",
    options: {
      a: "A. var",
      b: "B. constant",
      c: "C. let",
      d: "D. const",
    },
    answer: "d",
  },
  {
    question:
      "Which function is used to serialize an object into a JSON string in Javascript?",
    options: {
      a: "A. parse()",
      b: "B. convert()",
      c: "C. stringify()",
      d: "D. None of the above",
    },
    answer: "c",
  },
  {
    question:
      "Which of the following methods can be used to display data in some form using JavaScript?",
    options: {
      a: "A. document.write()",
      b: "B. console.log()",
      c: "C. window.alert()",
      d: "D. All of the above",
    },
    answer: "d",
  },
  {
    question: "How do we write a comment in JavaScript?",
    options: {
      a: "A. //",
      b: "B. $$",
      c: "C. #",
      d: "D. /**/",
    },
    answer: "a",
  },
  {
    question: "JavaScript is a(n) _______ language?",
    options: {
      a: "A. Low-Level",
      b: "B. Object-Based",
      c: "C. Procedural",
      d: "D. Object-Oriented",
    },
    answer: "d",
  },
];

// Creating and Initializing Variables

var header = document.querySelector(".header");
var opening = document.querySelector(".opening");
var container = document.querySelector(".container");
var divider = document.querySelector(".divider");
var result = document.querySelector(".result");
var scores = [];
var mark = 0;
var index = 0;
var record = [];

function start() {
  var removeAll = container;
  while (removeAll.hasChildNodes()) {
    removeAll.removeChild(removeAll.firstChild);
  }

  // Creation of View High Scores
  var viewScore = document.createElement("p");
  viewScore.classList.add("banner", "view-score");
  viewScore.textContent = "View High Scores";
  // Time Display
  var time = document.createElement("p");
  time.classList.add("banner", "time");
  time.textContent = "Time: ";
  var second = document.createElement("span");
  second.setAttribute("id", "second");
  time.appendChild(second);
  // Container Title
  var opTitle = document.createElement("h1");
  opTitle.classList.add("title");
  opTitle.textContent = "Coding Quiz Challenge";
  // Container Text
  var opText = document.createElement("p");
  opText.classList.add("text");
  opText.textContent =
    "You have 5 questions to answer to check your knowledge in Javascript.";
  // Start Quiz Button
  var startBtn = document.createElement("button");
  startBtn.classList.add("btn", "btn-start");
  startBtn.textContent = "Start Quiz";

  header.appendChild(viewScore);
  header.appendChild(time);
  container.appendChild(opTitle);
  container.appendChild(opText);
  container.appendChild(startBtn);

  // Event Listener to Time Countdown
  document.querySelector(".btn-start").addEventListener("click", timer);
  // Event Listner to Viewing High Scores
  document
    .querySelector(".view-score")
    .addEventListener("click", viewHighScore);
}
// Creation of Functions
// Quiz Part
function createQuiz() {
  var removeAll = container;
  while (removeAll.hasChildNodes()) {
    removeAll.removeChild(removeAll.firstChild);
  }

  if (index < questionsArr.length) {
    // Quiz Container
    var quizHere = document.createElement("div");
    quizHere.classList.add("quiz");
    container.appendChild(quizHere);
    // Questions' Section
    var quizTitle = document.createElement("h1");
    quizTitle.classList.add("title");
    quizTitle.textContent = questionsArr[index].question;
    quizHere.appendChild(quizTitle);
    // Options
    var optionsObj = questionsArr[index].options;
    for (var x in optionsObj) {
      var quizOption = document.createElement("button");
      quizOption.classList.add("btn", "btn-answer");
      if (x === questionsArr[index].answer) {
        quizOption.setAttribute("check", "correct");
      }
      quizOption.textContent = optionsObj[x];
      quizHere.appendChild(quizOption);
    }

    index++;

    divider.style.visibility = "visible";

    // Event Listener to 'Answer Click'
    document.querySelector(".quiz").addEventListener("click", checkResult);
  } else {
    // Completion Section
    var done = document.createElement("h2");
    done.classList.add("title");
    done.textContent = "Completed";
    container.appendChild(done);

    var sum = document.createElement("p");
    sum.classList.add("text");
    sum.textContent = "Your final score is " + mark + " out of 5.";
    container.appendChild(sum);

    // Input Form Creation
    var formEl = document.createElement("form");
    formEl.classList.add = "form";
    container.appendChild(formEl);

    var label = document.createElement("label");
    label.classList.add("text");
    label.setAttribute("for", "name");
    label.textContent = "Enter initials:";
    formEl.appendChild(label);

    var input = document.createElement("input");
    input.classList.add("text");
    input.setAttribute("type", "text");
    input.setAttribute("name", "name");
    input.setAttribute("id", "name");
    input.setAttribute("placeholder", "name");
    formEl.appendChild(input);

    var submit = document.createElement("button");
    submit.classList.add("btn", "btn-submit");
    submit.textContent = "Submit";
    formEl.appendChild(submit);

    // Event Listner to Submit Button
    document
      .querySelector(".btn-submit")
      .addEventListener("click", recordHighScore);
  }
}

// Creation of Tomer Function

function timer() {
  var timeLeft = 100;

  var timeInterval = setInterval(function () {
    var timeEl = document.querySelector("#second");
    timeEl.textContent = timeLeft + "s";
    timeLeft--;

    if (result.textContent.match(/incorrect/gi)) {
      timeLeft -= 15;
    }

    if (timeLeft < 0 || scores.length === questionsArr.length) {
      clearInterval(timeInterval);

      alert("Quiz is over");
      timeEl.textContent = 0 + "s";

      index += questionsArr.length;

      createQuiz();
    }
  }, 1000);

  createQuiz();
}

// Score Adjsutment

function checkResult(event) {
  var targetEl = event.target;

  var check = document.createElement("p");
  check.classList.add("check-result");
  if (targetEl.hasAttribute("check")) {
    check.textContent = "Correct";
    mark += 1;
  } else {
    check.textContent = "Incorrect";
  }
  result.appendChild(check);
  scores.push(mark);

  setTimeout(() => {
    check.remove();
    createQuiz();
  }, 1000);
}

// High Score Tracker

function recordHighScore(event) {
  event.preventDefault();

  // Initializing scores array & index
  scores.length = 0;
  index = 0;

  var playerName = document.querySelector("#name").value;

  if (!playerName) {
    alert("Enter your name, please.");
  } else {
    var recordObj = {
      name: playerName,
      highScore: mark,
    };
  }

  record.push(recordObj);
  saveData();
  // reset mark
  mark = 0;
  viewHighScore();
}

// High Score Function
function viewHighScore() {
  // clear page content
  header.style.border = "none";
  var removeHeader = header;
  while (removeHeader.hasChildNodes()) {
    removeHeader.removeChild(removeHeader.firstChild);
  }
  var removeContainer = container;
  while (removeContainer.hasChildNodes()) {
    removeContainer.removeChild(removeContainer.firstChild);
  }

  var highScoresTitle = document.createElement("h1");
  highScoresTitle.classList.add("title");
  highScoresTitle.textContent = "High Scores";
  container.appendChild(highScoresTitle);

  loadData();

  // Creation of Buttons
  var goBack = document.createElement("button");
  goBack.classList.add("btn", "btn-goBack");
  goBack.textContent = "Go Back";
  container.appendChild(goBack);

  var clear = document.createElement("button");
  clear.classList.add("btn", "btn-clear");
  clear.textContent = "Clear High Scores";
  container.appendChild(clear);

  document.querySelector(".btn-goBack").addEventListener("click", start);
  document.querySelector(".btn-clear").addEventListener("click", clearHistory);
}

// Local Storage Section
function saveData() {
  localStorage.setItem("high scores", JSON.stringify(record));
}

function loadData() {
  var load = localStorage.getItem("high scores");

  if (!load) {
    return false;
  }

  load = JSON.parse(load);

  for (var i = 0; i < load.length; i++) {
    var highScorestext = document.createElement("li");
    highScorestext.classList.add("list", "text");
    highScorestext.setAttribute("id", "quiz-mark");
    highScorestext.textContent = load[i].name + " : " + load[i].highScore;
    container.appendChild(highScorestext);
  }
}

function clearHistory() {
  window.localStorage.clear();
  document
    .querySelectorAll("#quiz-mark")
    .forEach((removeHistory) => removeHistory.remove());
}

start();
