import Cliente from "../domain/Cliente";
import ClienteRepository from "../domain/ClienteRepository";

export default class ClienteService {
    constructor(private clienteRepository: ClienteRepository){
        this.clienteRepository = clienteRepository;
    }    
    async create(clientePayload: Cliente): Promise<void> {
        try{
            await this.clienteRepository.create(clientePayload);
        }catch(error){
            throw new Error(`Error en servicio al crear el cliente: ${error}`);
        }
    }
    async createIfNotExist(clientePayload: Cliente): Promise<Cliente> {
        try{
            const cliente = await this.clienteRepository.createIfNotExist(clientePayload);
            return cliente;
        }catch(error){
            throw new Error(`Error en servicio al crear el cliente: ${error}`);
        }
    }
    async findAll(): Promise<Cliente[]> {
        try {
            return await this.clienteRepository.findAll();
        } catch (error) {
            throw new Error(`Error en servicio al obtener los clientes: ${error}`);
        }
    }
}