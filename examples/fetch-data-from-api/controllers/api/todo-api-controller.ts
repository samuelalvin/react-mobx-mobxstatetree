import * as express from "express";
import { Controller } from "../controller";

export class TodoApiController extends Controller {
    setupRoute(): express.Router {
        this.router.get("/", this.getTodos);
        return this.router;
    }

    private getTodos(request: express.Request, response: express.Response): void {
        const mockTodos = [{
            id: 0,
            text: "a test todo"
        }];

        response.send(mockTodos);
    }
}