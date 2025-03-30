import BotCurso from "../domain/BotCurso";
import { BotCursoRepository } from "../domain/BotCursoRepository";
import { BotCursoModel } from "./BotCurso.model";

export class SequelizeBotCursoRepository implements BotCursoRepository{

    async create(botCurso: BotCurso): Promise<BotCurso> {
        try {
            console.log("Insertando en DB:", botCurso);
            const botCursoCreated = await BotCursoModel.create(botCurso as any);
            console.log("Registro creado:", botCursoCreated);
            return botCursoCreated.get({ plain: true }) as BotCurso;
        } catch (error) {
            console.error("Error al crear BotCurso:", error);
            throw new Error("No se pudo crear el BotCurso");
        }
    }
    

    async findAll(): Promise<BotCurso[]> {
        const botCursos = await BotCursoModel.findAll();
        return botCursos.map((botCurso) => botCurso.get({ plain: true }) as BotCurso);
    }

    async findById(botCursoId: number): Promise<BotCurso> {
        const botCurso = await BotCursoModel.findOne({ where: { id: botCursoId } });
        if (!botCurso) throw new Error('BotCurso not found');
        return botCurso.get({ plain: true }) as BotCurso;
    }

    async update(id: number, botCurso: BotCurso): Promise<BotCurso> {
        await BotCursoModel.update(botCurso as any, { where: { id } });
        return botCurso;
    }

    async delete(cursoId: number): Promise<void> {
        await BotCursoModel.destroy({ where: { cursoId } });
    }

}