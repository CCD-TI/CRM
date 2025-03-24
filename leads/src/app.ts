import express, { Application } from "express";
import cors from "cors";
import CampanaRouter from "@Campana/infraestructure/Campana.routes";
import LeadRouter from "@Leads/infraestructure/Lead.routes";
import FormularioRouter from "@Formulario/infraestructure/Formulario.routes";
import PaginaRouter from "@Pagina/infraestructure/Pagina.routes";

// import UsuarioRoutes from "@Usuario/infrastructure/UsuarioRoutes";

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
        // this.server.use("/api/usuarios", UsuarioRoutes);
        this.server.use("/api/campana", CampanaRouter);
        this.server.use("/api/leads", LeadRouter);
        this.server.use("/api/formulario", FormularioRouter);
        this.server.use("/api/pagina", PaginaRouter);
    }

    public getServer(): Application {
        return this.server;
    }
}

export default new App().getServer();