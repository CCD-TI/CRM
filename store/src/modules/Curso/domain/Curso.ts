export default class Usuario {
    constructor(
        public IdUsuario: number,
        public Usuario: string,
        public Clave: string,
        public ClaveTemporal: string,
        public Fcingreso: Date,
        public FCBaja: Date,
        public RutalmagenPerfil: string,
        public RutalmagenCuerpo: string,
        public Entidad_id: number,
        public Online: boolean,
        public Estado_id: number,
        public UltimaFechMod: Date,
        public UltimoUserMod: string,
        public Premium: number,
        public FechaExpiracionPre: Date,
        public FechaExpiracion: Date
    ) {}
}