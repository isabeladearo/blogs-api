const Sequelize = require('sequelize');

const config = require('../database/config/config');

const sequelize = new Sequelize(config.development);

const { Op } = Sequelize;

const {
  BlogPost,
  PostCategory,
  User,
  Category,
} = require('../database/models');

const createPost = async (auth, { title, content, categoryIds }) => {
  const { id: userId } = auth.dataValues;

  try {
    const response = await sequelize.transaction(async (t) => {
      const blogPost = await BlogPost.create(
        { title, content, userId, published: new Date(), updated: new Date() },
        { transaction: t },
      );

      await Promise.all(categoryIds.map((categoryId) =>
        PostCategory.create(
          { postId: blogPost.dataValues.id, categoryId },
          { transaction: t },
        )));

      return blogPost;
    });

    return response.dataValues;
  } catch (error) {
    return false;
  }
};

const getAllPosts = () =>
  BlogPost.findAll({
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });

const getPostById = (id) =>
  BlogPost.findOne({
    where: { id },
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });

const updatePost = async (id, { title, content }) => {
  await BlogPost.update(
    { title, content, updated: new Date() },
    { where: { id } },
  );

  return getPostById(id);
};

const removePost = (id) => BlogPost.destroy({ where: { id } });

const getPostsBySearchTerm = ({ q }) => {
  if (!q) {
    return getAllPosts();
  }

  return BlogPost.findAll({
    where: { [Op.or]: [
      { title: { [Op.like]: `%${q}%` } },
      { content: { [Op.like]: `%${q}%` } },
    ] },
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });
};

module.exports = {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  removePost,
  getPostsBySearchTerm,
};
