import { z } from "zod";

export const FormularioSchema = z.object({
id: z.number().int().positive(),
name: z.string().min(2).max(500),
RedFormularioId: z.string(),
cursoId: z.number().int().positive(),
campanaId: z.number().int().positive()
});