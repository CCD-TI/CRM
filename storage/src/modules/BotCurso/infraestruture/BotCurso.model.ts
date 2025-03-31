import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { CursoModel } from "../../Curso/infraestruture/Curso.model";


@Table({ tableName: 'BotCurso' })
export class BotCursoModel extends Model {
    @ForeignKey(() => CursoModel)
    @Column(DataType.INTEGER)
    cursoId!: number; // FK a Curso

    @Column(DataType.INTEGER)
    botId!: number;

    @Column(DataType.STRING)
    botNombre!: string;

    // 🔄 Relación inversa (pertenece a un Curso)
    @BelongsTo(() => CursoModel)
    curso!: CursoModel;
}