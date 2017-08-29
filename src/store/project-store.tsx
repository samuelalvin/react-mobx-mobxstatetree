import { IObservableArray } from "mobx";
import { types } from "mobx-state-tree";

export const Project = types.model("Project", {
    id: types.number,
    name: types.string,
    isActive: types.optional(types.boolean, false)
}).actions((self) => ({
    changeName(newName: string) {
        if (!newName || newName.length == 0) {
            throw new Error("Project Model Action Error: new name should not be empty");
        }

        self.name = newName;
    },

    toggleActive() {
        self.isActive = !self.isActive;
    }
}));

const ProjectStore = types.model("ProjectStore", {
    projects: types.array(Project)
}).actions((self) => ({
    addProject(newProject: typeof Project.Type) {
        if (!newProject.name || newProject.name.length == 0) {
            throw new Error("ProjectStore Model Action Error: new project name should not be empty");
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
            throw new Error("ProjectStore Model Action Error: project not found");
        }

        self.projects.splice(index, 1);
    }
}));

const getUniqueProjectId = (projects: IObservableArray<typeof Project.Type>) => {
    let id = 0;
    projects.map(project => project.id).forEach((currentId, currentIndex) => {
        if (currentId != currentIndex) {
            id = currentIndex;
        }
    });

    if (projects.find(project => project.id == id)) {
        id = projects.length;
    }

    return id;
};

export type IProject = typeof Project.Type;

export type IProjectStore = typeof ProjectStore.Type;

export default ProjectStore;