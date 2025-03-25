import { CursoRepository } from "../domain/CursoRepository";
import { SequelizeCursoRepository } from "./SequelizeCursoRepository";
import { CursoService } from "../application/CursoService";
import { Request, Response } from "express";
import { cursoSchema, cursoUpdateSchema } from "../domain/CursoShema";

const cursoRepository: CursoRepository = new SequelizeCursoRepository();
const cursoService = new CursoService(cursoRepository);

export class CursoController{
    static async createCurso(req: Request, res: Response){
        try {
            const parsedData = cursoSchema.parse(req.body);
            const curso = await cursoService.createCurso(parsedData);
            res.status(201).json(curso);
        } catch (error) {
            res.status(400).json({ message: error});
        }
    }

    static async findAllCursos(_req: Request, res: Response){
        try {
            const cursos = await cursoService.findAllCursos();
            res.status(200).json(cursos);
        } catch (error) {
            res.status(400).json({ message: error });
        }
    }

    static async findCursoById(req: Request, res: Response){
        try {
            const curso = await cursoService.findCursoById(Number(req.params.id));
            res.status(200).json(curso);
        } catch (error) {
            res.status(400).json({ message: error });
        }
    }

    static async updateCurso(req: Request, res: Response){
        try {
            const id = Number(req.params.id);
            const parsedData = cursoUpdateSchema.parse(req.body);
            const curso = await cursoService.updateCurso(id, parsedData);
            res.status(200).json(curso);
        } catch (error) {
            res.status(400).json({ message: error });
        }
    }

    static async deleteCurso(req: Request, res: Response){
        try {
            const curso = await cursoService.deleteCurso(Number(req.params.id));
            res.status(200).json(curso);
        } catch (error) {
            res.status(400).json({ message: "No se pudo borrar el curso" });
        }
    }

}