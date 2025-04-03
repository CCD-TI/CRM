import { Router } from "express";
import MailingController from "../controllers/mailing/MailingController";

const mailingRouter = Router();
const mailingController = new MailingController()

mailingRouter.post("/excel", mailingController.RegisterMailingExcel)

export default mailingRouter;