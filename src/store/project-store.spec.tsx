import ProjectList from "../project/project-list";
import ProjectStore, { IProject } from "../store/project-store";

const initializeProjectStore = () => {
    return ProjectStore.create({
        projects: [{
            id: 0,
            name: "debugProject1",
            isActive: true
        } as IProject]
    });
};

describe("project-store", function () {
    it("should be initialized without any problem", function () {
        let projectStore = initializeProjectStore();
        expect(projectStore).toBeDefined();
        expect(projectStore.projects.length).toEqual(1);
        expect(projectStore.projects[0].name).toMatch("debugProject1");
    });

    it("should be able to add project", function () {
        let projectStore = initializeProjectStore();
        let newProject = {
            name: "debugProject2",
            isActive: true
        } as IProject;

        projectStore.addProject(newProject);
        expect(projectStore.projects.length).toEqual(2);
        expect(projectStore.projects[1].name).toMatch("debugProject2");
        expect(projectStore.projects[1].isActive).toBeTruthy();
    });

    it("should throw error on adding project with empty name", function () {
        let projectStore = initializeProjectStore();
        let newProject = {
            name: "",
            isActive: true
        } as IProject;

        expect(() => projectStore.addProject(newProject)).toThrowError();
    });

    it("should be able to delete project", function () {
        let projectStore = initializeProjectStore();
        projectStore.deleteProject(projectStore.projects[0].id);
        expect(projectStore.projects.length).toEqual(0);
    });

    it("should throw error on deleting nonexistant project", function () {
        let projectStore = initializeProjectStore();
        expect(() => projectStore.deleteProject(99)).toThrowError();
    });

    it("should be able to get unique id", function() {
        let projectStore = initializeProjectStore();
        let newProject = {
            name: "debugProject2",
            isActive: true
        } as IProject;

        projectStore.addProject(newProject);
        expect(projectStore.projects[0].id).toEqual(0);
        expect(projectStore.projects[1].id).toEqual(1);

        projectStore.deleteProject(projectStore.projects[1].id);
        projectStore.addProject(newProject);
        expect(projectStore.projects[0].id).toEqual(0);
        expect(projectStore.projects[1].id).toEqual(1);

        projectStore.deleteProject(projectStore.projects[0].id);
        projectStore.addProject(newProject);
        expect(projectStore.projects[0].id).toEqual(1);
        expect(projectStore.projects[1].id).toEqual(0);
    });

    it("should be able to change project name", function() {
        let projectStore = initializeProjectStore();
        projectStore.projects[0].changeName("debugProject2");
        expect(projectStore.projects[0].name).toEqual("debugProject2");
    });

    it("should throw error on changing project name to empty string", function() {
        let projectStore = initializeProjectStore();
        expect(() => projectStore.projects[0].changeName("")).toThrowError();
    });

    it("should be able to toggle project status", function() {
        let projectStore = initializeProjectStore();
        projectStore.projects[0].toggleActive();
        expect(projectStore.projects[0].isActive).toBeFalsy();

        projectStore.projects[0].toggleActive();
        expect(projectStore.projects[0].isActive).toBeTruthy();
    });
});