const express = require('express');
const { validateCredentials } = require('../middlewares');
const { loginController } = require('../controllers');

const router = express.Router();

router.post('/', validateCredentials, loginController.getToken);

module.exports = router;
