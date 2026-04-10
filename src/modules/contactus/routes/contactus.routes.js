// External modules
const express = require('express');
// Internal modules
const {contactusController} = require('../controllers/contactus.controllers');

const Router = express.Router();

Router.post('/contact-us',contactusController)

// exports
module.exports = Router;

