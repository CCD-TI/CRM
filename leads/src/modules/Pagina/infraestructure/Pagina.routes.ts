import { Router } from "express";
import PaginaController from "./Pagina.controller";

const PaginaRouter = Router();

PaginaRouter.post("", PaginaController.create);
PaginaRouter.put("", PaginaController.update);
PaginaRouter.delete("/:id", PaginaController.delete);
PaginaRouter.get("", PaginaController.findAll);
PaginaRouter.get("/:id", PaginaController.findById);

export default PaginaRouter;