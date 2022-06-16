const express = require('express');

const { validateCreateUser, authJWTToken: { authenticateToken } } = require('../middlewares');
const { userController } = require('../controllers');

const router = express.Router();

router.post('/', validateCreateUser, userController.createUser);

router.get('/', authenticateToken, userController.getAllUsers);

module.exports = router;