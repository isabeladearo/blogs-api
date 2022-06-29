const express = require('express');

const {
  authJWTToken: { authenticateToken },
  validateCreatePost,
  validateUpdatePost,
} = require('../middlewares');
const { postController } = require('../controllers');

const router = express.Router();

router.use(authenticateToken);

router.post('/', validateCreatePost, postController.createPost);

router.get('/search', postController.getPostsBySearchTerm);

router.get('/:id', postController.getPostById);

router.get('/', postController.getAllPosts);

router.put('/:id', validateUpdatePost, postController.updatePost);

router.delete('/:id', postController.removePost);

module.exports = router;
