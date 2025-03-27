"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cursoUpdateSchema = exports.cursoSchema = void 0;
const zod_1 = require("zod");
exports.cursoSchema = zod_1.z.object({
    id: zod_1.z.number().optional(), // Opcional porque no se envía en la creación
    curso: zod_1.z.string().min(3, "El nombre debe tener al menos 3 caracteres"),
    nomenclatura: zod_1.z.string().min(3, "El nombre debe tener al menos 3 caracteres"),
    course_ObjectID: zod_1.z.number()
        .int("Debe ser un número entero")
        .positive("Debe ser un número positivo")
        .min(1, "El ID debe ser mayor o igual a 1"),
    estado: zod_1.z.number()
        .int("Debe ser un número entero")
        .min(0, "El estado mínimo es 0")
        .max(1, "El estado máximo es 1")
});
// Para actualizar, permitimos que los campos sean opcionales
exports.cursoUpdateSchema = exports.cursoSchema.partial();
