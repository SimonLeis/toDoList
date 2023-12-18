import { SassColor } from "sass";

const Pubsub = require("pubsub.js");
//RECIEVES
//task-data

//DOES
//creates new task wiht .name as identifier
//or if prevName is not "" than send clarify it as a set item)

const taskCreator = {
  init: function (newTask) {
    this.formatNewTask(newTask);
  },
  formatNewTask: function (taskObject) {
    const newDate = `${taskObject.date.slice(8)}.${taskObject.date.slice(
      5,
      7
    )}.${taskObject.date.slice(0, 4)}`;

    const newTask = {
      name: taskObject.name,
      color: taskObject.color,
      notes: taskObject.notes,
      priority: taskObject.priority,
      project: taskObject.project,
      date: newDate,
    };
    console.log(newTask);
  },
};

//SEND
// task object to list-handler

Pubsub.subscribe("newTask", function (newTask) {
  taskCreator.init(newTask);
});

export default taskCreator.init;
