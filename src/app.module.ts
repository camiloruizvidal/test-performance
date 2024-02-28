import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SequelizeModule } from '@nestjs/sequelize';
import { Persona } from './entities/person.entity';
import { DocumentoTipo } from './entities/documento-tipo.entity';
import { PersonaModel } from './models/personaModel';
import { DocuemntoTipoModel } from './models/documentoTipoModel';
import { CarroModel } from './models/carroModel';
import { EventsModule } from './modules/events/events.module';
import { CargasTmpModel } from './models/models/cargas-tmp.model';
import {
  cargaRpositoryProvider,
  personRepositoryProvider,
} from './providers/repositories';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'test_performance2',
      entities: [Persona, DocumentoTipo],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Persona, DocumentoTipo]),

    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'test_performance2',
      autoLoadModels: true,
      synchronize: true,
      models: [PersonaModel, DocuemntoTipoModel, CarroModel, CargasTmpModel],
      logging: false,
    }),
    EventsModule,
  ],
  controllers: [AppController],
  providers: [AppService, personRepositoryProvider, cargaRpositoryProvider],
})
export class AppModule {}
