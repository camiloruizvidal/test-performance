import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Persona } from './entities/person.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { PersonaModel } from './models/personaModel';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Persona)
    private readonly personaRepository: Repository<Persona>,
  ) {}

  public async testTypeOrmVSequelize(totalRecords: number = 1000000) {
    let process = '';
    try {
      process = 'timeTypeOrmLoop';
      const timeTypeOrmLoop: any = await this.testTypeOrmLoop(
        this.generateJson(totalRecords),
      );
      process = 'timeTypeOrmLoop2';
      const timeTypeOrmLoop2: any = await this.testTypeOrmLoop2(
        this.generateJson(totalRecords),
      );
      process = 'timeTypeOrmRepository';
      const timeTypeOrmRepository: any = await this.testTypeOrmRepository(
        this.generateJson(totalRecords),
      );

      process = 'timeSequelizeBulkCreate';
      const timeSequelizeBulkCreate = await this.testSequelizeBulkCreate(
        this.generateJson(totalRecords),
      );
      process = 'timeSequelizeLoop';
      const timeSequelizeLoop = await this.testSequelizeLoop(
        this.generateJson(totalRecords),
      );
      process = 'timeSequelizeLoop2';
      const timeSequelizeLoop2 = await this.testSequelizeLoop2(
        this.generateJson(totalRecords),
      );

      return {
        typeOrm: [
          {
            saveAll: `Tiempo de ejecución1 repository: ${timeTypeOrmRepository} milisegundos en insertar ${totalRecords} registros.`,
          },
          {
            loop: `Tiempo de ejecución2 loop: ${timeTypeOrmLoop} milisegundos en insertar ${totalRecords} registros.`,
          },
          {
            loop2: `Tiempo de ejecución3 loop2: ${timeTypeOrmLoop2} milisegundos en insertar ${totalRecords} registros.`,
          },
        ],
        sequelize: [
          {
            bulkCreate: `Tiempo de ejecución1 repository: ${timeSequelizeBulkCreate} milisegundos en insertar ${totalRecords} registros.`,
          },
          {
            loop: `Tiempo de ejecución2 loop: ${timeSequelizeLoop} milisegundos en insertar ${totalRecords} registros.`,
          },
          {
            loop2: `Tiempo de ejecución3 loop2: ${timeSequelizeLoop2} milisegundos en insertar ${totalRecords} registros.`,
          },
        ],
      };
    } catch (error) {
      return { process, error };
    }
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

  private async testTypeOrmLoop2(persons: Persona[]): Promise<number> {
    const startTime: any = new Date();
    const savePromises = persons.map((person) =>
      this.personaRepository.save(person),
    );
    await Promise.all(savePromises);
    const endTime: any = new Date();

    return endTime - startTime;
  }

  private async testSequelizeBulkCreate(persons: any[]): Promise<number> {
    const startTime: any = new Date();
    //throw JSON.stringify(persons);
    await PersonaModel.bulkCreate(persons);
    const endTime: any = new Date();
    return endTime - startTime;
  }

  private async testSequelizeLoop(persons: any[]): Promise<number> {
    const startTime: any = new Date();
    for (const person of persons) {
      await PersonaModel.create(person);
    }
    const endTime: any = new Date();
    return endTime - startTime;
  }

  private async testSequelizeLoop2(persons: any[]): Promise<number> {
    const startTime: any = new Date();
    const createPromises = persons.map((person) => PersonaModel.create(person));
    await Promise.all(createPromises);
    const endTime: any = new Date();
    return endTime - startTime;
  }

  private generateJson(totalRecords: number = 1000000): Persona[] {
    const records = [];
    for (let i = 1; i <= totalRecords; i++) {
      records.push({
        nombre: this.generateRandomName(),
        apellido: this.generateRandomName(),
        id_tipo_documento: 1,
        numero_documento: i,
      });
    }
    return records;
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
