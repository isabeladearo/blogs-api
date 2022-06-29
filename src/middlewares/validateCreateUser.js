const Joi = require('joi');

const userSchema = Joi.object({
  displayName: Joi.string().min(8).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  image: Joi.string().required(),
});

module.exports = (req, res, next) => {
  const { error } = userSchema.validate(req.body);

  if (!error) {
    return next();
  } 

  return res.status(400).json({ message: error.message });
};
