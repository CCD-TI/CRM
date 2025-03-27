import Course from "../domain/course";
import { CourseRepository } from "../domain/CourseRepository";
import { CursoCCDModel } from "./Course.model";

export class SequelizeCoursesoRepository implements CourseRepository {
    //En todos los metodos le pongo plain true para que me devuelva
    //un objeto sin la metadata de sequelize
    async create(curso: Course): Promise<Course> {
        console.log("CursoRepository.create");
        
        const cursoCreated = await CursoCCDModel.create(curso as any);
        return cursoCreated.get({ plain: true }) as Course;
    }
    async findAll(): Promise<Course[]> {
        const cursos = await CursoCCDModel.findAll();
        return cursos.map((curso) => curso.get({ plain: true }) as Course);
    }
    async findById(cursoId: number): Promise<Course> {
        const curso = await CursoCCDModel.findOne({ where: { id: cursoId } });
        if (!curso) throw new Error('Curso not found');
        return curso.get({ plain: true }) as Course;
    }
    async update(id:number, curso: Course): Promise<Course> {
        await CursoCCDModel.update(curso as any, { where: { id } });
        return curso;
    }
    async delete(id: number): Promise<void> {
        const curso = await CursoCCDModel.findOne({ where: { id } });
        if (!curso) throw new Error("Curso no encontrado");

        await CursoCCDModel.destroy({ where: { id } });
    }


}