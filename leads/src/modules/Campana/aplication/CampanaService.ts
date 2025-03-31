import CampanaRepository from "../domain/CampanaRepository";
import Campana from "../domain/Campana";
import SequelizeCampanaRepository from "@Campana/infraestructure/SequelizeCampanaRepository";

export default class CampanaService {
    constructor(private campanaRepository: CampanaRepository) {
        this.campanaRepository = new SequelizeCampanaRepository();
    }

    async create(campana: Campana): Promise<void> {
        try {
            await this.campanaRepository.create(campana);
            return Promise.resolve();
        } catch (error) {
            return Promise.reject(error);
        }
    }

      async updateCurso(id:number, campana: Partial<Campana>) {
           return await this.campanaRepository.update(id,campana);
       }
       
    async delete(id: number): Promise<void> {
        try {
            await this.campanaRepository.delete(id);
            return Promise.resolve();
        } catch (error) {
            return Promise.reject(error);
        }
    }
    async findByPaginaId(paginaId: number): Promise<Campana[]> {
        try {
            return await this.campanaRepository.findByPaginaId(paginaId);
        } catch (error) {
            return Promise.reject(error);
        }
    }
    async findById (id: number): Promise<Campana>{
        try {
            const campana = await this.campanaRepository.findById(id);
            return Promise.resolve(campana);
        } catch (error) {
            return Promise.reject(error);
        }
    }
    async findAll(): Promise<Campana[]> {
        try {
            const campanas = await this.campanaRepository.findAll();
            return Promise.resolve(campanas);
        } catch (error) {
            return Promise.reject(error);
        }
    }

    async searchCursos(term: string, paginaId: number): Promise<Campana[]> {
        try {
            // Si el término está vacío o solo contiene espacios, lanzamos un error.
            if (!term || term.trim() === "") {
                throw new Error("El término de búsqueda no puede estar vacío.");
            }
    
            // Primero busca coincidencia EXACTA
            const exactMatch = await this.campanaRepository.searchExact(term,paginaId);
            if (exactMatch.length > 0) {
                return exactMatch;
            }
    
            // Si no hay coincidencia exacta, busca coincidencias PARCIALES
            const partialMatch = await this.campanaRepository.searchPartial(term,paginaId);
            if (partialMatch.length > 0) {
                return partialMatch;
            }
    
            // Si no se encuentra ninguna coincidencia, podrías devolver un mensaje o una lista vacía.
            return [];
    
        } catch (error) {
            // Manejo de error, podría ser un error al consultar la base de datos.
            if (error instanceof Error) {
                console.error("Error en searchCursos:", error.message);
            } else {
                console.error("Error en searchCursos:", error);
            }
            throw new Error("Error al realizar la búsqueda en la base de datos.");
        }
    }
    
    
}    