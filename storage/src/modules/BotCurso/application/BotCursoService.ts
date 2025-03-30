import { BotCursoRepository } from "../domain/BotCursoRepository";

export class BotCursoService{
    constructor(private botCursoRepository: BotCursoRepository) {}

    async createBotCurso(botCurso: any) { 
        return await this.botCursoRepository.create(botCurso);
    }

    async updateBotCurso(id: number , botCurso: any) {
        return await this.botCursoRepository.update(id, botCurso);
    }

    async deleteBotCurso(cursoId: any) {
        return await this.botCursoRepository.delete(cursoId);
    }

    async findAllBotCursos() {
        return await this.botCursoRepository.findAll();
    }

    async findAllByCursoId(id: number) {
        return await this.botCursoRepository.findByCursoId(id);
    }

} 