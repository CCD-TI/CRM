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
exports.CursoController = void 0;
const SequelizeCursoRepository_1 = require("./SequelizeCursoRepository");
const CursoService_1 = require("../application/CursoService");
const CursoShema_1 = require("../domain/CursoShema");
const cursoRepository = new SequelizeCursoRepository_1.SequelizeCursoRepository();
const cursoService = new CursoService_1.CursoService(cursoRepository);
class CursoController {
    static createCurso(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const parsedData = CursoShema_1.cursoSchema.parse(req.body);
                const curso = yield cursoService.createCurso(parsedData);
                res.status(201).json(curso);
            }
            catch (error) {
                res.status(400).json({ message: error });
            }
        });
    }
    static findAllCursos(_req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const cursos = yield cursoService.findAllCursos();
                res.status(200).json(cursos);
            }
            catch (error) {
                res.status(400).json({ message: error });
            }
        });
    }
    static findCursoById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const curso = yield cursoService.findCursoById(Number(req.params.id));
                res.status(200).json(curso);
            }
            catch (error) {
                res.status(400).json({ message: error });
            }
        });
    }
    static updateCurso(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = Number(req.params.id);
                const parsedData = CursoShema_1.cursoUpdateSchema.parse(req.body);
                const curso = yield cursoService.updateCurso(id, parsedData);
                res.status(200).json(curso);
            }
            catch (error) {
                res.status(400).json({ message: error });
            }
        });
    }
    static deleteCurso(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const curso = yield cursoService.deleteCurso(Number(req.params.id));
                res.status(200).json(curso);
            }
            catch (error) {
                res.status(400).json({ message: "No se pudo borrar el curso" });
            }
        });
    }
}
exports.CursoController = CursoController;
