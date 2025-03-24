import { Table, Column, Model, PrimaryKey, AutoIncrement, DataType, Default, AllowNull } from 'sequelize-typescript';

@Table({ tableName: 'Usuarios' }) // Nombre de la tabla en la base de datos
export class UsuarioModel extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    IdUsuario!: number;

    @Column(DataType.STRING(100))
    Usuario!: string;

    @Column(DataType.STRING(100))
    Clave!: string;

    @AllowNull(true)
    @Column(DataType.STRING(100))
    ClaveTemporal!: string;

    @Column(DataType.DATE)
    Fcingreso!: Date;

    @AllowNull(true)
    @Column(DataType.DATE)
    FCBaja!: Date;

    @AllowNull(true)
    @Column(DataType.STRING(255))
    RutalmagenPerfil!: string;

    @AllowNull(true)
    @Column(DataType.STRING(255))
    RutalmagenCuerpo!: string;

    @Column(DataType.INTEGER)
    Entidad_id!: number;

    @Default(false)
    @Column(DataType.BOOLEAN)
    Online!: boolean;

    @Column(DataType.INTEGER)
    Estado_id!: number;

    @Column(DataType.DATE)
    UltimaFechMod!: Date;

    @Column(DataType.STRING(100))
    UltimoUserMod!: string;

    @Default(0)
    @Column(DataType.INTEGER)
    Premium!: number;

    @AllowNull(true)
    @Column(DataType.DATE)
    FechaExpiracionPremium!: Date;

    @AllowNull(true)
    @Column(DataType.DATE)
    FechaExpiracion!: Date;
}