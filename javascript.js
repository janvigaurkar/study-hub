let seconds = 0;
let timer;

// === timer function  ===
function startTimer() {
  clearInterval(timer);
  timer = setInterval(() => {
    let min = Math.floor(seconds / 60);
    let sec = seconds % 60;

    document.getElementById("timer").innerHTML =
      `${min}:${sec < 10 ? "0" + sec : sec}`;

    seconds--;

    if (seconds < 0) {
      clearInterval(timer);
      alert("Session Completed! 🎉");
    }
  }, 1000);
}

function resetTimer() {
  clearInterval(timer);
  seconds = 0;
  document.getElementById("timer").innerHTML = "00:00";
}

// custom time set function
function setCustomTimer(minutes) {
  clearInterval(timer);
  seconds = parseInt(minutes) * 60;
  document.getElementById("timer").innerHTML = `${minutes}:00`;
  alert(`Timer set to ${minutes} minutes ⏰`);
}

// === TASKS WITH localStorage ===
function addTask() {
  let input = document.getElementById("taskInput");
  if (input.value === "") return;

  let tasks = getTasks();
  let task = {
    id: Date.now(),
    text: input.value,
    completed: false,
  };
  tasks.push(task);
  saveTasks(tasks);
  renderTasks();
  input.value = "";
  updateTaskCount();
}

function getTasks() {
  return JSON.parse(localStorage.getItem("tasks") || "[]");
}

function saveTasks(tasks) {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
  let tasks = getTasks();
  let list = document.getElementById("taskList");
  list.innerHTML = "";

  tasks.forEach((task) => {
    let div = document.createElement("div");
    div.className = "task";
    div.innerHTML = `
            <input type="checkbox" ${task.completed ? "checked" : ""} 
                onchange="toggleTask(${task.id})">
            <span style="${task.completed ? "text-decoration: line-through; opacity: 0.6;" : ""}">
                ${task.text}
            </span>
            <button onclick="deleteTask(${task.id})" style="background:#ef4444; padding:5px 10px; margin-left:10px;">
                ✕
            </button>
        `;
    list.appendChild(div);
  });
}

function toggleTask(id) {
  let tasks = getTasks();
  tasks = tasks.map((task) => {
    if (task.id === id) {
      task.completed = !task.completed;
    }
    return task;
  });
  saveTasks(tasks);
  renderTasks();
}

function deleteTask(id) {
  let tasks = getTasks();
  tasks = tasks.filter((task) => task.id !== id);
  saveTasks(tasks);
  renderTasks();
  updateTaskCount();
}

function updateTaskCount() {
  let count = getTasks().length;
  document.getElementById("taskCount").innerHTML = count;
}

// === GOALS WITH localStorage ===
function addGoal() {
  let input = document.getElementById("goalInput");
  if (input.value === "") return;

  let goals = getGoals();
  let goal = {
    id: Date.now(),
    text: input.value,
    completed: false,
  };
  goals.push(goal);
  saveGoals(goals);
  renderGoals();
  input.value = "";
  updateGoalCount();
}

function getGoals() {
  return JSON.parse(localStorage.getItem("goals") || "[]");
}

function saveGoals(goals) {
  localStorage.setItem("goals", JSON.stringify(goals));
}

function renderGoals() {
  let goals = getGoals();
  let list = document.getElementById("goalList");
  list.innerHTML = "";

  goals.forEach((goal) => {
    let div = document.createElement("div");
    div.className = "task";
    div.innerHTML = `
            <input type="checkbox" ${goal.completed ? "checked" : ""} 
                onchange="toggleGoal(${goal.id})">
            <span style="${goal.completed ? "text-decoration: line-through; opacity: 0.6;" : ""}">
                ${goal.text}
            </span>
            <button onclick="deleteGoal(${goal.id})" style="background:#ef4444; padding:5px 10px; margin-left:10px;">
                ✕
            </button>
        `;
    list.appendChild(div);
  });
}

function toggleGoal(id) {
  let goals = getGoals();
  goals = goals.map((goal) => {
    if (goal.id === id) {
      goal.completed = !goal.completed;
    }
    return goal;
  });
  saveGoals(goals);
  renderGoals();
}

function deleteGoal(id) {
  let goals = getGoals();
  goals = goals.filter((goal) => goal.id !== id);
  saveGoals(goals);
  renderGoals();
  updateGoalCount();
}

function updateGoalCount() {
  let count = getGoals().length;
  document.getElementById("goalCount").innerHTML = count;
}

// === NOTES WITH localStorage ===
function saveNote() {
  let note = document.getElementById("noteInput").value;
  if (note === "") return;

  let notes = getNotes();
  let newNote = {
    id: Date.now(),
    text: note,
  };
  notes.push(newNote);
  saveNotes(notes);
  renderNotes();
  document.getElementById("noteInput").value = "";
  updateNoteCount();
}

function getNotes() {
  return JSON.parse(localStorage.getItem("notes") || "[]");
}

function saveNotes(notes) {
  localStorage.setItem("notes", JSON.stringify(notes));
}

function renderNotes() {
  let notes = getNotes();
  let list = document.getElementById("notesList");
  list.innerHTML = "";

  notes.forEach((note) => {
    let div = document.createElement("div");
    div.className = "task";
    div.innerHTML = `
            <p>${note.text}</p>
            <button onclick="deleteNote(${note.id})" style="background:#ef4444; padding:5px 10px; margin-left:10px;">
                ✕
            </button>
        `;
    list.appendChild(div);
  });
}

function deleteNote(id) {
  let notes = getNotes();
  notes = notes.filter((note) => note.id !== id);
  saveNotes(notes);
  renderNotes();
  updateNoteCount();
}

function updateNoteCount() {
  let count = getNotes().length;
  document.getElementById("noteCount").innerHTML = count;
}

// === STUDY PLANNER WITH localStorage ===
function addPlan() {
  let subject = document.getElementById("subject").value;
  let date = document.getElementById("studyDate").value;

  if (subject === "" || date === "") return;

  let plans = getPlans();
  let plan = {
    id: Date.now(),
    subject: subject,
    date: date,
  };
  plans.push(plan);
  savePlans(plans);
  renderPlans();
  document.getElementById("subject").value = "";
  document.getElementById("studyDate").value = "";
}

function getPlans() {
  return JSON.parse(localStorage.getItem("plans") || "[]");
}

function savePlans(plans) {
  localStorage.setItem("plans", JSON.stringify(plans));
}

function renderPlans() {
  let plans = getPlans();
  let list = document.getElementById("planList");
  list.innerHTML = "";

  plans.sort((a, b) => new Date(a.date) - new Date(b.date));

  plans.forEach((plan) => {
    let div = document.createElement("div");
    div.className = "task";
    div.innerHTML = `
            <strong>${plan.subject}</strong> - ${plan.date}
            <button onclick="deletePlan(${plan.id})" style="background:#ef4444; padding:5px 10px; margin-left:10px;">
                ✕
            </button>
        `;
    list.appendChild(div);
  });
}

function deletePlan(id) {
  let plans = getPlans();
  plans = plans.filter((plan) => plan.id !== id);
  savePlans(plans);
  renderPlans();
}

// === CALCULATORS ===
function calculateCGPA() {
  let m1 = parseFloat(document.getElementById("m1").value) || 0;
  let m2 = parseFloat(document.getElementById("m2").value) || 0;
  let m3 = parseFloat(document.getElementById("m3").value) || 0;

  let avg = (m1 + m2 + m3) / 3;
  let cgpa = (avg / 9.5).toFixed(2);

  document.getElementById("cgpaResult").innerHTML = "CGPA: " + cgpa;
}

function calculatePercentage() {
  let obtained = parseFloat(document.getElementById("obtained").value) || 0;
  let total = parseFloat(document.getElementById("total").value) || 0;

  if (total === 0) {
    document.getElementById("percentageResult").innerHTML = "Invalid total";
    return;
  }

  let percentage = ((obtained / total) * 100).toFixed(2);
  document.getElementById("percentageResult").innerHTML = percentage + "%";
}

function calculateCountdown() {
  let examDate = new Date(document.getElementById("examDate").value);
  let today = new Date();
  let diff = examDate - today;
  let days = Math.ceil(diff / (1000 * 60 * 60 * 24));

  if (days < 0) {
    document.getElementById("countdownResult").innerHTML =
      "Exam already passed!";
  } else {
    document.getElementById("countdownResult").innerHTML =
      days + " Days Left ⏰";
  }
}

// === INITIALIZE ON LOAD ===
window.onload = function () {
  renderTasks();
  renderGoals();
  renderNotes();
  renderPlans();
  updateTaskCount();
  updateGoalCount();
  updateNoteCount();

  // 👉 START APP IN LOCK MODE
  document.getElementById("lockScreen").style.display = "flex";
  document.body.style.overflow = "hidden";
};

function toggleTheme() {
  let body = document.body;

  if (body.classList.contains("light-theme")) {
    body.classList.remove("light-theme");
    body.classList.add("blue-theme");
  } else if (body.classList.contains("blue-theme")) {
    body.classList.remove("blue-theme");
    body.classList.add("purple-theme");
  } else if (body.classList.contains("purple-theme")) {
    body.classList.remove("purple-theme");
  } else {
    body.classList.add("light-theme");
  }
}

function saveTheme(theme) {
  localStorage.setItem("theme", theme);
}

window.onload = function () {
  let saved = localStorage.getItem("theme");
  if (saved) document.body.classList.add(saved);
};

// APP LOCK

// Default PIN
if (!localStorage.getItem("appPin")) {
  localStorage.setItem("appPin", "1234");
}

// Lock App
function lockApp() {
  document.getElementById("lockScreen").style.display = "flex";

  document.body.style.overflow = "hidden";
}

// Unlock App
function unlockApp() {
  const pin = document.getElementById("unlockPin").value;

  if (pin === localStorage.getItem("appPin")) {
    document.getElementById("lockScreen").style.display = "none";

    document.body.style.overflow = "auto";

    document.getElementById("unlockPin").value = "";
  } else {
    alert("❌ Incorrect PIN");

    document.getElementById("unlockPin").value = "";
  }
}
