import * as React from "react";
import { observer } from "mobx-react";
import { observable } from "mobx";

import { IProject } from "../store/project-store";

export interface IProjectListProps {
    project: IProject
    onChangeName(id: number, newName: string): void;
    onToggleActive(id: number): void;
    onDeletion(id: number): void;
}

@observer
class ProjectDetails extends React.Component<IProjectListProps> {
    @observable private editMode: boolean = false;

    constructor(props){
        super(props);
        this.toggleEditMode = this.toggleEditMode.bind(this);
        this.getProjectForm = this.getProjectForm.bind(this);
    }

    toggleEditMode(): void {
        this.editMode = !this.editMode;
    }

    getProjectForm(project: IProject): JSX.Element {
        if (this.editMode) {
            return (
                <div>
                    <label>Project Name: <input type="text" value={project.name} onChange={(e) => this.props.onChangeName(project.id, e.target.value)} /></label>
                    <label>Project Status: <input type="checkbox" checked={project.isActive} onChange={(e) => this.props.onToggleActive(project.id)} /></label>
                </div>
            );
        }

        return (
            <span>{project.name} - {project.isActive ? "active" : "inactive"}</span>
        );
    }

    render(): JSX.Element {
        const { project } = this.props;
        return (
            <li>
                {this.getProjectForm(project)}
                <button type="button" onClick={this.toggleEditMode}>toggleEdit</button>
                <button type="button" onClick={(e) => this.props.onDeletion(project.id)}>delete</button>
            </li>
        );
    }
}

export default ProjectDetails;