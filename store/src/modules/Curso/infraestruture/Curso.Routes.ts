import { CursoController } from "./Curso.Controller";
import { Router } from 'express';

const cursoRoutes = Router();
cursoRoutes.post('/', CursoController.createCurso);
cursoRoutes.put('/:id', CursoController.updateCurso);
cursoRoutes.delete('/:id', CursoController.deleteCurso);
cursoRoutes.get('/', CursoController.findAllCursos);
cursoRoutes.get('/:id', CursoController.findCursoById);

export default cursoRoutes;