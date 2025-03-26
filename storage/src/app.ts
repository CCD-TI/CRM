import botCursoRoutes from "./modules/BotCurso/infraestruture/BotCurso.Routes";
import cursoRoutes from "./modules/Curso/infraestruture/Curso.Routes";
import express, { Application } from "express";
import cors from "cors";

class App {
    private server: Application;

    constructor() {
        this.server = express();
        this.middlewares();
        this.routes();
    }

    private middlewares(): void {
        this.server.use(cors());
        this.server.use(express.json());
    }

    private routes(): void {
        this.server.use("/bot-curso", botCursoRoutes);
        this.server.use("/curso", cursoRoutes);

    }

    public getServer(): Application {
        return this.server;
    }
}

export default new App().getServer();