"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.models = void 0;
const BotCurso_model_1 = require("../../modules/BotCurso/infraestruture/BotCurso.model");
const Curso_model_1 = require("../../modules/Curso/infraestruture/Curso.model");
exports.models = [
    Curso_model_1.CursoModel,
    BotCurso_model_1.BotCursoModel
];
console.log("Modelos exportados:", exports.models.map(m => m.name)); // 🔹 Agregar depuración
