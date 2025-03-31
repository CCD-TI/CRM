export default class Pagina {
    constructor(
        public name: string,
        public RedPaginaId: number,
        public status: number = 1,
        createdAt?: Date | undefined,

        public id?: number
    ) {}
}