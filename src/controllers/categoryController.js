const categoryService = require('../services/categoryService');

const createCategory = async (req, res) => {
  try {
    const categoria = await categoryService.createCategory(req.body);
    res.status(201).json({ mensaje: 'Categoría creada', data: categoria });
  } catch (error) {
    res.status(error.statusCode || 500).json({ mensaje: error.message });
  }
};

const getCategories = async (req, res) => {
  try {
    const categorias = await categoryService.getAllCategories();
    res.status(200).json(categorias);
  } catch (error) {
    res.status(500).json({ mensaje: error.message });
  }
};

const deleteCategory = async (req, res) => {
  try {
    await categoryService.deleteCategory(req.params.id);
    res.status(200).json({ mensaje: 'Categoría eliminada correctamente' });
  } catch (error) {
    res.status(error.statusCode || 500).json({ mensaje: error.message });
  }
};

module.exports = { createCategory, getCategories, deleteCategory };