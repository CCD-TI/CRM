import LeadRepository from "../domain/LeadRepository";
import Lead from "../domain/Lead";
import { LeadModel } from "./Lead.model";
import { FormularioModel } from "../../Formulario/infraestructure/Formulario.model";
import Formulario from "../../Formulario/domain/Formulario";

export default class SequelizeLeadRepository implements LeadRepository {

    async create(lead: Lead): Promise<void> {
       try {
            // Aquí se utiliza falseormularioId según lo solicitado.
            await LeadModel.create({
                formularioId: lead.formularioId,
                userId: lead.clienteId,
                origen: lead.origen
            });
            console.log("Lead creado exitosamente en la base de datos");
        } catch (error) {
            console.error("Error en repositorio:", error);
            throw new Error(`Error al crear el lead: ${error}`);
        }
    }
    async findAll(): Promise<Lead[]> {
        const leads = await LeadModel.findAll();
        const mappedLeads = leads.map((lead) => {
            return new Lead(
                lead.id,
                lead.formularioId, 
                lead.clienteId, 
                lead.origen
            );
        });
        return mappedLeads;
    }

}