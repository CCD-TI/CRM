
import { Table, Column, Model, PrimaryKey, AutoIncrement, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { PaginaModel } from '../../Pagina/infraestructure/Pagina.model';

@Table({ tableName: 'Campana' })
export class CampanaModel extends Model {
    @Column(DataType.STRING)
    name!: string;

    @Column(DataType.STRING)
    RedCampanaId!: string;

    @Column({
        type: DataType.INTEGER,
        defaultValue: 1 // Valor por defecto cuando no se envía en la inserción
    })  
    status!: number;
    
    @ForeignKey(() => PaginaModel)
    @Column(DataType.INTEGER)
    paginaId!: number;

    @BelongsTo(() => PaginaModel)
    pagina!: PaginaModel;
    
}