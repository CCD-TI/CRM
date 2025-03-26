import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { CursoModel } from "../../Curso/infraestruture/Curso.model";


@Table({ tableName: 'BotCurso' }) // Nombre de la tabla en la base de datos
export class BotCursoModel extends Model {

    @ForeignKey(() => CursoModel)
    @Column(DataType.INTEGER)
    cursoId!: number;

    @Column(DataType.INTEGER)
    botId!: number;

    @Column(DataType.STRING)
    botNombre!: string;

    @BelongsTo(() => CursoModel)
    curso!: CursoModel;

}