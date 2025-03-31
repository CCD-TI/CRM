import { CursoRepository } from "../domain/CursoRepository";
import { SequelizeCursoRepository } from "./SequelizeCursoRepository";
import { CursoService } from "../application/CursoService";
import { Request, Response } from "express";
import { cursoSchema, cursoUpdateSchema } from "../domain/CursoShema";
import { BotCursoRepository } from "../../BotCurso/domain/BotCursoRepository";
import { SequelizeBotCursoRepository } from "../../BotCurso/infraestruture/SequelizeBotCursoRepository";
import { BotCursoService } from "../../BotCurso/application/BotCursoService";

const cursoRepository: CursoRepository = new SequelizeCursoRepository();
const cursoService = new CursoService(cursoRepository);

const botcursoRepository: BotCursoRepository = new SequelizeBotCursoRepository();
const botcursoService = new BotCursoService(botcursoRepository);
export class CursoController{
    static async createCurso(req: Request, res: Response){
        try {
            const parsedData = cursoSchema.parse(req.body);
            const curso = await cursoService.createCurso(parsedData);
            res.status(201).json(curso);
        } catch (error) {
            res.status(400).json({ message: error});
        }
    }

    static async findAllCursos(_req: Request, res: Response){
        try {
            const cursos = await cursoService.findAllCursos();
            res.status(200).json(cursos);
        } catch (error) {
            res.status(400).json({ message: error });
        }
    }

    static async findCursoById(req: Request, res: Response){
        try {
            const curso = await cursoService.findCursoById(Number(req.params.id));
            res.status(200).json(curso);
        } catch (error) {
            res.status(400).json({ message: error });
        }
    }

    static async updateCurso(req: Request, res: Response){
        try {
            const id = Number(req.params.id);
            const parsedData = cursoUpdateSchema.parse(req.body);
            const curso = await cursoService.updateCurso(id, parsedData);
            res.status(200).json(curso);
        } catch (error) {
            res.status(400).json({ message: error });
        }
    }
    static async searchCursos(req: Request, res: Response) {
        try {
            const searchTerm = req.query.q as string;
            const cursoService = new CursoService(new SequelizeCursoRepository());
    
            // 1. Definir resultados fuera del condicional
            let resultados;
            
            if (!searchTerm || searchTerm.trim() === '') {
                resultados = await cursoService.findAllCursos();
            } else {
                resultados = await cursoService.searchCursos(searchTerm);
            }
    
            // 2. Single Response Principle - Una sola respuesta
             res.status(200).json(resultados);
    
        } catch (error) {
            console.error('Error en searchCursos:', error);
            
            // 3. Verificar que no se haya enviado respuesta previamente
            if (!res.headersSent) {
                 res.status(500).json({
                    message: 'Error al realizar la búsqueda',
                    error: error instanceof Error ? error.message : 'Unknown error'
                });
            }
        }
    }
    static async deleteCurso(req: Request, res: Response){
        try {
            const curso = await cursoService.deleteCurso(Number(req.params.id));
            res.status(200).json(curso);
        } catch (error) {
            res.status(400).json({ message: "No se pudo borrar el curso" });
        }
    }
    static async info(req: Request, res: Response){
        try {
            const id = Number(req.params.id);
            console.log("=====================================")
            console.log("============ ID cursos==============")
            console.log("=====================================")
            console.log(id);
            const cursos = await cursoService.findCursoById(id);
            console.log("=====================================")
            console.log("============ cursos==============")
            console.log("=====================================")
            console.log(cursos);
            const botcursos = await botcursoService.findAllByCursoId(id);
            const masivoServiceUrl = process.env.MASIVOS_SERVICE_URL ?? "http://host.docker.internal:8001";
            const response = await fetch(`${masivoServiceUrl}/flows/${cursos.flowId}`);
            if(!response.ok){
                res.status(400).json({ message: "No se pudo obtener el flow" });
            }
            const data = await response.json();
            const flow = data.flow;
            const responsebot = await fetch(`${masivoServiceUrl}/bots/findByIds`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ids: botcursos.map((botcurso: any) => botcurso.botId)})
                }
            );
            if(!responsebot.ok){
                res.status(400).json({ message: "No se pudo obtener los bots" });
            }
            const databot = await responsebot.json();
            const botcursosdata = databot.bots;

            res.status(200).json({
                curso: cursos,
                flow: flow,
                bots: botcursosdata
            });
        } catch (error) {
            res.status(400).json({ message: error });
        }
    }
}