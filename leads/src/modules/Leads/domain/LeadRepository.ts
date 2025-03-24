import Lead from "./Lead";

export default interface LeadRepository {
    create(lead: Lead): Promise<void>;
    findAll(): Promise<Lead[]>;           
}