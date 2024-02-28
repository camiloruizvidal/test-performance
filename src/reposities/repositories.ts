import { Model } from 'sequelize';
import { CargasTmpModel } from 'src/models/models/cargas-tmp.model';
import { PersonaModel } from 'src/models/personaModel';

const repositories = {};

function addModel(model: any): void {
  repositories[`${model.name}`] = model as typeof Model;
}

addModel(PersonaModel);
addModel(CargasTmpModel);

export { repositories };
