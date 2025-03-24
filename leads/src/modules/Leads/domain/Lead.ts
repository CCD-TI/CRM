import Formulario from "@Campana/domain/Campana";

export default class Lead {
    constructor(
        public id: number,
        public formularioId: number,
        public userId: number,
        public origen: string,
        public Formulario?: Formulario,
    ){        
    }
}
