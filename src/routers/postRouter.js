const express = require('express');

const {
  authJWTToken: { authenticateToken },
  validateCreatePost,
  validateUpdatePost,
  validateRemovePost,
} = require('../middlewares');
const { postController } = require('../controllers');

const router = express.Router();

router.use(authenticateToken);

router.post('/', validateCreatePost, postController.createPost);

router.get('/', postController.getAllPosts);

router.get('/:id', postController.getPostById);

router.put('/:id', validateUpdatePost, postController.updatePost);

router.delete('/:id', validateRemovePost, postController.removePost);

module.exports = router;
