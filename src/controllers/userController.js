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

const getUserById = async (req, res) => {
  const user = await userService.getUserById(req.params.id);

  if (!user) return res.status(404).json({ message: 'User does not exist' });

  return res.status(200).json(user);
};

const removeUser = async (req, res) => {
  await userService.removeUser(req.auth.dataValues.id);

  return res.status(204).end();
};

module.exports = { createUser, getAllUsers, getUserById, removeUser };
