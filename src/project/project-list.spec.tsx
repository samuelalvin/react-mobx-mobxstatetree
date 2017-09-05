import * as React from "react";
import * as ReactShallowRenderer from "react-test-renderer/shallow";
import ProjectList, { IProjectListProps } from "./project-list";
import { ProjectStore, IProjectStore, IProject } from "../store/project-store";
import TestUtilsExtended from "../lib/react-test-utils-extended";

function initializeProjectStore(): IProjectStore {
    return ProjectStore.create({
        projects: [{
            id: 0,
            name: "debugProject1",
            isActive: true
        } as IProject]
    });
};

describe("project-list", function () {
    it("should be created without any problem", function () {
        let projectStore = initializeProjectStore();
        let projectList = TestUtilsExtended.renderIntoDocument(<ProjectList projectStore={projectStore}></ProjectList>) as React.Component;
        expect(projectList).toBeDefined();
    });

    it("should display projects", function(){
        let projectStore = initializeProjectStore();
        let projectList = TestUtilsExtended.renderIntoDocument(<ProjectList projectStore={projectStore}></ProjectList>) as React.Component;
        let projects = TestUtilsExtended.scryRenderedDOMComponentsWithTag(projectList, "li");
        expect(projects.length).toEqual(projectStore.projects.length);
    });

    it("should be able to add a project", function() {
        let projectStore = initializeProjectStore();
        let projectList = TestUtilsExtended.renderIntoDocument(<ProjectList projectStore={projectStore}></ProjectList>) as React.Component;
        let nameInput = TestUtilsExtended.findRenderedDOMComponentsWithName(projectList, "newProjectNameInput");
        let checkBoxInput = TestUtilsExtended.findRenderedDOMComponentsWithName(projectList, "newProjectStatusInput");
        let addButton = TestUtilsExtended.findRenderedDOMComponentsWithName(projectList, "addProjectButton");
        let projects = TestUtilsExtended.scryRenderedDOMComponentsWithTag(projectList, "li");
        expect(projects.length).toEqual(1);

        TestUtilsExtended.Simulate.change(nameInput, {
            target: {
                value : "debugProject2"
            }
        } as any);
        TestUtilsExtended.Simulate.click(addButton);

        projects = TestUtilsExtended.scryRenderedDOMComponentsWithTag(projectList, "li");
        expect(projects.length).toEqual(2);
    });
});