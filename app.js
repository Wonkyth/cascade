"use strict";

class TaskManager {
  constructor(parent) {
    this.tasks = [];
    this.taskCount = 0;
    this.parent = document.querySelector(parent);
  }

  createNewTask() {
    //TODO: pull data for new task
    const newTaskName = document.querySelector("#newTaskName").value;
    const newTaskDescription = document.querySelector("#newTaskDescription")
      .value; //Ok prettier
    const newTaskAssignee = document.querySelector("#newTaskAssignee").value;
    const date = new Date(document.querySelector("#newTaskDate").value);
    const time = new Date(document.querySelector("#newTaskTime").valueAsNumber);
    const dateTime = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      time.getHours(),
      time.getMinutes(),
      0,
      0
    );

    this.addTask(
      newTaskName,
      newTaskDescription,
      dateTime,
      newTaskAssignee,
      newTaskStatus,
      true
    );

    clearTaskEditModal();
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
      //REFACTOR: move this to its own function
      const deleteButton = this.parent.querySelector(`#${task.id}_delete`);
      deleteButton.addEventListener("click", () => {
        this.deleteTask(task.id, true);
      });
      const editButton = this.parent.querySelector(`#${task.id}_edit`);
      editButton.addEventListener("click", (event) => {
        event.stopPropagation();
        //TODO: update modal with data from task
        $("#taskEditModal").modal();
      });
      const statusDropdown = this.parent.querySelector(
        `#${task.id}_setStatusDropdown`
      );
      statusDropdown.addEventListener("click", (event) => {
        event.stopPropagation();
        //TODO: set status
      });
      const statusDropdownItems = statusDropdown.querySelectorAll(
        ".dropdown-item"
      );
      statusDropdownItems.forEach((element) => {
        element.addEventListener("click", (event) => {
          console.log(event.target.innerText, event.target.value);
        });
      });
    });
  }
  //REFACTOR: remove silly refresh thing, or at least refresh by default
  deleteTask(id, refresh = false) {
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
    //TODO: Fix collapser
    const html = `
      <li class="list-group-item mainList border-0 collapser" id="${this.id}">
        <div class="row">
          <div class="col d-flex flex-column taskHeader">
            <div class="row d-flex p-2"  data-toggle="collapse"
            data-target="#${this.id}_collapsable">
              <div
                class="d-flex flex-grow-1 align-items-center collapser"
                
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
                  id="${this.id}_setStatusButton"
                >
                  Task Status
                </button>
                <div class="dropdown-menu" id="${this.id}_setStatusDropdown">
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
  //TODO: add functionality to add new assignees
  //TODO: make default assignee oneself
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

function clearTaskEditModal() {
  //TODO: make this actually clear everything

  //nested function to minimize global functions
  function getDefaultDate() {
    console.warn("getDefaultDate isn't implemented yet!");
    return "2011-08-19";
  }

  //TODO: clear fields
  document.querySelector("#taskModalForm").reset();
}

const assigneeManager = new AssigneeManager();
const options = new Options();

function consolidateUI() {
  let newButton = document.querySelector(".newButton");
  let optButton = document.querySelector(".optButton");
  let navbarOptions = document.querySelector(".navbarOptions");
  let navbarNew = document.querySelector(".navbarNew");
  navbarNew.innerHTML = newButton.outerHTML;
  navbarOptions.innerHTML = optButton.innerHTML;
}
consolidateUI();

const mainTaskManager = new TaskManager("#taskParent");
//Sample Tasks for Preview
(function () {
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
})();

//REFACTOR: move stuff into here to do on load
//Add eventListeners to validate modal forms
(function () {
  window.addEventListener("load", () => {
    //select forms to apply custom validation to
    let forms = document.querySelectorAll(".needs-validation");
    //loop over and prevent submission
    let validation = Array.prototype.filter.call(forms, (form) => {
      form.addEventListener(
        "submit",
        (event) => {
          event.preventDefault();
          event.stopPropagation();
          const valid = form.checkValidity();
          if (valid && form.id === "taskModalForm") {
            mainTaskManager.createNewTask();
            $("#taskEditModal").modal("hide");
          }
          form.classList.add("was-validated");
        },
        false
      );
    });

    //add eventListeners to invalidate inputs on focusout
    //jQuery ahoy
    $(".needs-validation")
      .find("input,select,textarea")
      .on("focusout", function () {
        // check element validity and change class
        $(this)
          .removeClass("is-valid is-invalid")
          .addClass(this.checkValidity() ? "is-valid" : "is-invalid");
      });
  });
})();
