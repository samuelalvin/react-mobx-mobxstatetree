import * as React from "react";
import { observer, inject } from "mobx-react";

import ProjectStore from "../store/project-store";

interface IProjectListProps {
    projectStore?: typeof ProjectStore.Type
}

@inject("projectStore")
@observer
class ProjectList extends React.Component<IProjectListProps> {
    render() {
        const { projectStore } = this.props;
        return (
            <ul>
                {projectStore.projects.map((project) => (<li key={project.id}>{project.name} - {project.isActive ? "active" : "inactive"}</li>))}
            </ul>
        );
    }
}

export default ProjectList;