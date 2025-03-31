import Formulario from "@Formulario/domain/Formulario";
import { FormularioSchema } from '@Formulario/domain/Formulario.schema';
import FormularioRepository from "@Formulario/domain/FormularioRepository";
import SequelizeFormularioRepository from "@Formulario/infraestructure/SequelizeFormularioRepository";

export default class FormularioService {

    constructor(private formularioRepository: FormularioRepository){
        this.formularioRepository = new SequelizeFormularioRepository();
    }
    async create(formulario: Formulario): Promise<void>{
        try {
            console.log(formulario);

            await this.formularioRepository.create(formulario);
            return Promise.resolve();
        } catch (error: any) {
            console.log(error);
            return Promise.reject(error);
        }
    }
    async update(formulario: Formulario): Promise<void>{
        try {
            await this.formularioRepository.update(formulario);
            return Promise.resolve();
        } catch (error) {
            return Promise.reject(error);
        }
    }
    async delete(id: number): Promise<void>{
        try {
            await this.formularioRepository.delete(id);
            return Promise.resolve();
        } catch (error) {
            return Promise.reject(error);
        }
    }
    async findById(id: number): Promise<Formulario>{
        try {
            const formulario = await this.formularioRepository.findById(id);
            return Promise.resolve(formulario);
        } catch (error) {
            return Promise.reject(error);
        }
    }

    async getFormularioByIdForm(redid: number): Promise<typeof FormularioSchema._output> {
      return await this.formularioRepository.findByIdForm(redid);
    }
    
    async findAll(): Promise<Formulario[]>{
        try {
            const formularios = await this.formularioRepository.findAll();
            return Promise.resolve(formularios);
        } catch (error) {
            return Promise.reject(error);
        }
    }
}