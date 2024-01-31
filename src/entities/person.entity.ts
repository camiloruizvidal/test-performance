import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'persona' })
export class Persona {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  nombre: string;

  @Column({ length: 255 })
  apellido: string;

  @Column()
  id_tipo_documento: number;

  @Column({ unique: true, length: 20 })
  numero_documento: string;
}
