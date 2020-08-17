"use strict";
import { Task } from "./Task.js";

class TaskManager {
  constructor(parent) {
    this.tasks = [];
    this.taskCount = 0;
    this.parent = document.querySelector(parent);
  }

  createNewTask() {
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
    const newTaskStatus = "To Do"; //FIXME: this some bullshit placeholder hack

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
    this.writeStorage();
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
    this.writeStorage();
  }

  writeStorage() {
    localStorage.setItem("tasks", JSON.stringify(this.tasks));
    localStorage.setItem("taskCount", this.taskCount);
    console.log("wat", localStorage.getItem("tasks"));
    // console.log("testy testy");
    // console.log("write ", this.tasks);
  }

  readStorage() {
    const items = JSON.parse(localStorage.getItem("tasks")) || [];
    // console.log("Items: ", items);
    this.tasks = items.map((item) => {
      return new Task(
        item.name,
        item.description,
        item.datetime,
        item.assignee,
        item.status,
        item.id
      );
    });
    this.taskCount = localStorage.getItem("taskCount") || 1;
    console.log("read ", this.tasks);
    this.display();
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

const mainTaskManager = new TaskManager("#taskParent");
const assigneeManager = new AssigneeManager();
const options = new Options();

function clearTaskEditModal() {
  // //nested function to minimize global functions
  // function getDefaultDate() {
  //   console.warn("getDefaultDate isn't implemented yet!");
  //   return "2011-08-19";
  // }

  document.querySelector("#taskModalForm").reset();
}

function consolidateUI() {
  let newButton = document.querySelector(".newButton");
  let optButton = document.querySelector(".optButton");
  let navbarOptions = document.querySelector(".navbarOptions");
  let navbarNew = document.querySelector(".navbarNew");
  navbarNew.innerHTML = newButton.outerHTML;
  navbarOptions.innerHTML = optButton.innerHTML;
}

//TODO: make new sample task generator which doesn't suck

// //Sample Tasks for Preview
// (function () {
//   assigneeManager.add("Bill");
//   assigneeManager.add("Ted");

//   mainTaskManager.addTask(
//     "test1",
//     "Example task 1",
//     new Date("December 17, 2020 03:24:00"),
//     assigneeManager.getFromName("Bill"),
//     "To Do"
//   );
//   mainTaskManager.addTask(
//     "test2",
//     "Example task 2",
//     new Date("December 12, 2022 03:24:00"),
//     assigneeManager.getFromName("Ted"),
//     "To Do"
//   );

//   mainTaskManager.display();
// })();

//REFACTOR: move stuff into here to do on load
//Add eventListeners to validate modal forms
(function () {
  window.addEventListener("load", () => {
    consolidateUI();
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

window.addEventListener("load", (event) => {
  mainTaskManager.readStorage();
  // console.log("onload");
});
