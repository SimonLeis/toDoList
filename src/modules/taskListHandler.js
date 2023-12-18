import { publish } from "pubsub-js";

const Pubsub = require("pubsub.js");

//RECIEVES
//new Task data
//edit Task data

//DOES
//add new Tasks to the list
//edit tasks in the List and sets new Values
//sort list based on priority and ( dates (secondary))

const taskListHandler = {
  // first manually filled list

  taskList: [
    {
      name: "test general",
      color: "blue",
      date: "24.12.2023",
      notes: "dsaljfldskjaf",
      project: "",
      priority: 1,
    },
    {
      name: "test today",
      color: "red",
      date: "17.12.2023",
      notes: "dsaljfldskjaf",
      project: "",
      priority: 2,
    },
    {
      name: "test personal",
      color: "green",
      date: "16.12.2023",
      notes: "dsaljfldskjaf",
      project: "Personal",
      priority: 2,
    },
  ],

  init: function (task) {
    if (task.prevName == undefined) {
      taskListHandler.addTask(task);
    } else if (task.prevName !== undefined) {
      this.editTask(task);
    }
    this.provideList();
  },

  // edits task based on previus name and triggers the reordering function

  editTask: function (task) {
    const taskToEdit = this.taskList.filter((element) => {
      if (element.name == task.prevName) {
        return element;
      }

      taskToEdit.name = task.name;
      taskToEdit.color = task.color;
      taskToEdit.date = task.date;
      taskToEdit.project = task.project;
      taskToEdit.priority = task.priority;

      this.reorderTaskList();
    });
  },

  //pushes task into the array and triggers the reorderung function

  addTask: function (task) {
    this.taskList.push(task);

    this.reorderTaskList();
  },

  // reorders list based on their priority

  reorderTaskList: function () {
    this.taskList.sort((a, b) => {
      return b.priority - a.priority;
    });

    this.publishList();
  },

  // publishes list so every module that needs it reloads

  publishList: function () {
    Pubsub.publish("newTaskList", [this.taskList]);
  },
};

// as soon as it recieves new data it will push it under the rules into the array

Pubsub.subscribe("newCreatedTask", function (task) {
  taskListHandler.init(task);
});

// sends newList - publish if some module needs it

Pubsub.subscribe("taskListNeeded", function () {
  taskListHandler.publishList();
});

export default taskListHandler.init;
//SEND
//new ordered and added task list every time a task was edited or created
