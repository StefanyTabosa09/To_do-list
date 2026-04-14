const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const counter = document.getElementById("counter");
const addBtn = document.getElementById("addBtn");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function renderTasks() {
  taskList.innerHTML = "";

  tasks.forEach((task, index) => {
    const li = document.createElement("li");

    li.textContent = task.text;
    if (task.done) li.classList.add("completed");

    li.onclick = () => {
      tasks[index].done = !tasks[index].done;
      saveTasks();
    };

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "X";
    deleteBtn.classList.add("delete");

    deleteBtn.onclick = (e) => {
      e.stopPropagation();
      tasks.splice(index, 1);
      saveTasks();
    };

    li.appendChild(deleteBtn);
    taskList.appendChild(li);
  });

  counter.textContent = `Você tem ${tasks.length} tarefas`;
}

function addTask() {
  const text = taskInput.value;

  if (text === "") return;

  tasks.push({ text: text, done: false });
  taskInput.value = "";

  saveTasks();
}

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
}

addBtn.addEventListener("click", addTask);

taskInput.addEventListener("keypress", function(e) {
  if (e.key === "Enter") {
    addTask();
  }
});

renderTasks();