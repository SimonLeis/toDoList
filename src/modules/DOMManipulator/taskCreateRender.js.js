const Pubsub = require("pubsub.js");

// gets data from projectListHandler
import { provideProjectList } from "../projectListHandler";
import { provideTaskList } from "../taskListHandler";

const taskCreateRender = {
  taskPrevName: "",
  init: function () {
    this.eventBindings();
  },
  eventBindings: function () {
    this.addTask();
    this.getTaskData();
    this.closePopUpWindow();
  },
  addTask: function (e) {
    document.addEventListener("click", (e) => {
      if (e.target.classList.contains("addTask")) {
        this.createPopUpWindow({});
      } else if (e.target.classList.contains("taskEdit")) {
        const taskList = provideTaskList();
        const taskName = e.target.parentNode.children[1].innerText;

        let taskToEdit = taskList.filter((element) => {
          if (element.name === taskName) {
            return element;
          }
        });

        taskToEdit = taskToEdit[0];
        taskToEdit.prevName = taskToEdit.name;

        this.createPopUpWindow(taskToEdit);
      }
    });
  },
  createPopUpWindow(task) {
    let edit = false;

    if (task.prevName !== undefined) {
      edit = true;
      this.taskPrevName = task.prevName;
    } else {
      edit = false;
      this.taskPrevName = "";
    }

    const newTaskContainer = document.createElement("div");
    newTaskContainer.classList.add("newTaskContainer");

    const newTaskWindow = document.createElement("div");
    newTaskWindow.classList.add("newTaskWindow");

    const newTaskNameColor = document.createElement("div");
    newTaskNameColor.classList.add("newTaskNameColor");

    const colorInput = document.createElement("input");
    colorInput.setAttribute("id", "color");
    colorInput.setAttribute("type", "color");
    colorInput.classList.add("taskColorInput");

    if (edit) {
      colorInput.value = task.color;
    }

    const nameInput = document.createElement("input");
    nameInput.setAttribute("placeholder", "Taskname...");
    nameInput.setAttribute("type", "text");
    nameInput.classList.add("taskNameInput");
    if (edit) {
      nameInput.value = task.name;
    }

    const sbmtButton = document.createElement("button");
    sbmtButton.classList.add("newTaskSubmit");
    sbmtButton.innerText = "→";

    const newTaskNotes = document.createElement("textarea");
    newTaskNotes.classList.add("newTaskNotes");
    newTaskNotes.setAttribute("placeholder", "Notes...");
    newTaskNotes.setAttribute("name", "notes");
    if (edit) {
      newTaskNotes.value = task.notes;
    }

    const newTaskOptions = document.createElement("div");
    newTaskOptions.classList.add("newTaskOptions");

    const newTaskPriority = document.createElement("div");
    newTaskPriority.classList.add("newTaskPriority");

    const taskPriorityText = document.createElement("p");
    taskPriorityText.innerText = "Task-Priority";

    const taskPriority = document.createElement("select");
    taskPriority.classList.add("taskPriority");
    if (edit) {
      taskPriority.value = task.priority;
    }

    const taskPriorityHigh = document.createElement("option");
    taskPriorityHigh.setAttribute("value", "1");
    taskPriorityHigh.setAttribute("name", "priority");
    taskPriorityHigh.innerText = "High";

    const taskPriorityMid = document.createElement("option");
    taskPriorityMid.setAttribute("value", "2");
    taskPriorityMid.setAttribute("name", "priority");
    taskPriorityMid.innerText = "Mid";

    const taskPriorityLow = document.createElement("option");
    taskPriorityLow.setAttribute("value", "3");
    taskPriorityLow.setAttribute("name", "priority");
    taskPriorityLow.innerText = "low";

    const optionNoProject = document.createElement("option");
    optionNoProject.setAttribute("value", "");
    optionNoProject.innerText = "No Project";
    optionNoProject.setAttribute("selected", "selected");

    const newTaskProject = document.createElement("select");
    newTaskProject.classList.add("newTaskProject");
    if (edit) {
      if (task.priority == "1") {
        taskPriorityHigh.setAttribute("selected", "selected");
        optionNoProject.removeAttribute("selected");
      } else if (task.priority == "2") {
        taskPriorityMid.setAttribute("selected", "selected");
        optionNoProject.removeAttribute("selected");
      } else if (task.priority == "3") {
        taskPriorityLow.setAttribute("selected", "selected");
        optionNoProject.removeAttribute("selected");
      }
    }

    //function that iterates through that list and create options for every one and appends that to the select object

    function createOptions(list) {
      list.forEach((element) => {
        const project = document.createElement("option");

        project.setAttribute("value", element.name);
        project.setAttribute("name", "project");
        project.innerText = element.name;

        newTaskProject.append(project);
      });
    }
    createOptions(provideProjectList);

    const newTaskDate = document.createElement("input");
    newTaskDate.setAttribute("type", "date");
    newTaskDate.classList.add("newTaskDate");
    if (edit) {
      const formatedDate = `${task.date.slice(6)}-${task.date.slice(
        3,
        5
      )}-${task.date.slice(0, 2)}`;

      newTaskDate.value = formatedDate;
    }

    document.querySelector(".container").append(newTaskContainer);

    newTaskContainer.append(newTaskWindow);

    newTaskWindow.append(newTaskNameColor);

    newTaskNameColor.append(colorInput);
    newTaskNameColor.append(nameInput);
    newTaskNameColor.append(sbmtButton);

    newTaskWindow.append(newTaskNotes);

    newTaskWindow.append(newTaskOptions);

    taskPriority.append(taskPriorityHigh);
    taskPriority.append(taskPriorityMid);
    taskPriority.append(taskPriorityLow);

    newTaskOptions.append(newTaskProject);
    newTaskProject.prepend(optionNoProject);

    newTaskOptions.append(newTaskDate);
    newTaskOptions.prepend(taskPriority);
  },

  getTaskData: function () {
    document.addEventListener("click", (e) => {
      if (e.target.classList.contains("newTaskSubmit")) {
        if (this.taskPrevName == "") {
          const newTask = {
            name: document.querySelector(
              ".newTaskNameColor > input[type='text'"
            ).value,

            color: document.querySelector(
              ".newTaskNameColor > input[type='color'"
            ).value,
            notes: document.querySelector(".newTaskNotes").value,
            priority: document.querySelector(".taskPriority").value,
            project: document.querySelector(".newTaskProject").value,
            date: document.querySelector(".newTaskDate").value,
          };
          this.sendNewTaskData(newTask);
        } else if (this.taskPrevName !== "") {
          const newTask = {
            name: document.querySelector(
              ".newTaskNameColor > input[type='text'"
            ).value,

            color: document.querySelector(
              ".newTaskNameColor > input[type='color'"
            ).value,
            notes: document.querySelector(".newTaskNotes").value,
            priority: document.querySelector(".taskPriority").value,
            project: document.querySelector(".newTaskProject").value,
            date: document.querySelector(".newTaskDate").value,
            prevName: this.taskPrevName,
          };
          this.sendNewTaskData(newTask);
        }
      }
    });
  },
  sendNewTaskData: function (newTask) {
    Pubsub.publish("newTask", [newTask]);
  },

  closePopUpWindow: function () {
    document.addEventListener("click", (e) => {
      if (e.target.classList.contains("newTaskSubmit")) {
        document
          .querySelector(".container")
          .removeChild(document.querySelector(".newTaskContainer"));
      }
    });
  },
};

export default taskCreateRender.init();
