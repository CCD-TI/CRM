import Pagina from './Pagina'

export default interface PaginaRepository {
    create(pagina: Pagina): Promise<void>
    update(pagina: Pagina): Promise<void>
    delete(id: number): Promise<void>
    findById(id: number): Promise<Pagina>
    findAll(): Promise<Pagina[]>
}