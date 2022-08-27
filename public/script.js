const btn = document.querySelector(".btn");
const taskContainer = document.querySelector("#taskContainer");

const url = new URL("https://example.com?foo=1&bar=2");
const params = new URLSearchParams(url.search);

const Run = async () => {
  try {
    const responseObject = await fetch(`/api`);
    const data = await responseObject.json();
    newdata = data.map((each) => {
      return `<div class="secondDiv">
          <h2 class="h2">${each.task}</h2>
          <a class="icon1" href="edit.html?id=${each._id}">🦴</a>
          <p class="icon">❌</p> 
          </div>`;
    });
    taskContainer.innerHTML = newdata.join(` `);

    taskContainer.addEventListener("click", async (e) => {
      const el = e.target;
      data.forEach((each) => {
        if (el.parentElement.firstElementChild.innerText === each.task) {
          if (el.classList.contains(`icon`)) {
            fetch(`api/${each._id}`, {
              method: `DELETE`,
            });
            el.parentElement.style.display = `none`;
          }
        } else {
          return;
        }
      });
    });
  } catch {
    console.log(`There was an error`);
  }
};

Run();

// script for when user clicked on the submit button
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
    const test = async () => {
      await fetch(`/api`, {
        method: `POST`,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ task: input.value }),
      });
      // DATA SENT AND SAVED
      Run();
    };
    test();
    input.value = ``;
  }
};
btn.addEventListener(`click`, showTasks);
