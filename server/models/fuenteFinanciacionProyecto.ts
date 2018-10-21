import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;

const fuenteFinanciacionProyectoSchema = new Schema({
  proyecto: { type: Schema.Types.ObjectId, ref: 'Proyecto'},
  fuenteProyecto: { type: Schema.Types.ObjectId, ref: 'FuenteFinanciacion'},
  inversion: Number
});

const FuenteFinanciacionProyecto = mongoose.model('FuenteFinanciacionProyecto', fuenteFinanciacionProyectoSchema);

export default FuenteFinanciacionProyecto;
