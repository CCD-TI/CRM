import { z } from "zod";

export const cursoSchema = z.object({
    id: z.number().optional(), // Opcional porque no se envía en la creación
    nombre: z.string().min(3, "El nombre debe tener al menos 3 caracteres"),
    nomenclatura: z.string().min(3, "El nombre debe tener al menos 3 caracteres"),
    status: z.number().default(0),
    flowId: z.number().positive("flowId debe ser un número positivo"),
    flowNombre: z.string().nonempty("flowNombre no puede estar vacío"),
    templateNombre: z.string().nonempty("templateNombre no puede estar vacío"),
});

// Para actualizar, permitimos que los campos sean opcionales
export const cursoUpdateSchema = cursoSchema.partial();
