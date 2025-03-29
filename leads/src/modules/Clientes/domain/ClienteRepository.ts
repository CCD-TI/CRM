import Cliente from "./Cliente";

export default interface ClienteRepository{
    create (cliente: Cliente): Promise<void>;
    createIfNotExist(cliente: Cliente): Promise<Cliente>;
    findAll(): Promise<Cliente[]>;
}