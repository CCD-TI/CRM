import CampanaRepository from "../domain/CampanaRepository";
import Campana from "../domain/Campana";
import { CampanaModel } from "./Campana.model";
export default class SequelizeCampanaRepository implements CampanaRepository {

    async create(campana: Campana): Promise<void> {
        await CampanaModel.create({
            name: campana.name,
            RedCampanaId: campana.RedCampanaId,
            paginaId: campana.paginaId
        });
        return Promise.resolve();
    }
    async update(campana: Campana): Promise<void> {
        await CampanaModel.update({
            name: campana.name,
            RedCampanaId: campana.RedCampanaId,
            paginaId: campana.paginaId
        }, {
            where: {
                id: campana.id
            }
        });
        return Promise.resolve();
    }
    async delete(id: number): Promise<void> {
        await CampanaModel.destroy({
            where: {
                id
            }
        });
        return Promise.resolve();
    }
    async findById(id: number): Promise<Campana> {
        const campana = await CampanaModel.findByPk(id);
        if (!campana) {
            throw new Error("Campana no encontrada");
        }
        const campanaFound = new Campana(campana.id, campana.name, campana.RedCampanaId, campana.paginaId);
        return Promise.resolve(campanaFound);
    }
    async findAll(): Promise<Campana[]> {
        const campanas = await CampanaModel.findAll();
        const mappedcampanas = campanas.map((campana) => new Campana(campana.id, campana.name, campana.RedCampanaId, campana.paginaId));
        return Promise.resolve(mappedcampanas);
    }
}
