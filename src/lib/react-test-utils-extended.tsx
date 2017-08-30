import * as TestUtils from "react-dom/test-utils";
import * as ReactDOM from "react-dom";

type ITestUtils = typeof TestUtils;

interface ITestUtilsExtended extends ITestUtils {
    /**
     * Finds a DOM element of components in the rendered tree that are
     * DOM components with the DOM element name matching `elementName`. Returns undefined if no element matches `elementName`.
     */
    findRenderedDOMComponentsWithName?(tree: React.Component<any, {}>, elementName: string): React.ReactInstance;

    /**
     * Finds all DOM elements of components in the rendered tree that are
     * DOM components with the DOM element name matching `elementName`.
     */
    scryRenderedDOMComponentsWithName?(tree: React.Component<any, {}>, elementName: string): React.ReactInstance[];
}

var TestUtilsExtended = TestUtils as ITestUtilsExtended;

TestUtilsExtended.findRenderedDOMComponentsWithName = function (tree, elementName) {
    return TestUtils.findAllInRenderedTree(tree, function (inst) {
        return TestUtils.isDOMComponent(inst) && inst.getAttribute("name") == elementName;
    })[0];
}

TestUtilsExtended.scryRenderedDOMComponentsWithName = function (tree, elementName) {
    return TestUtils.findAllInRenderedTree(tree, function (inst) {
        return TestUtils.isDOMComponent(inst) && inst.getAttribute("name") == elementName;
    });
}

export default TestUtilsExtended;