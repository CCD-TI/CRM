"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BotCurso_Routes_1 = __importDefault(require("./modules/BotCurso/infraestruture/BotCurso.Routes"));
const Curso_Routes_1 = __importDefault(require("./modules/Curso/infraestruture/Curso.Routes"));
const Course_Routes_1 = __importDefault(require("./modules/Course/infraestructure/Course.Routes"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
class App {
    constructor() {
        this.server = (0, express_1.default)();
        this.middlewares();
        this.routes();
    }
    middlewares() {
        this.server.use((0, cors_1.default)());
        this.server.use(express_1.default.json());
    }
    routes() {
        this.server.use("/bot-curso", BotCurso_Routes_1.default);
        this.server.use("/curso", Curso_Routes_1.default);
        this.server.use("/course", Course_Routes_1.default);
    }
    getServer() {
        return this.server;
    }
}
exports.default = new App().getServer();
