const { User } = require('../database/models');
const { authJWTToken: { generateToken } } = require('../middlewares');

const createUser = async ({ displayName, email, password, image }) => {
  const user = await User.findOne({ where: { email } });

  if (user) return false;

  const userCreated = await User.create({ displayName, email, password, image });

  const token = generateToken(userCreated.dataValues);

  return token;
};  

const getAllUsers = () => User.findAll({ attributes: { exclude: ['password'] } });

module.exports = { createUser, getAllUsers };
