import { Request, Response } from "express";
import Lead from "../domain/Lead"; // Asegúrate de que la ruta sea correcta
import LeadRepository from "@Leads/domain/LeadRepository"; // Asegúrate de que la ruta sea correcta
import SequelizeLeadRepository from "@Leads/infraestructure/SequelizeLeadRepository";
import LeadService from "../application/LeadService";
import FormularioService from "../../Formulario/aplication/FormularioService";
import FormularioRepository from "../../Formulario/domain/FormularioRepository";
import SequelizeFormularioRepository from "../../Formulario/infraestructure/SequelizeFormularioRepository";
import { ClienteSchema } from "modules/Clientes/domain/Cliente.schema";
import Cliente from "modules/Clientes/domain/Cliente";
import ClienteRepository from "modules/Clientes/domain/ClienteRepository";
import SequelizeClienteRepository from "modules/Clientes/infraestructure/SequelizeClienteRepository";
import ClienteService from "modules/Clientes/application/ClientesService";
import RabbitMQService from "shared/rabbitmq/RabbitMQService";

const clienteRepository: ClienteRepository = new SequelizeClienteRepository();
const clienteService = new ClienteService(clienteRepository);

const leadRepository: LeadRepository = new SequelizeLeadRepository();
const leadService = new LeadService(leadRepository);

const formRepository: FormularioRepository = new SequelizeFormularioRepository();
const formService = new FormularioService(formRepository);
export default class LeadController {
  // Crear un nuevo Lead
  static async create(req: Request, res: Response): Promise<void> {
    try {
      // Recibe un array o un objeto único
      const { formId, leadgenId, platform, fieldData } = req.body;
      if (!formId || !leadgenId) {
        throw new Error("Datos insuficientes para crear un lead");
      }
      const validateDataCliente = ClienteSchema.parse(fieldData);
      const newCliente = new Cliente(validateDataCliente.name, validateDataCliente.email, validateDataCliente.phone);
      const cliente = await clienteService.createIfNotExist(newCliente);
      console.log("IDFORM: ", formId);
      // Se busca el formulario por RedFormularioID usando el service
      const formulario = await formService.getFormularioByIdForm(
        Number(formId)
      );

      // Crear la entidad Lead usando el RedFormularioID obtenido
      const leadEntity = new Lead(
        null, // ID se asigna automáticamente
        Number(formulario.id),
        cliente.id ? cliente.id : null,
        platform
      );
      await leadService.create(leadEntity);

      const storageServiceUrl = process.env.STORAGE_SERVICE_URL ?? "http://host.docker.internal:8004";

      const response = await fetch(`${storageServiceUrl}/curso/info-crm/${formulario.cursoId}`);
      if(!response.ok){
        res.status(500).json({ error: "Error al obtener el curso" });
      }
      const {curso, flow, bots} = await response.json();
      console.log('=================================================================')
      console.log('=====================LLEGA DE CONSULTAR CURSOS===================')
      console.log('=================================================================')
      console.log({curso, flow, bots})
      const rabbitMQ = await RabbitMQService.getInstance();

      //enviando a servicio mailing
      await rabbitMQ.sendMessage("emailQueue", JSON.stringify(
        {
          email: cliente.email,
          name: cliente.name,
          Template: "Generic"
        }
      ));

      for(const bot of bots){
        const routingkey = "51" + bot.phone.toString();
        const cantdelay =  (Math.floor(Math.random() * (20 - 5 + 1)) + 5) *1000;
        const message = { number: cliente.phone, delai: cantdelay, flow};
        //envio a whatsapp
        await rabbitMQ.sendMessageToExchange(
          "botcrm",
          routingkey,
          JSON.stringify(message)
        );
        
        
      }
      res.status(201).json({ message: "Lead(s) creado(s) exitosamente", status: true, curso, flow, bots });
    } catch (error: any) {
      console.error("Error en controller:", error);
      res.status(500).json({ error: "Error al crear el lead", message: error.message });
    }
  }
  static async findAll(req: Request, res: Response) {
    try {
      const leads = await leadService.findAll();
      res.status(200).json(leads);
    } catch (error) {
      res.status(500).json({ error: "No se mostraron" });
    }
  }
  static async leadgen(req: Request, res: Response) {
    try {
      console.log(req.body);
      res.status(200).json({ status: true });
    } catch (error) {
      res.status(500).json({ error: "No se mostraron" });
    }
  }
}
