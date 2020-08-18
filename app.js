"use strict";
import { Task } from "./Task.js";
import { TaskManager } from "./TaskManager.js";
import { AssigneeManager } from "./AssigneeManager";
import { Assignee } from "./Assignee";

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
