import * as React from "react";
import * as TestUtils from "react-dom/test-utils";
import * as ReactShallowRenderer from "react-test-renderer/shallow";
import { Project } from "../store/project-store";
import ProjectDetails, { IProjectListProps } from "./project-details";

const project = Project.create({
    id: 0,
    name: "debugProject1"
});

describe("project-details", function () {
    let changeName: jasmine.Spy;
    let toggleActive: jasmine.Spy;
    let deleteProject: jasmine.Spy;

    beforeEach(function() {
        changeName = jasmine.createSpy("changeName");
        toggleActive = jasmine.createSpy("toggleActive");
        deleteProject = jasmine.createSpy("deleteProject");
    });

    it("should be created without any problem", function () {
        let projectDetails = TestUtils.renderIntoDocument(<ProjectDetails project={project} onChangeName={changeName} onToggleActive={toggleActive} onDeletion={deleteProject}></ProjectDetails>) as React.Component;
        expect(projectDetails).toBeDefined();
    });

    it("should be rendered without any problem", function () {
        let renderer = ReactShallowRenderer.createRenderer();
        renderer.render(<ProjectDetails project={project} onChangeName={changeName} onToggleActive={toggleActive} onDeletion={deleteProject}></ProjectDetails>);

        let result = renderer.getRenderOutput();
        expect(result).toBeDefined();
        expect(result.type).toMatch("li");
        expect((result.props.children[0] as React.ReactElement<any>).type).toMatch("span");
    });

    it("should show span on nonEditMode", function () {
        let projectDetails = TestUtils.renderIntoDocument(<ProjectDetails project={project} onChangeName={changeName} onToggleActive={toggleActive} onDeletion={deleteProject}></ProjectDetails>) as React.Component;
        let span = TestUtils.findRenderedDOMComponentWithTag(projectDetails, "span");
        let inputs = TestUtils.scryRenderedDOMComponentsWithTag(projectDetails, "input");

        expect(span).toBeDefined();
        expect(inputs.length).toEqual(0);
    });

    it("should show input on editMode", function () {
        let projectDetails = TestUtils.renderIntoDocument(<ProjectDetails project={project} onChangeName={changeName} onToggleActive={toggleActive} onDeletion={deleteProject}></ProjectDetails>) as React.Component;
        let buttons = TestUtils.scryRenderedDOMComponentsWithTag(projectDetails, "button");
        let editButton = buttons[0];

        TestUtils.Simulate.click(buttons[0]);

        let inputs = TestUtils.scryRenderedDOMComponentsWithTag(projectDetails, "input");
        expect(inputs.length).toBeGreaterThan(0);
    });

    it("should be able to delete a project", function () {
        let projectDetails = TestUtils.renderIntoDocument(<ProjectDetails project={project} onChangeName={changeName} onToggleActive={toggleActive} onDeletion={deleteProject}></ProjectDetails>) as React.Component;
        let buttons = TestUtils.scryRenderedDOMComponentsWithTag(projectDetails, "button");
        let deleteButton = buttons[1];

        TestUtils.Simulate.click(deleteButton);
        expect(deleteProject).toHaveBeenCalledTimes(1);
    });
});