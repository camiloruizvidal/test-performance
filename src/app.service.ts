import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Persona } from './entities/person.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Persona)
    private readonly personaRepository: Repository<Persona>,
  ) {}

  public async testTypeOrm(totalRecords: number = 1000000) {
    const persons: Persona[] = this.generateJson(totalRecords);
    const executionTime1: any = await this.testTypeOrmRepository(persons);
    const executionTime2: any = await this.testTypeOrmLoop(persons);
    return (
      `Tiempo de ejecución1 loop: ${executionTime1} milisegundos en insertar ${totalRecords} registros.` +
      `Tiempo de ejecución2 repository: ${executionTime2} milisegundos en insertar ${totalRecords} registros.`
    );
  }

  private async testTypeOrmRepository(persons: Persona[]) {
    const startTime: any = new Date();
    await this.personaRepository.save(persons);
    const endTime: any = new Date();
    return endTime - startTime;
  }

  private async testTypeOrmLoop(persons: Persona[]) {
    const startTime: any = new Date();
    for (const [index, person] of persons.entries()) {
      await this.personaRepository.save(person);
    }
    const endTime: any = new Date();
    return endTime - startTime;
  }

  public async testSequelize(totalRecords: number = 1000000) {
    const persons: Persona[] = this.generateJson(totalRecords);
    const startTime: any = new Date();

    const endTime: any = new Date();
    const executionTime: any = endTime - startTime;

    return `Tiempo de ejecución: ${executionTime} milisegundos`;
  }

  private generateJson(
    totalRecords: number = 1000000,
    start: number = 0,
  ): Persona[] {
    const records = [];

    for (let i = 1; i <= start + totalRecords; i++) {
      records.push(this.generateRandomPersona(i));
    }
    return records;
  }

  private generateRandomPersona(id) {
    const nombre = this.generateRandomName();
    const apellido = this.generateRandomName();
    const id_tipo_documento = 1;
    const numero_documento = id; //((id - 1) % 100000) + 1;

    return {
      id,
      nombre,
      apellido,
      id_tipo_documento,
      numero_documento,
    };
  }

  private generateRandomName() {
    const nombres = [
      'Juan',
      'María',
      'Carlos',
      'Ana',
      'Pedro',
      'Laura',
      'Diego',
      'Sofía',
    ];
    const apellidos = [
      'Gómez',
      'Rodríguez',
      'López',
      'Pérez',
      'Martínez',
      'García',
      'Fernández',
    ];

    const randomNombre = nombres[Math.floor(Math.random() * nombres.length)];
    const randomApellido =
      apellidos[Math.floor(Math.random() * apellidos.length)];

    return `${randomNombre} ${randomApellido}`;
  }
}
