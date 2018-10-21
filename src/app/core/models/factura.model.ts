import { Proyecto } from './proyecto.model';
import { FuenteFinanciacion } from './fuenteFinanciacion.model';

export class Factura {
    _id?: string;
    proyecto?: Proyecto;
    fuenteFinanciacion?: FuenteFinanciacion;
    valor?: number;
    identificacion?: string;
    fecha?: Date;
    avalado?: boolean;
}