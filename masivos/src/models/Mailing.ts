import { AllowNull, Column, DataType, Model, Table } from "sequelize-typescript";

@Table({
    tableName: "mailings"
})
export class Mailing extends Model{

    @AllowNull(true)
    @Column(DataType.STRING)
    name!: string;

    @AllowNull(false)
    @Column(DataType.STRING)
    templateName!: string;

    @AllowNull(false)
    @Column(DataType.INTEGER)
    templateId!:number

    @AllowNull(true)
    @Column(DataType.INTEGER)
    amountsend!: number;

}