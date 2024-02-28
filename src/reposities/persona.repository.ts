import { Injectable } from '@nestjs/common';
import { PersonaModel } from 'src/models/personaModel';

@Injectable()
export class PersonaRepository extends PersonaModel {
  static async paginate(page: number = 1, pageSize: number = 10): Promise<any> {
    const offset = (page - 1) * pageSize;
    const data = await PersonaModel.findAll({
      offset,
      limit: pageSize,
    });
    return {
      data,
      page,
      pageSize,
    };
  }
}
