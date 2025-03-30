import Curso from "./Curso";

export interface CursoRepository {
  create(curso: Curso): Promise<Curso>;
  update(id: number, curso: Partial<Curso>): Promise<Curso>;
  delete(id: number): Promise<void>;
  findAll(): Promise<Curso[]>;
  findById(id: number): Promise<Curso>;
<<<<<<< HEAD
  
  // Métodos de búsqueda
  searchExact(term: string): Promise<Curso[]>; // Nueva: búsqueda exacta
  searchPartial(term: string): Promise<Curso[]>; // Nueva: búsqueda parcial
=======
>>>>>>> 1bba0497f4b4797a924077980aa7fcd4187b2f4c
}