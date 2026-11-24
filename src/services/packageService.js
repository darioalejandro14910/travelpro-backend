const PaqueteTour = require('../models/packageModel');

const createPackage = async (data) => {
  const existe = await PaqueteTour.findOne({ codigo_paquete: data.codigo_paquete });
  if (existe) {
    const error = new Error('Ya existe un paquete con ese código comercial.');
    error.statusCode = 400;
    throw error;
  }
  return await PaqueteTour.create(data);
};

const getAllPackages = async () => {
  return await PaqueteTour.find({ activo: true })
    .populate({
      path: 'destinos.destino_id',
      select: 'nombre pais codigo_iata descripcion_corta categorias_ids',
      populate: { path: 'categorias_ids', select: 'slug nombre_mostrar' }
    });
};

const getPackageById = async (id) => {
  const paquete = await PaqueteTour.findById(id)
    .populate({
      path: 'destinos.destino_id',
      populate: { path: 'categorias_ids', select: 'slug nombre_mostrar' }
    });

  if (!paquete) {
    const error = new Error('Paquete turístico no encontrado.');
    error.statusCode = 404;
    throw error;
  }
  return paquete;
};

const updatePackage = async (id, data) => {
  const updated = await PaqueteTour.findByIdAndUpdate(id, data, { new: true, runValidators: true });
  if (!updated) {
    const error = new Error('Paquete turístico no encontrado.');
    error.statusCode = 404;
    throw error;
  }
  return updated;
};

const deletePackage = async (id) => {
  const deleted = await PaqueteTour.findByIdAndDelete(id);
  if (!deleted) {
    const error = new Error('Paquete turístico no encontrado.');
    error.statusCode = 404;
    throw error;
  }
  return deleted;
};

module.exports = {
  createPackage,
  getAllPackages,
  getPackageById,
  updatePackage,
  deletePackage
};