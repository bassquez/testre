import * as mongoose from 'mongoose';

const contratistaSchema = new mongoose.Schema({
  nombre: String,
  identificacion: { type: String, unique: true, lowercase: true, trim: true },
  tipoId: String,
  usuario: String,
  fechaCreacion: Date
});

const Contratista = mongoose.model('Contratista', contratistaSchema);

export default Contratista;
