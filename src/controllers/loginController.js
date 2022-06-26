const { loginService } = require('../services');
const { BAD_REQUEST, OK } = require('../utils/statusCodes');

const getToken = async (req, res) => {
  const token = await loginService.getToken(req.body);
  
  if (!token) return res.status(BAD_REQUEST).json({ message: 'Invalid fields' });

  return res.status(OK).json({ token });
};

module.exports = { getToken };
