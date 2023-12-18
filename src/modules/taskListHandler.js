const Pubsub = require("pubsub.js");

const taskListHandler = {
  taskList: [],

  init: function (task) {
    if (task.prevName == undefined) {
      taskListHandler.addTask(task);
    } else if (task.prevName !== undefined) {
      this.editTask(task);
    }
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
  deleteTask: function (taskName) {
    const taskToDelete = this.taskList.filter((element) => {
      if ((element.name = taskName)) {
        return element;
      }
    });

    this.taskList.splice(this.taskList.indexOf(taskToDelete, 1));

    this.publishList();
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

Pubsub.subscribe("deleteTask", function (taskName) {
  taskListHandler.deleteTask(taskName);
});

export default taskListHandler.init;
//SEND
//new ordered and added task list every time a task was edited or created
