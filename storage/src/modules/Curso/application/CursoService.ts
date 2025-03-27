import { CursoCCDModel } from "../../Course/infraestructure/Course.model";
import Curso from "../domain/Curso";
import { CursoRepository } from "../domain/CursoRepository";

export class CursoService{
    constructor(private cursoRepository: CursoRepository) {}
    async createCurso(curso: any) {
        return await this.cursoRepository.create(curso);
    }
    async updateCurso(id:number, curso: Partial<Curso>) {
        return await this.cursoRepository.update(id,curso);
    }
    async deleteCurso(id: number) {
        return await this.cursoRepository.delete(id);
    }
    async findAllCursos() {
        return await this.cursoRepository.findAll();
    }
    async findCursoById(id: number) {
        return await this.cursoRepository.findById(id);
    }

    async findCursoCCDById(cursoCCDId: number) {
        return await CursoCCDModel.findByPk(cursoCCDId); // 👈 Busca por ID en CursosCCD
    }
}