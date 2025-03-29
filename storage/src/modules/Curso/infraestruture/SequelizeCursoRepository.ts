import { BotCursoModel } from "../../BotCurso/infraestruture/BotCurso.model";
import Curso from "../domain/Curso";
import { CursoRepository } from "../domain/CursoRepository";
import { CursoModel } from "./Curso.model";

export class SequelizeCursoRepository implements CursoRepository {
    //En todos los metodos le pongo plain true para que me devuelva
    //un objeto sin la metadata de sequelize
    async create(curso: Curso): Promise<Curso> {
        console.log("CursoRepository.create");
        
        const cursoCreated = await CursoModel.create(curso as any);
        return cursoCreated.get({ plain: true }) as Curso;
    }
    async findAll(): Promise<Curso[]> {
        const cursos = await CursoModel.findAll();
        return cursos.map((curso) => curso.get({ plain: true }) as Curso);
    }
    async findById(cursoId: number): Promise<Curso> {
        const curso = await CursoModel.findByPk(cursoId);
        if (!curso) throw new Error('Curso not found');
        console.log(curso);
        return curso.get({ plain: true }) as Curso;
    }
    async update(id:number, curso: Curso): Promise<Curso> {
        await CursoModel.update(curso as any, { where: { id } });
        return curso;
    }
    async delete(id: number): Promise<void> {
        const curso = await CursoModel.findOne({ where: { id } });
        if (!curso) throw new Error("Curso no encontrado");

        await CursoModel.destroy({ where: { id } });
    }

    

}