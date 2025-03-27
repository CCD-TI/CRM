// src/modules/leads/application/LeadService.ts
import LeadRepository from "../domain/LeadRepository";
import Lead from "../domain/Lead";
import SequelizeLeadRepository from "@Leads/infraestructure/SequelizeLeadRepository";

export default class LeadService {
  constructor(private leadRepository: LeadRepository) {}

    async create(leadPayload: Lead): Promise<void> {
        try{
          await this.leadRepository.create(leadPayload);
        }catch(error){
          throw new Error(`Error en servicio al crear el lead: ${error}`);
        }
    }
    async findAll(): Promise<Lead[]> {
      try {
          return await this.leadRepository.findAll();
      } catch (error) {
          throw new Error(`Error en servicio al obtener los leads: ${error}`);
      }
    }
}   