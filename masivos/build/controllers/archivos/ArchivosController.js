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
exports.ArchivosController = void 0;
const client_s3_1 = require("@aws-sdk/client-s3");
const s3Config_1 = require("../../config/s3Config");
class ArchivosController {
    constructor() {
        this.upload = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const file = req.file;
                const fileBuffer = file.buffer;
                const fileType = file.mimetype.includes("image") ? "Masivos/Imagenes" : file.mimetype.includes("video") ? "Masivos/Videos" : "Masivos/Documentos";
                const uploadKey = `${fileType}/${file.originalname}`;
                const uploadParams = {
                    Bucket: s3Config_1.BUCKET_NAME,
                    Key: uploadKey,
                    Body: fileBuffer,
                    ContentType: file.mimetype,
                };
                const objeto = new client_s3_1.PutObjectCommand(uploadParams);
                yield s3Config_1.s3.send(objeto);
                const fileUrl = `https://pub-9d2abfa175714e64aed33b90722a9fd5.r2.dev/${fileType.replace(/\s+/g, "%20")}/${file.originalname.replace(/\s+/g, "%20")}`;
                return res.status(200).json({ fileUrl });
            }
            catch (error) {
                console.error("Error al subir archivos:", error);
                return res.status(500).json({ message: "Error al subir archivos" });
            }
        });
    }
}
exports.ArchivosController = ArchivosController;
