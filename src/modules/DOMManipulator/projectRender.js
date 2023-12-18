import { render } from "sass";

const Pubsub = require("pubsub.js");

//RECIEVES
//project-list

//DOES
//render the project into the DOM in the correct order by the given list

const projectRender = {
  init: function () {
    this.getProjectList();
  },
  getProjectList: function () {
    Pubsub.publish("projectListNeeded", []);
    Pubsub.subscribe("newProjectList", function (data) {
      projectRender.renderProjectList(data);
    });
  },
  renderProjectList: function (newProject) {
    document.querySelectorAll(".project").forEach((element) => {
      element.parentElement.removeChild(element);
    });
    newProject.forEach((element) => {
      this.createSingleProject(element);
    });
  },
  createSingleProject: function (projectData) {
    const projectContainer = document.createElement("div");
    projectContainer.classList.add("project");

    const color = document.createElement("span");
    color.style.backgroundColor = projectData.color;

    const name = document.createElement("p");
    name.innerText = projectData.name;

    projectContainer.append(color);
    projectContainer.append(name);

    document.querySelector(".customProjects").prepend(projectContainer);
  },
};

//SENDS
//nothing

export default projectRender.init();
