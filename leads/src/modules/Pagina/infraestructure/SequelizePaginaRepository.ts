import PaginaRepository from "../domain/PaginaRepository"
import Pagina from "../domain/Pagina"
import { PaginaModel } from "./Pagina.model";
import { Op } from "sequelize";
export default class SequelizePaginaRepository implements PaginaRepository {
    
    async create(pagina: Pagina): Promise<void> {
        await PaginaModel.create({
            name: pagina.name,
            RedPaginaId: pagina.RedPaginaId
        });
        return Promise.resolve();
    }
    async update(id:number, pagina: Pagina): Promise<Pagina> {
        await PaginaModel.update(pagina as any, { where: { id } });
        return pagina;
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
        const paginaFound = new Pagina( pagina.name, pagina.RedPaginaId,pagina.status,pagina.createdAt); 
        return Promise.resolve(paginaFound);
    }
    async findAll(): Promise<Pagina[]> {
        const cursos = await PaginaModel.findAll();
        return cursos.map((pagina) => pagina.get({ plain: true }) as Pagina);
    }


    async searchExact(term: string): Promise<Pagina[]> {
        const cursos = await PaginaModel.findAll({
            where: 
             
                    { name: { [Op.eq]: term } },      // Búsqueda exacta por nombre
                   
               
                
            
            limit: 10
        });
        return cursos.map((PaginaModel) => new Pagina(
            PaginaModel.name,
            PaginaModel.id,
            PaginaModel.RedPaginaId,
            PaginaModel.createdAt,
            PaginaModel.status
            
          
        ));
    }
    
    async searchPartial(term: string): Promise<Pagina[]> {
        const cursos = await PaginaModel.findAll({
            where: {
                name: { [Op.like]: `%${term}%` } // Debe ser name, NO id
            },
            limit: 10
        });
        return cursos.map((PaginaModel) => ({
            name: PaginaModel.name,
            RedPaginaId: PaginaModel.RedPaginaId,
            id: PaginaModel.id,
            createdAt: PaginaModel.createdAt,
            status: PaginaModel.status
        }) as Pagina);
    }
}

