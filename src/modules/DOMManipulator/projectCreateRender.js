const Pubsub = require("pubsub.js");

const createEditProject = {
  init: function () {
    this.DOMCache();
    this.eventBindings();
  },
  DOMCache: function () {
    this.addProjectBtn = document.querySelector(".addProject");
    this.mainContainer = document.querySelector(".container");
    this.nameInput = document.querySelector(".projectNameInput");
    this.colorInput = document.querySelector(".projectColorInput");
    this.addProjectSbmtBtn = document.querySelector(".newProjectSbmtBtn");
  },
  eventBindings: function () {
    this.addProjectBtn.addEventListener("click", () => {
      this.renderProjectPopUp();
      this.getDataForProject();
      this.renderProjectPopUpClose();
    });
  },

  renderProjectPopUp: function () {
    const newProjectContainer = document.createElement("div");
    newProjectContainer.classList.add("newProjectContainer");

    const newProjectWindow = document.createElement("div");
    newProjectWindow.classList.add("newProjectWindow");

    const colorInput = document.createElement("input");
    colorInput.setAttribute("id", "color");
    colorInput.setAttribute("type", "color");
    colorInput.classList.add("projectColorInput");

    const nameInput = document.createElement("input");
    nameInput.setAttribute("placeholder", "Project Name...");
    nameInput.setAttribute("type", "text");
    nameInput.classList.add("projectNameInput");

    const newProjectSbmt = document.createElement("button");
    newProjectSbmt.innerText = "→";
    newProjectSbmt.classList.add("newProjectSbmtBtn");

    this.mainContainer.appendChild(newProjectContainer);
    newProjectContainer.appendChild(newProjectWindow);
    newProjectWindow.appendChild(colorInput);
    newProjectWindow.appendChild(nameInput);
    newProjectWindow.appendChild(newProjectSbmt);
  },

  renderProjectPopUpClose: function () {
    this.DOMCache();

    this.addProjectSbmtBtn.addEventListener("click", () => {
      this.mainContainer.removeChild(
        document.querySelector(".newProjectContainer")
      );
    });
  },
  getDataForProject: function () {
    this.DOMCache();

    this.addProjectSbmtBtn.addEventListener("click", () => {
      const project = {
        name: this.nameInput.value,
        color: this.colorInput.value,
      };

      this.sendDataForProject(project);
    });
  },
  sendDataForProject: function (project) {
    Pubsub.publish("newProject", [project]);
  },
};

export default createEditProject.init();

//  <div class="newProjectContainer">
// <div class="newProjectWindow">
//   <input id="color" type="color" name="" id="" />
//   <input placeholder="Project Name..." type="text" />
//   <button class="newTaskSubmit">→</button>
// </div>
