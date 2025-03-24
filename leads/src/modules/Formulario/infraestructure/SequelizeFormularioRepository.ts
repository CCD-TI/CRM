import FormularioRepository from "@Formulario/domain/FormularioRepository";
import { FormularioModel } from "./Formulario.model";
import Formulario from "@Formulario/domain/Formulario";

export default class SequelizeFormularioRepository implements FormularioRepository{
    async create(formulario: Formulario): Promise<void> {
        try {
            await FormularioModel.create({
                name: formulario.name,
                RedFormularioId: formulario.RedFormularioId,
                cursoId: formulario.cursoId,
                campanaId: formulario.campanaId
            });
        } catch (error) {
            return Promise.reject(error);
        }
    }
    async update(formulario: Formulario): Promise<void> {
        try {
            await FormularioModel.update({
                name: formulario.name,
                RedFormularioId: formulario.RedFormularioId,
                cursoId: formulario.cursoId,
                campanaId: formulario.campanaId
            }, {
                where: {
                    id: formulario.id
                }
            });
        } catch (error) {
            return Promise.reject(error);
        }
    }
    async delete(id: number): Promise<void> {
        try {
            await FormularioModel.destroy({
                where: {
                    id
                }
            });
        } catch (error) {
            return Promise.reject(error);
        }
    }

    async findById(id: number): Promise<Formulario> {
        try {
            const formulario = await FormularioModel.findByPk(id);
            if (!formulario) {
                throw new Error("Formulario no encontrado");
            }
            const formularioFound = new Formulario(formulario.id, formulario.name, formulario.RedFormularioId, formulario.cursoId, formulario.campanaId);
            return Promise.resolve(formularioFound);
        } catch (error) {
            return Promise.reject(error);
        }
    }
    async findAll(): Promise<Formulario[]> {
        try {
            const formularios = await FormularioModel.findAll();
            const mappedformularios = formularios.map((formulario) => new Formulario(formulario.id, formulario.name, formulario.RedFormularioId, formulario.cursoId, formulario.campanaId));
            return Promise.resolve(mappedformularios);
        } catch (error) {
            return Promise.reject(error);
        }
    }
}