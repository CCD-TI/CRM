"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CursoCCDModel = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const Curso_model_1 = require("../../Curso/infraestruture/Curso.model"); // Importamos la tabla Cursos
let CursoCCDModel = class CursoCCDModel extends sequelize_typescript_1.Model {
};
exports.CursoCCDModel = CursoCCDModel;
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING, allowNull: false }),
    __metadata("design:type", String)
], CursoCCDModel.prototype, "curso", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING, allowNull: false }),
    __metadata("design:type", Number)
], CursoCCDModel.prototype, "nomenclatura", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING, allowNull: false }),
    __metadata("design:type", String)
], CursoCCDModel.prototype, "estado", void 0);
__decorate([
    (0, sequelize_typescript_1.HasOne)(() => Curso_model_1.CursoModel),
    __metadata("design:type", Curso_model_1.CursoModel)
], CursoCCDModel.prototype, "cursoRelacionado", void 0);
exports.CursoCCDModel = CursoCCDModel = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: 'CursosCCD' })
], CursoCCDModel);
