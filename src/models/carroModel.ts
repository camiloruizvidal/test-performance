import {
  Table,
  Column,
  Model,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { PersonaModel } from './personaModel';

@Table({ tableName: 'carro' })
export class CarroModel extends Model<CarroModel> {
  @Column({ primaryKey: true, autoIncrement: true })
  id: number;

  @Column({
    allowNull: false,
  })
  placa: string;

  @Column({
    allowNull: false,
  })
  modelo: string;

  @Column({
    allowNull: false,
  })
  tipoId: string;

  @ForeignKey(() => PersonaModel)
  @Column({
    allowNull: false,
  })
  personaId: number;

  @BelongsTo(() => PersonaModel, { foreignKey: 'personaId', as: 'dueño' })
  persona: PersonaModel;
}
