import { CargasTmpModel } from 'src/models/models/cargas-tmp.model';
import { PersonaModel } from 'src/models/personaModel';

export const personRepositoryProvider = {
  provide: 'PERSON_REPOSITORY',
  useValue: PersonaModel,
};
export const cargaRpositoryProvider = {
  provide: 'CARGA_REPOSITORY',
  useValue: CargasTmpModel,
};
