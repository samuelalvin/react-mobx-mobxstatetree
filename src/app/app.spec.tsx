import * as React from "react";
import * as TestUtils from "react-dom/test-utils";
import * as ReactShallowRenderer from "react-test-renderer/shallow";
import App from "./app";
import ProjectStore, { IProject } from "../store/projectstore";

const projectStore = ProjectStore.create({
    projects: [{
        id: 0,
        name: "debugProject1",
        isActive: true
    } as IProject]
});

describe("app", function () {
    it("should be created without any problem", function () {
        let app = TestUtils.renderIntoDocument(<App projectStore={projectStore}></App>) as React.Component;
        expect(app).toBeDefined();
    });

    it("should be rendered without any problem", function () {
        let renderer = ReactShallowRenderer.createRenderer();
        renderer.render(<App projectStore={projectStore}></App>);

        let result = renderer.getRenderOutput();
        expect(result).toBeDefined();
    });
});