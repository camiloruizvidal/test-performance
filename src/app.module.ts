import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SequelizeModule } from '@nestjs/sequelize';
import { Persona } from './entities/person.entity';
import { DocumentoTipo } from './entities/documento-tipo.entity';
import { PersonaModel } from './models/personaModel';
import { DocuemntoTipoModel } from './models/documentoTipoModel';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'test_performance',
      entities: [Persona, DocumentoTipo],
      synchronize: true,
    }),

    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'test_performance',
      autoLoadModels: true,
      synchronize: true,
      models: [PersonaModel, DocuemntoTipoModel],
    }),
    TypeOrmModule.forFeature([Persona, DocumentoTipo]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
