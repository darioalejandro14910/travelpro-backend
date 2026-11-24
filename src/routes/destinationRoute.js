const express = require('express');
const router = express.Router();
const destinationController = require('../controllers/destinationController');
const { verifyToken, verifyRole } = require('../middleware/verifyToken');

router.get('/', destinationController.getDestinations);
router.get('/:id', destinationController.getDestinationById);
router.post('/', verifyToken, verifyRole('admin'), destinationController.createDestination);
router.put('/:id', verifyToken, verifyRole('admin'), destinationController.updateDestination);
router.delete('/:id', verifyToken, verifyRole('admin'), destinationController.deleteDestination);

module.exports = router;