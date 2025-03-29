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
        this.server.use((req:any, res: any, next: any) => {
            console.log(`Ruta: ${req.method} ${req.path}`);
            console.log('Body:', req.body);
            next();
        });
        
    }

    private routes(): void {
        // this.server.use("/api/usuarios", UsuarioRoutes);
        this.server.use("/campana", CampanaRouter);
        this.server.use("/leads", LeadRouter);
        this.server.use("/formulario", FormularioRouter);
        this.server.use("/pagina", PaginaRouter);
    }

    public getServer(): Application {
        return this.server;
    }
}

export default new App().getServer();