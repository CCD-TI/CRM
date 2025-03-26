import {Router} from 'express';
import { BotCursoController } from './BotCurso.Controller';

const botCursoRouter = Router();
botCursoRouter.post('/', BotCursoController.createBotCurso);
botCursoRouter.put('/:id', BotCursoController.updateBotCurso);
botCursoRouter.delete('/:id', BotCursoController.deleteBotCurso)
botCursoRouter.get('/', BotCursoController.findAllBotCursos);
botCursoRouter.get('/:id', BotCursoController.findBotCursoById);

export default botCursoRouter;