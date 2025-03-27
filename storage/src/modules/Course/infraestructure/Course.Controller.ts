import { CourseRepository } from "../domain/CourseRepository";
import {SequelizeCoursesoRepository } from "./SequelizeCourseRepository";
import { CourseService } from "../application/CourseService";
import { Request, Response } from "express";
import { cursoSchema, cursoUpdateSchema } from "../domain/CourseShema";

const courseRepository: CourseRepository = new SequelizeCoursesoRepository();
const courseService = new CourseService(courseRepository);

export class CursoController{
    static async createCurso(req: Request, res: Response){
        try {
            const parsedData = cursoSchema.parse(req.body);
            const curso = await courseService.createCurso(parsedData);
            res.status(201).json(curso);
        } catch (error) {
            res.status(400).json({ message: error});
        }
    }

    static async findAllCursos(_req: Request, res: Response){
        try {
            const cursos = await courseService.findAllCursos();
            res.status(200).json(cursos);
        } catch (error) {
            res.status(400).json({ message: error });
        }
    }

    static async findCursoById(req: Request, res: Response){
        try {
            const curso = await courseService.findCursoById(Number(req.params.id));
            res.status(200).json(curso);
        } catch (error) {
            res.status(400).json({ message: error });
        }
    }

    static async updateCurso(req: Request, res: Response){
        try {
            const id = Number(req.params.id);
            const parsedData = cursoUpdateSchema.parse(req.body);
            const curso = await courseService.updateCurso(id, parsedData);
            res.status(200).json(curso);
        } catch (error) {
            res.status(400).json({ message: error });
        }
    }

    static async deleteCurso(req: Request, res: Response){
        try {
            const curso = await courseService.deleteCurso(Number(req.params.id));
            res.status(200).json(curso);
        } catch (error) {
            res.status(400).json({ message: "No se pudo borrar el curso" });
        }
    }

}