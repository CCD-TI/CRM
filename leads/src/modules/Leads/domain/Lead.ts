import Formulario from "@Campana/domain/Campana";

export default class Lead {
    constructor(
        public id: number | null,
        public formularioId: number,
        public clienteId: number | null,
        public origen: string,
        public Formulario?: Formulario,
    ){        
    }
}
