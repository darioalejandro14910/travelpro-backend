const express = require('express');
const router = express.Router();
const packageController = require('../controllers/packageController');
const { verifyToken, verifyRole } = require('../middleware/verifyToken');

router.get('/', packageController.getPackages);
router.get('/:id', packageController.getPackageById);
router.post('/', verifyToken, verifyRole('admin'), packageController.createPackage);
router.put('/:id', verifyToken, verifyRole('admin'), packageController.updatePackage);
router.delete('/:id', verifyToken, verifyRole('admin'), packageController.deletePackage);

module.exports = router;