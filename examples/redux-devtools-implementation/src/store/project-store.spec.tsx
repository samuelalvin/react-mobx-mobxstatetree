// TODO: refactor project-store.spec

import { IObservableArray } from "mobx";
import { asReduxStore, getSnapshot } from "mobx-state-tree";
import * as types from "./project-store-action-type";
import ProjectList from "../project/project-list";
import { ProjectStore, IProject } from "../store/project-store";

function callProjectStoreAction(action): IObservableArray<IProject> {
    let projectStore = ProjectStore.create({
        projects: [{
            id: 0,
            name: "debugProject1",
            isActive: true
        } as IProject]
    });

    let store = asReduxStore(projectStore);
    if (action.type) {
        store.dispatch(action);
    }

    return getSnapshot(projectStore).projects;
};

describe("project-store", function () {
    it("should be initialized without any problem", function () {
        let projects = callProjectStoreAction({});
        expect(projects).toBeDefined();
        expect(projects.length).toEqual(1);
        expect(projects[0].name).toMatch("debugProject1");
    });

    it("should be able to add project", function () {
        let newProject = {
            name: "debugProject2",
            isActive: true
        } as IProject;

        let projects = callProjectStoreAction(
            { type: types.ADD_PROJECT, newProject }
        );

        expect(projects.length).toEqual(2);
        expect(projects[1].name).toMatch("debugProject2");
        expect(projects[1].isActive).toBeTruthy();
    });

    it("should throw error on adding project with empty name", function () {
        let newProject = {
            name: "",
            isActive: true
        } as IProject;

        expect(() => callProjectStoreAction({ type: types.ADD_PROJECT, newProject })).toThrowError();
    });

    it("should be able to delete project", function () {
        let projects = callProjectStoreAction(
            { type: types.DELETE_PROJECT, id: 0 }
        );

        expect(projects.length).toEqual(0);
    });

    it("should throw error on deleting nonexistant project", function () {
        expect(() => callProjectStoreAction({ type: types.DELETE_PROJECT, id: 99 })).toThrowError();
    });

    // it("should be able to get unique id", function() {
    //     let projectStore = initializeProjectStore();
    //     let newProject = {
    //         name: "debugProject2",
    //         isActive: true
    //     } as IProject;

    //     projectStore.addProject(newProject);
    //     expect(projectStore.projects[0].id).toEqual(0);
    //     expect(projectStore.projects[1].id).toEqual(1);

    //     projectStore.deleteProject(projectStore.projects[1].id);
    //     projectStore.addProject(newProject);
    //     expect(projectStore.projects[0].id).toEqual(0);
    //     expect(projectStore.projects[1].id).toEqual(1);

    //     projectStore.deleteProject(projectStore.projects[0].id);
    //     projectStore.addProject(newProject);
    //     expect(projectStore.projects[0].id).toEqual(1);
    //     expect(projectStore.projects[1].id).toEqual(0);
    // });

    it("should be able to change project name", function() {
        let projects = callProjectStoreAction(
            { type: types.CHANGE_NAME, id: 0, newName: "debugProject2" }
        );

        expect(projects[0].name).toEqual("debugProject2");
    });

    it("should throw error on changing project name to empty string", function() {
        expect(() => callProjectStoreAction({ type: types.CHANGE_NAME, id: 0, newName: "" })).toThrowError();
    });

    it("should be able to toggle project status", function() {
        let projects = callProjectStoreAction(
            { type: types.TOGGLE_ACTIVE, id: 0, newName: "debugProject2" }
        );

        expect(projects[0].isActive).toBeFalsy();
    });
});