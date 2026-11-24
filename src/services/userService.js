const Usuario = require('../models/userModel');
const jwt = require('jsonwebtoken');

const registerUser = async (userData) => {
  const existingUser = await Usuario.findOne({ email: userData.email });
  if (existingUser) {
    const error = new Error('El email ya se encuentra registrado.');
    error.statusCode = 400;
    throw error;
  }

  const newUser = new Usuario(userData);
  await newUser.save();

  const userObj = newUser.toObject();
  delete userObj.password_hash;
  return userObj;
};

const loginUser = async (email, password) => {
  const user = await Usuario.findOne({ email });
  if (!user) {
    const error = new Error('Credenciales inválidas.');
    error.statusCode = 401;
    throw error;
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    const error = new Error('Credenciales inválidas.');
    error.statusCode = 401;
    throw error;
  }

  const token = jwt.sign(
    { id: user._id, email: user.email, rol: user.rol },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '24h' }
  );

  const userObj = user.toObject();
  delete userObj.password_hash;

  return { usuario: userObj, token };
};

const getAllUsers = async () => {
  return await Usuario.find().select('-password_hash');
};

const getUserById = async (id) => {
  const user = await Usuario.findById(id).select('-password_hash');
  if (!user) {
    const error = new Error('Usuario no encontrado.');
    error.statusCode = 404;
    throw error;
  }
  return user;
};

module.exports = {
  registerUser,
  loginUser,
  getAllUsers,
  getUserById
};