"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.botCursoUpdateSchema = exports.botCursoSchema = void 0;
const zod_1 = require("zod");
exports.botCursoSchema = zod_1.z.object({
    id: zod_1.z.number().optional(), // Opcional para creación
    cursoId: zod_1.z.number().positive("cursoId debe ser un número positivo"),
    botsId: zod_1.z.array(zod_1.z.number().positive("botId debe ser un número positivo")).min(1, "Debe incluir al menos un botId"),
    botsNombre: zod_1.z.array(zod_1.z.string().nonempty("botNombre no puede estar vacío")).min(1, "Debe incluir al menos un botNombre")
}).refine(data => data.botsId.length === data.botsNombre.length, {
    message: "La cantidad de botsId y botsNombre debe coincidir"
});
// Esquema para actualizaciones (todos los campos opcionales)
exports.botCursoUpdateSchema = zod_1.z.object({
    id: zod_1.z.number().optional(),
    cursoId: zod_1.z.number().positive("cursoId debe ser un número positivo").optional(),
    botsId: zod_1.z.array(zod_1.z.number().positive("botId debe ser un número positivo")).min(1, "Debe incluir al menos un botId").optional(),
    botsNombre: zod_1.z.array(zod_1.z.string().nonempty("botNombre no puede estar vacío")).min(1, "Debe incluir al menos un botNombre").optional()
}).refine(data => {
    // Solo validar la longitud si ambos arrays están presentes
    if (data.botsId && data.botsNombre) {
        return data.botsId.length === data.botsNombre.length;
    }
    return true;
}, {
    message: "La cantidad de botsId y botsNombre debe coincidir"
});
