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
            console.log("Recibido:", req.body); // 👉 Verifica los datos recibidos
            const botCurso = botCursoSchema.parse(req.body);
            const newBotCurso = await botCursoService.createBotCurso(botCurso);
            console.log("Creado:", newBotCurso); // 👉 Verifica que la creación funcionó
            res.status(201).json(newBotCurso);
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