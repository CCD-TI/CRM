import { AllowNull, BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Mailing } from "./Mailing";
import { Leads } from "./Leads";

@Table({
    tableName: "mailinglead",
})
export class MailingLead extends Model {

    @BelongsTo(() => Mailing)
    mailing!: Mailing;

    @ForeignKey(() => Mailing)
    @AllowNull(true)
    @Column(DataType.INTEGER)
    mailingId!: number;

    @BelongsTo(() => Leads)
    lead!: Leads;

    @ForeignKey(() => Leads)
    @AllowNull(true)
    @Column(DataType.INTEGER)
    leadId!: number;

    @AllowNull(true)
    @Column(DataType.STRING)
    status!: string

}  