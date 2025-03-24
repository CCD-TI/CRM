import Campana from './Campana';

export default interface CampanaRepository {
    create(campana: Campana): Promise<void>
    update(campana: Campana): Promise<void>;
    delete(id: number): Promise<void>;
    findById(id: number): Promise<Campana>;
    findAll(): Promise<Campana[]>;
}