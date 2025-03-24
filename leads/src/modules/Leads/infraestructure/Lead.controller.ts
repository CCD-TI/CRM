import { Request, Response } from "express";
import Lead from "../domain/Lead"; // Asegúrate de que la ruta sea correcta
import LeadRepository from "@Leads/domain/LeadRepository"; // Asegúrate de que la ruta sea correcta
import SequelizeLeadRepository from "@Leads/infraestructure/SequelizeLeadRepository";
import { LeadSchema } from "../domain/Lead.schema";
import LeadService from "../application/LeadService";

const leadRepository: LeadRepository = new SequelizeLeadRepository();
const leadService = new LeadService(leadRepository);

export default class LeadController {
  // Crear un nuevo Lead
  static async create(req: Request, res: Response): Promise<void> {
    try {
      const validatedData = LeadSchema.parse(req.body);
      await leadService.create(validatedData);
      res.status(201).json({ message: "Lead creado exitosamente" });
    } catch (error) {
      res.status(500).json({ error: "Error al crear la lead" });
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
  static async leadgen(req: Request, res: Response){
    try {
      console.log(req.body);
      res.status(200).json({status:true});
    } catch (error) {
      res.status(500).json({ error: "No se mostraron" });
    }
  }
}
