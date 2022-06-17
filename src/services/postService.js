const Sequelize = require('sequelize');

const config = require('../database/config/config');

const sequelize = new Sequelize(config.development);

const { BlogPost, PostCategory } = require('../database/models');

const createPost = async (auth, { title, content, categoryIds }) => {
  const { id: userId } = auth.dataValues;

  try {
    const response = await sequelize.transaction(async (t) => {
      const blogPost = await BlogPost.create(
        { title, content, userId, published: new Date(), updated: new Date() },
        { transaction: t },
      );

      await Promise.all(categoryIds.map((categoryId) =>
          PostCategory.create({ postId: blogPost.dataValues.id, categoryId }, { transaction: t })));

      return blogPost;
    });

    return response.dataValues;
  } catch (error) {
    return false;
  }
};

module.exports = { createPost };
