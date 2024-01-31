import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'documento_tipo' })
export class DocumentoTipo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  nombre: string;

  @Column({ length: 10 })
  prefijo: string;
}
