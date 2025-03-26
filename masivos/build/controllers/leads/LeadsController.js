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
const temporal_polyfill_1 = require("temporal-polyfill");
const Bot_1 = require("../../models/Bot");
const Flows_1 = require("../../models/Flows");
const Leads_1 = require("../../models/Leads");
const xlsx_1 = __importDefault(require("xlsx"));
const sequelize_1 = require("sequelize");
//import { GoogleSheet } from "../../services/GoogleSheet";
const MasivoLead_1 = require("../../models/MasivoLead");
const Masivos_1 = require("../../models/Masivos");
const GoogleSheet_1 = require("../../services/GoogleSheet");
const Sheets_1 = require("../../models/Sheets");
const console_1 = require("console");
class LeadsController {
    constructor() {
        this.RegisterLead = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, phone, respuesta } = req.body;
                console.log("=============================================================");
                console.log("hay interaccion");
                console.log("=============================================================");
                /*
                const bot = await Bot.findAll({
                  where: {
                    tipo: "responder",
                  },
                  limit: 1,
                });
                */
                const lead = yield Leads_1.Leads.findOne({
                    where: { number: phone },
                });
                if (lead) {
                    lead.update({
                        name,
                        number: phone,
                        respuesta,
                    });
                    const masivolead = yield MasivoLead_1.MasivoLead.findOne({
                        where: {
                            leadId: lead.id
                        },
                        include: [
                            {
                                model: Masivos_1.Masivos,
                                include: [
                                    { model: Flows_1.Flows, as: "flows" },
                                    { model: Flows_1.Flows, as: "flowResponder" },
                                    { model: Bot_1.Bot }
                                ]
                            }
                        ],
                        order: [["createdAt", "DESC"]]
                    });
                    if (masivolead) {
                        yield masivolead.update({ status: respuesta });
                        if (masivolead.status != null) {
                            console.log("=============================================");
                            console.log("AQUI LLEGA -------------------------");
                            console.log("=============================================");
                            yield Masivos_1.Masivos.update({
                                amountinteres: sequelize_1.Sequelize.literal("amountinteres + 1"), //aumentar en 1 al valor actual
                            }, {
                                where: {
                                    id: masivolead.masivoId
                                }
                            });
                        }
                    }
                    const sheetEncontrado = yield Sheets_1.Sheets.findOne({
                        where: {
                            id: masivolead === null || masivolead === void 0 ? void 0 : masivolead.masivo.sheetId
                        }
                    });
                    const sheetInstance = yield GoogleSheet_1.GoogleSheet.getInstance(process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL, process.env.GOOGLE_PRIVATE_KEY, sheetEncontrado === null || sheetEncontrado === void 0 ? void 0 : sheetEncontrado.spreadsheetId, sheetEncontrado === null || sheetEncontrado === void 0 ? void 0 : sheetEncontrado.sheetId);
                    //const sheetsController = SheetsController.getInstance();
                    //const sheetInstance = sheetsController.getGoogleSheetInstance();
                    if (!sheetInstance) {
                        throw new Error("No hay una hoja activa");
                    }
                    //const cursos = JSON.parse(masivolead!.masivo.flowResponder!.cursos);
                    console.log("cursos", masivolead.masivo.flowResponderId);
                    const flagresponderseleccion = masivolead.masivo.flowResponder.cursos.length === 1;
                    const cursoselected = (masivolead === null || masivolead === void 0 ? void 0 : masivolead.masivo.flagResponder) ? flagresponderseleccion ? masivolead.masivo.flowResponder.cursos[0] : "Sin curso seleccionado" : "Sin curso seleccionado";
                    yield sheetInstance.addRow(phone, cursoselected, name);
                    if (masivolead === null || masivolead === void 0 ? void 0 : masivolead.masivo.flagResponder) {
                        const flowResponder = yield Flows_1.Flows.findOne({
                            where: {
                                id: masivolead.masivo.flowResponderId
                            }
                        });
                        console.log("botResponder: ", masivolead.masivo.bot.id);
                        let botResponder = yield Bot_1.Bot.findOne({
                            where: { id: masivolead.masivo.botId },
                        });
                        if (!botResponder) {
                            botResponder = yield Bot_1.Bot.findOne({
                                where: {
                                    tipo: "responder",
                                },
                            });
                        }
                        console.log("Si llega >>>>>>>>>>>>>>");
                        try {
                            const botResponse = yield fetch(`http://localhost:${botResponder.port}/v1/messages`, {
                                method: "POST",
                                headers: { "Content-Type": "application/json" },
                                body: JSON.stringify({
                                    number: phone,
                                    flow: flowResponder,
                                    flagOneCurso: (flowResponder === null || flowResponder === void 0 ? void 0 : flowResponder.cursos.length) === 1,
                                }),
                            });
                            if (!botResponse.ok) {
                                return res
                                    .status(500)
                                    .json({ error: "No se pudo enviar el mensaje al bot." });
                            }
                        }
                        catch (error) {
                            (0, console_1.log)("Error al enviar mensaje al bot:", error);
                            return res.status(500).json({ error: "No se pudo enviar el mensaje al bot." });
                        }
                    }
                    console.log("termino");
                }
                else {
                    console.warn("No se encontró un bot disponible del tipo 'responder'.");
                }
                return res
                    .status(201)
                    .json({ message: "Lead registrado correctamente." });
            }
            catch (error) {
                console.error("Error en el endpoint /bot/register-lead:", error);
                return res.status(500).json({
                    error: "Ocurrió un error interno al procesar la solicitud.",
                });
            }
        });
        this.getbytNumber = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { number } = req.query;
            const masivoLead = yield MasivoLead_1.MasivoLead.findOne({
                include: [
                    { model: Leads_1.Leads, where: { number } },
                    { model: Masivos_1.Masivos,
                        include: [
                            { model: Flows_1.Flows, as: "flowResponder" },
                            { model: Flows_1.Flows, as: "flowResponder" },
                        ] }
                ],
                order: [["createdAt", "DESC"]],
            });
            console.log(masivoLead);
            return res.status(200).json(masivoLead);
        });
        this.updatebynumber = (req, res) => __awaiter(this, void 0, void 0, function* () {
            //punto final de mi proceso masivo
            try {
                const { phone, curso } = req.body;
                const lead = yield Leads_1.Leads.findOne({
                    where: {
                        number: phone,
                    },
                });
                const masivolead = yield MasivoLead_1.MasivoLead.findOne({
                    where: {
                        leadId: lead.id
                    },
                    include: [
                        {
                            model: Masivos_1.Masivos,
                        }
                    ],
                    order: [["createdAt", "DESC"]]
                });
                const sheetEncontrado = yield Sheets_1.Sheets.findOne({
                    where: {
                        id: masivolead === null || masivolead === void 0 ? void 0 : masivolead.masivo.sheetId
                    }
                });
                const sheetInstance = yield GoogleSheet_1.GoogleSheet.getInstance(process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL, process.env.GOOGLE_PRIVATE_KEY, sheetEncontrado === null || sheetEncontrado === void 0 ? void 0 : sheetEncontrado.spreadsheetId, sheetEncontrado === null || sheetEncontrado === void 0 ? void 0 : sheetEncontrado.sheetId);
                //const sheetsController = SheetsController.getInstance();
                //const sheetInstance = sheetsController.getGoogleSheetInstance();
                if (!sheetInstance) {
                    throw new Error("No hay una hoja activa");
                }
                yield sheetInstance.addRow(phone, curso, null);
                return res.status(201).json({ message: "actualizado correctamente" });
            }
            catch (error) {
                console.log(error.message);
                return res.status(404).json({ message: "no se encontro el lead" });
            }
        });
        this.downloadExcel = (_req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const time = temporal_polyfill_1.Temporal.Now.plainDateISO().toString();
                console.log(time);
                const today = new Date();
                today.setHours(0, 0, 0, 0); // Inicio del día
                const tomorrow = new Date();
                tomorrow.setHours(24, 0, 0, 0);
                const leads = yield Leads_1.Leads.findAll({
                    where: {
                        updatedAt: {
                            [sequelize_1.Op.between]: [today, tomorrow], // Mayor a hoy a las 00:00:00
                        },
                    },
                    include: [
                        {
                            model: Flows_1.Flows,
                            attributes: ["name"],
                        },
                    ],
                });
                const respuesta = leads.map((lead) => ({
                    nombre: lead.name,
                    telefono: lead.number,
                    curso: lead.curso,
                    estado: lead.respuesta,
                    fechaInteraccion: time,
                }));
                // Crear un nuevo libro de Excel
                const worksheet = xlsx_1.default.utils.json_to_sheet(respuesta);
                const workbook = xlsx_1.default.utils.book_new();
                xlsx_1.default.utils.book_append_sheet(workbook, worksheet, "Leads");
                // Escribir el archivo en un buffer
                const excelBuffer = xlsx_1.default.write(workbook, {
                    bookType: "xlsx",
                    type: "buffer",
                });
                // Configurar encabezados HTTP
                res.setHeader("Content-Disposition", "attachment; filename=leads.xlsx");
                res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
                res.send(excelBuffer);
            }
            catch (error) {
                console.log("error: ", error.message);
                return res
                    .status(400)
                    .json({
                    error: "ocurrio un error en el proceso de generacion del excel",
                });
            }
        });
        this.cantRestanteParaMasivos = (_req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const restante = yield Leads_1.Leads.count({ where: { status: false } });
                console.log(restante);
                return res.status(200).json({ cant: restante });
            }
            catch (error) {
                console.log("error al obtener el restante", error);
                return res.status(500).json({ message: "error interno del servidor", error: error.menssage });
            }
        });
    }
}
exports.default = LeadsController;
