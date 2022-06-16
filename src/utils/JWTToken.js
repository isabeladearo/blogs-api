require('dotenv').config();

const jwt = require('jsonwebtoken');

const SECRET = process.env.JWT_SECRET;

const generateToken = (payload) => {
  const filteredObj = Object.fromEntries(
    Object.entries(payload).filter(([key]) => key !== 'password'),
  );

  return jwt.sign(JSON.stringify(filteredObj), SECRET, { algorithm: 'HS256' });
};

module.exports = { generateToken };
