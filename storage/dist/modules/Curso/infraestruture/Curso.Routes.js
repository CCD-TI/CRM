"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Curso_Controller_1 = require("./Curso.Controller");
const express_1 = require("express");
const dataPrueba_1 = require("../../../shared/dataPrueba");
const cursoRoutes = (0, express_1.Router)();
cursoRoutes.post('/', Curso_Controller_1.CursoController.createCurso);
cursoRoutes.put('/:id', Curso_Controller_1.CursoController.updateCurso);
cursoRoutes.delete('/:id', Curso_Controller_1.CursoController.deleteCurso);
cursoRoutes.get('/', Curso_Controller_1.CursoController.findAllCursos);
cursoRoutes.get('/data', (_req, res) => {
    const data = dataPrueba_1.dataCursos;
    return res.json(data);
});
cursoRoutes.get('/:id', Curso_Controller_1.CursoController.findCursoById);
exports.default = cursoRoutes;
