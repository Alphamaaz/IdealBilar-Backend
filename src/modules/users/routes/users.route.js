import { adminDataHandler } from "../controllers/users.controller.js";
import express from 'express';
import { userDataController } from "../controllers/usersData.controller.js";
import { chatController } from "../controllers/chat.controller.js";
import { messageDataController } from "../controllers/message.controller.js";
const getAdminDataRouter = express.Router();

getAdminDataRouter.get('/get-admin-data', adminDataHandler);

getAdminDataRouter.get('/get-user-data', userDataController)

getAdminDataRouter.get('/get-chat-data', chatController);

getAdminDataRouter.get('/get-message-data', messageDataController)

export {
    getAdminDataRouter
}