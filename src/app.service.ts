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
    try {
      const timeTypeOrmLoop: any = await this.testTypeOrmLoop(
        this.generateJson(totalRecords),
      );

      const timeTypeOrmLoop2: any = await this.testTypeOrmLoop2(
        this.generateJson(totalRecords),
      );

      const timeTypeOrmRepository: any = await this.testTypeOrmRepository(
        this.generateJson(totalRecords),
      );

      const timeSequelizeBulkCreate = await this.testSequelizeBulkCreate(
        this.generateJson(totalRecords),
      );

      const timeSequelizeLoop = await this.testSequelizeLoop(
        this.generateJson(totalRecords),
      );

      const timeSequelizeLoop2 = await this.testSequelizeLoop2(
        this.generateJson(totalRecords),
      );

      return {
        typeOrm: [
          {
            saveAll: `Tiempo de ejecución1 repository: ${timeTypeOrmRepository.time} milisegundos en insertar ${totalRecords} registros.`,
            control: timeTypeOrmRepository,
          },
          {
            loop: `Tiempo de ejecución2 loop: ${timeTypeOrmLoop.time} milisegundos en insertar ${totalRecords} registros.`,
            control: timeTypeOrmLoop,
          },
          {
            loop2: `Tiempo de ejecución3 loop2: ${timeTypeOrmLoop2.time} milisegundos en insertar ${totalRecords} registros.`,
            control: timeTypeOrmLoop2,
          },
        ],
        sequelize: [
          {
            bulkCreate: `Tiempo de ejecución1 repository: ${timeSequelizeBulkCreate.time} milisegundos en insertar ${totalRecords} registros.`,
            control: timeSequelizeBulkCreate,
          },
          {
            loop: `Tiempo de ejecución2 loop: ${timeSequelizeLoop.time} milisegundos en insertar ${totalRecords} registros.`,
            control: timeSequelizeLoop,
          },
          {
            loop2: `Tiempo de ejecución3 loop2: ${timeSequelizeLoop2.time} milisegundos en insertar ${totalRecords} registros.`,
            control: timeSequelizeLoop2,
          },
        ],
      };
    } catch (error) {
      return { process, error };
    }
  }

  private async testTypeOrmRepository(persons: Persona[]) {
    const usageBefore = process.memoryUsage();
    const cpuBefore = process.cpuUsage();
    const startTime: any = new Date();
    await this.personaRepository.save(persons);
    const endTime: any = new Date();
    const usageAfter = process.memoryUsage();
    const cpuAfter = process.cpuUsage(cpuBefore);
    return {
      time: endTime - startTime,
      memoryUsageBefore: usageBefore,
      memoryUsageAfter: usageAfter,
      cpuUsage: cpuAfter,
    };
  }

  private async testTypeOrmLoop(persons: Persona[]) {
    const usageBefore = process.memoryUsage();
    const cpuBefore = process.cpuUsage();
    const startTime: any = new Date();
    for (const [index, person] of persons.entries()) {
      await this.personaRepository.save(person);
    }
    const endTime: any = new Date();
    const usageAfter = process.memoryUsage();
    const cpuAfter = process.cpuUsage(cpuBefore);
    return {
      time: endTime - startTime,
      memoryUsageBefore: usageBefore,
      memoryUsageAfter: usageAfter,
      cpuUsage: cpuAfter,
    };
  }

  private async testTypeOrmLoop2(persons: Persona[]) {
    const usageBefore = process.memoryUsage();
    const cpuBefore = process.cpuUsage();
    const startTime: any = new Date();
    const savePromises = persons.map((person) =>
      this.personaRepository.save(person),
    );
    await Promise.all(savePromises);
    const endTime: any = new Date();
    const usageAfter = process.memoryUsage();
    const cpuAfter = process.cpuUsage(cpuBefore);
    return {
      time: endTime - startTime,
      memoryUsageBefore: usageBefore,
      memoryUsageAfter: usageAfter,
      cpuUsage: cpuAfter,
    };
  }

  private async testSequelizeBulkCreate(persons: any[]) {
    const usageBefore = process.memoryUsage();
    const cpuBefore = process.cpuUsage();
    const startTime: any = new Date();
    await PersonaModel.bulkCreate(persons);
    const endTime: any = new Date();
    const usageAfter = process.memoryUsage();
    const cpuAfter = process.cpuUsage(cpuBefore);
    return {
      time: endTime - startTime,
      memoryUsageBefore: usageBefore,
      memoryUsageAfter: usageAfter,
      cpuUsage: cpuAfter,
    };
  }

  private async testSequelizeLoop(persons: any[]) {
    const usageBefore = process.memoryUsage();
    const cpuBefore = process.cpuUsage();
    const startTime: any = new Date();
    for (const person of persons) {
      await PersonaModel.create(person);
    }
    const endTime: any = new Date();
    const usageAfter = process.memoryUsage();
    const cpuAfter = process.cpuUsage(cpuBefore);
    return {
      time: endTime - startTime,
      memoryUsageBefore: usageBefore,
      memoryUsageAfter: usageAfter,
      cpuUsage: cpuAfter,
    };
  }

  private async testSequelizeLoop2(persons: any[]) {
    const usageBefore = process.memoryUsage();
    const cpuBefore = process.cpuUsage();
    const startTime: any = new Date();
    const createPromises = persons.map((person) => PersonaModel.create(person));
    await Promise.all(createPromises);
    const endTime: any = new Date();
    const usageAfter = process.memoryUsage();
    const cpuAfter = process.cpuUsage(cpuBefore);
    return {
      time: endTime - startTime,
      memoryUsageBefore: usageBefore,
      memoryUsageAfter: usageAfter,
      cpuUsage: cpuAfter,
    };
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
