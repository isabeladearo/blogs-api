const Joi = require('joi');

const { BlogPost } = require('../database/models');

const userSchema = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required(),
});

const handleError = (error) => {
  const { type } = error.details[0];

  if (['any.required', 'string.empty'].includes(type)) {
    return 'Some required fields are missing';
  }

  return error.message;
};

module.exports = async (req, res, next) => {
  const { error } = userSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ message: handleError(error) });
  }

  const { id } = req.params;

  const idFound = await BlogPost.findOne({ where: { id } });

  if (!idFound) {
    return res.status(404).json({ message: 'Post not found' });
  }

  if (req.auth.dataValues.id !== idFound.dataValues.userId) {
    return res.status(401).json({ message: 'Unauthorized user' });
  }

  return next();
};
