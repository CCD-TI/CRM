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
exports.CursoModel = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const Course_model_1 = require("../../Course/infraestructure/Course.model"); // Importamos la tabla CursosCCD
let CursoModel = class CursoModel extends sequelize_typescript_1.Model {
};
exports.CursoModel = CursoModel;
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING, allowNull: false }),
    __metadata("design:type", String)
], CursoModel.prototype, "nombre", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, allowNull: false }),
    __metadata("design:type", Number)
], CursoModel.prototype, "flowId", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING, allowNull: false }),
    __metadata("design:type", String)
], CursoModel.prototype, "flowNombre", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING, allowNull: false }),
    __metadata("design:type", String)
], CursoModel.prototype, "templateNombre", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => Course_model_1.CursoCCDModel),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, allowNull: false }),
    __metadata("design:type", Number)
], CursoModel.prototype, "cursoCCDId", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => Course_model_1.CursoCCDModel),
    __metadata("design:type", Course_model_1.CursoCCDModel)
], CursoModel.prototype, "cursoCCD", void 0);
exports.CursoModel = CursoModel = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: 'Cursos' })
], CursoModel);
