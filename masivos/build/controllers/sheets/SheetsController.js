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
Object.defineProperty(exports, "__esModule", { value: true });
exports.SheetsController = void 0;
const sequelize_1 = require("sequelize");
const Sheets_1 = require("../../models/Sheets");
//import { GoogleSheet } from "../../services/GoogleSheet";
class SheetsController {
    //private googleSheetInstance: GoogleSheet | null = null;
    constructor() {
        this.editSheet = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const { sheet } = req.body;
                console.log(sheet);
                yield Sheets_1.Sheets.update({
                    spreadsheetId: sheet.spreadsheetId,
                    sheetId: sheet.sheetId,
                    name: sheet.name,
                }, {
                    where: {
                        id,
                    },
                });
                return res.status(200).json({ message: "Sheet updated" });
            }
            catch (error) {
                return res.status(500).json({ error: error.message });
            }
        });
        this.deleteSheet = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                yield Sheets_1.Sheets.destroy({
                    where: {
                        id,
                    },
                });
                return res.status(200).json({ message: "Sheet deleted" });
            }
            catch (error) {
                return res.status(500).json({ error: error.message });
            }
        });
    }
    createNewSheet(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { spreadsheetId, sheetId, name } = req.body.sheet;
                console.log("req.body", req.body);
                if (!spreadsheetId || !sheetId || !name) {
                    return res.status(400).json({ error: "Faltan Datos" });
                }
                const sheet = yield Sheets_1.Sheets.create({ spreadsheetId, sheetId, name });
                return res.status(201).json(sheet);
            }
            catch (error) {
                return res.status(500).json({ error: error.message });
            }
        });
    }
    getAllSheets(_req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sheets = yield Sheets_1.Sheets.findAll();
                return res.status(200).json(sheets);
            }
            catch (error) {
                return res.status(500).json({ error: error.message });
            }
        });
    }
    search(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { search } = req.body;
            const sheetSearch = yield Sheets_1.Sheets.findAll({
                where: {
                    name: {
                        [sequelize_1.Op.like]: `%${search.toLowerCase()}%`
                    },
                }
            });
            return res.status(200).json({ sheets: sheetSearch });
        });
    }
}
exports.SheetsController = SheetsController;
