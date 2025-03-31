import { Table, Column, Model, PrimaryKey, AutoIncrement, DataType, ForeignKey, BelongsTo, Sequelize } from 'sequelize-typescript';

@Table({ tableName: 'Pagina' })
export class PaginaModel extends Model {
    @Column(DataType.STRING)
    name!: string;

    @Column(DataType.INTEGER)
    RedPaginaId!: number;    


    @Column({
        type: DataType.INTEGER,
        defaultValue: 1 // Valor por defecto cuando no se envía en la inserción
    })  
    status!: number;  
}
