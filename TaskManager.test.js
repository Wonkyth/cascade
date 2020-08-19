import TaskManager from "./TaskManager";
// import Task from "./Task.js";
import path from "path";
import fs from "fs";
const html = fs.readFileSync(path.resolve(__dirname, "./index.html"), "utf8");

beforeEach(() => {
  document.documentElement.innerHTML = html.toString();
});

test("number of tasks should be 1 after adding one task", () => {
  let tm = new TaskManager("#taskParent");
  tm.addTask("name", "description", "datetime", "assignee", "status");
  expect(tm.tasks.length).toBe(1);
});

test("updateTask should replace old task with new", () => {
  const taskManager = new TaskManager("#taskParent");
  const taskId1 = taskManager.addTask(
    "name1",
    "description1",
    "datetime1",
    "assignee1",
    "status1"
  );
  const taskId2 = taskManager.addTask(
    "name2",
    "description2",
    "datetime2",
    "assignee2",
    "status2"
  );
  const original = taskManager.getTask(taskId1);
  const updated = taskManager.updateTask(taskId1, taskManager.getTask(taskId2));
  expect(updated.name).not.toBe(original.name);
});

test("delete should delete task", () => {
  const taskManager = new TaskManager("#taskParent");
  const taskId = taskManager.addTask(
    "name",
    "description",
    "datetime",
    "assignee",
    "status"
  );
  expect(taskManager.tasks.length).toBe(1);
  taskManager.deleteTask(taskId);
  expect(taskManager.tasks.length).toBe(0);
});

test("assignTask should change assignee of task", () => {
  let taskManager = new TaskManager("#taskParent");
  const taskId = taskManager.addTask(
    "name",
    "description",
    "datetime",
    "assignee",
    "status"
  );
  expect(taskManager.tasks.length).toBe(1);
  const task = taskManager.getTask(taskId);
  taskManager.assignTask(task.id, "assignee2");
  expect(task.assignee).toBe("assignee2");
});

//TODO: test getTask
test.todo("getTask should get task");
