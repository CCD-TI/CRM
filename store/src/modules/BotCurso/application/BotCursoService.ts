import { BotCursoRepository } from "../domain/BotCursoRepository";

export class BotCursoService{
    constructor(private botCursoRepository: BotCursoRepository) {}

    async createBotCurso(botCurso: any) {
        return await this.botCursoRepository.create(botCurso);
    }

    async updateBotCurso(id: number , botCurso: any) {
        return await this.botCursoRepository.update(id, botCurso);
    }

    async deleteBotCurso(botCurso: any) {
        return await this.botCursoRepository.delete(botCurso);
    }

    async findAllBotCursos() {
        return await this.botCursoRepository.findAll();
    }

    async findBotCursoById(id: number) {
        return await this.botCursoRepository.findById(id);
    }

} 