import {
  AllowNull,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import { Leads } from "./Leads";
import { Sms } from "./Sms";

@Table({
  tableName: "smslead",
})
export class SmsLead extends Model {
  @BelongsTo(() => Sms)
  sms!: Sms;

  @ForeignKey(() => Sms)
  @AllowNull(true)
  @Column(DataType.INTEGER)
  smsId!: number;

  @BelongsTo(() => Leads)
  lead!: Leads;

  @ForeignKey(() => Leads)
  @AllowNull(true)
  @Column(DataType.INTEGER)
  leadId!: number;

  @AllowNull(true)
  @Column(DataType.STRING)
  status!: string;

  @AllowNull(true)
  @Column(DataType.STRING)
  observacionstatus!: string;
}
