const elementAllQuizzes = document.querySelector(".allQuizz");
const firstScreen = document.querySelector(".firstScreen");
const secondScreen = document.querySelector(".secondScreen");

let arrayQuizzes = null;

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
    // O H3 NÃO TÁ ALINHANDO COM A IMAGEM
    elementAllQuizzes.innerHTML += `
      <div class="bannerQuizz" onclick="enterQuizz(${id})">
      <img src="${quiz.image}" alt="image quiz ${quiz.id}">
        <h3>${quiz.title}</h3> 
      </div>`;
  });
}

function enterQuizz(id) {
  firstScreen.classList.add("hidden");
  let quizSelected = searchQuiz(id);

  secondScreen.innerHTML = `
    <div class="bannerQuizz">
      <img src="${quizSelected.image}">
      <h3>${quizSelected.title}</h3>
    </div>
    <div class="quizQuestions"></div>`;
    renderQuestions(quizSelected.questions);
}
function renderQuestions(questions){
  const quizQuestions = document.querySelector(".quizQuestions");
  for(let i=0; i<questions.length; i++){
    quizQuestions.innerHTML += `
      <section>
        <div class="questionTitle" style="background-color:${questions[i].color}; color:white;">${questions[i].title}</div>
        <div class="answers answers-${i}"></div>
      </section>`;
    renderAnswers(questions[i].answers, i);
  }
}
function renderAnswers(answers, answersCod){
  const questionAnwers = document.querySelector(`.answers-${answersCod}`);
  answers.sort(randomNumber)
  for(let i=0; i<answers.length; i++){
    questionAnwers.innerHTML += `
      <div class="answerOption">
        <img src="${answers[i].image}">
        <text>${answers[i].text}</text>                            
      </div>`
  }
}

function searchQuiz(id) {
  for (let i = 0; i < arrayQuizzes.length; i++) {
    if (id == arrayQuizzes[i].id) {
      return arrayQuizzes[i];
    }
  }
}
function randomNumber() { 
	return Math.random() - 0.5; 
}
getQuizzes();
