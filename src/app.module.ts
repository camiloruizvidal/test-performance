import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Persona } from './entities/person.entity';
import { DocumentoTipo } from './entities/documento-tipo.entity';

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
    TypeOrmModule.forFeature([Persona, DocumentoTipo]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
