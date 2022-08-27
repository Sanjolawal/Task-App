const Input2 = document.querySelector(`#Input2`);
const editBtn = document.querySelector(`.editBtn`);
const label = document.querySelector(`.label`);
const query = window.location.search;
const params = new URLSearchParams(query);
const id = params.get(`id`);

fetch(`/api/${id}`)
  .then((response) => response.json())
  .then((data) => {
    label.innerText = `TaskID: ${data._id}`;
    Input2.value = data.task;
  });

const Updating = () => {
  fetch(`/api/${id}`, {
    method: `PUT`,
    headers: {
      "Content-Type": `application/json`,
    },
    body: JSON.stringify({ task: Input2.value }),
  });
  const popUp = document.querySelector(`.popUp`);
  popUp.style.color = `green`;
  popUp.style.display = `block`;
  setTimeout(() => {
    popUp.style.display = `none`;
  }, 2000);
};

editBtn.addEventListener(`click`, Updating);
