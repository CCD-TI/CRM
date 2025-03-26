"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const MasivosController_1 = __importDefault(require("../controllers/masivos/MasivosController"));
const Authorization_1 = require("../middlewares/Authorization");
const MasivosRouter = (0, express_1.Router)();
const masivosController = new MasivosController_1.default();
MasivosRouter.post("", Authorization_1.Authorization, masivosController.SendMasivos);
MasivosRouter.post("/excel", Authorization_1.Authorization, masivosController.SendMasivosExcel);
MasivosRouter.post("/failmessage", masivosController.FailMessage);
exports.default = MasivosRouter;
