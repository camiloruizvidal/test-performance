import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface DocumentoTipoAttributes {
  id: number;
  nombre: string;
  prefijo: string;
}

export type DocumentoTipoPk = "id";
export type DocumentoTipoId = DocumentoTipo[DocumentoTipoPk];
export type DocumentoTipoOptionalAttributes = "id";
export type DocumentoTipoCreationAttributes = Optional<DocumentoTipoAttributes, DocumentoTipoOptionalAttributes>;

export class DocumentoTipo extends Model<DocumentoTipoAttributes, DocumentoTipoCreationAttributes> implements DocumentoTipoAttributes {
  id!: number;
  nombre!: string;
  prefijo!: string;


  static initModel(sequelize: Sequelize.Sequelize): typeof DocumentoTipo {
    return DocumentoTipo.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nombre: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    prefijo: {
      type: DataTypes.STRING(10),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'documento_tipo',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}
