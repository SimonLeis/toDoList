const Pubsub = require("pubsub.js");
import editIcon from "../img/edit.svg";
import trashIcon from "../img/trash.svg";

// RECIEVES
//list of tasks
const taskRender = {
  activeProject: "",
  init: function (taskList) {
    this.cacheDOM();
    this.eventBindings();
    this.clearTaskList();
    this.renderTaskList(taskList);
  },
  cacheDOM: function () {
    this.taskList = document.querySelector(".taskList");
  },
  eventBindings: function () {
    this.createTaskListName();
    this.deleteTask();
  },
  createSingleTask: function (task) {
    const taskContainer = document.createElement("div");
    taskContainer.classList.add("task");

    const taskColor = document.createElement("span");
    taskColor.classList.add("taskColor");
    taskColor.style.backgroundColor = task.color;

    const taskName = document.createElement("p");
    taskName.classList.add("taskName");
    taskName.innerText = task.name;

    const taskEdit = new Image();
    taskEdit.src = editIcon;
    taskEdit.classList.add("taskEdit");

    const taskDate = document.createElement("p");
    taskDate.classList.add("taskDate");
    taskDate.innerText = task.date;

    const taskDelete = new Image();
    taskDelete.src = trashIcon;
    taskDelete.classList.add("taskDelete");

    this.taskList.append(taskContainer);

    taskContainer.append(taskColor);
    taskContainer.append(taskName);
    taskContainer.append(taskEdit);
    taskContainer.append(taskDate);
    taskContainer.append(taskDelete);
  },
  createTaskListName: function () {
    document.addEventListener("click", (e) => {
      // `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`

      // renders all custom projects

      if (e.target.classList.contains("project")) {
        this.activeProject = e.target.children[1].innerText;
        Pubsub.publish("taskListNeeded", []);
      } else if (e.target.classList.contains("allProjects")) {
        this.activeProject = "";
        Pubsub.publish("taskListNeeded", []);
      } else if (e.target.classList.contains("todayProjects")) {
        this.activeProject = "todaysDate";
        Pubsub.publish("taskListNeeded", []);
      }

      // render  ""all tasks" list

      // renders only tasks that are equal to todays date
    });
  },
  renderTaskList: function (taskList) {
    let date = new Date();
    if (this.activeProject == "") {
      taskList.forEach((element) => {
        this.createSingleTask(element);
      });
    } else if (this.activeProject == "todaysDate") {
      taskList.forEach((element) => {
        if (
          element.date ==
          `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`
        ) {
          this.createSingleTask(element);
        }
      });
    } else if (
      this.activeProject !== "" &&
      this.activeProject !== "todaysDate"
    ) {
      taskList.forEach((element) => {
        if (element.project == this.activeProject) {
          this.createSingleTask(element);
        }
      });
    }
  },

  getNewTask: function () {
    Pubsub.publish("taskListNeeded", []);
  },
  deleteTask: function () {
    document.addEventListener("click", (e) => {
      if (e.target.classList.contains("taskDelete")) {
        const taskName = e.target.parentNode.children[1].innerText;
        Pubsub.publish("deleteTask", [taskName]);
      }
    });
  },
  clearTaskList: function () {
    [...document.querySelector(".taskList").children].forEach((element) => {
      element.parentNode.removeChild(element);
    });
  },
};

export default taskRender.init([]);

Pubsub.subscribe("newTaskList", function (taskList) {
  taskRender.init(taskList);
});
