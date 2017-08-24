import * as React from "react";
import { observer, inject } from "mobx-react";

import ProjectStore, { IProject } from "../store/projectstore";

interface IAppProps {
    projectStore?: typeof ProjectStore.Type
}

@inject("projectStore")
@observer
class App extends React.Component<IAppProps> {
    render() {
        const { projectStore } = this.props;
        return (
            <div>
                <h1>Project List</h1>
                <ul>
                    {projectStore.projects.map((project) => (<li>{project.name} - {project.isActive ? "active" : "inactive"}</li>))}
                </ul>
            </div>
        );
    }
}

export default App;