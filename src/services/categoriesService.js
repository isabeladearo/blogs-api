const { Category } = require('../database/models');

const createCategory = async ({ name }) => {
  const category = await Category.findOne({ where: { name } });

  if (category) return false;

  const categoryCreated = await Category.create({ name });

  return categoryCreated;
};

const getAllCategories = () => Category.findAll();

module.exports = { createCategory, getAllCategories };
