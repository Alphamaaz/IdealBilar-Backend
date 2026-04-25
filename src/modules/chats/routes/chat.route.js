// External modules
import express from 'express'
// Internal modules
import { middlewareForVerifyJwtToken } from '../../../shared/middlewares/auth.middleware.js';
import { adminOnlyMiddleware } from '../../../shared/middlewares/adminOnlyAuth.moddleware.js';
import { chatController } from '../controllers/chat.controller.js';
const chatRouter = express.Router();

// chat route
chatRouter.get('/chat-messages', middlewareForVerifyJwtToken, adminOnlyMiddleware, chatController);


//export
export { 
    chatRouter as chatRouterHandler
};