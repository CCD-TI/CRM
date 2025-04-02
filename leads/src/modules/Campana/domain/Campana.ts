export default class Campana {
    constructor(
        public name: string,
        public RedCampanaId: string,
        public paginaId: number,
        public status: number,
        createdAt?: Date | undefined,
        public id?: number,
    ) {}
}