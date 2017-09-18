import * as express from "express";
import { Controller } from "./controller";

export class HomeController extends Controller {
    setupRoute(): express.Router {
        this.router.get("/", (request, response) => {
            response.render("home/index");
        });

        return this.router;
    }
}