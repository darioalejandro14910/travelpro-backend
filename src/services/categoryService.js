const Categoria = require('../models/categoryModel');

const createCategory = async (data) => {
  const existe = await Categoria.findOne({ slug: data.slug });
  if (existe) {
    const error = new Error('Ya existe una categoría con ese slug.');
    error.statusCode = 400;
    throw error;
  }
  return await Categoria.create(data);
};

const getAllCategories = async () => {
  return await Categoria.find({ activa: true });
};

const deleteCategory = async (id) => {
  const deleted = await Categoria.findByIdAndDelete(id);
  if (!deleted) {
    const error = new Error('Categoría no encontrada.');
    error.statusCode = 404;
    throw error;
  }
  return deleted;
};

module.exports = {
  createCategory,
  getAllCategories,
  deleteCategory
};