import * as React from "react";
import * as ReactShallowRenderer from "react-test-renderer/shallow";
import { asReduxStore, getSnapshot } from "mobx-state-tree";
import { IObservableArray } from "mobx";
import ProjectList, { IProjectListProps } from "./project-list";
import { ProjectStore, IProject } from "../store/project-store";
import TestUtilsExtended from "../lib/react-test-utils-extended";
import { IProjectStoreAction } from "../store/project-store-action";

function getProjectsFromStore(): IObservableArray<IProject> {
    let projectStore = ProjectStore.create({
        projects: [{
            id: 0,
            name: "debugProject1",
            isActive: true
        } as IProject]
    });

    const store = asReduxStore(projectStore);
    return getSnapshot(projectStore).projects;
};

const projectStoreActions = {
    addProject: jasmine.createSpy("addProject"),
    changeName: jasmine.createSpy("changeName"),
    deleteProject: jasmine.createSpy("deleteProject"),
    toggleActive: jasmine.createSpy("toggleActive")
}

describe("project-list", function () {
    it("should be created without any problem", function () {
        let projects = getProjectsFromStore();
        let projectList = TestUtilsExtended.renderIntoDocument(<ProjectList projects={projects} actions={projectStoreActions}></ProjectList>) as React.Component;
        expect(projectList).toBeDefined();
    });

    it("should display projects", function(){
        let projects = getProjectsFromStore();
        let projectList = TestUtilsExtended.renderIntoDocument(<ProjectList projects={projects} actions={projectStoreActions}></ProjectList>) as React.Component;
        let displayedProjects = TestUtilsExtended.scryRenderedDOMComponentsWithTag(projectList, "li");
        expect(displayedProjects.length).toEqual(projects.length);
    });

    it("should be able to add a project", function() {
        let projects = getProjectsFromStore();
        let projectList = TestUtilsExtended.renderIntoDocument(<ProjectList projects={projects} actions={projectStoreActions}></ProjectList>) as React.Component;
        let addButton = TestUtilsExtended.findRenderedDOMComponentsWithName(projectList, "addProjectButton");
        TestUtilsExtended.Simulate.click(addButton);
        expect(projectStoreActions.addProject).toHaveBeenCalledTimes(1);
    });
});