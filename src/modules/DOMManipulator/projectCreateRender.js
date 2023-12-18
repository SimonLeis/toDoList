const Pubsub = require("pubsub.js");

const projectCreateRenderer = {
  init: function () {
    this.eventBinding();
  },
  eventBinding: function () {
    this.renderPopUpWindow();
    this.getProjectData();
  },
  renderPopUpWindow() {
    document.addEventListener("click", (e) => {
      if (e.target.classList.contains("addProject")) {
        const newProjectContainer = document.createElement("div");
        newProjectContainer.classList.add("newProjectContainer");

        const newProjectWindow = document.createElement("div");
        newProjectWindow.classList.add("newProjectWindow");

        const colorInput = document.createElement("input");
        colorInput.setAttribute("type", "color");
        colorInput.setAttribute("name", "projectColor");

        const nameInput = document.createElement("input");
        nameInput.setAttribute("placeholder", "Project Name...");
        nameInput.setAttribute("type", "text");

        const sbmtBtn = document.createElement("button");
        sbmtBtn.classList.add("newTaskSubmit");
        sbmtBtn.innerText = "→";

        document.querySelector(".container").append(newProjectContainer);
        newProjectContainer.append(newProjectWindow);
        newProjectWindow.append(colorInput);
        newProjectWindow.append(nameInput);
        newProjectWindow.append(sbmtBtn);
      }
    });
  },
  getProjectData: function () {
    document.addEventListener("click", (e) => {
      if (e.target.classList.contains("newTaskSubmit")) {
        const newProject = {
          name: document.querySelector(".newProjectWindow > input[type='text'")
            .value,
          color: document.querySelector(
            ".newProjectWindow > input[type='color'"
          ).value,
        };
        this.closePopUpWindow();
        this.sendNewProject(newProject);
      }
    });
  },

  closePopUpWindow: function () {
    document
      .querySelector(".container")
      .removeChild(document.querySelector(".newProjectContainer"));
  },
  sendNewProject: function (newProject) {
    Pubsub.publish("newProject", [newProject]);
  },
};
export default projectCreateRenderer.init();
