const error = require('./error');
const validateLogin = require('./validateLogin');
const validateCreateUser = require('./validateCreateUser');
const authJWTToken = require('./authJWTToken');

module.exports = { error, validateLogin, validateCreateUser, authJWTToken };
