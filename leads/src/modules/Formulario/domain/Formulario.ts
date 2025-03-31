import Campana from "@Campana/domain/Campana";


export default class Formulario {
    constructor(
        public name: string,
        public RedFormularioId: string,
        public cursoId: number,
        public id?: number,
        public campanaId?: number,
        public botId?: number,
    ) {}
}