const {userController} = require('../user/controllers/user.controller.js');
const userRouter = require('./routes/user.routes.js')
module.exports = {userController, userRouter};