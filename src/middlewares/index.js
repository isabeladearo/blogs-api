const error = require('./error');
const validateLogin = require('./validateLogin');
const validateCreateUser = require('./validateCreateUser');
const authJWTToken = require('./authJWTToken');
const validateCreateCategory = require('./validateCreateCategory');

module.exports = {
  error,
  validateLogin,
  validateCreateUser,
  authJWTToken,
  validateCreateCategory,
};
