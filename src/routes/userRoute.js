const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { verifyToken, verifyRole } = require('../middleware/verifyToken');

router.post('/registro', userController.register);
router.post('/login', userController.login);
router.get('/', verifyToken, verifyRole('admin', 'supervisor'), userController.getUsers);
router.get('/:id', verifyToken, userController.getUserById);

module.exports = router;