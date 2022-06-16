const Joi = require('joi');

const categorySchema = Joi.object({
  name: Joi.string().required(),
});

module.exports = (req, res, next) => {
  const { error } = categorySchema.validate(req.body);

  if (!error) {
    return next();
  } 

  return res.status(400).json({ message: error.message });
};
