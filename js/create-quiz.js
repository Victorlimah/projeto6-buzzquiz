const thirdScreen2 = document.querySelector(".thirdScreen");
const fourthScreen = document.querySelector(".fourthScreen");

let basicInformations = null;
let countQuestion = 0;

function getBasicInformations() {
  const title = document.querySelector(".input-title");
  const imageUrl = document.querySelector(".input-image");
  const numberQuestions = document.querySelector(".number-questions");
  countQuestion = parseInt(numberQuestions.value);
  const numberLevels = document.querySelector(".number-levels");
  checkInformations(
    title.value,
    imageUrl.value,
    parseInt(numberQuestions.value),
    parseInt(numberLevels.value)
  );
  if (basicInformations !== null) {
    title.value = "";
    imageUrl.value = "";
    numberQuestions.value = "";
    numberLevels.value = "";
    renderCreateQuestions();
    thirdScreen2.classList.add("hidden");
    fourthScreen.classList.remove("hidden");
  }
}

function checkInformations(title, image, numberQuestions, numberLevels) {
  let confirmInformations = true;

  let lengthTitle = title.length < 20 || title.length > 65;
  lengthTitle ? (confirmInformations = false) : pass();
  numberQuestions <= 2 ? (checkInformations = false) : pass();
  numberLevels <= 1 ? (confirmInformations = false) : pass();
  urlIsValid(image) ? pass() : (confirmInformations = false);

  if (confirmInformations === true) {
    basicInformations = {
      title: title,
      image: image,
      numberQuestions: numberQuestions,
      numberLevels: numberLevels,
    };
    //Retirar este console.log de teste
    console.log(basicInformations);
  } else {
    alert("Preencha os campos corretamente!");
  }
}

function renderCreateQuestions() {
  fourthScreen.innerHTML = ` 
    <div class="start-create">
        <h3>Crie suas perguntas</h3>
      </div>`;

  for (let i = 0; i < countQuestion; i++) {
    fourthScreen.innerHTML += `
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
          <input class="input-url-wrong3" type="text" placeholder="URL da imagem 2" />

          <div class="separator-wrong-answer"></div>
          <input class="input-wrong-answer3" type="text" placeholder="Resposta incorreta 3" />
          <input class="input-url-wrong3" type="text" placeholder="URL da imagem 3" />
        </div>
      </div>`;
  }

  fourthScreen.innerHTML += `
      <div class="basic-info-quiz">
        <button onclick="getQuestionInformations()">
          Prosseguir pra criar níveis
        </button>
      </div>`;
}

function expandQuestion(id) {
  let element = document.querySelector(".q" + id);
  element.classList.toggle("hidden");
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
    wrongUrl1.value
  )
    ? alert("Dados válidos")
    : alert("Dados inválidos");
}

function infoQuestionsIsValid(
  title,
  color,
  correctAnswer,
  correctUrl,
  wrongAnswer1,
  wrongUrl1
) {
  title.length < 20 ? false : pass();
  hexadecimalIsValid(color) ? pass() : false;
  correctAnswer !== "" ? pass() : false;
  urlIsValid(correctUrl) ? pass() : false;
  wrongAnswer1 !== "" ? pass() : false;
  urlIsValid(wrongUrl1) ? pass() : false;
  return true;
}

function pass() {}

function hexadecimalIsValid(hexa) {
  let reg = /^#([0-9a-f]{3}){1,2}$/i;
  reg.test(hexa);
}

function urlIsValid(url) {
  let re = new RegExp(
    "^((http(s?)://(www.)?[a-z]+.com/)|(magnet:?xt=urn:btih:))"
  );
  return re.test(url);
}
