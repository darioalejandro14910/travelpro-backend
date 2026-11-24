const bookingService = require('../services/bookingService');

const createBooking = async (req, res) => {
  try {
    const bookingData = {
      ...req.body,
      cliente_id: req.body.cliente_id || req.user.id
    };
    const reserva = await bookingService.createBooking(bookingData);
    res.status(201).json({ mensaje: 'Reserva registrada con éxito', data: reserva });
  } catch (error) {
    res.status(error.statusCode || 400).json({ mensaje: error.message });
  }
};

const getBookings = async (req, res) => {
  try {
    const reservas = await bookingService.getAllBookings();
    res.status(200).json(reservas);
  } catch (error) {
    res.status(500).json({ mensaje: error.message });
  }
};

const getBookingById = async (req, res) => {
  try {
    const reserva = await bookingService.getBookingById(req.params.id);
    res.status(200).json(reserva);
  } catch (error) {
    res.status(error.statusCode || 500).json({ mensaje: error.message });
  }
};

const updateBookingStatus = async (req, res) => {
  try {
    const reserva = await bookingService.updateBookingStatus(req.params.id, req.body.estado_reserva);
    res.status(200).json({ mensaje: 'Estado de reserva actualizado', data: reserva });
  } catch (error) {
    res.status(error.statusCode || 500).json({ mensaje: error.message });
  }
};

module.exports = {
  createBooking,
  getBookings,
  getBookingById,
  updateBookingStatus
};