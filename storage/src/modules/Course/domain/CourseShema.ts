import { z } from "zod";

export const cursoSchema = z.object({
    id: z.number().optional(), // Opcional porque no se envía en la creación
    curso: z.string().min(3, "El nombre debe tener al menos 3 caracteres"),
    nomenclatura:  z.string().min(3, "El nombre debe tener al menos 3 caracteres"),
    course_ObjectID: z.number()
    .int("Debe ser un número entero")
    .positive("Debe ser un número positivo")
    .min(1, "El ID debe ser mayor o igual a 1"),
  estado: z.number()
    .int("Debe ser un número entero")
    .min(0, "El estado mínimo es 0")
    .max(1, "El estado máximo es 1")
});

// Para actualizar, permitimos que los campos sean opcionales
export const cursoUpdateSchema = cursoSchema.partial();
