import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;
const Contratista = mongoose.model('Contratista');

const proyectoSchema = new Schema({
  identificacion: { type: String, unique: true, lowercase: true, trim: true },
  objeto: String,
  plazo: Number,
  tipoPlazo: String,
  fechaInicio: Date,
  fechaFin: Date,
  inversion: Number,
  usuario: String,
  fechaCreacion: Date,
  contratista: { type: Schema.Types.ObjectId, ref: 'Contratista' },
  interventor: { type: Schema.Types.ObjectId, ref: 'User' }
});

const Proyecto = mongoose.model('Proyecto', proyectoSchema);

export default Proyecto;
