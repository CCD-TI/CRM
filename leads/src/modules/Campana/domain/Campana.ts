export default class Campana {
    constructor(
        public name: string,
        public RedCampanaId: number,
        public paginaId: number,
        public status: number = 1,
        createdAt?: Date | undefined,
        public id?: number,
    ) {}
}