import FormularioRepository from "@Formulario/domain/FormularioRepository";
import { Request, Response } from "express";
import SequelizeFormularioRepository from "./SequelizeFormularioRepository";
import FormularioService from "@Formulario/aplication/FormularioService";
import { FormularioSchema } from "@Formulario/domain/Formulario.schema";


const formularioRespository : FormularioRepository = new SequelizeFormularioRepository();
const formularioService = new FormularioService(formularioRespository);
export default class FormularioController {
    static async create(req: Request, res: Response): Promise<void> {
        try {
            const validatedData = FormularioSchema.parse(req.body);
            console.log("validacion:", validatedData)
            await formularioService.create(validatedData);
            res.status(201).json({ message: "Formulario creado exitosamente" });
        } catch (error: any) {
            res.status(500).json({ error: "Error al crear el formulario" , mensaje: error.message});
        }
    }
    static async update(req: Request, res: Response): Promise<void> {
        try {
            const validatedData = FormularioSchema.parse(req.body);
            await formularioService.update(validatedData);
            res.status(200).json({ message: "Formulario actualizado exitosamente" });
        } catch (error) {
            res.status(500).json({ error: "Error al actualizar el formulario" });
        }
    }
    static async delete(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const validatedId = parseInt(id, 10);
            await formularioService.delete(validatedId);
            res.status(200).json({ message: "Formulario eliminado exitosamente" });
        } catch (error) {
            res.status(500).json({ error: "Error al eliminar el formulario" });
        }
    }
    static async findAll(req: Request, res: Response): Promise<void> {
        try {
            const formularios = await formularioService.findAll();
            res.status(200).json(formularios);
        } catch (error) {
            res.status(500).json({ error: "Error al obtener los formularios" });
        }
    }
    static async findById(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const validatedId = parseInt(id, 10);
            const formulario = await formularioService.findById(validatedId);
            res.status(200).json(formulario);
        } catch (error) {
            res.status(404).json({ error: "Formulario no encontrado" });
        }
    }


     static async searchCursos(req: Request, res: Response) {
            try {
                const searchTerm = req.query.q as string;
                const paginaService = new FormularioService(new SequelizeFormularioRepository());
        
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