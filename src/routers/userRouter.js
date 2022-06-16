const express = require('express');

const { validateCreateUser } = require('../middlewares');
const { userController } = require('../controllers');

const router = express.Router();

router.post('/', validateCreateUser, userController.createUser);

module.exports = router;