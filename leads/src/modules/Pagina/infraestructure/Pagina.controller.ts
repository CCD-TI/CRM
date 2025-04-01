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
            const id = Number(req.params.id);
            const parsedData = PaginaSchema.parse(req.body);
            const curso = await paginaService.updateCurso(id, parsedData);
            res.status(200).json(curso);
        } catch (error) {
            res.status(400).json({ message: error });
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
    static async findAll(_req: Request, res: Response): Promise<void> {
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

    static async searchCursos(req: Request, res: Response) {
        try {
            const {searchTerm} = req.body;
            const paginaService = new PaginaService(new SequelizePaginaRepository());
    
            // 1. Definir resultados fuera del condicional
            let resultados;
            
            if (!searchTerm || searchTerm.trim() === '') {
                resultados = await paginaService.findAll();
            } else {
                resultados = await paginaService.searchCursos(searchTerm);
            }
    
            // 2. Single Response Principle - Una sola respuesta
             res.status(200).json(resultados);
    
        } catch (error) {
            console.error('Error en searchCursos:', error);
            
            // 3. Verificar que no se haya enviado respuesta previamente
            if (!res.headersSent) {
                 res.status(500).json({
                    message: 'Error al realizar la búsqueda',
                    error: error instanceof Error ? error.message : 'Unknown error'
                });
            }
        }
    }
    
}
