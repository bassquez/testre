import { FuenteFinanciacion } from './fuenteFinanciacion.model';
import { User } from './user.model';

export class Ejecucion {
    _id?: string;
    idFactura?: string;
    valor?: number;
    fuente?: FuenteFinanciacion;
    fecha?: Date;
    fechaCreacion?: Date;
    usuario?: string;
}