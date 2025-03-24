import PaginaRepository from "../domain/PaginaRepository"
import Pagina from "../domain/Pagina"
import { PaginaModel } from "./Pagina.model";
export default class SequelizePaginaRepository implements PaginaRepository {
    
    async create(pagina: Pagina): Promise<void> {
        await PaginaModel.create({
            name: pagina.name,
            RedPaginaId: pagina.RedPaginaId
        });
        return Promise.resolve();
    }
    async update(pagina: Pagina): Promise<void> {
        await PaginaModel.update({
            name: pagina.name,
            RedPaginaId: pagina.RedPaginaId
        }, {
            where: {
                id: pagina.id
            }
        });
        return Promise.resolve();
    }
    async delete(id: number): Promise<void> {
        await PaginaModel.destroy({
            where: {
                id
            }
        });
        return Promise.resolve();
    }
    async findById(id: number): Promise<Pagina> {
        const pagina = await PaginaModel.findByPk(id);
        if (!pagina) {
            throw new Error("Pagina no encontrada");
        }
        const paginaFound = new Pagina(pagina.id, pagina.name, pagina.RedPaginaId);
        return Promise.resolve(paginaFound);
    }
    async findAll(): Promise<Pagina[]> {
        const paginas = await PaginaModel.findAll();
        const mappedpaginas = paginas.map((pagina) => new Pagina(pagina.id, pagina.name, pagina.RedPaginaId));
        return Promise.resolve(mappedpaginas);
    }
}
