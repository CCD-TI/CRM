import Formulario from "./Formulario"

export default interface FormularioRepository {
    create(formulario: Formulario): Promise<void>
    update(formulario: Formulario): Promise<void>
    delete(id: number): Promise<void>
    findById(id: number): Promise<Formulario>
    findAll(): Promise<Formulario[]>
}