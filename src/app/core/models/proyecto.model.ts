import { Contratista } from './contratista';
import { User } from './user.model';
export class Proyecto {
    _id?: string;
    identificacion?: string;
    objeto?: string;
    plazo?: number;
    tipoPlazo?: string;
    fechaInicio?: Date;
    fechaFin?: Date;
    inversion?: number;
    usuario?: string;
    fechaCreacion?: Date;
    contratista?: Contratista;
    interventor?: User;
  }
