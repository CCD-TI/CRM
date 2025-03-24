import Pagina from "@Pagina/domain/Pagina";
import PaginaRepository from "../domain/PaginaRepository";
import SequelizePaginaRepository from "@Pagina/infraestructure/SequelizePaginaRepository";

export default class PaginaService {
    constructor(private paginaRepository: PaginaRepository) {
        this.paginaRepository = new SequelizePaginaRepository();
    }
    
    async create(pagina: Pagina): Promise<void>{
        try {
            await this.paginaRepository.create(pagina);
            return Promise.resolve();
        } catch (error) {
            return Promise.reject(error);
        }
        
    }
    async update(pagina: Pagina): Promise<void>{
        try {
            await this.paginaRepository.update(pagina);
            return Promise.resolve();
        } catch (error) {
            return Promise.reject(error);
        }
    }
    async delete(id: number): Promise<void>{
        try {
            await this.paginaRepository.delete(id);
            return Promise.resolve();
        } catch (error) {
            return Promise.reject(error);
        }
    }
    async findById(id: number): Promise<Pagina>{
        try {
            const pagina = await this.paginaRepository.findById(id);
            return Promise.resolve(pagina);
        } catch (error) {
            return Promise.reject(error);
        }
    }
    async findAll(): Promise<Pagina[]>{
        try {
            const paginas = await this.paginaRepository.findAll();
            return Promise.resolve(paginas);
        } catch (error) {
            return Promise.reject(error);
        }
    }
}