const taskContainer = document.querySelector("#taskParent");
const newSavedTask = document.querySelector("#newTaskSave");
let taskCount = 5;

newSavedTask.addEventListener("click", saveButtonClicked);

function saveButtonClicked() {
  const newTaskName = document.querySelector("#newTaskName").value;
  const newTaskDescription = document.querySelector("#newTaskDescription")
    .value; //Ok prettier
  const newTaskAssignee = document.querySelector("#newTaskAssignee");
  const newTaskDate = document.querySelector("#newTaskDate");
  const newTaskTime = document.querySelector("#newTaskTime");
  const newTaskStatus = document.querySelector("#newTaskStatus").value; //todo: how to get the value from option tag

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

// task: element
// status: string
function setTaskStatus(task, status) {
  //todo: do all this
  const taskProgress = task.querySelector(".progress-bar");
  switch (parseInt(status, 10)) {
    case 1:
      taskProgress.innerHTML = "To Do";
      break;
    case 2:
      taskProgress.innerHTML = "In Progress";
      break;
    case 3:
      taskProgress.innerHTML = "Awaiting Review";
      break;
    case 4:
      taskProgress.innerHTML = "Done!";
      break;

    default:
      console.error(
        `Status "${status}" does not exist! Setting status text to "ERROR".`
      );
      taskProgress.innerHTML = "ERROR";
      taskProgress.setAttribute("class", "progress-bar bg-danger");
      break;
  }
  console.warn("this ain't fully implemented yet, ya dingus!");
}

function addTask(name, description, date, time, assignee, status) {
  const template = document.querySelector("#taskTemplate");
  const newTask = template.content.firstElementChild.cloneNode(true);
  taskCount++;

  //set id of task
  newTask.id = `taskID${taskCount}`;

  const collapser = newTask.querySelector(".collapser");
  collapser.setAttribute("data-target", `#taskCollapsable${taskCount}`);

  const collapsable = newTask.querySelector("#templateCollapsable");
  collapsable.id = `taskCollapsable${taskCount}`;

  const taskName = newTask.querySelector(".templateName");
  taskName.innerText = name;
  //todo: set desc
  const taskDescription = newTask.querySelector(".templateDescription");
  taskDescription.innerText = description;
  //todo: set date
  //todo: set time (possibly same info as date?)
  //todo: set assignee

  setTaskStatus(newTask, status);

  const taskListParent = document.querySelector("#taskParent");
  taskListParent.appendChild(newTask);
}

//in what way?
//Oh true, yeah i forgot about that feature
// oh yeah. It's just that we need to set the progress bar, colours, etc etc. We might as well do that with one method
