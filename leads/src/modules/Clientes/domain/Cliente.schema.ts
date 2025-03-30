import { z } from "zod"

export const ClienteSchema = z.object({
  name: z.string().min(3).max(200),
  email: z.string().email(),
  phone: z.string().min(8).max(20),
  id: z.number().optional(),
  age: z.number().optional(),
  gender: z.number().optional(),
  address: z.string().min(3).max(600).optional()
})