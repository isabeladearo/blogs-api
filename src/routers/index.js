const express = require('express');

const router = express.Router();

router.use('/login', require('./loginRouter'));

module.exports = router;
