const Sequelize = require('sequelize');

const config = require('../database/config/config');

const sequelize = new Sequelize(config.development);

const { Op } = Sequelize;

const { BlogPost, User, Category } = require('../database/models');

const createPost = async (auth, { title, content, categoryIds }) => {
  const { id: userId } = auth.dataValues;

  const categories = await Category.findAll({
    where: { id: { [Op.in]: categoryIds } } });
  
  if (categories.length !== categoryIds.length) {
    return { error: { code: 400, message: '"categoryIds" not found' } };
  }

  try {
    const response = await sequelize.transaction(async (t) => {
      const blogPost = await BlogPost.create({ title, content, userId }, { transaction: t });
      await blogPost.setCategories(categoryIds, { transaction: t });

      return blogPost;
    });

    return response.dataValues;
  } catch (error) {
    return { error: { code: 500, message: 'Something went wrong' } };
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

const removePost = async (id, authId) => {
  const idFound = await getPostById(id);

  if (!idFound) {
    return { error: { code: 404, message: 'Post does not exist' } };
  }

  if (authId !== idFound.dataValues.userId) {
    return { error: { code: 401, message: 'Unauthorized user' } };
  }

  BlogPost.destroy({ where: { id } });
};

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
