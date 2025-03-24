import { z } from "zod";

export const CampanaSchema = z.object({
  id: z.number().int().positive(),
  name: z.string(),
  RedCampanaId: z.string(),
  paginaId: z.number(),
});
