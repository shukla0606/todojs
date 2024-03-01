



// const inputBox = document.getElementById("input-box");
// const listContainer = document.getElementById("list-container");
// const addButton = document.getElementById("add"); // Use the correct ID

// function addTask() {
//   if (inputBox.value === '') {
//     alert("You must write something!");
//     return; // Prevent further execution if input is empty
//   }

//   const li = document.createElement("li");
//   li.innerHTML = inputBox.value;

//   const span = document.createElement("span");
//   span.textContent = "\u00d7"; // Use textContent for text nodes
//   span.classList.add("close"); // Add a class for styling (optional)

//   li.appendChild(span);
//   listContainer.appendChild(li);

//   inputBox.value = "";

//   saveData();
// }

// addButton.addEventListener("click", addTask); // Correct event listener attachment

// listContainer.addEventListener("click", function (e) {
//   if (e.target.classList.contains("close")) {
//     e.target.parentElement.remove(); // Remove the entire list item
//   } else if (e.target.tagName === "LI") {
//     e.target.classList.toggle("checked");
//   }

//   saveData();
// });

// function saveData() {
//   localStorage.setItem("data", listContainer.innerHTML);
// }

// function showTask() {
//   listContainer.innerHTML = localStorage.getItem("data") || ""; // Set empty string if data is not found
// }

// showTask();

const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const addButton = document.getElementById("add");
const prioritySelect = document.getElementById("priority");

function addTask() {
  if (inputBox.value === '') {
    alert("You must write something!");
    return; // Prevent further execution if input is empty
  }

  const li = document.createElement("li");
  li.textContent = inputBox.value; // Set text directly for simpler text content
  li.dataset.priority = prioritySelect.value; // Store priority in data attribute

  const span = document.createElement("span");
  span.textContent = "\u00d7"; // Set text content
  span.classList.add("close"); // Add a class for styling (optional)

  li.appendChild(span);
  listContainer.appendChild(li);

  inputBox.value = "";
  prioritySelect.value = ""; // Reset priority selection

  saveData();
}

addButton.addEventListener("click", addTask);

listContainer.addEventListener("click", function (e) {
  if (e.target.classList.contains("close")) {
    e.target.parentElement.remove(); // Remove the entire list item
  } else if (e.target.tagName === "LI") {
    e.target.classList.toggle("checked");
  }

  saveData();
});

function saveData() {
  const tasks = [...listContainer.querySelectorAll("li")].map(li => ({
    text: li.textContent,
    priority: li.dataset.priority,
    completed: li.classList.contains("checked")
  }));
  localStorage.setItem("data", JSON.stringify(tasks));
}

function showTask() {
  const tasks = JSON.parse(localStorage.getItem("data")) || []; // Parse stored data

  listContainer.innerHTML = tasks.map(task => `
    <li data-priority="${task.priority}" class="${task.completed ? 'checked' : ''}">
      ${task.text}
      <span class="close"></span>
    </li>
  `).join("");
}

showTask();



