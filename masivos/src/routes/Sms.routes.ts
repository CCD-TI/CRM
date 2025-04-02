import { Router } from "express";
import { SmsController } from "../controllers/sms/SmsController";

export const SmsRouter = Router();
const smscontroller = new SmsController();

SmsRouter.post("", smscontroller.send);
SmsRouter.post("/search", smscontroller.search);

