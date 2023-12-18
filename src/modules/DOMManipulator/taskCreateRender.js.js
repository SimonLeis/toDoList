const Pubsub = require("pubsub.js");

// gets data from projectListHandler
import { provideList } from "../projectListHandler";

// RECIEVES
//list of tasks

// DOES
//create Pop up

const taskCreateRender = {
  init: function () {
    this.eventBindings();
  },
  eventBindings: function () {
    this.addTask();
    this.getNewTaskData();
    this.closePopUpWindow();
  },
  addTask: function (e) {
    document.addEventListener("click", (e) => {
      if (e.target.classList.contains("addTask")) {
        this.createPopUpWindow({});
      } else if (e.target.classList.contains("taskEdit")) {
        // gets data from taskList
      }
    });
  },
  createPopUpWindow(task) {
    let edit = false;

    // if (task.prevName !== undefined) {
    //   edit = true;
    // } else {
    //   edit = false;
    // }

    const newTaskContainer = document.createElement("div");
    newTaskContainer.classList.add("newTaskContainer");

    const newTaskWindow = document.createElement("div");
    newTaskWindow.classList.add("newTaskWindow");

    const newTaskNameColor = document.createElement("div");
    newTaskNameColor.classList.add("newTaskNameColor");

    const colorInput = document.createElement("input");
    colorInput.setAttribute("id", "color");
    colorInput.setAttribute("type", "color");

    if (edit) {
      colorInput.value = task.color;
    }

    const nameInput = document.createElement("input");
    nameInput.setAttribute("placeholder", "Taskname...");
    nameInput.setAttribute("type", "text");
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

    // make a select to select a high, mid or low priority

    const taskPriority = document.createElement("select");
    taskPriority.classList.add("taskPriority");

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

    const newTaskProject = document.createElement("select");
    newTaskProject.classList.add("newTaskProject");
    if (edit) {
      newTaskProject.value = task.project;
    }

    const optionNoProject = document.createElement("option");
    optionNoProject.setAttribute("value", "");
    optionNoProject.innerText = "No Project";
    optionNoProject.setAttribute("selected", "selected");

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
    createOptions(provideList);

    const newTaskDate = document.createElement("input");
    newTaskDate.setAttribute("type", "date");
    newTaskDate.classList.add("newTaskDate");
    if (edit) {
      newTaskDate.value = task.date;
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
  // send data to list before closing the pop up pop-up (object with( name, color, notes, prio, date, poject, prevName ))

  getNewTaskData: function () {
    document.addEventListener("click", (e) => {
      if (e.target.classList.contains("newTaskSubmit")) {
        const newTask = {
          name: document.querySelector(".newTaskNameColor > input[type='text'")
            .value,

          color: document.querySelector(
            ".newTaskNameColor > input[type='color'"
          ).value,
          notes: document.querySelector(".newTaskNotes").value,
          priority: document.querySelector(".taskPriority").value,
          project: document.querySelector(".newTaskProject").value,
          date: document.querySelector(".newTaskDate").value,
        };

        this.sendNewTaskData(newTask);

        // gets data from projectListHandler
      }
    });
  },
  sendNewTaskData: function (newTask) {
    Pubsub.publish("newTask", [newTask]);
  },

  //funtion that can close the pop up
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
