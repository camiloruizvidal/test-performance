import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Persona } from './entities/person.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { PersonaModel } from './models/personaModel';
import { PersonaRepository } from './reposities/persona.repository';
import { CarroModel } from './models/carroModel';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Persona)
    private readonly personaRepository: Repository<Persona>,
  ) {}

  public async testTypeOrmVSequelize(
    totalRecords: number = 1000000,
  ): Promise<string> {
    try {
      const timeTypeOrmRepository: any = await this.testTypeOrmRepository(
        this.generateJson(totalRecords),
      );

      const timeSequelizeBulkCreate = await this.testSequelizeBulkCreate(
        this.generateJson(totalRecords),
      );

      const result = {
        typeOrm: {
          timems: timeTypeOrmRepository.time,
          memory: this.setControl(timeTypeOrmRepository),
          records: totalRecords,
        },
        sequelize: {
          bulkCreate: `Tiempo de ejecución1 repository: ${timeSequelizeBulkCreate.time} milisegundos en insertar ${totalRecords} registros.`,
          timems: timeSequelizeBulkCreate.time,
          memory: this.setControl(timeTypeOrmRepository),
          records: totalRecords,
        },
      };
      const html = `
      <tr>
        <td></td>
        <td>TypeORM</td>
        <td>Sequelize</td>
      </tr>
      <tr>
        <td>Cantidad de Registros</td>
        <td>${totalRecords.toLocaleString()}</td>
        <td>${totalRecords.toLocaleString()}</td>
      </tr>
      <tr>
        <td>T° Milisegundos</td>
        <td>${result.typeOrm.timems.toLocaleString()}</td>
        <td>${result.sequelize.timems.toLocaleString()}</td>
      </tr>
      <tr>
        <td>Uso de Memoria antes</td>
        <td>${result.typeOrm.memory.antes.toLocaleString()}</td>
        <td>${result.sequelize.memory.antes.toLocaleString()}</td>
      </tr>
      <tr>
        <td>Uso de Memoria después</td>
        <td>${result.typeOrm.memory.despues.toLocaleString()}</td>
        <td>${result.sequelize.memory.despues.toLocaleString()}</td>
      </tr>
      <tr><td></td><td></td><td></td></tr>
      `;

      return html;
    } catch (error) {
      throw error;
    }
  }

  private setControl(data: any) {
    const { memoryUsageBefore, memoryUsageAfter } = data;
    return {
      antes: (memoryUsageBefore.heapUsed / 1000).toFixed(2) + ' kb',
      despues: (memoryUsageAfter.heapUsed / 1000).toFixed(2) + ' kb',
    };
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
    await PersonaRepository.bulkCreate(persons);
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

  public async testPersonsWithCars(
    cantidadPersonas: number,
    carrosPorPersona: number,
  ) {
    try {
      const dataPersonsWithCar = this.generarDatosAleatorios(
        cantidadPersonas,
        carrosPorPersona,
      );
      await PersonaModel.bulkCreate(dataPersonsWithCar, {
        include: [
          {
            model: CarroModel,
            as: 'carros',
          },
        ],
      });

      return await PersonaModel.findAll({
        include: [
          {
            model: CarroModel,
            as: 'carros',
          },
        ],
      });
    } catch (error) {
      throw error;
    }
  }

  public async testPersonsWithCarsBad(
    cantidadPersonas: number,
    carrosPorPersona: number,
  ) {
    try {
      const dataPersonsWithCar = this.generarDatosAleatorios(
        cantidadPersonas,
        carrosPorPersona,
      );

      const personsData = dataPersonsWithCar.map(
        ({ nombre, apellido, id_tipo_documento, numero_documento }) => ({
          nombre,
          apellido,
          id_tipo_documento,
          numero_documento,
        }),
      );

      const personsCreated = await PersonaModel.bulkCreate(personsData);
      const idsPersons = personsCreated.map((persona) => persona.id);

      const carrsData = dataPersonsWithCar.flatMap(({ carros }, index) => {
        return carros.map(({ placa, modelo, tipoId }) => ({
          placa,
          modelo,
          tipoId,
          personaId: idsPersons[index],
        }));
      });

      await CarroModel.bulkCreate(carrsData);

      return await PersonaModel.findAll({
        include: [
          {
            model: CarroModel,
            as: 'carros',
          },
        ],
      });
    } catch (error) {
      throw error;
    }
  }

  public async testPersonsWithCarsBadButBad(
    cantidadPersonas: number,
    carrosPorPersona: number,
  ) {
    try {
      const datosAleatorios = this.generarDatosAleatorios(
        cantidadPersonas,
        carrosPorPersona,
      );
      const personasConCarros = [];

      for (let i = 0; i < cantidadPersonas; i++) {
        const personaData = datosAleatorios[i];

        const personaCreada = await PersonaModel.create({
          nombre: personaData.nombre,
          apellido: personaData.apellido,
          id_tipo_documento: personaData.id_tipo_documento,
          numero_documento: personaData.numero_documento,
        });
        const personaId = personaCreada.id;

        const carrosData = personaData.carros.map(
          ({ placa, modelo, tipoId }) => ({
            placa,
            modelo,
            tipoId,
            personaId,
          }),
        );

        await CarroModel.bulkCreate(carrosData);
        const personaConCarros = await PersonaModel.findByPk(personaId, {
          include: [
            {
              model: CarroModel,
              as: 'carros',
            },
          ],
        });

        personasConCarros.push(personaConCarros);
      }

      return personasConCarros;
    } catch (error) {
      throw error;
    }
  }

  public generarDatosAleatorios(
    cantidadPersonas: number,
    carrosPorPersona: number,
  ): any[] {
    const datosGenerados = [];

    for (let i = 0; i < cantidadPersonas; i++) {
      const persona = {
        nombre: this.generateRandomName(),
        apellido: this.generateRandomName(),
        id_tipo_documento: Math.floor(Math.random() * 5) + 1,
        numero_documento: (
          `${i + 1}-` +
          (
            Math.floor(Math.random() * (10000000000 - 1000 + 1)) + 1000
          ).toString()
        ).toString(),
        carros: [],
      };

      for (let j = 0; j < carrosPorPersona; j++) {
        const carro = {
          placa: `${i} - ${j}`,
          modelo: '2000',
          tipoId: 1,
        };

        persona.carros.push(carro);
      }

      datosGenerados.push(persona);
    }

    return datosGenerados;
  }
}
