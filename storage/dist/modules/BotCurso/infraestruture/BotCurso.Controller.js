"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BotCursoController = void 0;
const BotCursoService_1 = require("../application/BotCursoService");
const SequelizeBotCursoRepository_1 = require("./SequelizeBotCursoRepository");
const BotCursoSchema_1 = require("../domain/BotCursoSchema");
const botCursoRepository = new SequelizeBotCursoRepository_1.SequelizeBotCursoRepository();
const botCursoService = new BotCursoService_1.BotCursoService(botCursoRepository);
class BotCursoController {
    static createBotCurso(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("Recibido:", req.body); // 👉 Verifica los datos recibidos
                const botCurso = BotCursoSchema_1.botCursoSchema.parse(req.body);
                const newBotCurso = yield botCursoService.createBotCurso(botCurso);
                console.log("Creado:", newBotCurso); // 👉 Verifica que la creación funcionó
                res.status(201).json(newBotCurso);
            }
            catch (error) {
                console.error("Error en createBotCurso:", error); // 👉 Muestra el error
                res.status(500).json({ error: "Error creating BotCurso" });
            }
        });
    }
    static updateBotCurso(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = parseInt(req.params.id);
                const botCurso = BotCursoSchema_1.botCursoUpdateSchema.parse(req.body);
                const updatedBotCurso = yield botCursoService.updateBotCurso(id, botCurso);
                res.status(200).json(updatedBotCurso);
            }
            catch (error) {
                res.status(500).json({ error: error });
            }
        });
    }
    static deleteBotCurso(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const botCurso = req.body;
                yield botCursoService.deleteBotCurso(botCurso);
                res.status(200).json({ message: 'BotCurso deleted' });
            }
            catch (error) {
                res.status(500).json({ error: error });
            }
        });
    }
    static findAllBotCursos(_req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const botCursos = yield botCursoService.findAllBotCursos();
                res.status(200).json(botCursos);
            }
            catch (error) {
                res.status(500).json({ error: error });
            }
        });
    }
    static findBotCursoById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = parseInt(req.params.id);
                const botCurso = yield botCursoService.findBotCursoById(id);
                res.status(200).json(botCurso);
            }
            catch (error) {
                res.status(500).json({ error: error });
            }
        });
    }
}
exports.BotCursoController = BotCursoController;
