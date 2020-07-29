const taskContainer = document.querySelector("#taskParent");
const newSavedTask = document.querySelector("#newTaskSave");
let taskCount = 5;

newSavedTask.addEventListener("click", saveButtonClicked);

function saveButtonClicked() {
  //   console.log("save button clicked");
  const newTaskName = document.querySelector("#newTaskName").nodeValue;
  const newTaskDescription = document.querySelector("#newTaskDescription")
    .value; //Ok prettier
  const newTaskAssignee = document.querySelector("#newTaskAssignee");
  const newTaskDate = document.querySelector("#newTaskDate");
  const newTaskTime = document.querySelector("#newTaskTime");
  const newTaskStatus = document.querySelector("#newTaskStatus"); //todo: how to get the value from option tag

  console.log({
    newTaskName,
    newTaskDescription,
    newTaskAssignee,
    newTaskDate,
    newTaskTime,
    newTaskStatus,
  });
  addTask(
    newTaskName,
    newTaskDescription,
    newTaskDate,
    newTaskTime,
    newTaskAssignee,
    newTaskStatus
  );
}

function setStatus(task, status) {
  //todo: do all this
  console.error("this ain't implemented yet, ya dingus!");
}

function addTask(name, description, date, time, assignee, status) {
  const template = document.querySelector("#taskTemplate");
  const newTask = template.content.firstElementChild.cloneNode(true);
  taskCount++;

  const collapser = newTask.querySelector(".collapser");
  collapser.setAttribute("data-target", `#taskCollapsable${taskCount}`);

  const collapsable = newTask.querySelector("#templateCollapsable");
  collapsable.id = `taskCollapsable${taskCount}`;

  //todo: set name
  //todo: set desc
  //todo: set date
  //todo: set time (possibly same info as date?)
  //todo: set assignee

  setStatus(newTask, status);

  const taskListParent = document.querySelector("#taskParent");
  taskListParent.appendChild(newTask);
}

//in what way?
//Oh true, yeah i forgot about that feature
// oh yeah. It's just that we need to set the progress bar, colours, etc etc. We might as well do that with one method
