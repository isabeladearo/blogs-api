const { categoriesService } = require('../services');
const { CONFLICT, CREATED, OK } = require('../utils/statusCodes');

const createCategory = async (req, res) => {
  const category = await categoriesService.createCategory(req.body);

  if (!category) return res.status(CONFLICT).json({ message: 'Category already registered' });

  return res.status(CREATED).json(category);
};

const getAllCategories = async (_req, res) => {
  const categories = await categoriesService.getAllCategories();

  return res.status(OK).json(categories);
};

module.exports = { createCategory, getAllCategories };
