const { BlogPost } = require('../database/models');

module.exports = async (req, res, next) => {
  const { id } = req.params;

  const idFound = await BlogPost.findOne({ where: { id } });

  if (!idFound) {
    return res.status(404).json({ message: 'Post does not exist' });
  }

  if (req.auth.dataValues.id !== idFound.dataValues.userId) {
    return res.status(401).json({ message: 'Unauthorized user' });
  }

  return next();
};
