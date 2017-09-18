import * as React from "react";
import * as ReactDOM from "react-dom";
import App from "./app/app"
import { Provider } from "mobx-react";

import projectStore, { Project } from "./store/project-store";

const mainApp = (
    <Provider projectStore={projectStore}>
        <App></App>
    </Provider>
);

ReactDOM.render(
    mainApp,
    document.getElementById("app")
);