import { Router } from "express";
import CampanaController from "./Campana.controller";

const CampanaRouter = Router();

CampanaRouter.post("", CampanaController.create);
CampanaRouter.put("/:id", CampanaController.update);
CampanaRouter.delete("/:id", CampanaController.delete);
CampanaRouter.get("/:paginaId/search", CampanaController.searchCursos);
CampanaRouter.get("", CampanaController.findAll);
CampanaRouter.get("/:paginaId", CampanaController.findByPaginaId);

export default CampanaRouter;