import Cliente from "../domain/Cliente";
import ClienteRepository from "../domain/ClienteRepository";
import { ClienteModel } from "./Cliente.model";

export default class SequelizeClienteRepository implements ClienteRepository {
  async create(cliente: Cliente): Promise<void> {
    try {
      await ClienteModel.create({
        name: cliente.name,
        email: cliente.email,
        phone: cliente.phone,
        age: cliente.age ? cliente.age : null,
        gender: cliente.gender ? cliente.gender : null,
        address: cliente.address ? cliente.address : null,
      });
      console.log("Cliente creado exitosamente en la base de datos");
    } catch (error) {
      console.error("Error en repositorio:", error);
      throw new Error(`Error al crear el cliente: ${error}`);
    }
  }
  async createIfNotExist(cliente: Cliente): Promise<Cliente> {
    try {
      const [clienteInstance, created] = await ClienteModel.findOrCreate({
        where: {
          name: cliente.name,
          email: cliente.email,
          phone: cliente.phone,
        },
        defaults: {
          name: cliente.name,
          email: cliente.email,
          phone: cliente.phone,
          age: cliente.age ? cliente.age : null,
          gender: cliente.gender ? cliente.gender : null,
          address: cliente.address ? cliente.address : null,
        },
      });

      return new Cliente(
        clienteInstance.name,
        clienteInstance.email,
        clienteInstance.phone,
        clienteInstance.id,
        clienteInstance.age,
        clienteInstance.gender,
        clienteInstance.address
      );
    } catch (error) {
      console.error("Error en repositorio Sequelize Cliente:", error);
      return cliente;
    }
  }
  async findAll(): Promise<Cliente[]> {
    const clientes = await ClienteModel.findAll();
    const mappedClientes = clientes.map((cliente) => {
      return new Cliente(
        cliente.name,
        cliente.email,
        cliente.phone,
        cliente.id,
        cliente.age ? cliente.age : undefined,
        cliente.gender ? cliente.gender : undefined,
        cliente.address ? cliente.address : undefined
      );
    });
    return mappedClientes;
  }
}
