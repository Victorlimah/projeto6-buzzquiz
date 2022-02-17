const elementAllQuizzes = document.querySelector(".allQuizz");
const firstScreen = document.querySelector(".firstScreen");
const secondScreen = document.querySelector(".secondScreen");

let arrayQuizzes = null;
let lengthAnswers = null;
let lengthQuestions = null;
let quizSelected = null;

let score = 0; // Número de questões certas
let clicks = 0; // Número de cliques em questão

function getQuizzes() {
  elementAllQuizzes.innerHTML = `<h3>Todos os Quizzes</h3>`;
  const promise = axios.get(
    "https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes"
  );

  promise.then(renderQuizzes);
  promise.catch(() => {
    alert("Fail render quizzes!");
  });
}

function renderQuizzes(response) {
  arrayQuizzes = response.data;
  let id = null;
  arrayQuizzes.forEach((quiz) => {
    id = quiz.id;
    elementAllQuizzes.innerHTML += `
      <div class="bannerQuizz" onclick="enterQuizz(${id})">
      <img src="${quiz.image}" alt="image quiz ${quiz.id}">
        <h3>${quiz.title}</h3> 
      </div>`;
  });
}

function enterQuizz(id) {
  scroolToTop();
  firstScreen.classList.add("hidden");
  secondScreen.classList.remove("hidden");
  quizSelected = searchQuiz(id);

  secondScreen.innerHTML = `
    <div class="bannerQuizz">
      <img src="${quizSelected.image}">
      <h3>${quizSelected.title}</h3>
    </div>
    <div class="quizQuestions"></div>`;
  renderQuestions(quizSelected.questions);
}

function renderQuestions(questions) {
  const quizQuestions = document.querySelector(".quizQuestions");
  for (let i = 0; i < questions.length; i++) {
    quizQuestions.innerHTML += `
      <section>
        <div class="questionTitle" style="background-color:${questions[i].color}; color:white;">${questions[i].title}</div>
        <div class="answers answers-${i} ${i}"></div>
      </section>`;
    lengthAnswers = questions[i].answers;
    renderAnswers(lengthAnswers, i);
  }
}

function renderAnswers(answers, answersCod) {
  const questionAnwers = document.querySelector(`.answers-${answersCod}`);
  answers.sort(randomNumber);
  for (let i = 0; i < answers.length; i++) {
    questionAnwers.innerHTML += `
      <div onclick="selectAnswer(this, ${answers[i].isCorrectAnswer})" class="answerOption ${answers[i].isCorrectAnswer}">
        <img src="${answers[i].image}">
        <text>${answers[i].text}</text>                            
      </div>`;
  }
  lengthQuestions = document.querySelectorAll(".questionTitle").length;
}

function selectAnswer(answer, isCorrect) {
  let allImageAnswers = answer.parentNode.querySelectorAll(".answerOption img");
  let allAnswers = answer.parentNode.querySelectorAll(".answerOption");
  clicks++;
  blurChoices(allImageAnswers, answer);
  removeOnClick(allAnswers);
  changeTextColor(allAnswers, isCorrect);
  isCorrect ? score++ : score;

  // Scroll não implementado
  scrollToNextQuestion();

  // Renderizar a tela de resultado
  clicks === lengthQuestions ? setTimeout(renderResult, 2000) : pass();
}

function blurChoices(options, answer) {
  for (let i = 0; i < options.length; i++) {
    options[i].classList.add("blur-choice");
  }
  answer.querySelector("img").classList.add("user-choice");
}

function removeOnClick(answer) {
  for (let i = 0; i < answer.length; i++) {
    answer[i].removeAttribute("onclick");
  }
}

function changeTextColor(answer, isCorrect) {
  for (let i = 0; i < answer.length; i++) {
    answer[i].classList.contains("true")
      ? answer[i].classList.add("correct-choice")
      : answer[i].classList.add("wrong-choice");
  }
}

function renderResult(id) {
  const quizQuestions = document.querySelector(".quizQuestions");
  let finalScore = calcFinalScore();
  let titleScore = null;
  let imageScore = null;
  let descriptionScore = null;

  for (let i = 0; i < quizSelected.levels.length; i++) {
    let minValue = quizSelected.levels[i].minValue;
    if (finalScore >= minValue) {
      titleScore = quizSelected.levels[i].title;
      imageScore = quizSelected.levels[i].image;
      descriptionScore = quizSelected.levels[i].text;
    }
  }

  quizQuestions.innerHTML += `
      <section class="result">
        <div class="questionTitle result-title">
          <span>${finalScore}% de acerto.&nbsp;</span>
          <span>${titleScore}</span>
        </div>
        <div class="image-description">
          <div class="image-result">
            <img src="${imageScore}">
          </div>
          <div class="description-result">
            <span>${descriptionScore}</span>
          </div>
        </div>
      </section>
      
      <div class="nav-final-quiz">
        <div>
          <button onclick="restartQuiz()">Reiniciar Quizz</button>
          <span onclick="backToHome()">Voltar pra home</span>
        </div>
      </div>`;
}

function restartQuiz() {
  resetGame();
  scroolToTop();
  secondScreen.innerHTML = "";
  enterQuizz(quizSelected.id);
}

function backToHome() {
  resetGame();
  resetQuizzes();
  firstScreen.classList.remove("hidden");
  secondScreen.classList.add("hidden");
}

function resetQuizzes() {
  getQuizzes();
}

function resetGame() {
  score = 0;
  clicks = 0;
}

function searchQuiz(id) {
  for (let i = 0; i < arrayQuizzes.length; i++) {
    if (id == arrayQuizzes[i].id) {
      return arrayQuizzes[i];
    }
  }
}

function scroolToTop() {
  window.scrollTo(0, 0);
}
function scrollToNextQuestion() {
  // to do
}

function calcFinalScore() {
  return Math.round((score / lengthQuestions) * 100);
}

function randomNumber() {
  return Math.random() - 0.5;
}

function pass() {}

getQuizzes();
