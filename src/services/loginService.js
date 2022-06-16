const { User } = require('../database/models');
const { generateToken } = require('../utils/JWTToken');

const getToken = async ({ email, password }) => {
  const user = await User.findOne({ where: { email } });

  if (!user || user.dataValues.password !== password) return false;

  const token = generateToken(user.dataValues);

  return token;
};

module.exports = { getToken };
