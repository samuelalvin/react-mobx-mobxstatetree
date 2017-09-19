import { IObservableArray } from "mobx";
import { types } from "mobx-state-tree";
import * as fetch from "isomorphic-fetch";

export const Project = types.model("Project", {
    id: types.number,
    name: types.string,
    isActive: types.optional(types.boolean, false)
}).actions((self) => ({
    changeName(newName: string): void {
        if (!newName || newName.length == 0) {
            throw new Error("Project Model Action Error: new name should not be empty");
        }

        self.name = newName;
    },

    toggleActive(): void {
        self.isActive = !self.isActive;
    }
}));

export const ProjectStore = types.model("ProjectStore", {
    projects: types.array(Project)
}).actions((self) => ({
    async getProjects(): Promise<IObservableArray<IProject>> {
        let response = await fetch("/api/projects");
        let projects = await response.json() as IObservableArray<IProject>;
        return (self as IProjectStore).loadProjects(projects);
    },

    loadProjects(projects: IObservableArray<IProject>): IObservableArray<IProject> {
        self.projects = projects;
        return self.projects;
    },

    addProject(newProject: IProject): void {
        if (!newProject.name || newProject.name.length == 0) {
            throw new Error("ProjectStore Model Action Error: new project name should not be empty");
        }

        let id = getUniqueProjectId(self.projects);
        self.projects.push({
            id: id,
            name: newProject.name,
            isActive: newProject.isActive
        } as IProject);
    },

    deleteProject(id: number): void {
        let index = self.projects.findIndex(project => project.id == id);
        if (index == -1) {
            throw new Error("ProjectStore Model Action Error: project not found");
        }

        self.projects.splice(index, 1);
    }
}));

function getUniqueProjectId (projects: IObservableArray<IProject>): number {
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

const projectStore = ProjectStore.create({
    projects: [{
        id: 0,
        name: "debugProject1",
        isActive: true
    } as IProject]
});

export default projectStore;