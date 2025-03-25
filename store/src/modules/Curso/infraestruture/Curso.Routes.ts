import { CursoController } from "./Curso.Controller";
import { Router } from 'express';
import { dataCursos } from "../../../shared/dataPrueba";

const cursoRoutes = Router();
cursoRoutes.post('/', CursoController.createCurso);
cursoRoutes.put('/:id', CursoController.updateCurso);
cursoRoutes.delete('/:id', CursoController.deleteCurso);
cursoRoutes.get('/', CursoController.findAllCursos);
cursoRoutes.get('/data', (_req:any, res:any) => {
    const data = dataCursos
    return res.json(data);
})
cursoRoutes.get('/:id', CursoController.findCursoById);

export default cursoRoutes;