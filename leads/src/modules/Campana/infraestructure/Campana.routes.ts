import { Router } from "express";
import CampanaController from "./Campana.controller";

const CampanaRouter = Router();

CampanaRouter.post("", CampanaController.create);
CampanaRouter.put("", CampanaController.update);
CampanaRouter.delete("/:id", CampanaController.delete);
CampanaRouter.get("", CampanaController.findAll);
CampanaRouter.get("/:id", CampanaController.findById);

export default CampanaRouter;