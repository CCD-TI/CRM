"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AsignacionesController = void 0;
const sequelize_1 = require("sequelize");
const AsignacionLead_1 = require("../../models/AsignacionLead");
const Asignaciones_1 = require("../../models/Asignaciones");
const Leads_1 = require("../../models/Leads");
const RabbitMQService_1 = __importDefault(require("../../services/RabbitMQService"));
const TaskQueueService_1 = require("../../services/TaskQueueService");
const Bot_1 = require("../../models/Bot");
const Flows_1 = require("../../models/Flows");
const Usuarios_1 = require("../../models/Usuarios");
class AsignacionesController {
    constructor() {
        this.sendAsignaciones = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, numeros, flow, bot, delaymin, delaymax } = req.body.asignaciones;
                if (numeros.length == 0)
                    return res.status(400).json({
                        error: "no puedes enviar una asignacion sin numeros de destino",
                    });
                //const numbers = numeros.map((numero: any) => ({ number: numero }));
                for (const numero of numeros) {
                    yield Leads_1.Leads.findOrCreate({
                        where: { number: numero },
                        defaults: { number: numero, status: true, metodo: "ASIGNACION" },
                    });
                }
                const clientes = yield Leads_1.Leads.findAll({
                    where: { number: numeros },
                });
                const newasignacion = yield Asignaciones_1.Asignaciones.create({
                    name,
                    amountsend: numeros.length,
                    botId: bot.id,
                    flowId: flow.id,
                    currentflow: flow,
                    usuarioId: req.data.id,
                    status: 'PENDIENTE'
                });
                const asigbulk = numeros
                    .map((numero) => {
                    const cliente = clientes.find((c) => c.number === numero);
                    return cliente
                        ? {
                            asignacionId: newasignacion.id,
                            leadId: cliente.id,
                            status: "PENDIENTE",
                        }
                        : null;
                })
                    .filter((item) => item !== null);
                yield AsignacionLead_1.AsignacionLead.bulkCreate(asigbulk);
                const rabbitMQ = yield RabbitMQService_1.default.getInstance();
                const exchange = "asesores";
                for (const numero of numeros) {
                    const routingKey = "51" + bot.phone.toString();
                    const cantdelay = (Math.floor(Math.random() * (delaymax - delaymin + 1)) + delaymin) *
                        1000;
                    const message = { number: numero, delai: cantdelay, flow, asignacion: newasignacion.id };
                    yield rabbitMQ.sendMessageToExchange(exchange, routingKey, JSON.stringify(message));
                }
                return res
                    .status(200)
                    .json({ message: "se registraron correctamente la asignacion" });
                /* .redirect("/newasignacion"); */
            }
            catch (error) {
                console.log("error en envio de asignaciones", error.message);
                return res.status(500).json({
                    message: "error en envio de asignaciones",
                    error: error.menssage,
                });
            }
        });
        this.FailMessage = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { number, error, asignacion } = req.body;
                const lead = yield Leads_1.Leads.findOne({
                    where: {
                        number,
                    },
                });
                if (!lead)
                    return res
                        .status(404)
                        .json({ message: "no se encontro el cliente de este numero" });
                const ultimaAsignacion = yield AsignacionLead_1.AsignacionLead.findOne({
                    where: { leadId: lead.id,
                        asignacionId: asignacion
                    },
                });
                if (!ultimaAsignacion) {
                    return res.status(404).json({
                        message: "No se encontró ninguna asignación para este cliente",
                    });
                }
                yield ultimaAsignacion.update({
                    status: "ERROR",
                    observacionstatus: error,
                });
                return res.status(200).json();
            }
            catch (error) {
                console.error("Error en FailMessage:", error.message);
                return res.status(500).json({
                    message: "Error al actualizar la asignación",
                    error: error.message,
                });
            }
        });
        this.ProgramarAsignacion = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, numeros, flow, bot, delaymin, delaymax } = req.body.asignaciones;
                const { programacion } = req.body;
                console.log("fecha de programacion", programacion);
                if (numeros.length == 0)
                    return res.status(400).json({
                        error: "no puedes enviar una asignacion sin numeros de destino",
                    });
                for (const numero of numeros) {
                    yield Leads_1.Leads.findOrCreate({
                        where: { number: numero },
                        defaults: { number: numero, status: true, metodo: "ASIGNACION" },
                    });
                }
                const clientes = yield Leads_1.Leads.findAll({
                    where: { number: numeros },
                });
                const newasignacion = yield Asignaciones_1.Asignaciones.create({
                    name,
                    amountsend: numeros.length,
                    botId: bot.id,
                    flowId: flow.id,
                    currentflow: flow,
                    delaymin: delaymin,
                    delaymax: delaymax,
                    status: 'PENDIENTE'
                });
                const asigbulk = numeros
                    .map((numero) => {
                    const cliente = clientes.find((c) => c.number === numero);
                    const cantdelay = (Math.floor(Math.random() * (delaymax - delaymin + 1)) + delaymin) *
                        1000;
                    return cliente
                        ? {
                            asignacionId: newasignacion.id,
                            leadId: cliente.id,
                            status: "PENDIENTE",
                            delay: cantdelay,
                        }
                        : null;
                })
                    .filter((item) => item !== null);
                yield AsignacionLead_1.AsignacionLead.bulkCreate(asigbulk);
                const taskQueueService = new TaskQueueService_1.TaskQueueService();
                const idjob = yield taskQueueService.scheduleTask(programacion, newasignacion.id);
                return res
                    .status(200)
                    .json({ message: `Asignacion programada, jobId: ${idjob}` });
            }
            catch (error) {
                console.log("error en envio de asignaciones", error.message);
                return res.status(500).json({
                    message: "error en envio de asignaciones",
                    error: error.menssage,
                });
            }
        });
        this.ChangeStatus = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { number, status, asignacion } = req.body;
                const lead = yield Leads_1.Leads.findOne({
                    where: {
                        number,
                    },
                });
                if (!lead)
                    return res
                        .status(404)
                        .json({ message: "no se encontro el cliente de este numero" });
                const ultimaAsignacion = yield AsignacionLead_1.AsignacionLead.findOne({
                    where: {
                        leadId: lead.id,
                        asignacionId: asignacion
                    }
                });
                if (!ultimaAsignacion) {
                    return res.status(404).json({
                        message: "No se encontró ninguna asignación para este cliente",
                    });
                }
                yield ultimaAsignacion.update({
                    status,
                });
                return res.status(200).json();
            }
            catch (error) {
                return res.status(500).json({
                    message: "Error al actualizar la asignación",
                });
            }
        });
        this.searchAsignacion = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { search, page = 1, limit = 10 } = req.body;
            const offset = (page - 1) * limit;
            try {
                const total = yield Asignaciones_1.Asignaciones.count({
                    where: {
                        name: {
                            [sequelize_1.Op.like]: `%${search}%`
                        }
                    }
                });
                const asignaciones = yield Asignaciones_1.Asignaciones.findAll({
                    where: {
                        name: {
                            [sequelize_1.Op.like]: `%${search}%`
                        }
                    },
                    include: [
                        { model: Bot_1.Bot, attributes: ["name", "phone"] },
                        { model: Flows_1.Flows, attributes: ["name"] },
                        { model: Usuarios_1.Usuarios, attributes: ["name"] }
                    ],
                    order: [['createdAt', 'DESC']],
                    limit,
                    offset
                });
                const format = asignaciones.map(asignacion => {
                    var _a, _b, _c, _d;
                    return ({
                        id: asignacion.id,
                        name: asignacion.name,
                        createdAt: asignacion.createdAt,
                        amountsend: asignacion.amountsend,
                        botname: ((_a = asignacion.bot) === null || _a === void 0 ? void 0 : _a.name) || "BOT NO EXISTE",
                        botphone: ((_b = asignacion.bot) === null || _b === void 0 ? void 0 : _b.phone) || "SIN TELÉFONO",
                        flowname: ((_c = asignacion.flow) === null || _c === void 0 ? void 0 : _c.name) || "SIN FLUJO",
                        currentflow: asignacion.currentflow,
                        usuario: ((_d = asignacion.usuario) === null || _d === void 0 ? void 0 : _d.name) || "USUARIO NO EXISTE",
                        status: asignacion.status
                    });
                });
                return res.status(200).json({
                    asignaciones: format,
                    total, // Total de registros
                    page, // Página actual
                    pages: Math.ceil(total / limit) // Total de páginas
                });
            }
            catch (error) {
                return res.status(500).json({
                    message: 'Error interno al buscar',
                    error: error.message
                });
            }
        });
    }
}
exports.AsignacionesController = AsignacionesController;
