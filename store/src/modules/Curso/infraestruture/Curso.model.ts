import { Column, DataType, Model, Table } from "sequelize-typescript";

@Table({ tableName: 'Cursos' }) // Nombre de la tabla en la base de datos
export class CursoModel extends Model {

    @Column(DataType.STRING)
    nombre!: string;

    @Column(DataType.INTEGER)
    flowId!: number;

    @Column(DataType.STRING)
    flowNombre!: string;

    @Column(DataType.STRING)
    templateNombre!: string;

}