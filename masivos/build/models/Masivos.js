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
exports.Masivos = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const Flows_1 = require("./Flows");
const MasivosDlows_1 = require("./MasivosDlows");
const Usuarios_1 = require("./Usuarios");
const Bot_1 = require("./Bot");
const Sheets_1 = require("./Sheets");
let Masivos = class Masivos extends sequelize_typescript_1.Model {
};
exports.Masivos = Masivos;
__decorate([
    (0, sequelize_typescript_1.AllowNull)(false),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING),
    __metadata("design:type", String)
], Masivos.prototype, "name", void 0);
__decorate([
    (0, sequelize_typescript_1.AllowNull)(false),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.INTEGER),
    __metadata("design:type", Number)
], Masivos.prototype, "amountsend", void 0);
__decorate([
    (0, sequelize_typescript_1.AllowNull)(false),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.INTEGER),
    __metadata("design:type", Number)
], Masivos.prototype, "delaymin", void 0);
__decorate([
    (0, sequelize_typescript_1.AllowNull)(false),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.INTEGER),
    __metadata("design:type", Number)
], Masivos.prototype, "delaymax", void 0);
__decorate([
    (0, sequelize_typescript_1.AllowNull)(true),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.INTEGER),
    __metadata("design:type", Number)
], Masivos.prototype, "amountinteres", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => Flows_1.Flows),
    (0, sequelize_typescript_1.AllowNull)(true),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.INTEGER),
    __metadata("design:type", Number)
], Masivos.prototype, "flowResponderId", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => Flows_1.Flows, { as: 'flowResponder' }),
    __metadata("design:type", Flows_1.Flows)
], Masivos.prototype, "flowResponder", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => Bot_1.Bot),
    (0, sequelize_typescript_1.AllowNull)(true),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.INTEGER),
    __metadata("design:type", Number)
], Masivos.prototype, "botId", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => Bot_1.Bot),
    __metadata("design:type", Bot_1.Bot)
], Masivos.prototype, "bot", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.BOOLEAN),
    __metadata("design:type", Boolean)
], Masivos.prototype, "flagResponder", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsToMany)(() => Flows_1.Flows, {
        through: () => MasivosDlows_1.MasivosFlows,
        as: 'flows',
        foreignKey: 'masivoId',
        otherKey: 'flowId'
    }),
    __metadata("design:type", Array)
], Masivos.prototype, "flows", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => Usuarios_1.Usuarios),
    __metadata("design:type", Usuarios_1.Usuarios)
], Masivos.prototype, "usuario", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => Sheets_1.Sheets),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.INTEGER),
    __metadata("design:type", String)
], Masivos.prototype, "sheetId", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => Sheets_1.Sheets),
    __metadata("design:type", Sheets_1.Sheets)
], Masivos.prototype, "sheet", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => Usuarios_1.Usuarios),
    (0, sequelize_typescript_1.AllowNull)(true),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.INTEGER),
    __metadata("design:type", Number)
], Masivos.prototype, "usuarioId", void 0);
exports.Masivos = Masivos = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: "masivos",
    })
], Masivos);
