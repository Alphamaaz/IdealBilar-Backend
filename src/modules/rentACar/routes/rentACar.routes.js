// External modules
const express = require('express');

//Internal modules
const RentACarHandler = require('../controller/rentACar.controller');
const Router = express.Router();

Router.post('/rent-a-car', RentACarHandler);

module.exports = Router;