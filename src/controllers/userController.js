const { userService } = require('../services');
const { CONFLICT, CREATED, OK, NOT_FOUND, NO_CONTENT } = require('../utils/statusCodes');

const createUser = async (req, res) => {
  const token = await userService.createUser(req.body);
  
  if (!token) return res.status(CONFLICT).json({ message: 'User already registered' });

  return res.status(CREATED).json({ token });
};

const getAllUsers = async (_req, res) => {
  const users = await userService.getAllUsers();

  return res.status(OK).json(users);
};

const getUserById = async (req, res) => {
  const user = await userService.getUserById(req.params.id);

  if (!user) return res.status(NOT_FOUND).json({ message: 'User does not exist' });

  return res.status(OK).json(user);
};

const removeUser = async (req, res) => {
  await userService.removeUser(req.auth.id);

  return res.status(NO_CONTENT).end();
};

module.exports = { createUser, getAllUsers, getUserById, removeUser };
