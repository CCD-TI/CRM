import { AllowNull, Column, DataType, IsEmail, Model, Table } from "sequelize-typescript";

@Table({
    tableName: 'cliente'
})
export class ClienteModel extends Model{
    @Column(DataType.STRING)
    name!: string;

    @IsEmail
    @Column(DataType.STRING)
    email!: string;

    @Column(DataType.STRING)
    phone!: string;

    @AllowNull(true)
    @Column(DataType.INTEGER)
    age!: number;

    @AllowNull(true)
    @Column(DataType.STRING)
    gender!: string;

    @AllowNull(true)
    @Column(DataType.STRING)
    address!: string;

    
}