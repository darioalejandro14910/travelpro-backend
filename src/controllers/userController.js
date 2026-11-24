const userService = require('../services/userService');

const register = async (req, res) => {
  try {
    const usuario = await userService.registerUser(req.body);
    res.status(201).json({ mensaje: 'Usuario registrado con éxito', data: usuario });
  } catch (error) {
    res.status(error.statusCode || 500).json({ mensaje: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const resultado = await userService.loginUser(email, password);
    res.status(200).json({ mensaje: 'Inicio de sesión exitoso', ...resultado });
  } catch (error) {
    res.status(error.statusCode || 500).json({ mensaje: error.message });
  }
};

const getUsers = async (req, res) => {
  try {
    const usuarios = await userService.getAllUsers();
    res.status(200).json(usuarios);
  } catch (error) {
    res.status(500).json({ mensaje: error.message });
  }
};

const getUserById = async (req, res) => {
  try {
    const usuario = await userService.getUserById(req.params.id);
    res.status(200).json(usuario);
  } catch (error) {
    res.status(error.statusCode || 500).json({ mensaje: error.message });
  }
};

module.exports = { register, login, getUsers, getUserById };