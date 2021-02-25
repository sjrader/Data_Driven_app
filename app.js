const express = require('express');
const routes = require('./routes');
const morgan = require('morgan');

const app = express();

app.set('view engine', 'pug');

app.use(morgan('dev'));

app.use(routes);

module.exports = app;
