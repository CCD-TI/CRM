import { Request, Response } from "express";
import { BotCursoService } from "../application/BotCursoService";
import { BotCursoRepository } from "../domain/BotCursoRepository";
import { SequelizeBotCursoRepository } from "./SequelizeBotCursoRepository";
import { botCursoSchema, botCursoUpdateSchema } from "../domain/BotCursoSchema";

const botCursoRepository: BotCursoRepository = new SequelizeBotCursoRepository();
const botCursoService = new BotCursoService(botCursoRepository);

export class BotCursoController {
    static async createBotCurso(req: Request, res: Response) {
        try {
            console.log("Datos recibidos:", req.body);
            
            // 1. Validar la estructura de los datos
            const validatedData = botCursoSchema.parse(req.body);
            
            // 2. Verificar consistencia de arrays paralelos
            if (validatedData.botsId.length !== validatedData.botsNombre.length) {
                    res.status(400).json({
                    error: "Los arrays botsId y botsNombre deben tener la misma longitud"
                });
            }
    
            // 3. Crear todas las relaciones bot-curso
            const createdRelations = await Promise.all(
                validatedData.botsId.map((botId: any, index: string | number) => 
                    botCursoService.createBotCurso({
                        cursoId: validatedData.cursoId,
                        botId,
                        botNombre: validatedData.botsNombre[index]
                    })
                )
            );
    
            console.log("Relaciones creadas:", createdRelations);
            
            // 4. Responder con todas las relaciones creadas
            res.status(201).json({
                cursoId: validatedData.cursoId,
                createdRelations,
                count: createdRelations.length
            });
            
        } catch (error) {
            console.error("Error en createBotCurso:", error); // 👉 Muestra el error
            res.status(500).json({ error: "Error creating BotCurso" });
        }
    }
    
    static async updateBotCurso(req: Request , res: Response) {
        try {
            const id = parseInt(req.params.id);
            const botCurso = botCursoUpdateSchema.parse(req.body);
            const updatedBotCurso = await botCursoService.updateBotCurso(id, botCurso);
            res.status(200).json(updatedBotCurso);
        } catch (error) {
            res.status(500).json({ error: error });
        }
    }
    static async deleteBotCurso(req: Request , res: Response) {
        try {
            const botCurso = req.body;
            await botCursoService.deleteBotCurso(botCurso);
            res.status(200).json({ message: 'BotCurso deleted' });
        } catch (error) {
            res.status(500).json({ error: error });
        }
    }
    static async findAllBotCursos(_req: Request , res: Response) {
        try {
            const botCursos = await botCursoService.findAllBotCursos();
            res.status(200).json(botCursos);
        } catch (error) {
            res.status(500).json({ error: error });
        }
    }
    static async findBotCursoById(req: Request , res: Response) {
        try {
            const id = parseInt(req.params.id);
            const botCurso = await botCursoService.findBotCursoById(id);
            res.status(200).json(botCurso);
        } catch (error) {
            res.status(500).json({ error: error });
        }
    }
}