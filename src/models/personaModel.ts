import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({ tableName: 'persona' })
export class PersonaModel extends Model {
  @Column({ primaryKey: true, autoIncrement: true })
  id: number;

  @Column
  nombre: string;

  @Column
  apellido: string;

  @Column
  id_tipo_documento: number;

  @Column
  numero_documento: string;

  @Column({
    type: DataType.DATE,
    allowNull: false,
    defaultValue: DataType.NOW,
    field: 'created_at',
  })
  createdAt: Date;

  @Column({
    type: DataType.DATE,
    allowNull: false,
    defaultValue: DataType.NOW,
    field: 'updated_at',
  })
  updatedAt: Date;
}
