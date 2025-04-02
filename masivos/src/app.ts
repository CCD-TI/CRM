import express, { Application } from "express";
import cors from "cors";
import BotRouter from "./routes/Bot.routes";
import MasivosRouter from "./routes/Masivos.routes";
import LeadsRouter from "./routes/Leads.routes";
import FlowsRouter from "./routes/Flows.routes";
import AsignacionesRouter from "./routes/Asignaciones.routes";
import ReportsRouter from "./routes/Reports.routes";
import UsuariosRouter from "./routes/Usuarios.routes";
import ArchivoRouter from "./routes/Archivos.routes";
import SheetsRouter from "./routes/Sheets.routes";
import { SmsRouter } from "./routes/Sms.routes";
//import { Authorization } from "./middlewares/Authorization";
class App {
    private server: Application;
    constructor() {
      
      this.server = express();
      this.middlewares();
      this.routes();
    }
    private middlewares(): void {
     
      this.server.use(
        cors({
          origin: "*",
          methods: ["GET", "POST", "PUT", "DELETE"],
          allowedHeaders: ["Content-Type", "Authorization"]
        })
      );
      this.server.options("*", cors());
      this.server.use(express.json());
      
      //this.server.use("/documentation", swaggerUi.serve, swaggerUi.setup(swaggerSetup))
    }
    private routes(): void {
      // Configuración de rutas
      //this.server.use("", UserRoutes);
      this.server.use("/auth", UsuariosRouter);
      //this.server.use(Authorization);
      this.server.use("/bots",BotRouter);
      this.server.use("/masivos", MasivosRouter);
      this.server.use("/leads",  LeadsRouter);
      this.server.use("/flows",  FlowsRouter);
      this.server.use("/asignaciones",  AsignacionesRouter);
      this.server.use("/reports",  ReportsRouter);
      this.server.use("/archivos", ArchivoRouter);
      this.server.use("/sheets", SheetsRouter);
      this.server.use("/sms", SmsRouter);
    }
    public getServer(): Application {
      return this.server;
    }
  }
  
  export default new App().getServer();