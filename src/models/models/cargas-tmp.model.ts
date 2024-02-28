import {
  AutoIncrement,
  PrimaryKey,
  Column,
  Model,
  Table,
  HasMany,
} from 'sequelize-typescript';
import { RegistrosCertificadosTmpModel } from './registros-certificados-tmp.model';

@Table({
  tableName: 'CargasTmp',
})
export class CargasTmpModel extends Model {
  @AutoIncrement
  @PrimaryKey
  @Column
  id: number;

  @Column({
    type: 'STRING',
  })
  polizald: string;

  @Column({
    type: 'DATE',
  })
  fechaCarga: Date;

  @Column({
    type: 'STRING',
  })
  estadoCargald: string;

  @HasMany(() => RegistrosCertificadosTmpModel, 'cargaTmpld')
  registrosCertificados: RegistrosCertificadosTmpModel[];
}
