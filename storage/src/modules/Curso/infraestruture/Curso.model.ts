import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
// import { BotCursoModel } from "../../BotCurso/infraestruture/BotCurso.model";

@Table({ tableName: 'Cursos' })
export class CursoModel extends Model {
    @Column(DataType.STRING)
    nombre!: string;

    @Column(DataType.STRING)
    Nomenclatura!: string;

    @Column(DataType.INTEGER)
    flowId!: number;

    @Column(DataType.STRING)
    flowNombre!: string;

    @Column(DataType.INTEGER)
    status!: number;

    @Column(DataType.STRING)
    templateNombre!: string;

    // 🔥 Relación con BotCurso (1 Curso tiene muchos BotCurso)
    // @HasMany(() => BotCursoModel, {
    //     foreignKey: 'cursoId', // Nombre de la columna FK en BotCurso
    //     as: 'bots' // Alias para la relación (opcional pero recomendado)
    // })
    // bots!: BotCursoModel[];
}