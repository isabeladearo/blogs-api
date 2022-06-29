const express = require('express');

const { validateLogin } = require('../middlewares');

const { loginController } = require('../controllers');

const router = express.Router();

router.post('/', validateLogin, loginController.getToken);

module.exports = router;
