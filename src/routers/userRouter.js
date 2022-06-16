const express = require('express');

const { validateCreateUser, authJWTToken: { authenticateToken } } = require('../middlewares');
const { userController } = require('../controllers');

const router = express.Router();

router.post('/', validateCreateUser, userController.createUser);

router.use(authenticateToken);

router.get('/', userController.getAllUsers);

router.get('/:id', userController.getUserById);

module.exports = router;