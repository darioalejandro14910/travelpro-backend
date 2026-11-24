const packageService = require('../services/packageService');

const createPackage = async (req, res) => {
  try {
    const paquete = await packageService.createPackage(req.body);
    res.status(201).json({ mensaje: 'Paquete turístico creado', data: paquete });
  } catch (error) {
    res.status(error.statusCode || 400).json({ mensaje: error.message });
  }
};

const getPackages = async (req, res) => {
  try {
    const paquetes = await packageService.getAllPackages();
    res.status(200).json(paquetes);
  } catch (error) {
    res.status(500).json({ mensaje: error.message });
  }
};

const getPackageById = async (req, res) => {
  try {
    const paquete = await packageService.getPackageById(req.params.id);
    res.status(200).json(paquete);
  } catch (error) {
    res.status(error.statusCode || 500).json({ mensaje: error.message });
  }
};

const updatePackage = async (req, res) => {
  try {
    const paquete = await packageService.updatePackage(req.params.id, req.body);
    res.status(200).json({ mensaje: 'Paquete actualizado', data: paquete });
  } catch (error) {
    res.status(error.statusCode || 500).json({ mensaje: error.message });
  }
};

const deletePackage = async (req, res) => {
  try {
    await packageService.deletePackage(req.params.id);
    res.status(200).json({ mensaje: 'Paquete eliminado correctamente' });
  } catch (error) {
    res.status(error.statusCode || 500).json({ mensaje: error.message });
  }
};

module.exports = {
  createPackage,
  getPackages,
  getPackageById,
  updatePackage,
  deletePackage
};