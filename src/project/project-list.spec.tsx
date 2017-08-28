import * as React from "react";
import * as TestUtils from "react-dom/test-utils";
import * as ReactShallowRenderer from "react-test-renderer/shallow";
import ProjectList, { IProjectListProps } from "./project-list";
import ProjectStore, { Project } from "../store/project-store";

const projectStore = ProjectStore.create({
    projects: [{
        id: 0,
        name: "debugProject1",
        isActive: true
    } as typeof Project.Type]
});

describe("project-list", function () {
    it("should be created without any problem", function () {
        let projectList = TestUtils.renderIntoDocument(<ProjectList projectStore={projectStore}></ProjectList>) as React.Component;
        expect(projectList).toBeDefined();
    });

    it("should be rendered without any problem", function () {
        let renderer = ReactShallowRenderer.createRenderer();
        renderer.render(<ProjectList projectStore={projectStore}></ProjectList>);

        let result = renderer.getRenderOutput();
        expect(result).toBeDefined();
        expect(result.type).toMatch("ul");
    });

    it("should display projects", function(){
        let projectList = TestUtils.renderIntoDocument(<ProjectList projectStore={projectStore}></ProjectList>) as React.Component;
        var projects = TestUtils.scryRenderedDOMComponentsWithTag(projectList, "li");
        console.log(projects[0].children);
        expect(projects.length).toEqual(projectStore.projects.length);
    });
});