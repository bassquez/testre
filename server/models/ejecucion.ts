import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;

const ejecucionSchema = new Schema({
  proyecto: { type: Schema.Types.ObjectId, ref: 'Proyecto'},
  usuario: String,
  idFactura: String,
  fuente: { type: Schema.Types.ObjectId, ref: 'FuenteFinanciacion'},
  valor: Number,
  fecha: Date,
  fechaCreacion: Date
});

const Ejecucion = mongoose.model('Ejecucion', ejecucionSchema);

export default Ejecucion;
