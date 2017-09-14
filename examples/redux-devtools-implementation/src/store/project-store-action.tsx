// TODO: Refactor project-store-action

import * as types from "./project-store-action-type";
import { IProject } from "./project-store";

export const addProject = (newProject: IProject) => ({ type: types.ADD_PROJECT, newProject: newProject });
export const deleteProject = (id: number) => ({ type: types.DELETE_PROJECT, id });
export const changeName = (id: number, newName: string) => ({ type: types.CHANGE_NAME, id, newName });
export const toggleActive = (id: number) => ({ type: types.TOGGLE_ACTIVE, id });

export interface IProjectStoreAction {
    addProject: (newProject: IProject) => void,
    deleteProject: (id: number) => void,
    changeName: (id: number, newName: string) => void,
    toggleActive: (id: number) => void
}