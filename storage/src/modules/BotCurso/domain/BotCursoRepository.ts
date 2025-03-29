import BotCurso from "./BotCurso";

export interface BotCursoRepository {
    create(botCurso: BotCurso): Promise<BotCurso>;
    findAll(): Promise<BotCurso[]>;
    findById(id: number): Promise<BotCurso>;
    update(id:number,botCurso: BotCurso): Promise<BotCurso>;
    delete(id: number): Promise<void>;
    findByCursoId(cursoId: number): Promise<BotCurso[]>;
}