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
exports.SequelizeBotCursoRepository = void 0;
const BotCurso_model_1 = require("./BotCurso.model");
class SequelizeBotCursoRepository {
    create(botCurso) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("Insertando en DB:", botCurso);
                const botCursoCreated = yield BotCurso_model_1.BotCursoModel.create(botCurso);
                console.log("Registro creado:", botCursoCreated);
                return botCursoCreated.get({ plain: true });
            }
            catch (error) {
                console.error("Error al crear BotCurso:", error);
                throw new Error("No se pudo crear el BotCurso");
            }
        });
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const botCursos = yield BotCurso_model_1.BotCursoModel.findAll();
            return botCursos.map((botCurso) => botCurso.get({ plain: true }));
        });
    }
    findById(botCursoId) {
        return __awaiter(this, void 0, void 0, function* () {
            const botCurso = yield BotCurso_model_1.BotCursoModel.findOne({ where: { id: botCursoId } });
            if (!botCurso)
                throw new Error('BotCurso not found');
            return botCurso.get({ plain: true });
        });
    }
    update(id, botCurso) {
        return __awaiter(this, void 0, void 0, function* () {
            yield BotCurso_model_1.BotCursoModel.update(botCurso, { where: { id } });
            return botCurso;
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield BotCurso_model_1.BotCursoModel.destroy({ where: { id } });
        });
    }
}
exports.SequelizeBotCursoRepository = SequelizeBotCursoRepository;
