const mongoose = require('mongoose');

const destinationSchema = new mongoose.Schema({
  nombre: { type: String, required: true, trim: true },
  pais: { type: String, required: true, trim: true },
  codigo_iata: { type: String, required: true, uppercase: true, trim: true },
  descripcion_corta: { type: String, required: true },
  descripcion_detallada: { type: String },
  coordenadas: {
    lat: { type: Number },
    lng: { type: Number }
  },
  tags: [{ type: String }],
  categorias_ids: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Categoria',
    required: true
  }],
  activo: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Destino', destinationSchema);