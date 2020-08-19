import Task from "./Task.js";
import path from "path";
import fs from "fs";
const html = fs.readFileSync(path.resolve(__dirname, "./index.html"), "utf8");

beforeEach(() => {
  document.documentElement.innerHTML = html.toString();
});

test.todo("something");
