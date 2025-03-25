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
    const masivoServiceUrl = "http://masivos:8001"; //"http://host.docker.internal:8001";
    const gestorServiceUrl = "http://gestor-archivos:8002"; //"http://host.docker.internal:8002";
    const leadsServiceUrl = "http://leads:8003"; //"http://host.docker.internal:8003";
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
  }
}

export default new App().server;
