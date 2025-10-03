 const quotes = [
  "Push yourself, because no one else is going to do it for you",
  "Success doesn't just find you. You have to go out and get it",
  "The harder you work for something, the greater you'll feel when you achieve it",
  "Dream bigger. Do bigger.",
  "Great things never come from comfort zones",
  "Dreams don't work unless you do",
  "Believe you can and you're halfway there",
  "Start where you are. Use what you have. Do what you can",
  "Set goals and make them happen",
  "Success usually comes to those who are too busy to be looking for it",
  "Keep your eyes on the stars and your feet on the ground"
];
let quoteIndex = 0;
const quoteElement = document.getElementById("quote");
function changeQuote() {
  quoteElement.textContent = quotes[quoteIndex];
  quoteIndex = (quoteIndex + 1) % quotes.length;
}
setInterval(changeQuote, 20000);
changeQuote();

const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const resetBtn = document.getElementById("resetBtn");
const taskList = document.getElementById("taskList");
const taskCounter = document.getElementById("taskCounter");

function updateCounter() {
  taskCounter.textContent = `Tasks: ${taskList.children.length}`;
}

// 🔹 Save tasks to localStorage
function saveTasks() {
  const tasks = [];
  document.querySelectorAll("#taskList li").forEach(li => {
    tasks.push({
      text: li.querySelector("span").textContent,
      completed: li.classList.contains("completed")
    });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// 🔹 Load tasks from localStorage
function loadTasks() {
  const stored = JSON.parse(localStorage.getItem("tasks")) || [];
  stored.forEach(task => addTask(task.text, task.completed));
}

// 🔹 Reusable Add Task function
function addTask(taskText, completed = false) {
  const li = document.createElement("li");
  li.innerHTML = `
    <span>${taskText}</span>
    <div class="task-buttons">
      <button class="completeBtn">✔️</button>
      <button class="deleteBtn">🗑️</button>
    </div>
  `;

  if (completed) li.classList.add("completed");

  taskList.appendChild(li);
  updateCounter();
  saveTasks();
 
 taskInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    const taskText = taskInput.value.trim();
    if (taskText === "") return;
    addTask(taskText);
    taskInput.value = "";
  }
});

  // Delete button
  li.querySelector(".deleteBtn").addEventListener("click", (e) => {
    e.target.classList.add("trash-shake");
    setTimeout(() => {
      e.target.classList.remove("trash-shake");
    }, 400);

    li.classList.add("fade-out");
    setTimeout(() => {
      li.remove();
      updateCounter();
      saveTasks();
    }, 500);
  });

  // Complete button
  li.querySelector(".completeBtn").addEventListener("click", (e) => {
    li.classList.toggle("completed");
    saveTasks();

    e.target.classList.add("bounce");
    setTimeout(() => {
      e.target.classList.remove("bounce");
    }, 400);
  });
}

// Add button
addBtn.addEventListener("click", () => {
  const taskText = taskInput.value.trim();
  if (taskText === "") return;
  addTask(taskText);
  taskInput.value = "";
});

// Reset button
resetBtn.addEventListener("click", () => {
  taskList.innerHTML = "";
  updateCounter();
  localStorage.removeItem("tasks");
});

// Dark mode
const darkModeBtn = document.getElementById("darkModeBtn");
darkModeBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
});

// Themes
const themeBtn = document.getElementById("themeBtn");
let isVibrant = true;
themeBtn.addEventListener("click", () => {
  if (isVibrant) {
    document.body.classList.remove("vibrant-theme");
    document.body.classList.add("minimal-theme");
  } else {
    document.body.classList.remove("minimal-theme");
    document.body.classList.add("vibrant-theme");
  }
  isVibrant = !isVibrant;
});

// 🔹 Load saved tasks on page load
window.addEventListener("load", loadTasks);
