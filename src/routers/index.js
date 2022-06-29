const express = require('express');

const router = express.Router();

router.use('/login', require('./loginRouter'));

router.use('/user', require('./userRouter'));

router.use('/categories', require('./categoriesRouter'));

router.use('/post', require('./postRouter'));

module.exports = router;
