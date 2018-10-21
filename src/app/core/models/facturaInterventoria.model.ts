import { Factura } from './factura.model';
import { Interventoria } from './interventoria.model';

export class FacturaInterventoria {
    _id?: string;
    factura?: Factura;
    interventoria?: Interventoria;
}