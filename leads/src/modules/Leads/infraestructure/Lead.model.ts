import { Table, Column, Model, AutoIncrement, DataType, ForeignKey, BelongsTo, AllowNull } from 'sequelize-typescript';
import { FormularioModel } from '@Formulario/infraestructure/Formulario.model';
import { ClienteModel } from 'modules/Clientes/infraestructure/Cliente.model';

@Table({ tableName: 'Lead', timestamps: true})
export class LeadModel extends Model {
    @ForeignKey(() => FormularioModel)
    @Column(DataType.INTEGER)
    formularioId!: number;

    @BelongsTo(() => FormularioModel)
    formulario!: FormularioModel;

    @AllowNull(true)
    @ForeignKey(() => ClienteModel)
    @Column(DataType.INTEGER)
    clienteId!: number;

    @BelongsTo(() => ClienteModel)
    cliente!: ClienteModel;

    @Column(DataType.STRING)
    origen!: string;
}
