import { z } from "zod";

export const CampanaSchema = z.object({
  id: z.number().int().positive().optional(), // Optional for creation
  name: z.string(),
  RedCampanaId: z.string(),  
  status: z.number(),  
  paginaId: z.number()
});
