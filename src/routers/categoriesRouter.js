const express = require('express');

const { authJWTToken: { authenticateToken }, validateCreateCategory } = require('../middlewares');
const { categoriesController } = require('../controllers');

const router = express.Router();

router.use(authenticateToken);

router.post('/', validateCreateCategory, categoriesController.createCategory);

router.get('/', categoriesController.getAllCategories);

module.exports = router;
