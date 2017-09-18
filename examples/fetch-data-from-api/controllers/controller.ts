import * as express from "express";

export abstract class Controller {
    protected router: express.Router;

    constructor() {
        this.router = express.Router();
    }

    abstract setupRoute(): express.Router;
}