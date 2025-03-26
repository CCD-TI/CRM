import { z } from "zod";

export const botCursoSchema = z.object({
  id: z.number().optional(), // Opcional para creación
  cursoId: z.number().positive("cursoId debe ser un número positivo"),
  botsId: z.array(
    z.number().positive("botId debe ser un número positivo")
  ).min(1, "Debe incluir al menos un botId"),
  botsNombre: z.array(
    z.string().nonempty("botNombre no puede estar vacío")
  ).min(1, "Debe incluir al menos un botNombre")
}).refine((data: { botsId: string | any[]; botsNombre: string | any[]; }) => data.botsId.length === data.botsNombre.length, {
  message: "La cantidad de botsId y botsNombre debe coincidir"
});

// Esquema para actualizaciones (todos los campos opcionales)
export const botCursoUpdateSchema = z.object({
  id: z.number().optional(),
  cursoId: z.number().positive("cursoId debe ser un número positivo").optional(),
  botsId: z.array(
    z.number().positive("botId debe ser un número positivo")
  ).min(1, "Debe incluir al menos un botId").optional(),
  botsNombre: z.array(
    z.string().nonempty("botNombre no puede estar vacío")
  ).min(1, "Debe incluir al menos un botNombre").optional()
}).refine((data: { botsId: string | any[]; botsNombre: string | any[]; }) => {
  // Solo validar la longitud si ambos arrays están presentes
  if (data.botsId && data.botsNombre) {
    return data.botsId.length === data.botsNombre.length;
  }
  return true;
}, {
  message: "La cantidad de botsId y botsNombre debe coincidir"
});