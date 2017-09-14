// TODO: Refactor project-store

import { IObservableArray } from "mobx";
import { types } from "mobx-state-tree";
import { ADD_PROJECT, DELETE_PROJECT, CHANGE_NAME, TOGGLE_ACTIVE } from "./project-store-action-type";

export const Project = types.model("Project", {
    id: types.number,
    name: types.string,
    isActive: types.optional(types.boolean, false)
});

export const ProjectStore = types.model("ProjectStore", {
    projects: types.array(Project)
}).actions((self) => ({
    [ADD_PROJECT]({newProject}): void {
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

    [DELETE_PROJECT]({id}): void {
        let index = self.projects.findIndex(project => project.id == id);
        if (index == -1) {
            throw new Error("ProjectStore Model Action Error: project not found");
        }

        self.projects.splice(index, 1);
    },

    [CHANGE_NAME]({id, newName}): void {
        if (self.projects.findIndex(project => project.id == id) == -1) {
            throw new Error("ProjectStore Model Action Error: project not found");
        }
        
        if (!newName || newName.length == 0) {
            throw new Error("Project Model Action Error: new name should not be empty");
        }

        self.projects[id].name = newName;
    },

    [TOGGLE_ACTIVE]({id}): void {
        if (self.projects.findIndex(project => project.id == id) == -1) {
            throw new Error("ProjectStore Model Action Error: project not found");
        }

        self.projects[id].isActive = !self.projects[id].isActive;
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
    } as typeof Project.Type]
});

export default projectStore;