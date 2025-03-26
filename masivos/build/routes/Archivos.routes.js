"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ArchivosController_1 = require("../controllers/archivos/ArchivosController");
const upload_1 = require("../middlewares/upload");
const ArchivoRouter = (0, express_1.Router)();
const archivosController = new ArchivosController_1.ArchivosController();
ArchivoRouter.post('', upload_1.upload.single("files"), archivosController.upload);
exports.default = ArchivoRouter;
