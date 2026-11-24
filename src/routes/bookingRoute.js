const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');
const { verifyToken, verifyRole } = require('../middleware/verifyToken');

router.get('/', verifyToken, bookingController.getBookings);
router.get('/:id', verifyToken, bookingController.getBookingById);
router.post('/', verifyToken, bookingController.createBooking);
router.patch('/:id/estado', verifyToken, verifyRole('admin', 'agente', 'supervisor'), bookingController.updateBookingStatus);

module.exports = router;