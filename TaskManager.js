import { Task } from "./Task";

export class TaskManager {
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

    this.clearTaskEditModal();
  }

  clearTaskEditModal() {
    document.querySelector("#taskModalForm").reset();
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
