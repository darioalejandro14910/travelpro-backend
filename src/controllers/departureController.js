const departureService = require('../services/departureService');

const createDeparture = async (req, res) => {
  try {
    const salida = await departureService.createDeparture(req.body);
    res.status(201).json({ mensaje: 'Salida creada con éxito', data: salida });
  } catch (error) {
    res.status(400).json({ mensaje: error.message });
  }
};

const getDepartures = async (req, res) => {
  try {
    const salidas = await departureService.getAllDepartures(req.query.paquete_id);
    res.status(200).json(salidas);
  } catch (error) {
    res.status(500).json({ mensaje: error.message });
  }
};

const getDepartureById = async (req, res) => {
  try {
    const salida = await departureService.getDepartureById(req.params.id);
    res.status(200).json(salida);
  } catch (error) {
    res.status(error.statusCode || 500).json({ mensaje: error.message });
  }
};

const updateDeparture = async (req, res) => {
  try {
    const salida = await departureService.updateDeparture(req.params.id, req.body);
    res.status(200).json({ mensaje: 'Salida actualizada', data: salida });
  } catch (error) {
    res.status(error.statusCode || 500).json({ mensaje: error.message });
  }
};

const deleteDeparture = async (req, res) => {
  try {
    await departureService.deleteDeparture(req.params.id);
    res.status(200).json({ mensaje: 'Salida eliminada' });
  } catch (error) {
    res.status(error.statusCode || 500).json({ mensaje: error.message });
  }
};

module.exports = {
  createDeparture,
  getDepartures,
  getDepartureById,
  updateDeparture,
  deleteDeparture
};