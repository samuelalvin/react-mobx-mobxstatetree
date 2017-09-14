// TODO: Refactor app-container

import * as React from "react";
import * as PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import ProjectList from "../project/project-list";
import { addProject, changeName, deleteProject, toggleActive, IProjectStoreAction } from "../store/project-store-action";
import { IProject } from "../store/project-store";
import { IObservableArray } from "mobx";

interface IAppProps {
    projects: IObservableArray<IProject>,
    actions: IProjectStoreAction
}

class AppContainer extends React.Component<IAppProps> {
    static propTypes = {
        projects: PropTypes.array.isRequired,
        actions: PropTypes.object.isRequired
    }

    render() {
        return (
            <div>
                <h1>Project List</h1>
                <ProjectList projects={this.props.projects} actions={this.props.actions}></ProjectList>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    projects: state.projects
})
  
const ProjectStoreActions = {
    addProject,
    changeName,
    deleteProject,
    toggleActive
}

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(ProjectStoreActions, dispatch)
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(AppContainer)