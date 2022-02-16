const elementAllQuizzes = document.querySelector(".allQuizz");

function getQuizzes() {
  elementAllQuizzes.innerHTML = `<h3>Todos os Quizzes</h3>`;
  const promise = axios.get(
    "https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes"
  );

  promise.then(renderQuizzes);
  promise.catch(failRenderQuizzes);
}

function renderQuizzes(response) {
  let arrayQuizzes = response.data;
  arrayQuizzes.forEach((quiz) => {
    elementAllQuizzes.innerHTML += `
      <div>
        <img src="${quiz.image}" alt="image quiz ${quiz.id}">
        <h3>${quiz.title}</h3>
      </div>`;
  });
}

function failRenderQuizzes() {
  alert("Fail render quizzes!");
}

getQuizzes();
