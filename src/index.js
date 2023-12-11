import "./style.css";
import "./tasks.css";
import "./tasksPopUp.css";
import "./sidebar.css";

import projectCreateRender from "./modules/DOMManipulator/projectCreateRender";

const Pubsub = require("pubsub.js");

Pubsub.subscribe("newProject", function (project) {
  console.log(project);
});
