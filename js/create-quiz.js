const thirdScreen2 = document.querySelector(".thirdScreen");
const fourthScreen2 = document.querySelector(".fourthScreen");
const fifthyScreen2 = document.querySelector(".fifthyScreen");

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

  lengthTitle ?? (confirmInformations = false);
  numberQuestions <= 2 ?? (confirmInformations = false);
  numberLevels <= 1 ?? (confirmInformations = false);
  !urlIsValid(image) ?? (confirmInformations = false);

  // Não sei pra que é usado esse obj basic informations

  if (confirmInformations === true) {
    basicInformations = {
      title: title,
      image: image,
      numberQuestions: numberQuestions,
      numberLevels: numberLevels,
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
  let questionTitle = document.querySelector(".input-text-question");
  let questionColor = document.querySelector(".input-color-question");
  let correctAnswer = document.querySelector(".input-correct-answer");
  let correctUrl = document.querySelector(".input-url-correct");

  let wrongAnswer1 = document.querySelector(".input-wrong-answer1");
  let wrongAnswer2 = document.querySelector(".input-wrong-answer2");
  let wrongAnswer3 = document.querySelector(".input-wrong-answer3");

  let wrongUrl1 = document.querySelector(".input-url-wrong1");
  let wrongUrl2 = document.querySelector(".input-url-wrong2");
  let wrongUrl3 = document.querySelector(".input-url-wrong3");

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
  )
    ? renderLevelsInformations() //criar obj questions
    : alert("Dados inválidos");
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
  title.length < 20 ?? false;
  !hexadecimalIsValid(color) ?? pass();
  correctAnswer === "" ?? false;
  !urlIsValid(correctUrl) ?? false;
  wrongAnswer1 === "" ?? false;
  !urlIsValid(wrongUrl1) ?? false;

  // PERGUNTAS 2 E 3 PODEM SER VAZIAS
  // Mas se não forem, temos que testar
  //

  if (!inputEmpty(wrongAnswer2)) {
    urlIsValid(wrongUrl2) ? pass() : false;
  }
  if (!inputEmpty(wrongAnswer3)) {
    urlIsValid(wrongUrl3) ? pass() : false;
  }

  return true;
}

function renderLevelsInformations() {
  fourthScreen2.classList.add("hidden");
  fifthyScreen2.classList.remove("hidden");

  for (let i = 0; i < countLevels; i++) {
    fifthyScreen2.innerHTML += `
    <div class="basic-info-quiz questions">
        <span class="question-title">
          <h3>Nível ${i + 1}</h3>
          <img src="./images/icon-create.svg" onclick="expandLevel(${i})">
        </span>

        <div class="list-question l${i} hidden">
          <input class="input-title-level" type="text" placeholder="Título do nível" />
          <input class="input-percentage-level" type="text" placeholder="% de acerto mínima" />
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
  let re = new RegExp(
    "^((http(s?)://(www.)?[a-z]+.com/)|(magnet:?xt=urn:btih:))"
  );
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
  levelQuizIsValid() ? alert("QUIZ FINALIZADO") : alert("QUIZ INVÁLIDO");

  // CRIAÇÃO DO OBJ QUIZZ
  // let obj = [
  //   {
  //     title: titleQuizz,
  //     image: imageQuizz,
  //     questions: [],
  //     levels: [],
  //   },
  // ];
}

function levelQuizIsValid() {
  let element = null;
  for (let i = 0; i < countLevels; i++) {
    element = document.querySelector(".l" + i);
    let levelTitle = element.querySelector(".input-title-level").value;
    let levelPercentage = parseInt(
      element.querySelector(".input-percentage-level").value
    );
    let levelURL = element.querySelector(".input-url-level").value;
    let levelDesc = element.querySelector(".input-description-level").value;
    console.log(
      `TITLE ${levelTitle} PERCENT ${levelPercentage} URL ${levelURL} DESC${levelDesc}`
    );

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
  }
  return true;
}
