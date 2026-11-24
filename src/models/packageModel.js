const mongoose = require('mongoose');

const itinerarioItemSchema = new mongoose.Schema({
  dia: { type: Number, required: true },
  titulo: { type: String, required: true },
  detalle: { type: String, required: true }
}, { _id: false });

const paqueteDestinoSchema = new mongoose.Schema({
  destino_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Destino',
    required: true
  },
  orden_visita: { type: Number, default: 1 },
  noches_estadia: { type: Number, required: true }
}, { _id: false });

const packageSchema = new mongoose.Schema({
  codigo_paquete: { type: String, required: true, unique: true, uppercase: true, trim: true },
  titulo_comercial: { type: String, required: true, trim: true },
  descripcion: { type: String, required: true },
  duracion_dias: { type: Number, required: true, min: 1 },
  duracion_noches: { type: Number, required: true, min: 0 },
  destinos: [paqueteDestinoSchema],
  itinerario: [itinerarioItemSchema],
  politicas_cancelacion: { type: String },
  activo: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('PaqueteTour', packageSchema);