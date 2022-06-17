const express = require('express');

const { authJWTToken: { authenticateToken }, validateCreatePost } = require('../middlewares');
const { postController } = require('../controllers');

const router = express.Router();

router.use(authenticateToken);

router.post('/', validateCreatePost, postController.createPost);

router.get('/', postController.getAllPosts);

router.get('/:id', postController.getPostById);

module.exports = router;
