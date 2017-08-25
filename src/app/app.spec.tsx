import * as React from "react";
import * as ReactShallowRenderer from "react-test-renderer/shallow";
import App from "./app";

describe("app", function () {
    it("should be rendered without any problem", function () {
        let renderer = ReactShallowRenderer.createRenderer();
        renderer.render(<App></App>);

        let result = renderer.getRenderOutput();
        expect(result).toBeDefined();
        expect(result.type).toMatch("div");
    });
});