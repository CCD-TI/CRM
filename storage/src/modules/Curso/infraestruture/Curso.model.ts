import { Column, DataType, Model, Table, ForeignKey, BelongsTo } from "sequelize-typescript";
import { CursoCCDModel } from "../../Course/infraestructure/Course.model"; // Importamos la tabla CursosCCD

@Table({ tableName: 'Cursos' })
export class CursoModel extends Model {

    @Column({ type: DataType.STRING, allowNull: false })
    nombre!: string;

    @Column({ type: DataType.INTEGER, allowNull: false })
    flowId!: number;

    @Column({ type: DataType.STRING, allowNull: false })
    flowNombre!: string;

    @Column({ type: DataType.STRING, allowNull: false })
    templateNombre!: string;

    // Llave foránea apuntando a CursosCCD
    @ForeignKey(() => CursoCCDModel)
    @Column({ type: DataType.INTEGER, allowNull: false })
    cursoCCDId!: number;

    // Relación con CursosCCD
    @BelongsTo(() => CursoCCDModel)
    cursoCCD!: CursoCCDModel;
}
