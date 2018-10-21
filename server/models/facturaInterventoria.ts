import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;

const facturaInterventoriaSchema = new Schema({
  factura: { type: Schema.Types.ObjectId, ref: 'Factura'},
  interventoria: { type: Schema.Types.ObjectId, ref: 'Interventoria'}
});

const FacturaInterventoria = mongoose.model('FacturaInterventoria', facturaInterventoriaSchema);

export default FacturaInterventoria;
