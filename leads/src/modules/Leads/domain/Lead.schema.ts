
import { z } from "zod";

// Esquema principal para la entidad Lead
export const LeadSchema = z.object({
  id: z.number().int().positive(),
  formularioId: z.number().int().positive(),
  userId: z.number().int().positive(),
  origen: z.string().min(3).max(50) // Fecha generada automáticamente
});

export type LeadType = z.infer<typeof LeadSchema>;