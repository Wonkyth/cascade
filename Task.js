export class Task {
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
    const fragment = document.createRange().createContextualFragment(html);
    //FIXME: assignee name is undefined

    return fragment;
  }
}
