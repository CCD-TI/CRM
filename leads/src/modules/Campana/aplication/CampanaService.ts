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

    async update(campana: Campana): Promise<void> {
        try {
            await this.campanaRepository.update(campana);
            return Promise.resolve();
        } catch (error) {
            return Promise.reject(error);
        }
    }

    async delete(id: number): Promise<void> {
        try {
            await this.campanaRepository.delete(id);
            return Promise.resolve();
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
}