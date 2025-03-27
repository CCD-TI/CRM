export default class Curso {
    constructor(
        public nombre: string,
        public nomenclatura: string,
        public status: number,
        public flowId: number,
        public flowNombre: string,
        public templateNombre: string,
        public id?: number
    ) {}
}