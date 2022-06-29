const { User } = require('../database/models');
const { authJWTToken: { generateToken } } = require('../middlewares');

const getToken = async ({ email, password }) => {
  const user = await User.findOne(
    { where: { email, password }, attributes: { exclude: ['password'] } },
  );

  if (!user) return false;

  const token = generateToken(user);

  return token;
};

module.exports = { getToken };
