import { Table, Column, Model } from 'sequelize-typescript';

@Table({ tableName: 'documento_tipo' })
export class DocuemntoTipoModel extends Model {
  @Column
  nombre: string;

  @Column
  apellido: string;

  @Column
  id_tipo_documento: number;

  @Column
  numero_documento: string;
}
