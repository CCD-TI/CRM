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
const http_1 = require("http");
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const app_1 = __importDefault(require("./app"));
const database_1 = __importDefault(require("./shared/config/database"));
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        try {
            //sincronizacion con la base de datos
            yield database_1.default.sync();
            const httpServer = (0, http_1.createServer)(app_1.default); //escucha del servidor en puerto 8000
            const port = Number((_a = process.env.PORT) !== null && _a !== void 0 ? _a : 8004);
            httpServer.listen(port, '0.0.0.0', () => {
                console.log(`Server is running on http://localhost:${port}`);
            });
        }
        catch (error) {
            console.error("Error durante la ejecucion:", error);
            process.exit(1);
        }
    });
}
main();
