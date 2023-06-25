const express = require('express');
const morgan = require('morgan');

const tourRouter = require('./module/responses');

const server = express();

server.use(morgan('dev'));
server.use(express.json());

server.use('/api/v1/tours', tourRouter);

module.exports = server;
