import * as express from "express";
import { Controller } from "../controller";
import { IProject } from "../../models/project";

export class ProjectApiController extends Controller {
    setupRoute(): express.Router {
        this.router.get("/", this.getProjects);
        return this.router;
    }

    private getProjects(request: express.Request, response: express.Response): void {
        const mockProjects: IProject[] = [{
            id: 0,
            name: "debugProject1",
            isActive: true
        }, {
            id: 1,
            name: "debugProject2",
            isActive: false
        }, {
            id: 2,
            name: "debugProject3",
            isActive: false
        }, {
            id: 3,
            name: "debugProject4",
            isActive: true
        }, ];

        response.send(mockProjects);
    }
}