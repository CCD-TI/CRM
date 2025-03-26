"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const Bot_routes_1 = __importDefault(require("./routes/Bot.routes"));
const Masivos_routes_1 = __importDefault(require("./routes/Masivos.routes"));
const Leads_routes_1 = __importDefault(require("./routes/Leads.routes"));
const Flows_routes_1 = __importDefault(require("./routes/Flows.routes"));
const Asignaciones_routes_1 = __importDefault(require("./routes/Asignaciones.routes"));
const Reports_routes_1 = __importDefault(require("./routes/Reports.routes"));
const Usuarios_routes_1 = __importDefault(require("./routes/Usuarios.routes"));
const Archivos_routes_1 = __importDefault(require("./routes/Archivos.routes"));
const Sheets_routes_1 = __importDefault(require("./routes/Sheets.routes"));
//import { Authorization } from "./middlewares/Authorization";
class App {
    constructor() {
        this.server = (0, express_1.default)();
        this.middlewares();
        this.routes();
    }
    middlewares() {
        this.server.use((req, _res, next) => {
            console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
            console.log('Headers:', req.headers);
            console.log('Body:', req);
            next();
        });
        this.server.use((0, cors_1.default)({
            origin: "*",
            methods: ["GET", "POST", "PUT", "DELETE"],
            allowedHeaders: ["Content-Type", "Authorization"]
        }));
        this.server.options("*", (0, cors_1.default)());
        this.server.use(express_1.default.json());
        //this.server.use("/documentation", swaggerUi.serve, swaggerUi.setup(swaggerSetup))
    }
    routes() {
        // Configuración de rutas
        //this.server.use("", UserRoutes);
        this.server.use("/auth", Usuarios_routes_1.default);
        //this.server.use(Authorization);
        this.server.use("/bots", Bot_routes_1.default);
        this.server.use("/masivos", Masivos_routes_1.default);
        this.server.use("/leads", Leads_routes_1.default);
        this.server.use("/flows", Flows_routes_1.default);
        this.server.use("/asignaciones", Asignaciones_routes_1.default);
        this.server.use("/reports", Reports_routes_1.default);
        this.server.use("/archivos", Archivos_routes_1.default);
        this.server.use("/sheets", Sheets_routes_1.default);
    }
    getServer() {
        return this.server;
    }
}
exports.default = new App().getServer();
