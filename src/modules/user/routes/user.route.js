const express = require("express");
const { userController: userHandler } = require("../controllers/user.controller");

const Router = express.Router();

Router.get('/user', userHandler)

module.exports = Router;