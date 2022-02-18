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
  if (title.length < 20 || title.length > 65) {
    confirmInformations = false;
  }
  //FALTA A VALIDAÇÃO DA URL DA IMAGEM
  if (numberQuestions <= 2) {
    confirmInformations = false;
  }
  if (numberLevels <= 1) {
    confirmInformations = false;
  }
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
          <input type="text" placeholder="Texto da pergunta" />
          <input type="text" placeholder="Cor de fundo da pergunta" />

          <h3>Resposta correta</h3>
          <input type="text" placeholder="Resposta correta" />
          <input type="text" placeholder="URL da imagem" />

          <h3>Respostas Incorretas</h3>
          <input type="text" placeholder="Resposta incorreta 1" />
          <input type="text" placeholder="URL da imagem 1" />

          <div class="separator-wrong-answer"></div>
          <input type="text" placeholder="Resposta incorreta 2" />
          <input type="text" placeholder="URL da imagem 2" />

          <div class="separator-wrong-answer"></div>
          <input type="text" placeholder="Resposta incorreta 3" />
          <input type="text" placeholder="URL da imagem 3" />
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
