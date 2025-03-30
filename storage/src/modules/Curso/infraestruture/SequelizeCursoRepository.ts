import { Op } from "sequelize";
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
        const curso = await CursoModel.findOne({ 
            where: { id: cursoId },
             
        });
        if (!curso) throw new Error('Curso not found');
        console.log(curso);
        return curso.get({ plain: true }) as Curso;
    }

    async searchExact(term: string): Promise<Curso[]> {
        const cursos = await CursoModel.findAll({
            where: {
                [Op.or]: [
                    { nombre: { [Op.eq]: term } },      // Búsqueda exacta por nombre
                    { Nomenclatura: { [Op.eq]: term } } // Búsqueda exacta por nomenclatura
                ],
                status: 1
            },
            limit: 10
        });
        return cursos.map((cursoModel) => new Curso(
            cursoModel.nombre,
            cursoModel.Nomenclatura,
            cursoModel.status,
            cursoModel.flowId,
            cursoModel.flowNombre,
            cursoModel.templateNombre,
            cursoModel.id
        ));
    }
    
    async searchPartial(term: string): Promise<Curso[]> {
        const cursos = await CursoModel.findAll({
            where: {
                [Op.or]: [
                    { nombre: { [Op.like ]: `%${term}%` } },      // Búsqueda parcial por nombre
                    { Nomenclatura: { [Op.like]: `%${term}%` } } // Búsqueda parcial por nomenclatura
                ],
                
            },
            limit: 10
        });
        return cursos.map((cursoModel) => ({
            nombre: cursoModel.nombre,
            nomenclatura: cursoModel.Nomenclatura,
            status: cursoModel.status,
            flowId: cursoModel.flowId,
            flowNombre: cursoModel.flowNombre,
            templateNombre: cursoModel.templateNombre,
            id: cursoModel.id
        }) as Curso);
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