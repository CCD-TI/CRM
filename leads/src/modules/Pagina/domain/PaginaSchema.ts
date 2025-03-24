import { z } from "zod";

export const PaginaSchema = z.object({
  id: z.number().int().positive(),
  name: z.string(),
  RedPaginaId: z.number(),
});

export type PaginaType = z.infer<typeof PaginaSchema>;
