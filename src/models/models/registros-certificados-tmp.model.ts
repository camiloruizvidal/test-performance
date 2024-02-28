import {
  AutoIncrement,
  Column,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { CargasTmpModel } from './cargas-tmp.model';

@Table({
  tableName: 'RegistrosCertificadosTmp',
})
export class RegistrosCertificadosTmpModel extends Model {
  @AutoIncrement
  @PrimaryKey
  @Column
  id: number;

  @Column({
    type: 'STRING',
  })
  item3: string;

  @ForeignKey(() => CargasTmpModel)
  @Column
  cargaTmpld: number;
}
