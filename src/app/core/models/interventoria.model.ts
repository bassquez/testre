import { Proyecto } from './proyecto.model';
import { User } from './user.model';
import { Factura } from './factura.model';

export class Interventoria {
    _id?: string;
    proyecto?: Proyecto;
    informe?: string;
    fechaCreacion?: Date;
    interventor?: User;
    ejecucion?: number;
    tipoinforme?: string;
    facturasAvaladas?: Factura[];

}