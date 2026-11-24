const SalidaPaquete = require('../models/departureModel');

const createDeparture = async (data) => {
  if (data.cupo_disponible === undefined) {
    data.cupo_disponible = data.cupo_maximo;
  }
  return await SalidaPaquete.create(data);
};

const getAllDepartures = async (paqueteId) => {
  const filtro = { activa: true };
  if (paqueteId) filtro.paquete_id = paqueteId;

  return await SalidaPaquete.find(filtro)
    .populate('paquete_id', 'codigo_paquete titulo_comercial duracion_dias duracion_noches');
};

const getDepartureById = async (id) => {
  const salida = await SalidaPaquete.findById(id).populate('paquete_id');
  if (!salida) {
    const error = new Error('Salida de paquete no encontrada.');
    error.statusCode = 404;
    throw error;
  }
  return salida;
};

const updateDeparture = async (id, data) => {
  const updated = await SalidaPaquete.findByIdAndUpdate(id, data, { new: true, runValidators: true });
  if (!updated) {
    const error = new Error('Salida de paquete no encontrada.');
    error.statusCode = 404;
    throw error;
  }
  return updated;
};

const deleteDeparture = async (id) => {
  const deleted = await SalidaPaquete.findByIdAndDelete(id);
  if (!deleted) {
    const error = new Error('Salida de paquete no encontrada.');
    error.statusCode = 404;
    throw error;
  }
  return deleted;
};

module.exports = {
  createDeparture,
  getAllDepartures,
  getDepartureById,
  updateDeparture,
  deleteDeparture
};