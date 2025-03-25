import { z } from "zod";

export const botCursoSchema = z.object({
    id: z.number().optional(), // Opcional porque no siempre se envía
    cursoId: z.number().positive("cursoId debe ser un número positivo"),
    botId: z.number().positive("botId debe ser un número positivo"),
    botNombre: z.string().nonempty("botNombre no puede estar vacío"),
});

// Para actualizaciones, permitimos que los campos sean opcionales
export const botCursoUpdateSchema = botCursoSchema.partial();
