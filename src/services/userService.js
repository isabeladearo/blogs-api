const { User } = require('../database/models');
const { generateToken } = require('../utils/JWTToken');

const createUser = async ({ displayName, email, password, image }) => {
  const user = await User.findOne({ where: { email } });

  if (user) return false;

  const userCreated = await User.create({ displayName, email, password, image });

  const token = generateToken(userCreated.dataValues);

  return token;
};  

module.exports = { createUser };
