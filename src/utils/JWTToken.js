require('dotenv').config();

const jwt = require('jsonwebtoken');

const SECRET = process.env.JWT_SECRET;

const generateToken = (payload) => jwt.sign(payload, SECRET, { algorithm: 'HS256' });

module.exports = { generateToken };