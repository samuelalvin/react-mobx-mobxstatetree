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
    it("should be created without any problem", function () {
        let projectDetails = TestUtils.renderIntoDocument(<ProjectDetails project={project}></ProjectDetails>) as React.Component;
        expect(projectDetails).toBeDefined();
    });
    
    it("should be rendered without any problem", function () {
        let renderer = ReactShallowRenderer.createRenderer();
        renderer.render(<ProjectDetails project={project}></ProjectDetails>);

        let result = renderer.getRenderOutput();
        expect(result).toBeDefined();
        expect(result.type).toMatch("li");
    });
});