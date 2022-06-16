const { userService } = require('../services');

const createUser = async (req, res) => {
  const token = await userService.createUser(req.body);
  
  if (!token) return res.status(409).json({ message: 'User already registered' });

  return res.status(201).json({ token });
};

const getAllUsers = async (_req, res) => {
  const users = await userService.getAllUsers();

  return res.status(200).json(users);
};

module.exports = { createUser, getAllUsers };
