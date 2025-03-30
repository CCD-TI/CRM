import { Router } from "express";
import LeadController from "@Leads/infraestructure/Lead.controller";
import Lead from "@Leads/domain/Lead";

const LeadRouter = Router();

LeadRouter.get("/", LeadController.findAll);
LeadRouter.post("/createforms", LeadController.create);
LeadRouter.post("/leadgen", LeadController.leadgen);
// router.get("/:id", getLeadById);

export default LeadRouter;
