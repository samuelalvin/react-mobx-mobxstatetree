import * as http from "http";
import * as express from "express";
import { MvcService } from "./mvc-service";

class Startup {
    readonly app: express.Express;

    constructor() {
        this.app = express();
        this.configureServices();
        this.configureApp();
    }

    private configureServices() {
        const mvcService = new MvcService(this.app);
        mvcService.addMVC();
    }

    private configureApp() {
        this.app.use(express.static("wwwroot"));
    }
}

const startup = new Startup();
const server = http.createServer(startup.app);
server.listen(3000);