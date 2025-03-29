import { Router } from "express";
import ClienteController from "./Cliente.controller";

const ClienteRouter = Router();

ClienteRouter.get("/", ClienteController.findAll);
ClienteRouter.post("/", ClienteController.create);
ClienteRouter.post("/createIfNotExist", ClienteController.createIfNotExist);