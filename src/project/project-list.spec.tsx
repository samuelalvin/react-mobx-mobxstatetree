import * as React from "react";
import * as TestUtils from "react-dom/test-utils";
import * as ReactShallowRenderer from "react-test-renderer/shallow";
import ProjectList from "./project-list";
import ProjectStore, { IProject } from "../store/project-store";

const projectStore = ProjectStore.create({
    projects: [{
        id: 0,
        name: "debugProject1",
        isActive: true
    } as IProject]
});

describe("project-list", function () {
    it("should be created without any problem", function () {
        let app = TestUtils.renderIntoDocument(<ProjectList projectStore={projectStore}></ProjectList>) as React.Component;
        expect(app).toBeDefined();
    });

    it("should be rendered without any problem", function () {
        let renderer = ReactShallowRenderer.createRenderer();
        renderer.render(<ProjectList projectStore={projectStore}></ProjectList>);

        let result = renderer.getRenderOutput();
        expect(result).toBeDefined();
    });
});