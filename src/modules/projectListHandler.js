//RECIEVES
//new project data
//edit project data

const Pubsub = require("pubsub.js");

//DOES
//add new projects to the list
//edit projects in the List and sets new Values
//sort list based on lastly putted into the list

const projectListHandler = {
  projectList: [{ name: "test1", color: "green" }],

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

//SEND
//new ordered and added project list every time a project was edited or created

export default projectListHandler.init;

const provideList = projectListHandler.provideList();

export { provideList };
