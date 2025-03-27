import { Table, Column, Model, AutoIncrement, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { FormularioModel } from '@Formulario/infraestructure/Formulario.model';

@Table({ tableName: 'Lead', timestamps: true})
export class LeadModel extends Model {
    @ForeignKey(() => FormularioModel)
    @Column(DataType.INTEGER)
    formularioId!: number;

    @BelongsTo(() => FormularioModel)
    formulario!: FormularioModel;

    @Column(DataType.BIGINT)
    userId!: number;

    @Column(DataType.STRING)
    origen!: string;
}
