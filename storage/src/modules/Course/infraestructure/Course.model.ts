import { Column, DataType, Model, Table, HasMany, HasOne } from "sequelize-typescript";
import { CursoModel } from "../../Curso/infraestruture/Curso.model"; // Importamos la tabla Cursos

@Table({ tableName: 'CursosCCD' })
export class CursoCCDModel extends Model {

    @Column({ type: DataType.STRING, allowNull: false })
    curso!: string;

    @Column({ type: DataType.STRING, allowNull: false })
    nomenclatura!: number;


    @Column({ type: DataType.STRING, allowNull: false })
    estado!: string;

    // Relación con Cursos (1 curso puede estar en muchos registros de Cursos)
    @HasOne(() => CursoModel)
    cursoRelacionado!: CursoModel;
}
