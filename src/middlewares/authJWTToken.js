require('dotenv').config();

const jwt = require('jsonwebtoken');

const SECRET = process.env.JWT_SECRET;

const jwtConfig = { algorithm: 'HS256' };

const generateToken = (payload) => jwt.sign(JSON.stringify(payload), SECRET, jwtConfig);

const authenticateToken = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Token not found' });
  }

  try {
    const decoded = jwt.verify(token, SECRET, jwtConfig);

    req.auth = decoded;

    next();
  } catch (error) {
    return res.status(401).json({ message: 'Expired or invalid token' });
  }
};

module.exports = { generateToken, authenticateToken };
