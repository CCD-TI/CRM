"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cursoUpdateSchema = exports.cursoSchema = void 0;
const zod_1 = require("zod");
exports.cursoSchema = zod_1.z.object({
    id: zod_1.z.number().optional(), // Opcional porque no se envía en la creación
    nombre: zod_1.z.string().min(3, "El nombre debe tener al menos 3 caracteres"),
    flowId: zod_1.z.number().positive("flowId debe ser un número positivo"),
    flowNombre: zod_1.z.string().nonempty("flowNombre no puede estar vacío"),
    templateNombre: zod_1.z.string().nonempty("templateNombre no puede estar vacío"),
});
// Para actualizar, permitimos que los campos sean opcionales
exports.cursoUpdateSchema = exports.cursoSchema.partial();
