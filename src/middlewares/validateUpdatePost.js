const Joi = require('joi');

const userSchema = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required(),
});

const handleError = (error) => {
  const { type } = error.details[0];

  const MISSING_TYPES = ['any.required', 'string.empty'];

  if (MISSING_TYPES.includes(type)) {
    return 'Some required fields are missing';
  }

  return error.message;
};

module.exports = async (req, res, next) => {
  const { error } = userSchema.validate(req.body);

  if (!error) return next();

  return res.status(400).json({ message: handleError(error) });
};
