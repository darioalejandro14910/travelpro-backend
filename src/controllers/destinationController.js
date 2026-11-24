const destinationService = require('../services/destinationService');

const createDestination = async (req, res) => {
  try {
    const destino = await destinationService.createDestination(req.body);
    res.status(201).json({ mensaje: 'Destino creado', data: destino });
  } catch (error) {
    res.status(error.statusCode || 400).json({ mensaje: error.message });
  }
};

const getDestinations = async (req, res) => {
  try {
    const destinos = await destinationService.getAllDestinations();
    res.status(200).json(destinos);
  } catch (error) {
    res.status(500).json({ mensaje: error.message });
  }
};

const getDestinationById = async (req, res) => {
  try {
    const destino = await destinationService.getDestinationById(req.params.id);
    res.status(200).json(destino);
  } catch (error) {
    res.status(error.statusCode || 500).json({ mensaje: error.message });
  }
};

const updateDestination = async (req, res) => {
  try {
    const destino = await destinationService.updateDestination(req.params.id, req.body);
    res.status(200).json({ mensaje: 'Destino actualizado', data: destino });
  } catch (error) {
    res.status(error.statusCode || 500).json({ mensaje: error.message });
  }
};

const deleteDestination = async (req, res) => {
  try {
    await destinationService.deleteDestination(req.params.id);
    res.status(200).json({ mensaje: 'Destino eliminado correctamente' });
  } catch (error) {
    res.status(error.statusCode || 500).json({ mensaje: error.message });
  }
};

module.exports = {
  createDestination,
  getDestinations,
  getDestinationById,
  updateDestination,
  deleteDestination
};