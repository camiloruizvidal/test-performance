import { PersonaRepository } from './reposities/persona.repository';
import { Controller, Get, Inject, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { Model, Repository, Sequelize } from 'sequelize-typescript';
import { PersonaModel } from './models/personaModel';
import { CargasTmpModel } from './models/models/cargas-tmp.model';
import {
  cargaRpositoryProvider,
  personRepositoryProvider,
} from './providers/repositories';

@Controller()
export class AppController {
  constructor(
    private appService: AppService,
    private readonly sequelize: Sequelize,
    @Inject(personRepositoryProvider.provide)
    private personRepository: Repository<PersonaModel>,
    @Inject(cargaRpositoryProvider.provide)
    private cargaRepository: Repository<CargasTmpModel>,
    private personaModelExampleRepository: PersonaRepository,
  ) {}

  @Get('dynamic')
  async dynamicRepository() {
    const personas = this.personRepository.findAll();
    const cargas = this.cargaRepository.findAll();
    return { personas, cargas };
  }

  @Get('testTypeOrmVSequelize')
  async testTypeOrmVSequelize() {
    const testValues = [10000, 20000, 50000, 100000];
    let resultHtml = '<table>';
    for (const value of testValues) {
      console.log(`Entrando a t${value.toLocaleString()}`);
      const result: string = await this.appService.testTypeOrmVSequelize(value);
      console.log(`Saliendo de t${value.toLocaleString()}`);

      resultHtml += result;
    }

    resultHtml += '</table>';
    return resultHtml;
  }

  @Get('testpersona')
  async testPersona(
    @Query('page') page: number = 1,
    @Query('pageSize') pageSize: number = 100,
  ) {
    const paginate = await PersonaRepository.paginate(page, pageSize);
    const findFirst100 = await PersonaRepository.findAll({ limit: pageSize });
    return { paginate, findFirst100 };
  }

  @Get('testpersonaWithCar')
  async testPersonaWithCar() {
    try {
      const persons = 100000;
      const cars = 5;

      await this.borrarTodo();
      const startTime1: any = new Date();
      const testPersons1 = await this.appService.testPersonsWithCars(
        persons,
        cars,
      );
      const endTime1: any = new Date();

      await this.borrarTodo();
      const startTime2: any = new Date();
      const testPersons2 = await this.appService.testPersonsWithCarsBad(
        persons,
        cars,
      );
      const endTime2: any = new Date();

      await this.borrarTodo();
      const startTime3: any = new Date();
      const testPersons3 = await this.appService.testPersonsWithCarsBadButBad(
        persons,
        cars,
      );
      const endTime3: any = new Date();

      return {
        times: {
          BulkCreate: endTime1 - startTime1,
          BulkCreateAndMap: endTime2 - startTime2,
          ForAndBulkCreate: endTime3 - startTime3,
        },
        persons: { testPersons3, testPersons2, testPersons1 },
      };
    } catch (error) {
      return { error: error.message };
    }
  }

  private async borrarTodo() {
    await this.sequelize.query('DELETE FROM carro;');
    await this.sequelize.query('DELETE FROM persona;');
    await this.sequelize.query('ALTER TABLE carro AUTO_INCREMENT = 1;');
    await this.sequelize.query('ALTER TABLE persona AUTO_INCREMENT = 1;');
  }
}
