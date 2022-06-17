const { postService } = require('../services');

const createPost = async (req, res) => {
  const blogPost = await postService.createPost(req.auth, req.body);
  
  if (!blogPost) {
    return res.status(500).json({ message: 'Something went wrong' });
  }

  return res.status(201).json(blogPost);
};

const getAllPosts = async (_req, res) => {
  const blogPosts = await postService.getAllPosts();

  return res.status(200).json(blogPosts);
};

const getPostById = async (req, res) => {
  const blogPost = await postService.getPostById(req.params.id);

  if (!blogPost) return res.status(404).json({ message: 'Post does not exist' });

  return res.status(200).json(blogPost);
};

const updatePost = async (req, res) => {  
  const updatedBlogPost = await postService.updatePost(req.params.id, req.body);

  res.status(200).json(updatedBlogPost);
};

module.exports = { createPost, getAllPosts, getPostById, updatePost };
