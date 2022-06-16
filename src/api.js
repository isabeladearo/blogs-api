const express = require('express');
const routers = require('./routers');
const { error } = require('./middlewares');

const app = express();

app.use(express.json());

app.use(routers);

app.use(error);

module.exports = app;
