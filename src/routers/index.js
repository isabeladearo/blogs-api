const express = require('express');

const router = express.Router();

router.use('/login', require('./loginRouter'));

router.use('/user', require('./userRouter'));

module.exports = router;
