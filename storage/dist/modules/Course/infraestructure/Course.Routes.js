"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Course_Controller_1 = require("./Course.Controller");
const express_1 = require("express");
const dataPrueba_1 = require("../../../shared/dataPrueba");
const cursoRoutes = (0, express_1.Router)();
cursoRoutes.post('/', Course_Controller_1.CursoController.createCurso);
cursoRoutes.put('/:id', Course_Controller_1.CursoController.updateCurso);
cursoRoutes.delete('/:id', Course_Controller_1.CursoController.deleteCurso);
cursoRoutes.get('/', Course_Controller_1.CursoController.findAllCursos);
cursoRoutes.get('/data', (_req, res) => {
    const data = dataPrueba_1.dataCursos;
    return res.json(data);
});
cursoRoutes.get('/:id', Course_Controller_1.CursoController.findCursoById);
exports.default = cursoRoutes;
