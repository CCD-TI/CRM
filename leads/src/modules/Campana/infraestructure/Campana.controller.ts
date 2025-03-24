import { Request, Response } from "express";
import CampanaService from "../aplication/CampanaService";
import CampanaRepository from "@Campana/domain/CampanaRepository";
import SequelizeCampanaRepository from "./SequelizeCampanaRepository";
import { CampanaSchema } from "@Campana/domain/CampanaSchema";

const campanaRepository: CampanaRepository = new SequelizeCampanaRepository();
const campanaService = new CampanaService(campanaRepository);
export default class CampanaController {
    static async create(req: Request, res: Response): Promise<void> {
        try {
            const validatedData = CampanaSchema.parse(req.body);
            await campanaService.create(validatedData);
            res.status(201).json({ message: "Campaña creada exitosamente" });
        } catch (error) {
            res.status(500).json({ error: "No se creo la Campaña" });
        }
    }

    static async update(req: Request, res: Response): Promise<void> {
        try {
            const validatedData = CampanaSchema.parse(req.body);
            await campanaService.update(validatedData);
            res.status(200).json({ message: "Campaña actualizada" });
        } catch (error) {
            res.status(500).json({ error: error });
        }
    }

    static async delete(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const validatedId = parseInt(id, 10);
            await campanaService.delete(validatedId);
            res.status(200).json({ message: "Campaña eliminada" });
        } catch (error) {
            res.status(500).json({ error: error });
        }
    }

    static async findAll(req: Request, res: Response): Promise<void> {
        try {
            const campanas = await campanaService.findAll();
            res.status(200).json(campanas);
        } catch (error) {
            res.status(500).json({ error: "No se mostraron" });
        }
    }

    static async findById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const validatedId = parseInt(id, 10);
            const campana = await campanaService.findById(validatedId);
            res.status(200).json(campana);
        } catch (error) {
            res.status(404).json({ error: "Campaña no encontrada" });
        }
    }

}