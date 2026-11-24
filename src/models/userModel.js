const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const perfilClienteSchema = new mongoose.Schema({
  fecha_nacimiento: { type: Date },
  genero: { type: String },
  nacionalidad: { type: String },
  documento_tipo: { type: String, enum: ['DNI', 'PASAPORTE'] },
  documento_nro: { type: String },
  pais_emision_doc: { type: String },
  vencimiento_doc: { type: Date },
  preferencias_viaje: {
    asiento: { type: String },
    asistencia: { type: Boolean, default: false }
  },
  contacto_emergencia: {
    nombre: { type: String },
    telefono: { type: String }
  }
}, { _id: false });

const agenteMetadataSchema = new mongoose.Schema({
  sucursal_codigo: { type: String },
  legajo_interno: { type: String },
  porcentaje_comision: { type: Number, default: 5 },
  meta_mensual_usd: { type: Number, default: 0 },
  fecha_ingreso: { type: Date }
}, { _id: false });

const userSchema = new mongoose.Schema({
  nombre: { type: String, required: true, trim: true },
  apellido: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password_hash: { type: String, required: true },
  telefono: { type: String },
  rol: {
    type: String,
    enum: ['cliente', 'agente', 'supervisor', 'admin'],
    default: 'cliente'
  },
  estado: {
    type: String,
    enum: ['activo', 'inactivo', 'suspendido'],
    default: 'activo'
  },
  perfiles_clientes: perfilClienteSchema,
  agentes_metadata: agenteMetadataSchema
}, { timestamps: true });

userSchema.pre('save', async function (next) {
  if (!this.isModified('password_hash')) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password_hash = await bcrypt.hash(this.password_hash, salt);
    next();
  } catch (error) {
    next(error);
  }
});

userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password_hash);
};

module.exports = mongoose.model('Usuario', userSchema);