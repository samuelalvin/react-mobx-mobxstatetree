import * as React from "react";
import { observer } from "mobx-react";

import { Project } from "../store/project-store";

export interface IProjectListProps {
    project: typeof Project.Type
}

@observer
class ProjectDetails extends React.Component<IProjectListProps> {
    render() {
        const { project } = this.props;
        return (
            <li>{project.name} - {project.isActive ? "active" : "inactive"}</li>
        );
    }
}

export default ProjectDetails;