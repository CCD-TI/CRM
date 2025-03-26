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
  }
}

export default new App().server;
