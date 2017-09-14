import * as React from "react";
import { observer, inject } from "mobx-react";
import { observable } from "mobx";

import { IProject } from "../store/project-store";
import { IProjectStoreAction } from "../store/project-store-action";
import ProjectDetails from "./project-details";
import { IObservableArray } from "mobx";

export interface IProjectListProps {
    projects: IObservableArray<IProject>
    actions: IProjectStoreAction
}

@observer
class ProjectList extends React.Component<IProjectListProps> {
    @observable private newProject: IProject;

    constructor(props) {
        super(props);

        this.newProject = {
            id: -1,
            name: "",
            isActive: false
        } as IProject;

        this.deleteProject = this.deleteProject.bind(this);
        this.addProject = this.addProject.bind(this);
        this.changeName = this.changeName.bind(this);
        this.toggleActive = this.toggleActive.bind(this);
    }

    addProject(newProject: IProject): void {
        const { projects } = this.props;
        this.props.actions.addProject(newProject);
    }

    changeName(id: number, newName: string): void {
        const { projects } = this.props;
        this.props.actions.changeName(id, newName);
    }

    toggleActive(id: number): void {
        const { projects } = this.props;
        this.props.actions.toggleActive(id);
    }

    deleteProject(id: number): void {
        const { projects } = this.props;
        this.props.actions.deleteProject(id);
    }

    render() {
        const { projects } = this.props;
        return (
            <div>
                <ul>
                    {projects.map((project) => (<ProjectDetails key={project.id} project={project} onChangeName={this.changeName} onToggleActive={this.toggleActive} onDeletion={this.deleteProject}></ProjectDetails>))}
                </ul>
                <div>
                    <label>Project Name: <input name="newProjectNameInput" type="text" value={this.newProject.name} onChange={(e) => this.newProject.name = e.target.value} /></label>
                    <label>Project Status: <input name="newProjectStatusInput" type="checkbox" checked={this.newProject.isActive} onChange={(e) => this.newProject.isActive = !this.newProject.isActive} /></label>
                </div>
                <button name="addProjectButton" type="button" onClick={(e) => this.addProject(this.newProject)}>add project</button>
            </div>
        );
    }
}

export default ProjectList;