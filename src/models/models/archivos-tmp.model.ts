import {
  AutoIncrement,
  Column,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

@Table({
  tableName: 'ArchivosTmp',
})
export class ArchivosTmpModel extends Model {
  @AutoIncrement
  @PrimaryKey
  @Column
  id: number;

  @Column({
    type: 'STRING',
  })
  cargaTmpld: string;

  @Column({
    type: 'STRING',
  })
  nombre: string;
}
