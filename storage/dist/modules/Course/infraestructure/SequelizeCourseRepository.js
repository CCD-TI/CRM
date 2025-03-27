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
exports.SequelizeCoursesoRepository = void 0;
const Course_model_1 = require("./Course.model");
class SequelizeCoursesoRepository {
    //En todos los metodos le pongo plain true para que me devuelva
    //un objeto sin la metadata de sequelize
    create(curso) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("CursoRepository.create");
            const cursoCreated = yield Course_model_1.CursoCCDModel.create(curso);
            return cursoCreated.get({ plain: true });
        });
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const cursos = yield Course_model_1.CursoCCDModel.findAll();
            return cursos.map((curso) => curso.get({ plain: true }));
        });
    }
    findById(cursoId) {
        return __awaiter(this, void 0, void 0, function* () {
            const curso = yield Course_model_1.CursoCCDModel.findOne({ where: { id: cursoId } });
            if (!curso)
                throw new Error('Curso not found');
            return curso.get({ plain: true });
        });
    }
    update(id, curso) {
        return __awaiter(this, void 0, void 0, function* () {
            yield Course_model_1.CursoCCDModel.update(curso, { where: { id } });
            return curso;
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const curso = yield Course_model_1.CursoCCDModel.findOne({ where: { id } });
            if (!curso)
                throw new Error("Curso no encontrado");
            yield Course_model_1.CursoCCDModel.destroy({ where: { id } });
        });
    }
}
exports.SequelizeCoursesoRepository = SequelizeCoursesoRepository;
