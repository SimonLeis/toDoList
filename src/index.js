import "./style.css";
import "./tasks.css";
import "./tasksPopUp.css";
import "./sidebar.css";

import taskListHandler from "./modules/taskListHandler";
import taskRender from "./modules/DOMManipulator/taskRender";
import projectRender from "./modules/DOMManipulator/projectRender";
import projectListHandler from "./modules/projectListHandler";
import taskCreateRender from "./modules/DOMManipulator/taskCreateRender.js";
import taskCreator from "./modules/taskCreator.js";

const Pubsub = require("pubsub.js");

// if new Task gets created

// newCreatedTask

// if new Task gets added

// newTask

// if newList is avaiable sends it to modules

// newTaskList

// if new Project is available send it to project list handler

// newProject

// if list is needed than this provides that newList gets puplished

// taskListNeeded

//newProjectList
//projectListNeeded
