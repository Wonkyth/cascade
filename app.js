const taskContainer = document.querySelector("#taskParent");
const newSavedTask = document.querySelector("#newTaskSave");
let taskCount = 0;
let tasksDb = [];

newSavedTask.addEventListener("click", saveButtonClicked);

class Task {
  constructor(name, description, date, time, assignee, status) {
    this.name = name;
    this.description = description;
    this.date = date;
    this.time = time;
    this.assignee = assignee;
    this.status = status; //TODO: allow to include and change all information within Status
  }
}

function saveButtonClicked() {
  const newTaskName = document.querySelector("#newTaskName").value;
  const newTaskDescription = document.querySelector("#newTaskDescription")
    .value; //Ok prettier
  const newTaskAssignee = document.querySelector("#newTaskAssignee").value;
  const newTaskDate = document.querySelector("#newTaskDate").value;
  const newTaskTime = document.querySelector("#newTaskTime").value;
  const newTaskStatus = document.querySelector("#newTaskStatus").value;

  addTask(
    newTaskName,
    newTaskDescription,
    newTaskDate,
    newTaskTime,
    newTaskAssignee,
    newTaskStatus
  );

  clearTaskEditModal();
}

function clearTaskEditModal() {
  //select all input
  const elements = document.querySelectorAll("#taskEditModal .clearable");
  //clear
  elements.forEach((element) => {
    //if text input
    if (element.nodeName === "INPUT") {
      if (element.getAttribute("type") === "text") {
        element.value = "";
      } else if (element.getAttribute("type") === "date") {
        element.value = getDefaultDate();
      }
    }
    //if date input
    //if time input
    //if textarea
  });
  //select all options
  //clear
}

function getDefaultDate() {
  console.warn("getDefaultDate isn't implemented yet!");
  return "2011-08-19";
}

// task: element
// status: string
function setTaskStatus(task, status) {
  //TODO: //REFACTOR
  const taskProgress = task.querySelector(".progress-bar");
  switch (parseInt(status, 10)) {
    case 1:
      taskProgress.innerHTML = "To Do";
      taskProgress.setAttribute("aria-valuenow", "25");
      taskProgress.setAttribute("class", "progress-bar bg-secondary");
      taskProgress.setAttribute("style", "width: 25%");
      break;
    case 2:
      taskProgress.innerHTML = "In Progress";
      taskProgress.setAttribute("aria-valuenow", "50");
      taskProgress.setAttribute("class", "progress-bar bg-primary");
      taskProgress.setAttribute("style", "width: 50%");

      break;
    case 3:
      taskProgress.innerHTML = "Awaiting Review";
      taskProgress.setAttribute("aria-valuenow", "75");
      taskProgress.setAttribute("class", "progress-bar bg-info");
      taskProgress.setAttribute("style", "width: 75%");

      break;
    case 4:
      taskProgress.innerHTML = "Done!";
      taskProgress.setAttribute("aria-valuenow", "100");
      taskProgress.setAttribute("class", "progress-bar bg-success");
      taskProgress.setAttribute("style", "width: 100%");
      break;

    default:
      console.error(
        `Status "${status}" does not exist! Setting status text to "ERROR".`
      );
      taskProgress.innerHTML = "ERROR";
      taskProgress.setAttribute("aria-valuenow", "0");
      taskProgress.setAttribute("class", "progress-bar bg-danger");
      taskProgress.setAttribute("style", "width: 100%");
      break;
  }
}

function addTask(name, description, date, time, assignee, status) {
  const template = document.querySelector("#taskTemplate");
  const newTask = template.content.firstElementChild.cloneNode(true);
  taskCount++;

  //set task id
  newTask.id = `taskID${taskCount}`;

  //set target of collapser
  const collapser = newTask.querySelector(".collapser");
  collapser.setAttribute("data-target", `#taskCollapsable${taskCount}`);

  //set id for collapsable
  const collapsable = newTask.querySelector("#templateCollapsable");
  collapsable.id = `taskCollapsable${taskCount}`;

  //set id for edit button
  const editButton = newTask.querySelector("#templateEditButtonID");
  editButton.classList.add(`taskEditButtonID${taskCount}`);

  //set event listener for edit button
  editButton.addEventListener("click", (event) => {
    console.log(`${newTask.id} was clicked.`);
  });

  //set task name
  const taskName = newTask.querySelector(".taskName");
  taskName.innerHTML = name;

  //set task description
  const taskDescription = newTask.querySelector(".taskDescription");
  taskDescription.innerHTML = description;

  const taskDate = newTask.querySelector(".taskDate");
  taskDate.innerHTML = date;
  //TODO: set time (possibly same info as date?)
  //TODO: set assignee to use actual data from list of collaborators
  const taskAssignee = newTask.querySelector(".taskAssignee");
  taskAssignee.innerHTML = "Assignee: " + assignee;

  setTaskStatus(newTask, status);

  const taskListParent = document.querySelector("#taskParent");
  taskListParent.appendChild(newTask);

  task = new Task(name, description, date, time, assignee, status);
  tasksDb.push(task);
}

//add validator eventListeners
document.querySelectorAll(".validated").forEach((element) => {
  element.addEventListener("change", (event) => {
    validateElement(event.target);
  });
});

function validateElement(element) {
  let value = element.value;
  let validator = element.getAttribute("validator");
  if (eval(validator)) {
    setIsValid(element);
    return true;
  } else {
    setIsInvalid(element);
    return false;
  }
}

function setIsValid(element) {
  element.classList.add("is-valid");
  element.classList.remove("is-invalid");
}

function setIsInvalid(element) {
  element.classList.add("is-invalid");
  element.classList.remove("is-valid");
}

//Sample Tasks for Preview
function generateExampleTasks() {
  addTask(
    "Go Shopping",
    "Eggs, Milk, Bread, Steaks, TP, Pasta, Chicken, Mixed veg, Fruit",
    "08/06/20",
    "10:30",
    "Ted",
    "1"
  );
  addTask(
    "Go Shopping",
    "Eggs, Milk, Bread, Steaks, TP, Pasta, Chicken, Mixed veg, Fruit",
    "08/06/20",
    "10:30",
    "Ted",
    "2"
  );
  addTask(
    "Go Shopping",
    "Eggs, Milk, Bread, Steaks, TP, Pasta, Chicken, Mixed veg, Fruit",
    "08/06/20",
    "10:30",
    "Ted",
    "3"
  );
  addTask(
    "Go Shopping",
    "Eggs, Milk, Bread, Steaks, TP, Pasta, Chicken, Mixed veg, Fruit",
    "08/06/20",
    "10:30",
    "Ted",
    "4"
  );
  addTask(
    "Go Shopping",
    "Eggs, Milk, Bread, Steaks, TP, Pasta, Chicken, Mixed veg, Fruit",
    "08/06/20",
    "10:30",
    "Ted",
    "1"
  );
}
generateExampleTasks();
