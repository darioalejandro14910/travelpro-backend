const mongoose = require('mongoose');

const pasajeroReservaSchema = new mongoose.Schema({
  tarifa_id: { type: mongoose.Schema.Types.ObjectId, required: true },
  nombre: { type: String, required: true },
  apellido: { type: String, required: true },
  genero: { type: String },
  documento_tipo: { type: String, enum: ['DNI', 'PASAPORTE'], required: true },
  documento_nro: { type: String, required: true },
  fecha_nacimiento: { type: Date, required: true },
  nacionalidad: { type: String, required: true },
  precio_aplicado: { type: Number, required: true },
  requerimientos_especiales: { type: String, default: null },
  es_titular: { type: Boolean, default: false }
});

const bookingSchema = new mongoose.Schema({
  codigo_reserva: { type: String, required: true, unique: true, uppercase: true },
  cliente_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario',
    required: true
  },
  agente_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario',
    default: null
  },
  salida_paquete_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'SalidaPaquete',
    required: true
  },
  subtotal: { type: Number, required: true },
  descuento_aplicado: { type: Number, default: 0 },
  impuestos: { type: Number, default: 0 },
  total_final: { type: Number, required: true },
  saldo_pendiente: { type: Number, required: true },
  moneda: { type: String, default: 'USD' },
  estado_reserva: {
    type: String,
    enum: ['pendiente_pago', 'senada', 'pagada_total', 'cancelada'],
    default: 'pendiente_pago'
  },
  reserva_pasajeros: [pasajeroReservaSchema]
}, { timestamps: true });

module.exports = mongoose.model('Reserva', bookingSchema);