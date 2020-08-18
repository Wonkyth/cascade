export class AssigneeManager {
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
