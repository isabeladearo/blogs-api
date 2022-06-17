const Joi = require('joi');

const { Category } = require('../database/models');

const userSchema = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required(),
  categoryIds: Joi.array().required(),
});

const handleError = (error) => {
  const { type } = error.details[0];

  if (['any.required', 'string.empty', 'array.empty'].includes(type)) {
    return 'Some required fields are missing';
  }

  return error.message;
};

const checkCategoriesIds = (array) => Promise.all(
  array.map(async (id) => {
    const idFound = await Category.findOne({ where: { id } });
    if (!idFound) return false;
    return true;
  }),
);

module.exports = async (req, res, next) => {
  const { error } = userSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ message: handleError(error) });
  }

  if (req.body.categoryIds) {
    const allCategoriesExists = await checkCategoriesIds(req.body.categoryIds);

    if (allCategoriesExists.includes(false)) {
      return res.status(400).json({ message: '"categoryIds" not found' });
    }

    return next();
  }
};
