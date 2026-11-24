const Reserva = require('../models/bookingModel');
const SalidaPaquete = require('../models/departureModel');

const createBooking = async (data) => {
  const { salida_paquete_id, reserva_pasajeros } = data;

  if (!reserva_pasajeros || reserva_pasajeros.length === 0) {
    const error = new Error('La reserva debe incluir al menos un pasajero.');
    error.statusCode = 400;
    throw error;
  }

  const salida = await SalidaPaquete.findById(salida_paquete_id);
  if (!salida || !salida.activa) {
    const error = new Error('La salida seleccionada no existe o no está activa.');
    error.statusCode = 404;
    throw error;
  }

  const cantidadPasajeros = reserva_pasajeros.length;
  if (salida.cupo_disponible < cantidadPasajeros) {
    const error = new Error(`Cupo insuficiente. Solo quedan ${salida.cupo_disponible} lugares.`);
    error.statusCode = 400;
    throw error;
  }

  let subtotal = 0;
  let impuestos = 0;

  const pasajerosProcesados = reserva_pasajeros.map((pax) => {
    const tarifa = salida.salidas_tarifas.id(pax.tarifa_id);
    if (!tarifa) {
      const error = new Error(`La tarifa ${pax.tarifa_id} no pertenece a esta salida.`);
      error.statusCode = 400;
      throw error;
    }
    subtotal += tarifa.precio_venta;
    impuestos += tarifa.impuestos_incluidos;

    return {
      ...pax,
      precio_aplicado: tarifa.precio_venta
    };
  });

  const descuento = data.descuento_aplicado || 0;
  const totalFinal = subtotal + impuestos - descuento;
  const codigoReserva = `RES-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

  salida.cupo_disponible -= cantidadPasajeros;
  await salida.save();

  const nuevaReserva = await Reserva.create({
    codigo_reserva: codigoReserva,
    cliente_id: data.cliente_id,
    agente_id: data.agente_id || null,
    salida_paquete_id,
    subtotal,
    descuento_aplicado: descuento,
    impuestos,
    total_final: totalFinal,
    saldo_pendiente: totalFinal,
    moneda: salida.moneda,
    reserva_pasajeros: pasajerosProcesados
  });

  return nuevaReserva;
};

const getAllBookings = async () => {
  return await Reserva.find()
    .populate('cliente_id', 'nombre apellido email telefono')
    .populate('agente_id', 'nombre apellido email')
    .populate({
      path: 'salida_paquete_id',
      select: 'codigo_salida fecha_salida fecha_regreso',
      populate: { path: 'paquete_id', select: 'codigo_paquete titulo_comercial' }
    });
};

const getBookingById = async (id) => {
  const reserva = await Reserva.findById(id)
    .populate('cliente_id', 'nombre apellido email telefono')
    .populate('agente_id', 'nombre apellido email')
    .populate({
      path: 'salida_paquete_id',
      populate: { path: 'paquete_id' }
    });

  if (!reserva) {
    const error = new Error('Reserva no encontrada.');
    error.statusCode = 404;
    throw error;
  }
  return reserva;
};

const updateBookingStatus = async (id, estado_reserva) => {
  const reserva = await Reserva.findById(id);
  if (!reserva) {
    const error = new Error('Reserva no encontrada.');
    error.statusCode = 404;
    throw error;
  }

  if (estado_reserva === 'cancelada' && reserva.estado_reserva !== 'cancelada') {
    await SalidaPaquete.findByIdAndUpdate(reserva.salida_paquete_id, {
      $inc: { cupo_disponible: reserva.reserva_pasajeros.length }
    });
  }

  if (estado_reserva === 'pagada_total') {
    reserva.saldo_pendiente = 0;
  }

  reserva.estado_reserva = estado_reserva;
  await reserva.save();
  return reserva;
};

module.exports = {
  createBooking,
  getAllBookings,
  getBookingById,
  updateBookingStatus
};