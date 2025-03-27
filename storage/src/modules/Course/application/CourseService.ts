import Course from "../domain/course";
import { CourseRepository } from "../domain/CourseRepository";

export class CourseService{
    constructor(private courseRepository: CourseRepository) {}
    async createCurso(course: any) {
        return await this.courseRepository.create(course);
    }
    async updateCurso(id:number, course: Partial<Course>) {
        return await this.courseRepository.update(id,course);
    }
    async deleteCurso(id: number) {
        return await this.courseRepository.delete(id);
    }
    async findAllCursos() {
        return await this.courseRepository.findAll();
    }
    async findCursoById(id: number) {
        return await this.courseRepository.findById(id);
    }

    
}
