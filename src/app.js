//External modules
const express = require('express');
//Internal modules
const {userRouter} = require("./modules/user");

const app = express();

app.use('/api',userRouter);

 module.exports = app;