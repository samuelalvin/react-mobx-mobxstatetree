import { IObservableArray } from "mobx";
import { types } from "mobx-state-tree";

export interface IProject {
    id: number,
    name: string,
    isActive: boolean
}

export const Project = types.model("Project", {
    id: types.number,
    name: types.string,
    isActive: types.optional(types.boolean, false)
}).actions((self) => ({
    changeName(newName: string) {
        if (!newName || newName.length == 0) {
            alert("Project Model Action Error: new name should not be empty");
            return;
        }

        self.name = newName;
    },

    toggleActive() {
        self.isActive = !self.isActive;
    }
}));
const getUniqueProjectId = (projects: IObservableArray<typeof Project.Type>) => {
    let id = projects
    .map(project => project.id)
    .reduce((previousId, currentId, currentIndex) => {
        if (currentId == currentIndex) {
            return previousId;
        } else {
            return currentIndex;
        }
    });

    if (projects.find(project => project.id == id)) {
        id = projects.length;
    }

    return id;
};
const ProjectStore = types.model("ProjectStore", {
    projects: types.array(Project)
}).actions((self) => ({
    addProject(newProject: IProject) {
        if (!newProject.name || newProject.name.length == 0) {
            alert("ProjectStore Model Action Error: new project name should not be empty");
            return;
        }

        let id = getUniqueProjectId(self.projects);
        self.projects.push({
            id: id,
            name: newProject.name,
            isActive: newProject.isActive
        } as typeof Project.Type);
    },

    deleteProject(id: number) {
        let index = self.projects.findIndex(project => project.id == id);
        if (index == -1) {
            alert("ProjectStore Model Action Error: project not found");
            return;
        }

        self.projects.splice(index, 1);
    }
}));

export default ProjectStore;