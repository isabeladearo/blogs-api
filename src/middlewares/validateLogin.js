const Joi = require('joi');

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

module.exports = (req, res, next) => {
  const { error } = loginSchema.validate(req.body);

  if (!error) {
    return next();
  } 

  const { type } = error.details[0];

  const MESSAGES = {
    'any.required': 'Some required fields are missing',
    'string.empty': 'Some required fields are missing',
    'string.email': 'Invalid fields',
    'string.min': 'Invalid fields',
  };

  return res.status(400).json({ message: MESSAGES[type] });
};
