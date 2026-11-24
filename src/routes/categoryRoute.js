const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const { verifyToken, verifyRole } = require('../middleware/verifyToken');

router.get('/', categoryController.getCategories);
router.post('/', verifyToken, verifyRole('admin'), categoryController.createCategory);
router.delete('/:id', verifyToken, verifyRole('admin'), categoryController.deleteCategory);

module.exports = router;