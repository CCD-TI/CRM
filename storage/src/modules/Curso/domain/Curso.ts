// import Bot from "../../BotCurso/domain/BotCurso"

export default class Curso {
    constructor(
        public nombre: string,
        public nomenclatura: string,
        public status: number,
        public flowId: number,
        public flowNombre: string,
        public templateNombre: string,
        // public bots: Bot[] = [],
        public id?: number
    ) {}
}