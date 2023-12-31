const Pubsub = require("pubsub.js");

const taskCreator = {
  init: function (newTask) {
    this.formatNewTask(newTask);
  },
  formatNewTask: function (taskObject) {
    const newDate = `${taskObject.date.slice(8)}.${taskObject.date.slice(
      5,
      7
    )}.${taskObject.date.slice(0, 4)}`;

    let newTask;

    if (taskObject.prevName == undefined) {
      newTask = {
        name: taskObject.name,
        color: taskObject.color,
        notes: taskObject.notes,
        priority: taskObject.priority,
        project: taskObject.project,
        date: newDate,
      };
    } else if (taskObject.prevName !== undefined) {
      newTask = {
        name: taskObject.name,
        color: taskObject.color,
        notes: taskObject.notes,
        priority: taskObject.priority,
        project: taskObject.project,
        date: newDate,
        prevName: taskObject.prevName,
      };
    }

    this.sendNewCreatedTask(newTask);
  },
  sendNewCreatedTask: function (newTask) {
    Pubsub.publish("newCreatedTask", [newTask]);
  },
};

Pubsub.subscribe("newTask", function (newTask) {
  taskCreator.init(newTask);
});

export default taskCreator.init;
