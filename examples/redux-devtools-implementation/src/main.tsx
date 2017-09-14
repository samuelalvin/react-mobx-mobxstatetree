import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import * as RemoteDev from "remotedev";
import { asReduxStore, connectReduxDevtools } from "mobx-state-tree";
import AppContainer from "./app/app-container";
import projectStore, { Project } from "./store/project-store";

const store = asReduxStore(projectStore);
connectReduxDevtools(RemoteDev, projectStore);

const mainApp = (
    <Provider store={store}>
        <AppContainer></AppContainer>
    </Provider>
);

ReactDOM.render(
    mainApp,
    document.getElementById("app")
);