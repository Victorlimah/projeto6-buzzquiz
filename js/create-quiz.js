const secondScreen2 = document.querySelector(".secondScreen");
const thirdScreen2 = document.querySelector(".thirdScreen");
const fourthScreen2 = document.querySelector(".fourthScreen");
const fifthyScreen2 = document.querySelector(".fifthyScreen");
const sixthScreen2 = document.querySelector(".sixthScreen");

let objQuizz = null;
let basicInformations = null;
let countQuestion = 0;
let countLevels = 0;

// INFOS PRA CRIAR O OBJ QUIZZ
let titleQuizz = null;
let imageQuizz = null;
let questionsQuizz = [];
let levelsQuizz = [];

function getBasicInformations() {
  const title = document.querySelector(".input-title");
  const imageUrl = document.querySelector(".input-image");
  const numberQuestions = document.querySelector(".number-questions");
  const numberLevels = document.querySelector(".number-levels");
  countQuestion = parseInt(numberQuestions.value);
  countLevels = parseInt(numberLevels.value);

  checkInformations(title.value, imageUrl.value, countQuestion, countLevels);
  if (basicInformations !== null) {
    // invés de fazer isso criar um querySelectorAll("input") e setar todos os values para "";
    title.value = "";
    imageUrl.value = "";
    numberQuestions.value = "";
    numberLevels.value = "";
    renderCreateQuestions();
    thirdScreen2.classList.add("hidden");
    fourthScreen2.classList.remove("hidden");
  }
}

function checkInformations(title, image, numberQuestions, numberLevels) {
  let confirmInformations = true;
  let lengthTitle = title.length < 20 || title.length > 65;

  lengthTitle ? (confirmInformations = false) : pass();
  numberQuestions <= 2 ? (confirmInformations = false) : pass();
  numberLevels <= 1 ? (confirmInformations = false) : pass();
  !urlIsValid(image) ? (confirmInformations = false) : pass();

  // Não sei pra que é usado esse obj basic informations

  if (confirmInformations) {
    basicInformations = {
      title: title,
      image: image,
      //numberQuestions: numberQuestions,
      //numberLevels: numberLevels,
    };

    titleQuizz = title;
    imageQuizz = image;
  } else {
    alert("Preencha os campos corretamente!");
  }
}

function renderCreateQuestions() {
  fourthScreen2.innerHTML = ` 
    <div class="start-create">
        <h3>Crie suas perguntas</h3>
      </div>`;

  for (let i = 0; i < countQuestion; i++) {
    fourthScreen2.innerHTML += `
      <div class="basic-info-quiz questions">
        <span class="question-title">
          <h3>Pergunta ${i + 1}</h3>
          <img src="./images/icon-create.svg" onclick="expandQuestion(${i})">
        </span>

        <div class="list-question q${i} hidden">
          <input class="input-text-question" type="text" placeholder="Texto da pergunta" />
          <input class="input-color-question" type="text" placeholder="Cor de fundo da pergunta" />

          <h3>Resposta correta</h3>
          <input class="input-correct-answer" type="text" placeholder="Resposta correta" />
          <input class="input-url-correct" type="text" placeholder="URL da imagem" />

          <h3>Respostas Incorretas</h3>
          <input class="input-wrong-answer1" type="text" placeholder="Resposta incorreta 1" />
          <input class="input-url-wrong1" type="text" placeholder="URL da imagem 1" />

          <div class="separator-wrong-answer"></div>
          <input class="input-wrong-answer2 " type="text" placeholder="Resposta incorreta 2" />
          <input class="input-url-wrong2" type="text" placeholder="URL da imagem 2" />

          <div class="separator-wrong-answer"></div>
          <input class="input-wrong-answer3" type="text" placeholder="Resposta incorreta 3" />
          <input class="input-url-wrong3" type="text" placeholder="URL da imagem 3" />
        </div>
      </div>`;
  }

  fourthScreen2.innerHTML += `
      <div class="basic-info-quiz">
        <button onclick="getQuestionInformations()">
          Prosseguir pra criar níveis
        </button>
      </div>`;
}

function getQuestionInformations() {
  for (let i = 0; i < countQuestion; i++) {
    let questionTitle = document.querySelector(`.q${i} .input-text-question`);
    let questionColor = document.querySelector(`.q${i} .input-color-question`);
    let correctAnswer = document.querySelector(`.q${i} .input-correct-answer`);
    let correctUrl = document.querySelector(`.q${i} .input-url-correct`);

    let wrongAnswer1 = document.querySelector(`.q${i} .input-wrong-answer1`);
    let wrongAnswer2 = document.querySelector(`.q${i} .input-wrong-answer2`);
    let wrongAnswer3 = document.querySelector(`.q${i} .input-wrong-answer3`);

    let wrongUrl1 = document.querySelector(`.q${i} .input-url-wrong1`);
    let wrongUrl2 = document.querySelector(`.q${i} .input-url-wrong2`);
    let wrongUrl3 = document.querySelector(`.q${i} .input-url-wrong3`);

    infoQuestionsIsValid(
      questionTitle.value,
      questionColor.value,
      correctAnswer.value,
      correctUrl.value,
      wrongAnswer1.value,
      wrongUrl1.value,
      wrongAnswer2.value,
      wrongUrl2.value,
      wrongAnswer3.value,
      wrongUrl3.value
    );
  }

  if (questionsQuizz.length === countQuestion) {
    renderLevelsInformations();
  } else {
    alert("Dados inválidos");
    questionsQuizz = [];
  }
}

function infoQuestionsIsValid(
  title,
  color,
  correctAnswer,
  correctUrl,
  wrongAnswer1,
  wrongUrl1,
  wrongAnswer2,
  wrongUrl2,
  wrongAnswer3,
  wrongUrl3
) {
  if (title.length < 20) {
    return false;
  }
  if (!hexadecimalIsValid(color)) {
    return false;
  }
  if (correctAnswer === "") {
    return false;
  }

  if (!urlIsValid(correctUrl)) {
    return false;
  }
  if (wrongAnswer1 === "") {
    return false;
  }
  if (!urlIsValid(wrongUrl1)) {
    return false;
  }

  let answer3Exist = !inputEmpty(wrongAnswer2);
  let answer4Exist = !inputEmpty(wrongAnswer3);

  if (answer3Exist) {
    if (!urlIsValid(wrongUrl2)) {
      return false;
    }
  }
  if (answer4Exist) {
    if (!urlIsValid(wrongUrl3)) {
      return false;
    }
  }

  let answer1 = {
    text: correctAnswer,
    image: correctUrl,
    isCorrectAnswer: true,
  };

  let answer2 = {
    text: wrongAnswer1,
    image: wrongUrl1,
    isCorrectAnswer: false,
  };

  let answer3 = {
    text: wrongAnswer2,
    image: wrongUrl2,
    isCorrectAnswer: false,
  };

  let answer4 = {
    text: wrongAnswer3,
    image: wrongUrl3,
    isCorrectAnswer: false,
  };

  let answers = [answer1, answer2];

  if (answer3Exist) {
    answers.push(answer3);
  }

  if (answer4Exist) {
    answers.push(answer4);
  }

  const question = {
    title: title,
    color: color,
    answers: answers,
  };
  questionsQuizz.push(question);

  return true;
}

function renderLevelsInformations() {
  fourthScreen2.classList.add("hidden");
  fifthyScreen2.classList.remove("hidden");
  fifthyScreen2.innerHTML = "";

  for (let i = 0; i < countLevels; i++) {
    fifthyScreen2.innerHTML += `
    <div class="basic-info-quiz questions">
        <span class="question-title">
          <h3>Nível ${i + 1}</h3>
          <img src="./images/icon-create.svg" onclick="expandLevel(${i})">
        </span>

        <div class="list-question l${i} hidden">
          <input class="input-title-level" type="text" placeholder="Título do nível" />
          <input class="input-percentage-level percent${i}" type="text" placeholder="% de acerto mínima" />
          <input class="input-url-level" type="text" placeholder="URL da imagem do nível" />
          <input class="input-description-level" type="text" placeholder="Descrição do nível" />
        </div>
    </div>`;
  }
  fifthyScreen2.innerHTML += `
      <div class="basic-info-quiz">
        <button onclick="finishQuiz()">
          Finalizar Quizz
        </button>
      </div>`;
}

function inputEmpty(input) {
  return input === "";
}
function hexadecimalIsValid(hexa) {
  let reg = /^#([0-9a-f]{3}){1,2}$/i;
  return reg.test(hexa);
}

function urlIsValid(url) {
  let re = new RegExp("^((http(s?)://?)|(magnet:?xt=urn:btih:))");
  return re.test(url);
}

function expandQuestion(id) {
  let element = document.querySelector(".q" + id);
  element.classList.toggle("hidden");
}

function expandLevel(id) {
  let element = document.querySelector(".l" + id);
  element.classList.toggle("hidden");
}

function pass() {}

function finishQuiz() {
  levelQuizIsValid();
  if (levelsQuizz.length === countLevels) {
    objQuizz = {
      title: titleQuizz,
      image: imageQuizz,
      questions: questionsQuizz,
      levels: levelsQuizz,
    };
    console.log(objQuizz);
    const promisse = axios.post(
      "https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes",
      objQuizz
    );
    promisse.then((response) => passQuizz(response.data));
    renderFinishedQuizz();
  } else {
    alert("Preencha os campos corretamente.");
    levelsQuizz = [];
  }
}
let selectedQuizz = {};

function levelQuizIsValid() {
  let element = null;
  let firstPercentage = parseInt(document.querySelector(".percent0").value);

  for (let i = 0; i < countLevels; i++) {
    element = document.querySelector(".l" + i);
    let levelTitle = element.querySelector(".input-title-level").value;
    let levelPercentage = parseInt(
      element.querySelector(".input-percentage-level").value
    );
    let levelURL = element.querySelector(".input-url-level").value;
    let levelDesc = element.querySelector(".input-description-level").value;

    if (levelTitle.length < 10) {
      return false;
    }
    if (levelPercentage > 100 || levelPercentage < 0) {
      return false;
    }
    if (!urlIsValid(levelURL)) {
      return false;
    }

    if (levelDesc.length < 30) {
      return false;
    }

    const level = {
      title: levelTitle,
      image: levelURL,
      text: levelDesc,
      minValue: levelPercentage,
    };
    levelsQuizz.push(level);
  }
  if (firstPercentage !== 0) {
    alert("O primeiro nível deve ser 0%");
    return false;
  }

  return true;
}

function renderFinishedQuizz() {
  fifthyScreen2.classList.add("hidden");
  sixthScreen2.classList.remove("hidden");
  sixthScreen2.innerHTML += ` 
    <div class="start-create">
      <h3>Seu quizz está pronto!</h3>
    </div>
    <section>
      <div>
        <img src="${imageQuizz}">
        <text class="t1">${titleQuizz}</text>
      </div>                              
      <button onclick="enterQuizzBySixthScreen('${titleQuizz}')">Acessar Quizz</button>
      <text onclick="goToHome()" class="t2">Voltar para a home</text>
    </section>`;
}
