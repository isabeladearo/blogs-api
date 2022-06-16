const { User } = require('../database/models');
const { authJWTToken: { generateToken } } = require('../middlewares');

const getToken = async ({ email, password }) => {
  const user = await User.findOne({ where: { email } });

  if (!user || user.dataValues.password !== password) return false;

  const token = generateToken(user.dataValues);

  return token;
};

module.exports = { getToken };
