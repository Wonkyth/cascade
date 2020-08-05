const taskContainer = document.querySelector("#taskParent");
const newSavedTask = document.querySelector("#newTaskSave");
newSavedTask.addEventListener("click", saveButtonClicked);
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
      this.taskCount
    );

    const fragment = task.toHtmlElement();

    this.tasks.push(task);
    this.parent.append(fragment);
    this.taskCount++;

    if (refresh) {
      this.display();
    }
  }
  display() {
    //clear
    this.parent.innerHTML = "";
    //for each task, add to element
    this.tasks.forEach((task) => {
      this.parent.append(task.toHtmlElement());
      //wtf
      const foo = this.parent.querySelector(`#${task.id}_delete`);
      console.log(foo);
      foo.addEventListener("click", () => {
        console.log("deleting " + task.id);
        this.deleteTask(task.id, true);
      });
    });
  }
  deleteTask(id, refresh = false) {
    //todo: make work
    console.log("deleting " + id);
    //find taskIndex by id
    //remove by index
    this.tasks.splice(
      this.tasks.findIndex((task) => task.id === id),
      1
    );
    if (refresh) {
      this.display();
    }
  }
}

class Task {
  constructor(name, description, datetime, assignee, status, taskCount) {
    this.name = name;
    this.description = description;
    this.datetime = datetime;
    this.assignee = assignee;
    this.status = status;
    this.id = "task" + taskCount;
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
    const fragment = document.createRange().createContextualFragment(html);

    return fragment;
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

function saveButtonClicked() {
  const newTaskName = document.querySelector("#newTaskName").value;
  const newTaskDescription = document.querySelector("#newTaskDescription")
    .value; //Ok prettier
  const newTaskAssignee = document.querySelector("#newTaskAssignee").value;
  const date = new Date(document.querySelector("#newTaskDate").value);
  console.log(date);
  const time = new Date(document.querySelector("#newTaskTime").valueAsNumber);
  console.log(time);
  const dateTime = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    time.getHours(),
    time.getMinutes(),
    0,
    0
  );
  const newTaskStatus = document.querySelector("#newTaskStatus").value;

  mainTaskManager.addTask(
    newTaskName,
    newTaskDescription,
    dateTime,
    newTaskAssignee,
    newTaskStatus,
    true
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
  assigneeManager.add("Bill");
  assigneeManager.add("Ted");

  mainTaskManager.addTask(
    "test1",
    "Example task 1",
    new Date("December 17, 2020 03:24:00"),
    assigneeManager.getFromName("Bill"),
    "To Do"
  );
  mainTaskManager.addTask(
    "test2",
    "Example task 2",
    new Date("December 12, 2022 03:24:00"),
    assigneeManager.getFromName("Ted"),
    "To Do"
  );

  mainTaskManager.display();
}

const mainTaskManager = new TaskManager("#taskParent");
const assigneeManager = new AssigneeManager();
const options = new Options();

generateExampleTasks();
