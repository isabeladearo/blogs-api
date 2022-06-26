const { postService } = require('../services');
const { CREATED, OK, NOT_FOUND, NO_CONTENT } = require('../utils/statusCodes');

const createPost = async (req, res) => {
  const blogPost = await postService.createPost(req.auth, req.body);

  if (blogPost.error) {
    return res.status(blogPost.error.code).json({ message: blogPost.error.message });
  }

  return res.status(CREATED).json(blogPost);
};

const getAllPosts = async (_req, res) => {
  const blogPosts = await postService.getAllPosts();

  return res.status(OK).json(blogPosts);
};

const getPostById = async (req, res) => {
  const blogPost = await postService.getPostById(req.params.id);

  if (!blogPost) {
    return res.status(NOT_FOUND).json({ message: 'Post does not exist' });
  }

  return res.status(OK).json(blogPost);
};

const updatePost = async (req, res) => {
  const updatedBlogPost = await postService.updatePost(req.params.id, req.body, req.auth);

  if (updatedBlogPost.error) {
    return res
      .status(updatedBlogPost.error.code)
      .json({ message: updatedBlogPost.error.message });
  }

  return res.status(OK).json(updatedBlogPost);
};

const removePost = async (req, res) => {
  const response = await postService.removePost(req.params.id, req.auth.id);

  if (!response) return res.status(NO_CONTENT).end();

  return res.status(response.error.code).json({ message: response.error.message });
};

const getPostsBySearchTerm = async (req, res) => {
  const blogPosts = await postService.getPostsBySearchTerm(req.query);

  return res.status(OK).json(blogPosts);
};

module.exports = {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  removePost,
  getPostsBySearchTerm,
};
