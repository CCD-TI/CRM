import { BotCursoModel } from "../../modules/BotCurso/infraestruture/BotCurso.model";
import { CursoModel } from "../../modules/Curso/infraestruture/Curso.model";
import {CursoCCDModel} from  "../../modules/Course/infraestructure/Course.model"

export const models = [
    CursoModel,
    BotCursoModel,
    CursoCCDModel


]

console.log("Modelos exportados:", models.map(m => m.name)); // 🔹 Agregar depuración
