import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;
// const Contratista = mongoose.model('Contratista');

const fuenteFinanciacionSchema = new mongoose.Schema({
  rubro: { type: String, unique: true, lowercase: true, trim: true },
  nombre: String,
  monto: Number,
  vencimiento: Date,
  usuario: String,
  fechaCreacion: Date
});

const FuenteFinanciacion = mongoose.model('FuenteFinanciacion', fuenteFinanciacionSchema);

export default FuenteFinanciacion;
