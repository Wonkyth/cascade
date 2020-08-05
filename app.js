const taskContainer = document.querySelector("#taskParent");
const newSavedTask = document.querySelector("#newTaskSave");
let taskCount = 0;
let tasksDb = [];
class TaskManager {
  constructor(parent) {
    this.tasks = [];
    this.taskCount = 0;
    this.parent = document.querySelector(parent);
  }
  addTask(name, description, datetime, assignee, status, refresh = false) {
    let task = new Task(
      name,
      description,
      datetime,
      assignee,
      status,
      taskCount
    );
    //todo: add event listener
    this.parent.append(task.toHtmlElement());
    this.tasks.push(task);
    this.taskCount++;
    if (refresh) {
      display();
    }
  }
  display() {
    //clear
    this.parent.innerHTML = "";
    //for each task, add to element
    this.tasks.forEach((task) => {
      this.parent.append(task.toHtmlElement());
      console.count(task.name);
    });
  }
  deleteTask(id_or_whatever) {
    //todo: make work
    console.warn("not implemented");
  }
}

class Task {
  constructor(name, description, datetime, assignee, status, count) {
    this.name = name;
    this.description = description;
    this.datetime = datetime;
    this.assignee = assignee;
    this.status = status;
    this.id = "task" + count;
  }
  toHtmlElement() {
    //TODO: make datetime convert to correct format
    const html = `
      <li class="list-group-item mainList border-0" id="${this.id}">
        <div class="row">
          <div class="col d-flex flex-column taskHeader">
            <div class="row d-flex p-2">
              <div
                class="d-flex flex-grow-1 align-items-center collapser"
                data-toggle="collapse"
                data-target="#${this.id}_collapsable"
              >
                <p class="px-2 taskName">${this.name}</p>
                <p class="px-2 taskDate">${this.datetime}</p>
              </div>

              <div class="dropdown d-flex align-items-center">
                <button
                  type="button"
                  class="btn btn-info mx-1"
                  data-toggle="modal"
                  id="${this.id}_edit"
                  data-target="#taskEditModal"
                >
                  Edit task
                </button>
                <button
                  type="button"
                  class="btn btn-primary dropdown-toggle mr-3"
                  data-toggle="dropdown"
                >
                  Task Status
                </button>
                <div class="dropdown-menu">
                  <a class="dropdown-item" href="#"
                    ><i class="fas fa-box"></i> To Do</a
                  >
                  <a class="dropdown-item" href="#"
                    ><i class="fas fa-hourglass-half"></i> In
                    Progress</a
                  >
                  <a class="dropdown-item" href="#"
                    ><i class="far fa-question-circle"></i> Review</a
                  >
                  <a class="dropdown-item" href="#"
                    ><i class="fas fa-check-double"></i> Complete</a
                  >
                  </div>
                  <button
                  class="btn btn-outline-danger "
                  id="${this.id}_delete" >
                  <i class="fas fa-trash-alt"></i>
                  </button>
              </div>
            </div>
            <div class="progress">
              <div
                class="progress-bar bg-primary"
                role="progressbar"
                style="width: 25%;"
                aria-valuenow="25"
                aria-valuemin="0"
                aria-valuemax="100"
              >
                To Do
              </div>
            </div>
            <div class="collapse taskDescBG" id="${this.id}_collapsable">
              <p class="taskAssignee">
              Assigned to: ${this.assignee.name}
              </p>
              <p class="taskDescription">
              ${this.description}
              </p>
            </div>
          </div>
        </div>
      </li>
    `;
    //todo: add event listeners
    return document.createRange().createContextualFragment(html);
  }
}

class AssigneeManager {
  constructor() {
    this.assignees = [];
  }
  add(name) {
    //TODO: handle duplicate names
    const assignee = new Assignee(name);
    this.assignees.push(assignee);
  }
  getFromName(name) {
    return this.assignees.find((assignee) => (assignee.name = name));
  }
}

class Assignee {
  constructor(name) {
    this.name = name;
  }
}

class Options {
  constructor(dateFormat, timeFormat, timezone) {
    this.dateFormat = dateFormat;
    this.timeFormat = timeFormat;
    this.timezone = timezone;
  }

  SetDateFormat() {
    if ((Radiobox1 = true)) {
      this.dateFormat = "DD/MM/YY";
    } else if ((Radiobox2 = true)) {
      this.dateFormat = "MM/DD/YY";
    } else if ((Radiobox3 = true)) {
      this.dateFormat = "YY/MM/DD";
    }
  }

  SetTimeFormat() {}
}

newSavedTask.addEventListener("click", saveButtonClicked);

// class Task {
//   constructor(name, description, date, time, assignee, status) {
//     this.name = name;
//     this.description = description;
//     this.date = date;
//     this.time = time;
//     this.assignee = assignee;
//     this.status = status; //TODO: allow to include and change all information within Status
//   }
// }

function saveButtonClicked() {
  const newTaskName = document.querySelector("#newTaskName").value;
  const newTaskDescription = document.querySelector("#newTaskDescription")
    .value; //Ok prettier
  const newTaskAssignee = document.querySelector("#newTaskAssignee").value;
  const newTaskDate = document.querySelector("#newTaskDate").valueAsNumber;
  const newTaskTime = document.querySelector("#newTaskTime").valueAsNumber;
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
  //FIXME: depreciated
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
  //FIXME: depreciated
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
  let validator = element.getAttribute("data-validator");
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
  //TODO: upgrade to use TaskManager
  assigneeManager.add("Bill");
  assigneeManager.add("Ted");

  mainTaskManager.addTask(
    "test1",
    "Example task 1",
    new Date("December 17, 2020 03:24:00"),
    assigneeManager.getFromName("Bill"),
    "To Do"
  );

  mainTaskManager.display();
  // addTask(
  //   "Go Shopping",
  //   "Eggs, Milk, Bread, Steaks, TP, Pasta, Chicken, Mixed veg, Fruit",
  //   "08/06/20",
  //   "10:30",
  //   "Ted",
  //   "1"
  // );
  // addTask(
  //   "Go Shopping",
  //   "Eggs, Milk, Bread, Steaks, TP, Pasta, Chicken, Mixed veg, Fruit",
  //   "08/06/20",
  //   "10:30",
  //   "Ted",
  //   "2"
  // );
  // addTask(
  //   "Go Shopping",
  //   "Eggs, Milk, Bread, Steaks, TP, Pasta, Chicken, Mixed veg, Fruit",
  //   "08/06/20",
  //   "10:30",
  //   "Ted",
  //   "3"
  // );
  // addTask(
  //   "Go Shopping",
  //   "Eggs, Milk, Bread, Steaks, TP, Pasta, Chicken, Mixed veg, Fruit",
  //   "08/06/20",
  //   "10:30",
  //   "Ted",
  //   "4"
  // );
}

const mainTaskManager = new TaskManager("#taskParent");
const assigneeManager = new AssigneeManager();

generateExampleTasks();
