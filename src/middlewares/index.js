const error = require('./error');
const validateLogin = require('./validateLogin');
const validateCreateUser = require('./validateCreateUser');
const authJWTToken = require('./authJWTToken');
const validateCreateCategory = require('./validateCreateCategory');
const validateCreatePost = require('./validateCreatePost');
const validateUpdatePost = require('./validateUpdatePost');

module.exports = {
  error,
  validateLogin,
  validateCreateUser,
  authJWTToken,
  validateCreateCategory,
  validateCreatePost,
  validateUpdatePost,
};
