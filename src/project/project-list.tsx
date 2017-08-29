import * as React from "react";
import { observer, inject } from "mobx-react";

import ProjectStore, { IProjectStore } from "../store/project-store";
import ProjectDetails from "./project-details";

export interface IProjectListProps {
    projectStore?: IProjectStore
}

@inject("projectStore")
@observer
class ProjectList extends React.Component<IProjectListProps> {
    render() {
        const { projectStore } = this.props;
        return (
            <ul>
                {projectStore.projects.map((project) => (<ProjectDetails key={project.id} project={project}></ProjectDetails>))}
            </ul>
        );
    }
}

export default ProjectList;