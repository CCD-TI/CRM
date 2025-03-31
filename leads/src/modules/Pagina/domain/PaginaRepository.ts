import Pagina from './Pagina'

export default interface PaginaRepository {
    create(pagina: Pagina): Promise<void>
    update(id: number, pagina: Partial<Pagina>): Promise<Pagina>;
    delete(id: number): Promise<void>
    findById(id: number): Promise<Pagina>
    findAll(): Promise<Pagina[]>

    searchExact(term: string): Promise<Pagina[]>; // Nueva: búsqueda exacta
    searchPartial(term: string): Promise<Pagina[]>; // Nueva: búsqueda parcial
}