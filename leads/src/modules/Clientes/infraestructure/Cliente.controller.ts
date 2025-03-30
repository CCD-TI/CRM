import ClienteRepository from "../domain/ClienteRepository";
import SequelizeClienteRepository from "./SequelizeClienteRepository";
import ClienteService from "../application/ClientesService";
import { ClienteSchema } from "../domain/Cliente.schema";
import Cliente from "../domain/Cliente";
import { Request, Response } from "express";

const clienteRepository: ClienteRepository = new SequelizeClienteRepository();
const clienteService = new ClienteService(clienteRepository);

export default class ClienteController{
    static async create(req: Request, res: Response): Promise<void>{
        try {
            const validateData = ClienteSchema.parse(req.body);
            const newCliente = new Cliente(validateData.name, validateData.email, validateData.phone);   
            await clienteService.create(newCliente);
            res.status(200).json({ message: 'Cliente creado exitosamente' });
        } catch (error) {
            res.status(500).json({ error: 'Error al crear el cliente' });
        }
    }
    static async createIfNotExist(req: Request, res: Response): Promise<void>{
        try {
            const validateData = ClienteSchema.parse(req.body);
            const newCliente = new Cliente(validateData.name, validateData.email, validateData.phone);
            const cliente = await clienteService.createIfNotExist(newCliente);
            res.status(200).json({ message: 'Cliente creado exitosamente', cliente });
        } catch (error) {
            res.status(500).json({ error: 'Error al crear el cliente' });
        }
    }
    static async findAll(req: Request, res: Response): Promise<void>{
        try {
            const clientes = await clienteService.findAll();
            res.status(200).json(clientes);
        } catch (error) {
            res.status(500).json({ error: 'Error al obtener los clientes' });
        }
    }
}