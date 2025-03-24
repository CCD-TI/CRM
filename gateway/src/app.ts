import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import axios from "axios";

// Rutas de los microservicios
const SERVICE_LEADS_URL = "http://maestro:3001";
const SERVICE_CURSOS_URL = "http://storage:3002";
const SERVICE_USUARIOS_URL = "http://usuarios:3003";

class App {
  public server: express.Application;

  constructor() {
    this.server = express();
    this.middlewares();
    this.routes();
  }

  private middlewares(): void {
    this.server.use(express.json());
    this.server.use(cors());
  }

  private routes(): void {
    this.server.use("/api/leads", (req: Request, res: Response) => {
      const url = `${SERVICE_LEADS_URL}${req.url}`;
      this.handleRequest(req, res, url);
    });

    this.server.use("/api/cursos", (req: Request, res: Response) => {
      const url = `${SERVICE_CURSOS_URL}${req.url}`;
      this.handleRequest(req, res, url);
    });

    this.server.use("/api/usuarios", (req: Request, res: Response) => {
      const url = `${SERVICE_USUARIOS_URL}${req.url}`;
      this.handleRequest(req, res, url);
    });
  }

  private async handleRequest(req: Request, res: Response, url: string): Promise<void> {
    try {
      const headers = { ...req.headers };
      delete headers["content-length"];

      const response = await axios({
        method: req.method,
        url: url,
        data: req.body,
        headers: headers,
      });

      res.status(response.status).json(response.data);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        res.status(error.response.status).json(error.response.data);
      } else {
        res.status(500).json({ error: "Error interno del servidor" });
      }
    }
  }
}

export default new App().server;
