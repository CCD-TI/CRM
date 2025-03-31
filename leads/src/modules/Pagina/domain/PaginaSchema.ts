import { z } from "zod";

export const PaginaSchema = z.object({
  id: z.number().int().positive().optional(),
  name: z.string(),
  RedPaginaId: z.number(),
  status: z.number().default(1),
  createdAt: z.date().optional()
});

export type PaginaType = z.infer<typeof PaginaSchema>;
