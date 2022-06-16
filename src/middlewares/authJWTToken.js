require('dotenv').config();

const jwt = require('jsonwebtoken');

const { User } = require('../database/models');

const SECRET = process.env.JWT_SECRET;

const jwtConfig = { algorithm: 'HS256' };

const generateToken = (payload) => {
  const filteredObj = Object.fromEntries(
    Object.entries(payload).filter(([key]) => key !== 'password'),
  );

  return jwt.sign(JSON.stringify(filteredObj), SECRET, jwtConfig);
};

const authenticateToken = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Token not found' });
  }

  try {
    const decoded = jwt.verify(token, SECRET, jwtConfig);

    const user = await User.findOne({
      where: { displayName: decoded.displayName, email: decoded.email },
    });

    if (!user) {
      return res.status(401).json({ message: 'Expired or invalid token' });
    }

    req.auth = user;

    next();
  } catch (error) {
    return res.status(401).json({ message: 'Expired or invalid token' });
  }
};

module.exports = { generateToken, authenticateToken };
