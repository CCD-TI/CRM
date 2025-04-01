import Formulario from "./Formulario"
import { FormularioSchema } from './Formulario.schema';

export default interface FormularioRepository {
    create(formulario: Formulario): Promise<void>
    update(formulario: Formulario): Promise<void>
    delete(id: number): Promise<void>
    findById(id: number): Promise<Formulario>
    findAll(): Promise<Formulario[]>
    findByIdForm(id: number): Promise<typeof FormularioSchema._output>


    searchExact(term: string): Promise<Formulario[]>; // Nueva: búsqueda exacta
    searchPartial(term: string): Promise<Formulario[]>; // Nueva: búsqueda parcial
}