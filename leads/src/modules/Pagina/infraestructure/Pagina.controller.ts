import { Request, Response } from "express";
import PaginaService from "../aplication/PaginaService";
import PaginaRepository from "@Pagina/domain/PaginaRepository";
import SequelizePaginaRepository from "./SequelizePaginaRepository";
import { PaginaSchema } from "@Pagina/domain/PaginaSchema";

const paginaRepository: PaginaRepository = new SequelizePaginaRepository();
const paginaService = new PaginaService(paginaRepository);
export default class PaginaController {

    static async create(req: Request, res: Response): Promise<void> {
        try {
            const validatedData = PaginaSchema.parse(req.body);
            await paginaService.create(validatedData);
            res.status(201).json({ message: "Página creada exitosamente" });
        } catch (error) {
            res.status(500).json({ error: "Error al crear la página" });
        }
    }
    static async update(req: Request, res: Response): Promise<void> {
        try {
            const validatedData = PaginaSchema.parse(req.body);
            await paginaService.update(validatedData);
            res.status(200).json({ message: "Pagina actualizada"});
        } catch (error) {
            res.status(500).json({ error: error });
        }
    }
    static async delete(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const validatedId = parseInt(id, 10);
            await paginaService.delete(validatedId);
            res.status(200).json({ message: "Campaña eliminada" });
        } catch (error) {
            res.status(500).json({ error: error });
        }
    }
    static async findAll(req: Request, res: Response): Promise<void> {
        try {
            const paginas = await paginaService.findAll();
            res.status(200).json(paginas);
        } catch (error) {
            res.status(500).json({ error: "No se mostraron" });
        }
    }
    static async findById(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const validatedId = parseInt(id, 10);
            const pagina = await paginaService.findById(validatedId);
            res.json(pagina);
        } catch (error) {
            res.status(404).json({ error: "Campaña no encontrada" });
        }
    }
}
