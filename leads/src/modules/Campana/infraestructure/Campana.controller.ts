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
               const id = Number(req.params.id);
               const parsedData = CampanaSchema.parse(req.body);
               const curso = await campanaService.updateCurso(id, parsedData);
               res.status(200).json(curso);
           } catch (error) {
               res.status(400).json({ message: error });
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

    static async findByPaginaId(req: Request, res: Response) {
        try {
            const { paginaId } = req.params;
            const validatedPaginaId = parseInt(paginaId, 10);
    
            // 🔴 Validar si paginaId es un número válido
            if (isNaN(validatedPaginaId)) {
                 res.status(400).json({ error: "paginaId debe ser un número válido" });
            }
    
            const campanas = await campanaService.findByPaginaId(validatedPaginaId);
             res.status(200).json(campanas);
    
        } catch (error) {
            console.error("Error en findByPaginaId:", error);
            
            if (!res.headersSent) {  // ✅ Evita enviar múltiples respuestas
                 res.status(500).json({ error: "Error interno del servidor" });
            }
        }
    }
    
    

    static async searchCursos(req: Request, res: Response) {
        try {
            const searchTerm = req.query.q as string;
            const paginaId = parseInt(req.params.paginaId, 10);
            const id = parseInt(req.query.id as string, 10); // 🔹 Obtener el id de la consulta
    
            if (isNaN(paginaId)) {
                 res.status(400).json({ message: 'paginaId es requerido y debe ser un número válido' });
            }
    
            // 🔹 Si se proporciona un ID, buscar por ID y página
            if (!isNaN(id)) {
                const campana = await campanaService.findById(id,);
                 res.status(200).json(campana);
            }
    
            // 🔹 Si hay un término de búsqueda, buscar con filtro
            const resultados = searchTerm && searchTerm.trim() !== ''
                ? await campanaService.searchCursos(searchTerm, paginaId)
                : await campanaService.findByPaginaId(paginaId); // 🔹 Obtener todas las campañas de la página
    
            res.status(200).json(resultados);
        } catch (error) {
            console.error('Error en searchCursos:', error);
            res.status(500).json({
                message: 'Error al realizar la búsqueda',
                error: error instanceof Error ? error.message : 'Unknown error'
            });
        }
    }
    

}