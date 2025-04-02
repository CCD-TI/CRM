import {
  AllowNull,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import { Flows } from "./Flows";

@Table({
  tableName: "sms",
})
export class Sms extends Model {
  @AllowNull(false)
  @Column(DataType.STRING)
  name!: string;

  @AllowNull(false)
  @Column(DataType.INTEGER)
  amountsend!: number;

  @ForeignKey(() => Flows)
  @AllowNull(true)
  @Column(DataType.INTEGER)
  flowId!: number;

  @BelongsTo(() => Flows, { as: "flow" })
  flow!: Flows;
}
