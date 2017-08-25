import * as React from "react";
import * as ReactDOM from "react-dom";
import App from "./app/app"
import { Provider } from "mobx-react";

import ProjectStore, { IProject } from "./store/project-store";

const projectStore = ProjectStore.create({
    projects: [{
        id: 0,
        name: "debugProject1",
        isActive: true
    } as IProject]
});

const mainApp = (
    <Provider projectStore={projectStore}>
        <App></App>
    </Provider>
);

ReactDOM.render(
    mainApp,
    document.getElementById("app")
);