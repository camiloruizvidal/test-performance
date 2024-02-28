import { Table, Column, Model, HasMany } from 'sequelize-typescript';
import { CarroModel } from './carroModel';

@Table({ timestamps: true, tableName: 'persona' })
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

  @HasMany(() => CarroModel, { foreignKey: 'personaId', as: 'carros' })
  carros: CarroModel[];
}
