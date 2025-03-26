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
exports.WebSocketBots = void 0;
const socket_io_1 = require("socket.io");
const Bot_1 = require("../models/Bot");
const DockerService_1 = __importDefault(require("./DockerService"));
class WebSocketBots {
    constructor(httpServer, checkIntervalMs = 10000) {
        this.checkIntervalMs = checkIntervalMs;
        this.checkInterval = null;
        this.io = new socket_io_1.Server(httpServer, {
            cors: {
                origin: "*", // Ajusta el origen según tus necesidades
                methods: ["GET", "POST"],
            },
            path: "/websocket"
        });
        this.setupConnection();
        this.startCheck();
    }
    setupConnection() {
        this.io.on("connection", (socket) => {
            console.log(`Cliente WebSocket conectado: ${socket.id}`);
            socket.emit("message", { message: "Conectado al servidor WebSocket" });
        });
    }
    startCheck() {
        this.checkInterval = setInterval(() => {
            this.checkBotsStatus();
        }, this.checkIntervalMs);
    }
    checkBotsStatus() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const bots = yield Bot_1.Bot.findAll();
                if (!bots || bots.length === 0)
                    return;
                const statuses = [];
                yield Promise.all(bots.map((bot) => __awaiter(this, void 0, void 0, function* () {
                    const flag = yield this.isContainerRunning(bot.containerId);
                    if (!flag) {
                        statuses.push({ containerId: bot.containerId, phone: bot.phone, status: "inactivo" });
                        yield Bot_1.Bot.update({ status: false }, { where: { id: bot.id } });
                    }
                    else {
                        try {
                            const data = yield this.fetchWithTimeout(`http://localhost:${bot.port}/v1/codigo`, 5000); // 5 segundos de timeout
                            //console.log("Datos recibidos:", { pairingCode: data.pairingCode, status: data.status });
                            if (data.pairingCode !== bot.pairingCode || !data.status) {
                                statuses.push({
                                    containerId: bot.containerId,
                                    phone: bot.phone,
                                    status: "desvinculado",
                                    newPairingCode: data.pairingCode,
                                });
                                //console.log(`Bot ${bot.containerId} desvinculado`);
                                if (bot.pairingCode !== data.pairingCode) {
                                    yield Bot_1.Bot.update({ pairingCode: data.pairingCode }, { where: { id: bot.id } });
                                }
                            }
                            else {
                                statuses.push({ containerId: bot.containerId, phone: bot.phone, status: "activo" });
                                if (!bot.status) {
                                    yield Bot_1.Bot.update({ status: true }, { where: { id: bot.id } });
                                }
                            }
                        }
                        catch (error) {
                            //console.log(`Error al consultar bot ${bot.containerId}, reintentando...`);
                            // Intentamos una segunda vez antes de marcarlo como inactivo
                            try {
                                yield this.fetchWithTimeout(`http://localhost:${bot.port}/v1/codigo`, 5000);
                                //console.log(`Segunda verificación exitosa para bot ${bot.containerId}:`, data);
                                statuses.push({ containerId: bot.containerId, phone: bot.phone, status: "activo" });
                                if (!bot.status) {
                                    yield Bot_1.Bot.update({ status: true }, { where: { id: bot.id } });
                                }
                            }
                            catch (retryError) {
                                if (bot.status) {
                                    statuses.push({ containerId: bot.containerId, phone: bot.phone, status: "inactivo" });
                                    yield Bot_1.Bot.update({ status: false }, { where: { id: bot.id } });
                                }
                                console.log(`Bot ${bot.containerId} en puerto ${bot.port} está caído tras segundo intento.`);
                            }
                        }
                    }
                })));
                this.io.emit("bots-status", statuses);
            }
            catch (error) {
                console.error("Error al consultar el estado de los bots:", error);
            }
        });
    }
    isContainerRunning(containerId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const docker = DockerService_1.default.getInstance().getDocker();
                const container = docker.getContainer(containerId);
                const data = yield container.inspect();
                return data.State.Running; // Devuelve true si está encendido, false si no
            }
            catch (error) {
                console.error('Error consultando el contenedor:', error);
                return false; // O puedes manejarlo diferente según tu lógica
            }
        });
    }
    /**
     * Función para hacer fetch con timeout
     */
    fetchWithTimeout(url, timeout) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                const controller = new AbortController();
                const timeoutId = setTimeout(() => {
                    controller.abort();
                    reject(new Error("Timeout al obtener datos del bot"));
                }, timeout);
                fetch(url, { signal: controller.signal })
                    .then(response => response.json())
                    .then(data => {
                    clearTimeout(timeoutId);
                    resolve(data);
                })
                    .catch(error => {
                    clearTimeout(timeoutId);
                    reject(error);
                });
            });
        });
    }
    stopCheck() {
        if (this.checkInterval) {
            clearInterval(this.checkInterval);
            this.checkInterval = null;
        }
    }
}
exports.WebSocketBots = WebSocketBots;
