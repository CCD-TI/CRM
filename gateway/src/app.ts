import express from "express";
import cors from "cors";
import {
  createProxyMiddleware,
  debugProxyErrorsPlugin,
  errorResponsePlugin,
  loggerPlugin,
  Options,
  proxyEventsPlugin,
} from "http-proxy-middleware";
import dotenv from "dotenv";

dotenv.config();

interface ServiceConfig {
  target: string;
  routes: string[];
}

class App {
  public server: express.Application;
  constructor() {
    this.server = express();
    this.middlewares();
    this.router();
  }

  private middlewares(): void {
    this.server.use(cors());
  }

  private router(): void {
    const masivoServiceUrl = process.env.MASIVOS_SERVICE_URL ?? "http://host.docker.internal:8001";
    const gestorServiceUrl = process.env.GESTOR_SERVICE_URL ?? "http://host.docker.internal:8002";
    const leadsServiceUrl = process.env.LEADS_SERVICE_URL ?? "http://host.docker.internal:8003";
    const storageServiceUrl = process.env.STORAGE_SERVICE_URL ?? "http://host.docker.internal:8004";
    const usuariosServiceUrl = process.env.USUARIOS_SERVICE_URL ?? "http://host.docker.internal:8005";
    const mailingServiceUrl = process.env.MAILING_SERVICE_URL ?? "http://host.docker.internal:8005";
    const host = process.env.HOST_INTERNAL ?? "172.18.0.1";

    console.log("masivoServiceUrl", masivoServiceUrl);
    console.log("gestorServiceUrl", gestorServiceUrl);
    console.log("leadsServiceUrl", leadsServiceUrl);
    console.log("storageServiceUrl", storageServiceUrl);
    console.log("usuariosServiceUrl", usuariosServiceUrl);
    console.log("mailingServiceUrl", mailingServiceUrl);
    console.log("host", host);
    this.server.use(
      "/api/masivo",
      createProxyMiddleware({
        target: masivoServiceUrl,
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          "^/api/masivo": "",
        }
      })
    );
    this.server.use(
      "/api/gestor-archivos",
      createProxyMiddleware({
        target: gestorServiceUrl,
        changeOrigin: true,
        pathRewrite: {
          "^/api/gestor-archivos": "",
        },
      })
    );
    this.server.use(
      "/api/leads-service",
      createProxyMiddleware({
        target: leadsServiceUrl,
        changeOrigin: true,
        pathRewrite: {
          "^/api/leads-service": "",
        },
      })
    );
    this.server.use(
      "/api/storage",
      createProxyMiddleware({
        target: storageServiceUrl,
        changeOrigin: true,
        pathRewrite: {
          "^/api/storage": "",
        },
      })
    );
    this.server.use(
      "/api/usuarios",
      createProxyMiddleware({
        target: usuariosServiceUrl,
        changeOrigin: true,
        pathRewrite: {
          "^/api/usuarios": "",
        },
      })
    );
    this.server.use(
      "/api/mailing",
      createProxyMiddleware({
        target: usuariosServiceUrl,
        changeOrigin: true,
        pathRewrite: {
          "^/api/mailing": "",
        },
      })
    );
    this.server.use(
      "/api/qrmasivo/:port",
      (req, res, next) => {
        const port = req.params.port; // Extrae el puerto de la URL
        if (!port || isNaN(Number(port))) {
          return res.status(400).json({ error: "Invalid port provided" });
        }
        console.log(`redirigiendo qr a http://${host}:${port}`);
        const proxy = createProxyMiddleware({
          target: `http://${host}:${port}`, // Define el puerto dinámicamente
          changeOrigin: true,
          pathRewrite: { "^/api/qrmasivo/\\d+": "" }, // Elimina "/api/qrmasivo/{port}"
        });
    
        return proxy(req, res, next); // Llama al middleware proxy
      }
    );
  }
}

export default new App().server;
