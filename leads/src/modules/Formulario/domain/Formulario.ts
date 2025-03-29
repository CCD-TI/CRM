import Campana from "@Campana/domain/Campana";


export default class Formulario {
    constructor(
        public id: number,
        public name: string,
        public RedFormularioId: string,
        public cursoId: number,
        public campanaId?: number
    ) {}
}