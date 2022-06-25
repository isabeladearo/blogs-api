const { postService } = require('../services');

const createPost = async (req, res) => {
  const blogPost = await postService.createPost(req.auth, req.body);

  if (blogPost.error) {
    return res.status(blogPost.error.code).json({ message: blogPost.error.message });
  }

  return res.status(201).json(blogPost);
};

const getAllPosts = async (_req, res) => {
  const blogPosts = await postService.getAllPosts();

  return res.status(200).json(blogPosts);
};

const getPostById = async (req, res) => {
  const blogPost = await postService.getPostById(req.params.id);

  if (!blogPost) {
    return res.status(404).json({ message: 'Post does not exist' });
  }

  return res.status(200).json(blogPost);
};

const updatePost = async (req, res) => {
  const updatedBlogPost = await postService.updatePost(req.params.id, req.body);

  return res.status(200).json(updatedBlogPost);
};

const removePost = async (req, res) => {
  await postService.removePost(req.params.id);

  return res.status(204).end();
};

const getPostsBySearchTerm = async (req, res) => {
  const blogPosts = await postService.getPostsBySearchTerm(req.query);

  return res.status(200).json(blogPosts);
};

module.exports = {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  removePost,
  getPostsBySearchTerm,
};
