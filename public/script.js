// const { response } = require("express");

const btn = document.querySelector(".btn");
const taskContainer = document.querySelector("#taskContainer");

// localStorage.clear();

let todo = [];
let a = true;
const showTasks = (e) => {
  e.preventDefault();
  let input = document.querySelector("#input");

  // Runs when user input no task

  if (input.value === ``) {
    const h1 = document.createElement(`h1`);
    h1.classList.add(`h1`);
    h1.innerText = `Add a task!!`;

    // checking for 'A' value, to prevent multiple 'h1' prepended to the dom.

    if (a) {
      a = taskContainer.prepend(h1);
      setTimeout(() => {
        a = true;
      }, 1000);
    }
    setTimeout(() => {
      taskContainer.removeChild(h1);
    }, 1000);
  } else {
    //Runs when user inputted a task

    // SENDING USER INPUTTED TASK OR VALUE TO SERVER, TO SAVE TO A MONGODB DATABASE
    fetch(`/api`, {
      method: `POST`,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ task: input.value }),
    });
    // DATA SENT AND SAVED

    fetch(`/api`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        const newdata = data.map((each) => {
          return `<div class="secondDiv">
          <h2 class="h2">${each.task}</h2>
          <a class="icon1">🦴</a>
          <p class="icon">❌</p> 
          </div>`;
        });
        taskContainer.innerHTML = newdata.join(` `);
        console.log(taskContainer);

        taskContainer.addEventListener("click", async (e) => {
          const Input2 = document.querySelector(`#Input2`);
          const firstDiv = document.querySelector(`.firstDiv`);
          const backBtn = document.querySelector(`.backBtn`);
          const editDiv = document.querySelector(`.editDiv`);
          const el = e.target;
          console.log(el);
          if (el.classList.contains(`icon`)) {
            el.parentElement.style.display = `none`;
          } else if (el.classList.contains(`icon1`)) {
            let extracted = el.parentElement.firstElementChild.innerText;
            firstDiv.style.display = `none`;
            // taskcontainer which was declared in line number 2 was used here
            taskContainer.style.display = `none`;
            Input2.value = extracted;
            editDiv.style.display = `block`;
            backBtn.style.display = `block`;
          }

          const editBtn = document.querySelector(`.editBtn`);

          const Editing = () => {
            console.log(`me`);
            el.parentElement.firstElementChild.innerText = Input2.value;
            firstDiv.style.display = `grid`;
            taskContainer.style.display = `block`;
            editDiv.style.display = `none`;
            backBtn.style.display = `none`;
          };

          editBtn.addEventListener(`click`, Editing);
        });
      });

    // const div = document.createElement(`div`);
    // div.classList.add(`secondDiv`);
    // console.log(div);
    // const h2 = document.createElement(`h2`);
    // h2.classList.add(`h2`);
    // h2.innerText = input.value;

    // const a = document.createElement(`a`);
    // a.classList.add(`icon1`);
    // a.innerText = `🦴`;

    // const p = document.createElement(`p`);
    // p.classList.add(`icon`);
    // p.innerText = `❌`;

    // div.append(h2, a, p);
    if (localStorage.length === 0) {
      todo.unshift(input.value);

      // Saving Value/user inputted task to local storage, before displaying on the dom/web page

      localStorage.setItem(`info`, JSON.stringify(todo));
      localValue = JSON.parse(localStorage.getItem(`info`));
      todo = [...localValue];
      taskContainer.prepend(div);
      input.value = ``;
    } else {
      // Accessing Value/user inputted task from local storage, before displaying on the dom/web page

      let localValue = JSON.parse(localStorage.getItem(`info`));
      todo = [...localValue];
      todo.unshift(input.value);
      localStorage.setItem(`info`, JSON.stringify(todo));
      localValue = JSON.parse(localStorage.getItem(`info`));
      todo = [...localValue];
      taskContainer.prepend(div);
      input.value = ``;
    }

    //Deleting tasks from the dom/webpage before reloading dom/webpage

    const Delete = () => {
      div.style.display = `none`;
    };
    p.addEventListener(`click`, Delete);

    const firstDiv = document.querySelector(`.firstDiv`);
    const Input2 = document.querySelector(`#Input2`);
    const backBtn = document.querySelector(`.backBtn`);
    const editDiv = document.querySelector(`.editDiv`);
    const Edit = () => {
      let extracted = a.parentElement.firstChild.innerText;
      firstDiv.style.display = `none`;
      // taskcontainer which was declared in line number 2 was used here
      taskContainer.style.display = `none`;
      Input2.value = extracted;
      editDiv.style.display = `block`;
      backBtn.style.display = `block`;
    };
    // console.log(taskContainer);
    a.addEventListener(`click`, Edit);

    // const editBtn = document.querySelector(`.editBtn`);

    // const Editing = () => {
    //   a.parentElement.firstChild.innerText = Input2.value;
    //   firstDiv.style.display = `grid`;
    //   taskContainer.style.display = `block`;
    //   editDiv.style.display = `none`;
    //   backBtn.style.display = `none`;
    // };

    // editBtn.addEventListener(`click`, Editing);
  }
};
btn.addEventListener("click", showTasks);

//  pulling  data from Local storage when user reloads page

const Display = () => {
  if (localStorage.length === 0) {
  } else {
    let localValue = JSON.parse(localStorage.getItem(`info`));
    localValue.forEach((element) => {
      const div = document.createElement(`div`);
      div.classList.add(`secondDiv`);
      const h2 = document.createElement(`h2`);
      h2.classList.add(`h2`);
      let input = document.querySelector("#input");
      h2.innerText = element;

      const a = document.createElement(`a`);
      a.classList.add(`icon1`);
      a.innerText = `🦴`;

      const p = document.createElement(`p`);
      p.classList.add(`icon`);
      p.innerText = `❌`;

      div.append(h2, a, p);

      taskContainer.append(div);

      //Deleting tasks from the dom/webpage after reloading dom/webpage and removing the deleted task/value from localstorage as well.

      const Delete = () => {
        div.style.display = `none`;

        //Removing the deleted task/value from localstorage.

        const task = p.parentElement.firstChild.innerText;
        localValue = JSON.parse(localStorage.getItem(`info`));
        localValue = localValue.filter((each) => {
          return each !== task;
        });
        localStorage.setItem(`info`, JSON.stringify(localValue));
      };
      p.addEventListener(`click`, Delete);
    });
  }
};

window.addEventListener(`DOMContentLoaded`, Display);
