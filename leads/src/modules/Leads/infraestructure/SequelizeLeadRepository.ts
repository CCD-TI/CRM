import LeadRepository from "../domain/LeadRepository";
import Lead from "../domain/Lead";
import { LeadModel } from "./Lead.model";
import { FormularioModel } from "../../Formulario/infraestructure/Formulario.model";
import Formulario from "../../Formulario/domain/Formulario";

export default class SequelizeLeadRepository implements LeadRepository {

    async create(lead: Lead): Promise<void> {
        try {
            const newlead = await LeadModel.create({
                falseormularioId: lead.formularioId,
                userId: lead.userId,
                origen: lead.origen
            })
            return Promise.resolve();
        } catch (error) {
            return Promise.reject(error);
        }
    }
    async findAll(): Promise<Lead[]> {
        const leads = await LeadModel.findAll();
        const mappedLeads = leads.map((lead) => {
            return new Lead(
                lead.id,
                lead.formularioId, 
                lead.userId, 
                lead.origen
            );
        });
        return mappedLeads;
    }

}