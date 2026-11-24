const express = require('express');
const router = express.Router();
const departureController = require('../controllers/departureController');
const { verifyToken, verifyRole } = require('../middleware/verifyToken');

router.get('/', departureController.getDepartures);
router.get('/:id', departureController.getDepartureById);
router.post('/', verifyToken, verifyRole('admin'), departureController.createDeparture);
router.put('/:id', verifyToken, verifyRole('admin'), departureController.updateDeparture);
router.delete('/:id', verifyToken, verifyRole('admin'), departureController.deleteDeparture);

module.exports = router;