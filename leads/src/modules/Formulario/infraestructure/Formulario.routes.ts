import { Router } from "express";
import FormularioController from "./Formulario.controller";

const FormularioRouter = Router();

FormularioRouter.post("", FormularioController.create);
FormularioRouter.put("", FormularioController.update);
FormularioRouter.delete("/:id", FormularioController.delete);
FormularioRouter.get("", FormularioController.findAll);
FormularioRouter.get("/:id", FormularioController.findById);

export default FormularioRouter;