"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.botCursoUpdateSchema = exports.botCursoSchema = void 0;
const zod_1 = require("zod");
exports.botCursoSchema = zod_1.z.object({
    id: zod_1.z.number().optional(), // Opcional porque no siempre se envía
    cursoId: zod_1.z.number().positive("cursoId debe ser un número positivo"),
    botId: zod_1.z.number().positive("botId debe ser un número positivo"),
    botNombre: zod_1.z.string().nonempty("botNombre no puede estar vacío"),
});
// Para actualizaciones, permitimos que los campos sean opcionales
exports.botCursoUpdateSchema = exports.botCursoSchema.partial();
