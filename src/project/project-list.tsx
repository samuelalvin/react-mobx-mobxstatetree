import * as React from "react";
import { observer, inject } from "mobx-react";

import ProjectStore, { IProjectStore, Project, IProject } from "../store/project-store";
import ProjectDetails from "./project-details";

export interface IProjectListProps {
    projectStore?: IProjectStore
}

@inject("projectStore")
@observer
class ProjectList extends React.Component<IProjectListProps> {
    private newProject: IProject;

    constructor(props) {
        super(props);

        this.newProject = Project.create({
            id: -1,
            name: ""
        });

        this.deleteProject = this.deleteProject.bind(this);
        this.addProject = this.addProject.bind(this);
    }

    addProject(newProject: IProject): void {
        const { projectStore } = this.props;
        projectStore.addProject(newProject);
    }

    deleteProject(id: number): void {
        const { projectStore } = this.props;
        projectStore.deleteProject(id);
    }

    render() {
        const { projectStore } = this.props;
        return (
            <div>
                <ul>
                    {projectStore.projects.map((project) => (<ProjectDetails key={project.id} project={project} onDeletion={this.deleteProject}></ProjectDetails>))}
                </ul>
                <div>
                    <label>Project Name: <input name="newProjectNameInput" type="text" value={this.newProject.name} onChange={(e) => this.newProject.changeName(e.target.value)} /></label>
                    <label>Project Status: <input name="newProjectStatusInput" type="checkbox" checked={this.newProject.isActive} onChange={(e) => this.newProject.toggleActive()} /></label>
                </div>
                <button name="addProjectButton" type="button" onClick={(e) => this.addProject(this.newProject)}>add project</button>
            </div>
        );
    }
}

export default ProjectList;