const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
  nombre_mostrar: { type: String, required: true, trim: true },
  descripcion: { type: String, required: true },
  activa: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Categoria', categorySchema);