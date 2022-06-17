const { postService } = require('../services');

const createPost = async (req, res) => {
  const blogPost = await postService.createPost(req.auth, req.body);
  
  if (!blogPost) {
    return res.status(500).json({ message: 'Something went wrong' });
  }

  return res.status(201).json(blogPost);
};

module.exports = { createPost };
