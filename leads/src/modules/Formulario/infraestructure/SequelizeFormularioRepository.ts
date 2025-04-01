import FormularioRepository from "@Formulario/domain/FormularioRepository";
import { FormularioModel } from "./Formulario.model";
import Formulario from "../domain/Formulario";
import { FormularioSchema } from '@Formulario/domain/Formulario.schema';
import { Op } from "sequelize";

export default class SequelizeFormularioRepository implements FormularioRepository{
    async create(formulario: Formulario): Promise<void> {
        try {
            await FormularioModel.create({
                name: formulario.name,
                RedFormularioId: formulario.RedFormularioId,
                cursoId: formulario.cursoId,
                campanaId: formulario.campanaId,
                botId: formulario.botId,
                botName: formulario.botName
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
                campanaId: formulario.campanaId,
                botId: formulario.botId,
                botName: formulario.botName,
                status: formulario.status
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
            const formularioFound = new Formulario( 
                formulario.name, 
                formulario.RedFormularioId, 
                formulario.cursoId, 
                formulario.status, 
                formulario.campanaId,
                formulario.id, 
                formulario.botId,
                formulario.botName,
                formulario.createdAt, 
                formulario.updatedAt,
                );
            return Promise.resolve(formularioFound);
        } catch (error) {
            return Promise.reject(error);
        }
    }

    async findByIdForm(redid: number): Promise<Formulario> {
      try {
        const formularioModel = await FormularioModel.findOne({ where: { RedFormularioID: redid } });
        if (!formularioModel) {
          throw new Error(`Formulario con RedFormularioID ${redid} no encontrado`);
        }
        // Valida y transforma el objeto para que cumpla con el schema y el tipo Formulario
        //const formularioValidado = FormularioSchema.parse(formularioModel);
        const formulario = new Formulario(formularioModel.name, formularioModel.RedFormularioId, formularioModel.cursoId, formularioModel.campanaId, formularioModel.botId, formularioModel.id);
        console.log(formulario);
        return formulario; 
      } catch (error) {
        console.error("Error en findByIdForm:", error);
        throw error;
      }
    }

    async findAll(): Promise<Formulario[]> {
        try {
            const formularios = await FormularioModel.findAll();
            const mappedformularios = formularios.map((formulario) => new Formulario(
                    formulario.name, 
                    formulario.RedFormularioId, 
                    formulario.cursoId,
                     formulario.status,
                     formulario.campanaId, 
                     formulario.id,
                     formulario.botId, 
                     formulario.botName, 
                     formulario.createdAt, 
                     formulario.updatedAt, 
                    ));
            return Promise.resolve(mappedformularios);
        } catch (error) {
            return Promise.reject(error);
        }
    }

     async searchExact(term: string): Promise<Formulario[]> {
            const Formulario = await FormularioModel.findAll({
                where: 
                 
                        { name: { [Op.eq]: term } },      // Búsqueda exacta por nombre
                       
                   
                    
                
                limit: 10,
                raw: true,
            });
            return Formulario
        }
        
        async searchPartial(term: string): Promise<Formulario[]> {
            const Formulario = await FormularioModel.findAll({
                where: {
                    name: { [Op.like]: `%${term}%` } // Debe ser name, NO id
                },
                limit: 10,
                raw: true,
            });
            return Formulario
        }
    
    
}