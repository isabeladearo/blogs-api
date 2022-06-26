const { User } = require('../database/models');
const { authJWTToken: { generateToken } } = require('../middlewares');

const createUser = async ({ displayName, email, password, image }) => {
  const user = await User.findOne({ where: { email } });

  if (user) return false;

  const { dataValues: userCreated } = await User.create({ displayName, email, password, image });

  delete userCreated.password;

  const token = generateToken(userCreated);

  return token;
};

const getAllUsers = () => User.findAll({ attributes: { exclude: ['password'] } });

const getUserById = (id) => User.findOne({ where: { id }, attributes: { exclude: ['password'] } });

const removeUser = (id) => User.destroy({ where: { id } });

module.exports = { createUser, getAllUsers, getUserById, removeUser };
