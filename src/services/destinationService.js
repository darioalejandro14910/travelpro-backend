const Destino = require('../models/destinationModel');

const createDestination = async (data) => {
  return await Destino.create(data);
};

const getAllDestinations = async () => {
  return await Destino.find({ activo: true }).populate('categorias_ids', 'slug nombre_mostrar');
};

const getDestinationById = async (id) => {
  const destino = await Destino.findById(id).populate('categorias_ids', 'slug nombre_mostrar descripcion');
  if (!destino) {
    const error = new Error('Destino no encontrado.');
    error.statusCode = 404;
    throw error;
  }
  return destino;
};

const updateDestination = async (id, data) => {
  const updated = await Destino.findByIdAndUpdate(id, data, { new: true, runValidators: true });
  if (!updated) {
    const error = new Error('Destino no encontrado.');
    error.statusCode = 404;
    throw error;
  }
  return updated;
};

const deleteDestination = async (id) => {
  const deleted = await Destino.findByIdAndDelete(id);
  if (!deleted) {
    const error = new Error('Destino no encontrado.');
    error.statusCode = 404;
    throw error;
  }
  return deleted;
};

module.exports = {
  createDestination,
  getAllDestinations,
  getDestinationById,
  updateDestination,
  deleteDestination
};