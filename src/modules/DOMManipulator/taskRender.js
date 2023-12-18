const Pubsub = require("pubsub.js");
import editIcon from "../img/edit.svg";
import trashIcon from "../img/trash.svg";

// RECIEVES
//list of tasks
const taskRender = {
  init: function (taskList) {
    this.cacheDOM();
    this.eventBindings(taskList);
  },
  cacheDOM: function () {
    this.taskList = document.querySelector(".taskList");
  },
  eventBindings: function (TaskList) {
    this.createTaskList(TaskList);
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
  createTaskList: function () {
    document.addEventListener("click", (e) => {
      let date = new Date();
      let taskList;

      this.getNewTask();
      Pubsub.subscribe("newTaskList", function (newTaskList) {
        taskList = newTaskList;
      });

      if (e.target.classList.contains("project")) {
        const projectName = e.target.children[1].innerText;
        this.getNewTask();
        Pubsub.subscribe("newTaskList", function (newTaskList) {
          taskList = newTaskList;
        });

        document.querySelectorAll(".task").forEach((element) => {
          element.parentNode.removeChild(element);
        });

        taskList.forEach((element) => {
          if (element.project === projectName) {
            this.createSingleTask(element);
          }
        });

        // render  all tasks list
      } else if (e.target.innerText === "All Tasks") {
        this.getNewTask();
        Pubsub.subscribe("newTaskList", function (newTaskList) {
          taskList = newTaskList;
        });

        document.querySelectorAll(".task").forEach((element) => {
          element.parentNode.removeChild(element);
        });
        taskList.forEach((element) => {
          this.createSingleTask(element);
        });
      } else if (e.target.innerText === "Today") {
        this.getNewTask();
        Pubsub.subscribe("newTaskList", function (newTaskList) {
          taskList = newTaskList;
        });

        document.querySelectorAll(".task").forEach((element) => {
          element.parentNode.removeChild(element);
        });
        taskList.forEach((element) => {
          if (
            element.date ===
            `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`
          ) {
            this.createSingleTask(element);
          }
        });
      }
    });
  },
  getNewTask: function () {
    Pubsub.publish("taskListNeeded", []);
  },
};

// DOES
//recognizes clicks on project and renders tasks in the right order that are assigned to that project

// SEND
//nothing

export default taskRender;

taskRender.init();
