import { Proyecto } from './proyecto.model';
import { FuenteFinanciacion } from './fuenteFinanciacion.model';

export class FuenteFinanciacionProyecto {
  _id?: string;
  inversion?: number;
  proyecto?: Proyecto;
  fuenteProyecto?: FuenteFinanciacion;
}
