import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;

const facturaSchema = new Schema({
  proyecto: { type: Schema.Types.ObjectId, ref: 'Proyecto'},
  fuenteFinanciacion: { type: Schema.Types.ObjectId, ref: 'FuenteFinanciacion'},
  valor: Number,
  identificacion: String,
  fecha: Date,
  avalado: Boolean
});

const Factura = mongoose.model('Factura', facturaSchema);

export default Factura;
