import Course from "./course";

export interface CourseRepository {
  create(course: Course): Promise<Course>;
  update(id:number, course: Partial<Course>): Promise<Course>;
  delete(id: number): Promise<void>;
  findAll(): Promise<Course[]>;
  findById(id: number): Promise<Course>;
}