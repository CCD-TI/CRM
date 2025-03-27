import { Request, Response } from "express";
import Lead from "../domain/Lead"; // Asegúrate de que la ruta sea correcta
import LeadRepository from "@Leads/domain/LeadRepository"; // Asegúrate de que la ruta sea correcta
import SequelizeLeadRepository from "@Leads/infraestructure/SequelizeLeadRepository";
import { LeadSchema } from "../domain/Lead.schema";
import LeadService from "../application/LeadService";
import FormularioService from '../../Formulario/aplication/FormularioService';
import FormularioRepository from '../../Formulario/domain/FormularioRepository';
import SequelizeFormularioRepository from '../../Formulario/infraestructure/SequelizeFormularioRepository';

const leadRepository: LeadRepository = new SequelizeLeadRepository();
const formRepository: FormularioRepository = new SequelizeFormularioRepository();
const leadService = new LeadService(leadRepository);
const formService = new FormularioService(formRepository);
export default class LeadController {
  // Crear un nuevo Lead
  static async create(req: Request, res: Response): Promise<void> {
    try {
        // Recibe un array o un objeto único
        const leadsData = Array.isArray(req.body) ? req.body : [req.body];

        await Promise.all(
          leadsData.map(async (data) => {
            const { formId, leadgenId, Platform } = data;
            if (!formId || !leadgenId) {
              throw new Error("Datos insuficientes para crear un lead");
            }
  
            // Se busca el formulario por RedFormularioID usando el service
            const formulario = await formService.getFormularioByIdForm(Number(formId));
            
            // Crear la entidad Lead usando el RedFormularioID obtenido
            const leadEntity = new Lead(
              null, // ID se asigna automáticamente
              Number(formulario.id),
              Number(leadgenId),
              Platform
            );
  
            return leadService.create(leadEntity);
          })
        );

        res.status(201).json({ message: "Lead(s) creado(s) exitosamente" });
    } catch (error) {
        console.error("Error en controller:", error);
        res.status(500).json({ error: "Error al crear el lead" });
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
