
import { z } from "zod";

// Esquema principal para la entidad Lead
export const LeadSchema = z.object({
  id: z.number().int().positive(),
  formularioId: z.number().int().positive(),
  clienteId: z.number().int().positive(),
  origen: z.string().min(3).max(100) // Fecha generada automáticamente
});

export type LeadType = z.infer<typeof LeadSchema>;