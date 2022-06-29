const Sequelize = require('sequelize');

const config = require('../database/config/config');

const sequelize = new Sequelize(config.development);

const { Op } = Sequelize;

const { BlogPost, User, Category } = require('../database/models');
const {
  BAD_REQUEST,
  INTERNAL_SERVER_ERROR,
  NOT_FOUND,
  UNAUTHORIZED,
} = require('../utils/statusCodes');

const BLOGPOST_ASSOCIATIONS = [
  { model: User, as: 'user', attributes: { exclude: ['password'] } },
  { model: Category, as: 'categories', through: { attributes: [] } },
];

const createPost = async ({ id: userId }, { title, content, categoryIds }) => {
  const categories = await Category.findAll({ where: { id: { [Op.in]: categoryIds } } });

  if (categories.length !== categoryIds.length) {
    return { error: { code: BAD_REQUEST, message: '"categoryIds" not found' } };
  }

  try {
    const response = await sequelize.transaction(async (t) => {
      const blogPost = await BlogPost.create(
        { title, content, userId }, { transaction: t },
      );
      await blogPost.setCategories(categoryIds, { transaction: t });

      return blogPost;
    });

    return response.dataValues;
  } catch (error) {
    return {
      error: { code: INTERNAL_SERVER_ERROR, message: 'Something went wrong' },
    };
  }
};

const getAllPosts = () => BlogPost.findAll({ include: BLOGPOST_ASSOCIATIONS });

const getPostById = (id) =>
  BlogPost.findOne({ where: { id }, include: BLOGPOST_ASSOCIATIONS });

const updatePost = async (id, { title, content }, { id: authId }) => {
  const idFound = await getPostById(id);

  if (!idFound) {
    return { error: { code: NOT_FOUND, message: 'Post does not exist' } };
  }

  if (authId !== idFound.dataValues.userId) {
    return { error: { code: UNAUTHORIZED, message: 'Unauthorized user' } };
  }

  await BlogPost.update(
    { title, content, updated: new Date() },
    { where: { id } },
  );

  return getPostById(id);
};

const removePost = async (id, authId) => {
  const idFound = await getPostById(id);

  if (!idFound) {
    return { error: { code: NOT_FOUND, message: 'Post does not exist' } };
  }

  if (authId !== idFound.dataValues.userId) {
    return { error: { code: UNAUTHORIZED, message: 'Unauthorized user' } };
  }

  BlogPost.destroy({ where: { id } });
};

const getPostsBySearchTerm = ({ q }) => {
  if (!q) {
    return getAllPosts();
  }

  return BlogPost.findAll({
    where: {
      [Op.or]: [
        { title: { [Op.like]: `%${q}%` } },
        { content: { [Op.like]: `%${q}%` } },
      ],
    },
    include: BLOGPOST_ASSOCIATIONS,
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
