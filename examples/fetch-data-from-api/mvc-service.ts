import { Express } from "express";
import * as path from "path";
import "vash";

import { HomeController } from "./controllers/home-controller";

import { ProjectApiController } from "./controllers/api/project-api-controller";

export class MvcService {
    constructor(private app: Express) { }

    addMVC(): void {
        this.initializeViews();
        this.initializeControllers();
        this.initializeApiControllers();
    }

    private initializeViews(): void {
        this.app.set("view engine", "vash");
        this.app.set("views", path.join(__dirname, "views"));
    }

    private initializeControllers(): void {
        this.app.use("/", new HomeController().setupRoute());
    }

    private initializeApiControllers(): void {
        this.app.use("/api/projects", new ProjectApiController().setupRoute());
    }
}