// src/modules/leads/application/LeadService.ts
import LeadRepository from "../domain/LeadRepository";
import Lead from "../domain/Lead";
import SequelizeLeadRepository from "@Leads/infraestructure/SequelizeLeadRepository";

export default class LeadService {
    constructor(private LeadRepository: LeadRepository) {
        this.LeadRepository = new SequelizeLeadRepository();
    }

    async create(lead: Lead): Promise<void> {
        try{
            await this.LeadRepository.create(lead);
            return Promise.resolve();
        }catch(error){
            return Promise.reject(error);
        }
    }
    async findAll(): Promise<Lead[]> {
        
        try {
            const leads = await this.LeadRepository.findAll();
            return Promise.resolve(leads);
        } catch (error) {
            return Promise.reject(error);
        }
    }
}   