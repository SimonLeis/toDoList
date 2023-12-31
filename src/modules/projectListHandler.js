const Pubsub = require("pubsub.js");

const projectListHandler = {
  projectList: [],

  init: function (newProject) {
    this.addNewProject(newProject);
  },
  addNewProject: function (project) {
    this.projectList.push(project);
    this.sendNewProjectList();
  },
  sendNewProjectList: function () {
    Pubsub.publish("newProjectList", [this.projectList]);
  },
  provideList: function () {
    return this.projectList;
  },
};

Pubsub.subscribe("newProject", function (data) {
  projectListHandler.init(data);
});
Pubsub.subscribe("projectListNeeded", projectListHandler.sendNewProjectList());

export default projectListHandler.init;

const provideProjectList = projectListHandler.provideList();

// provides list to solve a problem in the pub-sub.js file

export { provideProjectList };
