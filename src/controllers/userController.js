const { userService } = require('../services');

const createUser = async (req, res) => {
  const token = await userService.createUser(req.body);
  
  if (!token) return res.status(409).json({ message: 'User already registered' });

  return res.status(201).json({ token });
};

module.exports = { createUser };
