const mongoose = require('mongoose');

const tarifaSchema = new mongoose.Schema({
  tipo_pasajero: { type: String, enum: ['adulto', 'menor', 'infante'], required: true },
  tipo_acomodacion: { type: String, enum: ['single', 'doble', 'triple', 'cuadruple'], required: true },
  precio_venta: { type: Number, required: true, min: 0 },
  impuestos_incluidos: { type: Number, default: 0 }
});

const departureSchema = new mongoose.Schema({
  paquete_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'PaqueteTour',
    required: true
  },
  codigo_salida: { type: String, required: true, unique: true, uppercase: true, trim: true },
  fecha_salida: { type: Date, required: true },
  fecha_regreso: { type: Date, required: true },
  cupo_maximo: { type: Number, required: true, min: 1 },
  cupo_disponible: { type: Number, required: true, min: 0 },
  moneda: { type: String, default: 'USD' },
  salidas_tarifas: [tarifaSchema],
  activa: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('SalidaPaquete', departureSchema);