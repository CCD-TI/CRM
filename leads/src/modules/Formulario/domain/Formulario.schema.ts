import { z } from "zod";

export const FormularioSchema = z.object({
id: z.number().int().positive().optional(),
name: z.string().min(2).max(500),
RedFormularioId: z.string(),
cursoId: z.number().int().positive(),
status: z.number().int().default(1),
campanaId: z.number().int().positive().optional()
});