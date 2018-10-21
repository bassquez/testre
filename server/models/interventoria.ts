import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;


const interventoriaSchema = new Schema({
  proyecto: { type: Schema.Types.ObjectId, ref: 'Proyecto'},
  interventor: String,
  informe: String,
  fechaCreacion: Date,
  ejecucion: Number,
  tipoinforme: String,
  facturasAvaladas:  [{type: Schema.Types.ObjectId, ref: 'Factura'}]
});

const Interventoria = mongoose.model('Interventoria', interventoriaSchema);

export default Interventoria;
