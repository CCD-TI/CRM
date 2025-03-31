import Campana from './Campana';

export default interface CampanaRepository {
    create(campana: Campana): Promise<void>
    update(id:number,campana: Partial<Campana>): Promise<Campana>;
    
    delete(id: number): Promise<void>;
    findById(id: number): Promise<Campana>;
    findByPaginaId(paginaId: number): Promise<Campana[]>;
    findAll(): Promise<Campana[]>;

     searchExact(term: string,paginaId:number): Promise<Campana[]>; // Nueva: búsqueda exacta
     searchPartial(term: string,paginaId:number): Promise<Campana[]>; // Nueva: búsqueda parcial
    }
