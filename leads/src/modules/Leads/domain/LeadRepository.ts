import Lead from "./Lead";

export default interface LeadRepository {
  create(leadPayload: Lead): Promise<void>;
    findAll(): Promise<Lead[]>;           
}