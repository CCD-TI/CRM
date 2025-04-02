import CampanaRepository from "../domain/CampanaRepository";
import Campana from "../domain/Campana";
import { CampanaModel } from "./Campana.model";
import { Op } from "sequelize";
export default class SequelizeCampanaRepository implements CampanaRepository {

    async create(campana: Campana): Promise<void> {
        await CampanaModel.create({
            name: campana.name,
            RedCampanaId: campana.RedCampanaId,
            paginaId: campana.paginaId
        });
        return Promise.resolve();
    }
    async update(id:number, campana: Campana): Promise<Campana> {
           await CampanaModel.update(campana as any, { where: { id } });
           return campana;
       }
   
    async delete(paginaId: number): Promise<void> {
        await CampanaModel.destroy({
            where: {
                paginaId 
            }
        });
        return Promise.resolve();
    }
    async findById(id: number,): Promise<Campana> {
        const whereCondition: any = { id };


        const campana = await CampanaModel.findOne({ where: whereCondition });
        if (!campana) {
            throw new Error("Campana no encontrada");
        }

        return new Campana(campana.name, campana.RedCampanaId, campana.paginaId, campana.status, campana.id);
    }
    async findAll(): Promise<Campana[]> {
        const campanas = await CampanaModel.findAll();
        const mappedcampanas = campanas.map((campana) => new
            Campana(campana.name,
                campana.RedCampanaId,
                campana.paginaId,
                campana.status,
                campana.id,));
        return Promise.resolve(mappedcampanas);
    }

    async findByPaginaId(paginaId: number): Promise<Campana[]> {
        const campanas = await CampanaModel.findAll({
            where: { paginaId },
            raw: true,  // Esto devuelve los resultados directamente como objetos
        });

        if (!campanas || campanas.length === 0) {
            throw new Error("No se encontraron campañas para la página proporcionada.");
        }

        return campanas;  // Devuelves los objetos tal como están
    }



    async searchExact(term: string, paginaId: number): Promise<Campana[]> {
        if (!term || term.trim() === "") {
            throw new Error("El término de búsqueda no puede estar vacío.");
        }
        
        const campanas = await CampanaModel.findAll({
            where: {
                // Ambas condiciones deben cumplirse (AND)
                [Op.and]: [
                    { name: { [Op.eq]: term } },  // Búsqueda exacta por nombre
                    { paginaId: paginaId }        // Y debe coincidir con este paginaId
                ]
            },
            attributes: ['id', 'name', 'RedCampanaId', 'status', 'paginaId', 'createdAt', 'updatedAt'],
            raw: true,
            limit: 10
        });
        
        return campanas;
    }


    async searchPartial(term: string ,paginaId: number): Promise<Campana[]> {
        const cursos = await CampanaModel.findAll({
            where: {
                [Op.and]: [
                    {name: { [Op.like]: `%${term}%` }}, //   // Búsqueda exacta por nombre
                    { paginaId: paginaId }        // Y debe coincidir con este paginaId
                ]

            },
            attributes: ['id', 'name', 'RedCampanaId', 'status', 'paginaId', 'createdAt', 'updatedAt'],  // Especifica todas las columnas explícitamente
            raw: true,  // Obtendrá las columnas en formato JSON
            limit: 10  // 🔹 Se puede hacer configurable
        });

        return cursos
    
    }

}

