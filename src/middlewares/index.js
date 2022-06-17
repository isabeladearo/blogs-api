const error = require('./error');
const validateLogin = require('./validateLogin');
const validateCreateUser = require('./validateCreateUser');
const authJWTToken = require('./authJWTToken');
const validateCreateCategory = require('./validateCreateCategory');
const validateCreatePost = require('./validateCreatePost');

module.exports = {
  error,
  validateLogin,
  validateCreateUser,
  authJWTToken,
  validateCreateCategory,
  validateCreatePost,
};
