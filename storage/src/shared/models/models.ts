import { BotCursoModel } from "../../modules/BotCurso/infraestruture/BotCurso.model";
import { CursoModel } from "../../modules/Curso/infraestruture/Curso.model";

export const models = [
    CursoModel,
    BotCursoModel
    

]

console.log("Modelos exportados:", models.map(m => m.name)); // 🔹 Agregar depuración
