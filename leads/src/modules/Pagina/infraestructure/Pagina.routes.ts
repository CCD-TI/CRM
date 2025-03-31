import { Router } from "express";
import PaginaController from "./Pagina.controller";

const PaginaRouter = Router();

PaginaRouter.post("", PaginaController.create);
PaginaRouter.put("/:id", PaginaController.update);
PaginaRouter.delete("/:id", PaginaController.delete);
PaginaRouter.get("", PaginaController.findAll);
PaginaRouter.get("/:id(\\d+)", PaginaController.findById); // Solo acepta números
PaginaRouter.get("/search", PaginaController.searchCursos); // preguntar ah polvito


export default PaginaRouter;