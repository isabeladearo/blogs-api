const { loginService } = require('../services');

const getToken = async (req, res) => {
  const token = await loginService.getToken(req.body);
  
  if (!token) return res.status(400).json({ message: 'Invalid fields' });

  return res.status(200).json({ token });
};

module.exports = { getToken };
